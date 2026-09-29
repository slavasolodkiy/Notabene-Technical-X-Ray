import EmbeddedComponent from './components/EmbeddedComponent';
import type {
  Account,
  Agent,
  AgentSections,
  BlockchainAddress,
  CAIP10,
  CAIP19,
  CAIP2,
  CallbackOptions,
  Cancel,
  Completed,
  ComponentMessage,
  ComponentResponse,
  ConnectionOptions,
  ConnectionRequest,
  ConsentConfig,
  ContactSupportConfig,
  CosmosMetadata,
  Counterparty,
  CounterpartyAssistConfig,
  CryptoCredential,
  DeclarationProof,
  Deposit,
  DepositRequest,
  DepositRequestOptions,
  Destination,
  DID,
  DTI,
  Error,
  FieldOptions,
  FieldTypes,
  HideSection,
  HostMessage,
  InvalidValue,
  InvoiceReaderResponse,
  IVMS101,
  LegalPerson,
  LegalPersonFieldName,
  LegalPersonFields,
  LEI,
  MicroTransferProof,
  NationalIdentification,
  NaturalPerson,
  NaturalPersonFieldName,
  NaturalPersonFields,
  NotabeneAsset,
  OwnershipProof,
  Ready,
  RefreshSource,
  ResizeRequest,
  ScreenshotProof,
  SectionOption,
  SignatureProof,
  SIWXInput,
  SolanaMetadata,
  Theme,
  ThresholdOptions,
  Transaction,
  TransactionAsset,
  TransactionOptions,
  TransactionResponse,
  TravelAddress,
  UpdateValue,
  V1Transaction,
  ValidationError,
  VASP,
  VASPOptions,
  VASPTrustStatus,
  Wallet,
  Withdrawal,
} from './types';
import {
  AgentType,
  CMType,
  CodeVerificationStatus,
  ErrorIdentifierCode,
  HMType,
  IdentityVerificationMethod,
  InfoIdentifierCode,
  PersonType,
  ProofStatus,
  ProofTypes,
  Status,
  ValidationSections,
  VASPSearchControl,
  WarningIdentifierCode,
} from './types';
import { type MessageCallback } from './utils/MessageEventManager';
import { decodeFragmentToObject, encodeObjectToFragment } from './utils/urls';
// Must be exported for React Native SDK to use
export { default as EmbeddedComponent } from './components/EmbeddedComponent';
export {
  componentResponseToIVMS101,
  componentResponseToTxCreateRequest,
  componentResponseToTxRequests,
} from './responseTransformer';
export type {
  ResponseToTxRequestConfig,
  TransactionCreateRequestV2,
  TransactionIVMS101Request,
} from './responseTransformer';
export type { Invoice } from './types';
export {
  ConnectionManager,
  decryptCounterpartyAssistPayload,
  getRefreshResult,
  type ConnectionData,
  type ConnectionMetadata,
  type ConnectionResponse,
  type ConnectionResult,
  type ConnectionStatus,
  type TransactionType,
} from './utils/connections';
export {
  AgentType,
  CMType,
  CodeVerificationStatus,
  decodeFragmentToObject,
  ErrorIdentifierCode,
  HMType,
  IdentityVerificationMethod,
  InfoIdentifierCode,
  PersonType,
  ProofStatus,
  ProofTypes,
  Status,
  ValidationSections,
  VASPSearchControl,
  WarningIdentifierCode,
};
export type {
  Account,
  Agent,
  AgentSections,
  BlockchainAddress,
  CAIP10,
  CAIP19,
  CAIP2,
  CallbackOptions,
  Cancel,
  Completed,
  ComponentMessage,
  ComponentResponse,
  ConnectionOptions,
  ConnectionRequest,
  ConsentConfig,
  ContactSupportConfig,
  CosmosMetadata,
  Counterparty,
  CounterpartyAssistConfig,
  CryptoCredential,
  DeclarationProof,
  Deposit,
  DepositRequest,
  DepositRequestOptions,
  Destination,
  DID,
  DTI,
  Error,
  FieldOptions,
  FieldTypes,
  HideSection,
  HostMessage,
  InvalidValue,
  InvoiceReaderResponse,
  IVMS101,
  LegalPerson,
  LegalPersonFieldName,
  LegalPersonFields,
  LEI,
  MessageCallback,
  MicroTransferProof,
  NationalIdentification,
  NaturalPerson,
  NaturalPersonFieldName,
  NaturalPersonFields,
  NotabeneAsset,
  OwnershipProof,
  Ready,
  RefreshSource,
  ResizeRequest,
  ScreenshotProof,
  SectionOption,
  SignatureProof,
  SIWXInput,
  SolanaMetadata,
  Theme,
  ThresholdOptions,
  Transaction,
  TransactionAsset,
  TransactionOptions,
  TransactionResponse,
  TravelAddress,
  UpdateValue,
  V1Transaction,
  ValidationError,
  VASP,
  VASPOptions,
  VASPTrustStatus,
  Wallet,
  Withdrawal,
};

/**
 * Configuration for the Notabene SDK
 *
 * @public
 */
export interface NotabeneConfig {
  /**
   * The URL of the Notabene API node
   */
  nodeUrl?: string;

  /**
   * The authentication token for the Notabene API
   */
  authToken?: string;

  /**
   * The URL of the Notabene UX components
   */
  uxUrl?: string;

  /**
   * Custom theme configuration for the UX components
   */
  theme?: Theme;

  /**
   * The locale to use for the UX components
   */
  locale?: string;
}

