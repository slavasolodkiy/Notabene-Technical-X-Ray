import type { Agent, DID } from '@taprsvp/types';
import {
  PersonType,
  type Deposit,
  type IVMS101,
  type V1Transaction,
  type Withdrawal,
} from '../types';
import type {
  BaseRequestConfig,
  ResponseToIVMS101RequestConfig,
  ResponseToTxCreateRequestConfig,
  TransactionCreateRequestV2,
  TransactionIVMS101Request,
} from './types';
import {
  convertPersonToV2,
  getCaip10ChainPrefix,
  isDeposit,
  isWithdrawal,
} from './utils';

export function mapToTransactCreateRequest(
  transaction: Withdrawal | Deposit,
  payload: V1Transaction,
  config: ResponseToTxCreateRequestConfig & Required<BaseRequestConfig>,
): TransactionCreateRequestV2 {
  const originatorId = config.originatorId;
  const beneficiaryId = config.beneficiaryId;
  const referenceId =
    config?.referenceId ||
    payload.transactionId ||
    Math.random().toString(36).substring(2, 15);
  const agents: Agent[] = [];

  if (payload.originatorVASPdid) {
    agents.push({
      '@id': payload.originatorVASPdid,
      // tap type needs to be updated to accept IRI as valid id
      for: originatorId as DID,
      role: 'VASP',
    });
  }

  if (payload.beneficiaryVASPdid) {
    agents.push({
      '@id': payload.beneficiaryVASPdid,
      // tap type needs to be updated to accept IRI as valid id
      for: beneficiaryId as DID,
      role: 'VASP',
    });
  }

  if (isWithdrawal(transaction) && transaction?.account?.did) {
    agents.push({
      '@id': transaction.account.did,
      // tap type needs to be updated to accept IRI as valid id
      for: (payload.beneficiaryVASPdid || beneficiaryId) as DID,
      role: 'SettlementAddress',
    });
  }

  if (isDeposit(transaction) && transaction?.account) {
    if (transaction.account.did) {
      agents.push({
        '@id': transaction.account.did,
        // tap type needs to be updated to accept IRI as valid id
        for: (payload.originatorVASPdid || originatorId) as DID,
        role: 'SourceAddress',
      });
    }

    if (config.settlementAddress && transaction.account.caip10) {
      const chainPrefix = getCaip10ChainPrefix(transaction.account.caip10);
      agents.push({
        '@id': `did:pkh:${chainPrefix}:${config.settlementAddress}`,
        // tap type needs to be updated to accept IRI as valid id
        for: (payload.beneficiaryVASPdid || beneficiaryId) as DID,
        role: 'SettlementAddress',
      });
    }
  }

  return {
    originator: { '@id': originatorId },
    beneficiary: { '@id': beneficiaryId },
    asset: transaction.asset,
    amount: transaction.amountDecimal?.toString() || payload.transactionAmount,
    agents,
    ref: referenceId,
  };
}

export function mapToAppendPiiRequest(
  transaction: Withdrawal | Deposit,
  ivms101: IVMS101,
  config: ResponseToIVMS101RequestConfig & Required<BaseRequestConfig>,
): TransactionIVMS101Request {
  if (isWithdrawal(transaction)) {
    // For outgoing transfers, the beneficiary is the counterparty — use the
    // destination blockchain address as their accountNumber.
    const beneficiaryAccountNumber = transaction.destination;

    const beneficiaryPersons =
      // If counterparty type is SELF, reuse originator data for beneficiary
      transaction.counterparty?.type === PersonType.SELF && config.originator
        ? config.originator.originatorPerson
        : // Convert all beneficiary persons from V1 to V2 format
          ivms101.beneficiary?.beneficiaryPersons?.map((person) =>
            convertPersonToV2(person, beneficiaryAccountNumber),
          ) || [];

    return {
      ivms101: {
        originator: config.originator,
        beneficiary: {
          beneficiaryPerson: beneficiaryPersons,
        },
      },
    };
  }

  // For incoming transfers, the originator is the counterparty — use the
  // source blockchain address as their accountNumber.
  const source = (transaction as Deposit).source;
  const originatorAccountNumber = Array.isArray(source) ? source[0] : source;

  const originatorPersons =
    transaction.counterparty?.type === PersonType.SELF && config.beneficiary
      ? config.beneficiary.beneficiaryPerson
      : // Convert all originator persons from V1 to V2 format
        ivms101.originator?.originatorPersons?.map((person) =>
          convertPersonToV2(person, originatorAccountNumber),
        ) || [];

  return {
    ivms101: {
      originator: {
        originatorPerson: originatorPersons,
      },
      beneficiary: config.beneficiary,
    },
  };
}
