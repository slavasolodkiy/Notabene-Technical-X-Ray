import { decodeJwt } from 'jose';

import {
  PersonType,
  type Deposit,
  type DID,
  type OwnershipProof,
  type TransactionResponse,
  type Withdrawal,
} from '../types';
import { mapToAppendPiiRequest, mapToTransactCreateRequest } from './mappers';
import type {
  BaseRequestConfig,
  DelegateToken,
  ResponseToIVMS101RequestConfig,
  ResponseToTxCreateRequestConfig,
  ResponseToTxRequestConfig,
  TransactionCreateRequestV2,
  TransactionIVMS101Request,
} from './types';
import { getPartyId, isDeposit, isWithdrawal } from './utils';

export function uuid(): string {
  if (typeof crypto === 'undefined') {
    throw new Error(
      '[Notabene/SDK] Web Crypto API is not available. A secure environment with crypto support is required (Node.js 16+ or a modern browser).',
    );
  }
  // Use native randomUUID when available (Node 19+, modern browsers)
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback for older environments (Node 16–18) using crypto.getRandomValues
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

// This is the format we expect for beneficiaryId and originatorId;
// however for now we don't use it since the backend doesn't do the check
// const validateIRI = (uri: string): uri is IRI => {
//   return uri.indexOf(':') > 0;
// };

/**
 * Fills in missing config values by extracting them from the delegate token and transaction data
 * @internal
 */
export function enrichConfig(
  config: ResponseToTxRequestConfig,
  delegateToken: string,
  transaction: Withdrawal | Deposit,
): ResponseToTxRequestConfig & Required<BaseRequestConfig> {
  const enrichedConfig = { ...config };

  // Extract customer ID from delegate token
  // For withdrawals: customer is originator, for deposits: customer is beneficiary
  let customerIdFromToken: DID | undefined;
  try {
    const tokenPayload = decodeJwt<DelegateToken>(delegateToken);
    customerIdFromToken = tokenPayload?.sub;
  } catch {
    // If decoding fails, customerIdFromToken remains undefined
    // TODO: check what should we do in this scenario.
  }

  if (isWithdrawal(transaction)) {
    // Withdrawal: customer sends to counterparty
    if (!enrichedConfig.originatorId && customerIdFromToken) {
      enrichedConfig.originatorId = customerIdFromToken;
    }

    if (!enrichedConfig.beneficiaryId) {
      if (transaction.counterparty?.type === PersonType.SELF) {
        enrichedConfig.beneficiaryId = enrichedConfig.originatorId;
      } else if (transaction.destination) {
        // no-op: TODO: review this logic later if we need to derive beneficiaryId using a public key scheme.
        // enrichedConfig.beneficiaryId = `did:key:${transaction.destination}`;
      }
    }
  } else if (isDeposit(transaction)) {
    // Deposit: counterparty sends to customer
    if (!enrichedConfig.beneficiaryId && customerIdFromToken) {
      enrichedConfig.beneficiaryId = customerIdFromToken;
    }

    if (!enrichedConfig.originatorId) {
      if (transaction.counterparty?.type === PersonType.SELF) {
        enrichedConfig.originatorId = enrichedConfig.beneficiaryId;
      } else if (transaction.source) {
        // no-op: TODO: review this logic later if we need to derive originatorId using a public key scheme.
        // enrichedConfig.originatorId = `did:key:${transaction.source}`;
      }
    }
  }

  // Resolve IDs from party information (email/name) if still missing
  if (!enrichedConfig.originatorId) {
    const party = isWithdrawal(transaction)
      ? transaction.customer
      : transaction.counterparty;
    enrichedConfig.originatorId = getPartyId(party);
  }

  if (!enrichedConfig.beneficiaryId) {
    const party = isWithdrawal(transaction)
      ? transaction.counterparty
      : transaction.customer;
    enrichedConfig.beneficiaryId = getPartyId(party);
  }

  if (!enrichedConfig.beneficiaryId) {
    // TODO : Check if we should throw an exception instead
    console.warn(
      `[Notabene/SDK] beneficiaryId not provided; falling back to a generated random identifier.`,
    );
    enrichedConfig.beneficiaryId = `urn:uuid:${uuid()}`;
  }

  if (!enrichedConfig.originatorId) {
    // TODO : Check if we should throw an exception instead
    console.warn(
      `[Notabene/SDK] originatorId not provided; falling back to a generated random identifier.`,
    );
    enrichedConfig.originatorId = `urn:uuid:${uuid()}`;
  }

  // TODO: Re-enable IRI validation once the backend enforces it
  // if (!validateIRI(enrichedConfig.beneficiaryId)) {
  //   throw new Error('beneficiaryId is not a valid IRI');
  // }

  // if (!validateIRI(enrichedConfig.originatorId)) {
  //   throw new Error('originatorId is not a valid IRI');
  // }

  return enrichedConfig as ResponseToTxRequestConfig &
    Required<BaseRequestConfig>;
}

/**
 * Transforms a Notabene component response into txCreate, IVMS101, and confirmRelationship request bodies
 *
 * This is a convenience function that generates the transaction creation request,
 * the IVMS101 data, and optionally the relationship confirmation proof in a single call,
 * which is useful for V2 workflows where you need to create a transaction first,
 * then append IVMS101 data to it, and finally confirm the relationship.
 *
 * ## IVMS101 Config by Transaction Type
 *
 * The `originator` and `beneficiary` config options provide the customer's PII data.
 * Which one to use depends on the transaction type:
 *
 * - **Withdrawals**: Pass `originator` - the customer is sending funds (customer = originator)
 * - **Deposits**: Pass `beneficiary` - the customer is receiving funds (customer = beneficiary)
 *
 * For self-transfers, the provided data is automatically reused for both parties.
 *
 * @param response - The response from the Notabene Embedded Component
 * @param delegateToken - The JWT delegate token for extracting the customer ID
 * @param config - Optional configuration for IDs and reference
 * @param config.originatorId - Optional originator ID (auto-extracted from delegateToken for withdrawals)
 * @param config.beneficiaryId - Optional beneficiary ID (auto-extracted from delegateToken for deposits)
 * @param config.referenceId - Optional reference ID (auto-generated if not provided)
 * @param config.originator - Customer's IVMS101 data for withdrawals (customer is the sender)
 * @param config.beneficiary - Customer's IVMS101 data for deposits (customer is the receiver)
 * @returns Object with `createTx`, `ivms101`, and optional `confirmRelationship` properties containing the respective request bodies
 *
 * @example
 * ```typescript
 * import { componentResponseToTxRequests } from '$lib/notabene-tx-transformer';
 *
 * // For withdrawals: pass originator (customer is sending)
 * withdrawal.on('complete', async (result) => {
 *   const { createTx, ivms101 } = componentResponseToTxRequests(
 *     result.response,
 *     delegateToken,
 *     { originator: customerIvmsData }
 *   );
 * });
 *
 * // For deposits: pass beneficiary (customer is receiving)
 * deposit.on('complete', async (result) => {
 *   const { createTx, ivms101 } = componentResponseToTxRequests(
 *     result.response,
 *     delegateToken,
 *     { beneficiary: customerIvmsData }
 *   );
 * });
 * ```
 */
export function componentResponseToTxRequests(
  response: TransactionResponse<Withdrawal | Deposit>,
  delegateToken: string,
  config: ResponseToTxRequestConfig = {},
): {
  createTx: TransactionCreateRequestV2;
  ivms101: TransactionIVMS101Request;
  confirmRelationship?: {
    proof: OwnershipProof;
  };
} {
  const { value, txCreate, txUpdate, ivms101, proof } = response;

  // For withdrawals: use txCreate, for deposits: use txUpdate
  const txPayload = isWithdrawal(value) ? txCreate : txUpdate;

  if (!txPayload || !ivms101) {
    throw new Error(
      'Invalid response: missing required txCreate/txUpdate or ivms101 data',
    );
  }

  const enrichedConfig = enrichConfig(config, delegateToken, value);

  return {
    createTx: mapToTransactCreateRequest(value, txPayload, enrichedConfig),
    ivms101: mapToAppendPiiRequest(value, ivms101, enrichedConfig),
    ...(proof && { confirmRelationship: { proof } }),
  };
}

/**
 * Transforms a Notabene component response to a Version 2 transaction create API request body
 *
 * @param response - The response from the Notabene Embedded Component
 * @param delegateToken - The JWT delegate token for extracting the originator ID
 * @param config - Configuration object with optional IDs
 * @param config.originatorId - Optional originator ID (auto-extracted from delegateToken if not provided)
 * @param config.beneficiaryId - Optional beneficiary ID (auto-generated if not provided)
 * @param config.referenceId - Optional reference ID for the transaction
 * @returns The transformed request body ready for the Version 2 transaction create API
 *
 * @example
 * ```typescript
 * import { componentResponseToTxCreateRequest } from '$lib/notabene-tx-transformer';
 *
 * // Works with both withdrawal and deposit responses
 * transaction.on('complete', async (result) => {
 *   const requestBody = componentResponseToTxCreateRequest(
 *     result.response,
 *     delegateToken,
 *     {
 *       originatorId: 'mailto:user@example.com',
 *       beneficiaryId: 'urn:beneficiary:recipient',
 *       referenceId: 'tx-12345'
 *     }
 *   );
 *
 *   await fetch('/entity/${vaspDid}/tx', {
 *     method: 'POST',
 *     body: JSON.stringify(requestBody)
 *   });
 * });
 * ```
 */
export function componentResponseToTxCreateRequest(
  response: TransactionResponse<Withdrawal | Deposit>,
  delegateToken: string,
  config: ResponseToTxCreateRequestConfig = {},
) {
  const { value, txCreate, txUpdate } = response;

  // For withdrawals: use txCreate, for deposits: use txUpdate
  const txPayload = isWithdrawal(value) ? txCreate : txUpdate;

  if (!txPayload || !response.ivms101) {
    throw new Error(
      'Invalid response: missing required txCreate/txUpdate or ivms101 data',
    );
  }

  const enrichedConfig = enrichConfig(config, delegateToken, value);

  return mapToTransactCreateRequest(value, txPayload, enrichedConfig);
}

/**
 * Transforms a Notabene component response to IVMS101 format
 *
 * ## IVMS101 Config by Transaction Type
 *
 * The `originator` and `beneficiary` config options provide the customer's PII data.
 * Which one to use depends on the transaction type:
 *
 * - **Withdrawals**: Pass `originator` - the customer is sending funds (customer = originator)
 * - **Deposits**: Pass `beneficiary` - the customer is receiving funds (customer = beneficiary)
 *
 * For self-transfers, the provided data is automatically reused for both parties.
 *
 * @param response - The response from the Notabene Embedded Component
 * @param delegateToken - The JWT delegate token for extracting the customer ID
 * @param config - Configuration object with optional IDs
 * @param config.originatorId - Optional originator ID (auto-extracted from delegateToken for withdrawals)
 * @param config.beneficiaryId - Optional beneficiary ID (auto-extracted from delegateToken for deposits)
 * @param config.originator - Customer's IVMS101 data for withdrawals (customer is the sender)
 * @param config.beneficiary - Customer's IVMS101 data for deposits (customer is the receiver)
 * @returns The transformed request body in IVMS101 format
 *
 * @example
 * ```typescript
 * import { componentResponseToIVMS101 } from '$lib/notabene-tx-transformer';
 *
 * // For withdrawals: pass originator (customer is sending)
 * const withdrawalIvms = componentResponseToIVMS101(
 *   withdrawalResponse,
 *   delegateToken,
 *   { originator: customerIvmsData }
 * );
 *
 * // For deposits: pass beneficiary (customer is receiving)
 * const depositIvms = componentResponseToIVMS101(
 *   depositResponse,
 *   delegateToken,
 *   { beneficiary: customerIvmsData }
 * );
 * ```
 */
export function componentResponseToIVMS101(
  response: TransactionResponse<Withdrawal | Deposit>,
  delegateToken: string,
  config: ResponseToIVMS101RequestConfig = {},
) {
  if (!response.ivms101) {
    throw new Error('Invalid response: missing required ivms101 data');
  }

  const { value, ivms101 } = response;
  const enrichedConfig = enrichConfig(config, delegateToken, value);

  return mapToAppendPiiRequest(value, ivms101, enrichedConfig);
}