/** Trim whitespace, validate, and strip trailing slashes from a URL. */
function normalizeUrl(url: string, field: string): string {
  const normalized = url.trim().replace(/\/+$/, '');
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error(`Invalid ${field}: "${url}" is not a valid URL`);
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(
      `Invalid ${field}: "${url}" (must start with http:// or https://)`,
    );
  }
  return normalized;
}

/**
 * Primary constructor for Notabene UX elements
 *
 * This class provides methods to create and manage various Notabene components
 * such as withdrawal assist, deposit assist, connect, and deposit request.
 * It also handles URL generation and fragment decoding for these components.
 *
 * @public
 */
export default class Notabene {
  private nodeUrl?: string;
  private authToken?: string;
  private uxUrl: string;
  private theme?: Theme;
  private locale?: string;

  /**
   * Creates a new instance of the Notabene SDK
   *
   * @param config - Configuration options for the Notabene SDK
   */
  constructor(config: NotabeneConfig) {
    this.uxUrl = normalizeUrl(
      config.uxUrl || 'https://connect.notabene.id',
      'uxUrl',
    );
    this.nodeUrl = config.nodeUrl
      ? normalizeUrl(config.nodeUrl, 'nodeUrl')
      : undefined;
    this.authToken = config.authToken;
    this.theme = config.theme;
    this.locale = config.locale;
  }

  /**
   * Generates a URL for a Notabene component
   *
   * @param path - The path of the component
   * @param value - Transaction data
   * @param configuration - Optional transaction configuration
   * @param callbacks - Optional callback configuration
   * @returns component URL
   * @internal
   */
  componentUrl<V, O>(
    path: string,
    value: V,
    configuration?: O,
    callbacks?: CallbackOptions,
  ): string {
    const url = new URL(this.uxUrl);
    url.pathname = path;

    const hash = encodeObjectToFragment({
      authToken: this.authToken,
      value,
      configuration,
    });
    url.hash = hash;
    if (this.nodeUrl) url.searchParams.set('nodeUrl', this.nodeUrl);

    if (this.theme) {
      url.searchParams.set('theme', JSON.stringify(this.theme));
    }
    if (this.locale) {
      url.searchParams.set('locale', this.locale);
    }
    if (callbacks) {
      if (callbacks.callback)
        url.searchParams.set('callback_url', callbacks.callback);
      if (callbacks.redirectUri)
        url.searchParams.set('redirect_uri', callbacks.redirectUri);
    }
    return url.toString();
  }

  /**
   * Creates a new embedded component
   *
   * @param path - The path of the component
   * @param value - Transaction data
   * @param options - Optional transaction options
   * @param callbacks - Optional callback configuration
   * @returns A new EmbeddedComponent instance
   * @internal
   */
  createComponent<V, O>(
    path: string,
    value: Partial<V>,
    options?: O,
    callbacks?: CallbackOptions,
  ) {
    return new EmbeddedComponent<V, O>(
      this.componentUrl(path, value, options, callbacks),
      value,
      options,
    );
  }

  /**
   * Creates a withdrawal assist component
   *
   * @param value - Withdrawal transaction data
   * @param options - Optional transaction options
   * @param callbacks - Optional callback configuration
   * @returns A new EmbeddedComponent instance for withdrawal assistance
   */
  public createWithdrawalAssist(
    value: Partial<Withdrawal>,
    options?: TransactionOptions,
    callbacks?: CallbackOptions,
  ) {
    return this.createComponent<Withdrawal, TransactionOptions>(
      'withdrawal-assist',
      value,
      options,
      callbacks,
    );
  }

  /**
   * Creates a connect component
   *
   * @param value - Connection request data
   * @param options - Optional transaction options
   * @param callbacks - Optional callback configuration
   * @returns A new EmbeddedComponent instance for connection
   * @alpha
   */
  public createConnectWallet(
    value: ConnectionRequest,
    options?: ConnectionOptions,
    callbacks?: CallbackOptions,
  ) {
    return this.createComponent<ConnectionRequest, ConnectionOptions>(
      'connect',
      value,
      options,
      callbacks,
    );
  }

  /**
   * Creates a deposit request component
   *
   * @param value - Deposit request data
   * @param options - Optional transaction options
   * @param callbacks - Optional callback configuration
   * @returns A new EmbeddedComponent instance for deposit requests
   * @public
   */
  public createDepositRequest(
    value: DepositRequest,
    options?: DepositRequestOptions,
    callbacks?: CallbackOptions,
  ) {
    return this.createComponent<DepositRequest, DepositRequestOptions>(
      'deposit-request',
      value,
      options,
      callbacks,
    );
  }

  /**
   * Creates an invoice reader component for extracting TAIP-16 invoice data from PDF invoices
   *
   * The component provides a PDF drag-and-drop upload UI. On upload, the PDF is
   * parsed and the extracted invoice data is returned. On completion,
   * the response contains the TAIP-16 invoice data.
   *
   * @returns A new EmbeddedComponent instance for invoice reader creation
   * @public
   */
  public createInvoiceReader() {
    return this.createComponent<InvoiceReaderResponse, Record<string, never>>(
      'flow-link/invoice-reader',
      {},
    );
  }

  /**
   * Creates a deposit assist component
   *
   * @param value - Partial deposit transaction data
   * @param options - Optional transaction options
   * @param callbacks - Optional callback configuration
   * @returns A new EmbeddedComponent instance for deposit assistance
   * @public
   */
  public createDepositAssist(
    value: Partial<Deposit>,
    options?: TransactionOptions,
    callbacks?: CallbackOptions,
  ) {
    return this.createComponent<Deposit, TransactionOptions>(
      'deposit-assist',
      value,
      options,
      callbacks,
    );
  }
}
