import type { Invoice, Party } from '@taprsvp/types';
import type {
  Address,
  Beneficiary,
  ISOCountryCode,
  ISODate,
  IVMS101,
  NationalIdentification,
  NationalIdentifierTypeCode,
  Originator,
} from './ivms/types';

export type {
  BeneficiaryVASP,
  OriginatingVASP,
  PayloadMetadata,
  TransferPath,
} from './ivms/types';
export type {
  Address,
  Beneficiary,
  ISOCountryCode,
  ISODate,
  NationalIdentification,
  Originator,
};
// Re-export TAIP-16 invoice types for SDK consumers
export type { Invoice };
/**
 * Interoperable Virtual Asset Service Provider (VASP) Messaging Standard
 * @public
 */
export type { IVMS101 };

/**
 * UUID v4 string identifier
 * A universally unique identifier that follows RFC 4122 format
 * Format: 8-4-4-4-12 hexadecimal digits
 * @example "550e8400-e29b-41d4-a716-446655440000"
 * @see {@link https://tools.ietf.org/html/rfc4122 | RFC4122}
 * @public
 */
export type UUID = string;

/**
 * Chain Agnostic Blockchain Identifier (CAIP-2)
 * Represents a blockchain in a chain-agnostic way following the CAIP-2 specification.
 * The identifier consists of a namespace and reference separated by a colon.
 *
 * Format: `namespace:reference`
 * - namespace: Represents the blockchain namespace (e.g. 'eip155', 'bip122', 'cosmos')
 * - reference: Chain-specific identifier within that namespace
 *
 * @example "eip155:1" // Ethereum Mainnet
 * @example "bip122:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f" // Bitcoin Mainnet
 * @example "cosmos:cosmoshub-3" // Cosmos Hub Mainnet
 * @see {@link https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md | CAIP-2 Specification}
 * @public
 */
export type CAIP2 = `${string}:${string}`;

/**
 * Chain Agnostic Account Identifier (CAIP-10)
 * Represents an account/address on a specific blockchain following the CAIP-10 specification.
 * Extends CAIP-2 by adding the account address specific to that chain.
 *
 * Format: `{caip2}:{address}`
 * - caip2: The CAIP-2 chain identifier (e.g. 'eip155:1')
 * - address: Chain-specific account address format
 *
 * @example "eip155:1:0x742d35Cc6634C0532925a3b844Bc454e4438f44e" // Ethereum account on mainnet
 * @example "bip122:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f:128Lkh3S7CkDTBZ8W7BbpsN3YYizJMp8p6" // Bitcoin account on mainnet
 * @example "cosmos:cosmoshub-3:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0" // Cosmos account
 * @see {@link https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md | CAIP-10 Specification}
 * @public
 */
export type CAIP10 = `${CAIP2}:${string}`;

/**
 * Chain Agnostic Asset Identifier (CAIP-19)
 * Represents an asset/token on a specific blockchain following the CAIP-19 specification.
 * Extends CAIP-2 by adding asset type and identifier information.
 *
 * Format: `{caip2}/{asset_namespace}:{asset_reference}`
 * - caip2: The CAIP-2 chain identifier (e.g. 'eip155:1')
 * - asset_namespace: The asset standard (e.g. 'erc20', 'erc721', 'slip44')
 * - asset_reference: Chain/standard-specific asset identifier
 *
 * @example "eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f" // DAI token on Ethereum mainnet
 * @example "eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" // CryptoKitties NFT contract
 * @example "cosmos:cosmoshub-3/slip44:118" // ATOM token on Cosmos Hub
 * @see {@link https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md | CAIP-19 Specification}
 * @public
 */
export type CAIP19 = `${CAIP2}/${string}:${string}`;

/**
 * Chain Agnostic Payload Identifier
 * @public
 */
export type CAIP220 = string;

/**
 * Digital Token Identifier (DTI) following ISO 24165 standard
 *
 * @remarks
 * A standardized identifier for digital assets and cryptocurrencies. The DTI system
 * provides unique and unambiguous identification of digital tokens, supporting interoperability
 * and clarity in financial markets.
 *
 * Format: `DTI[NNNNN]` where N is a digit
 *
 * @example "DTI00001" // Example DTI for Bitcoin
 * @example "DTI00002" // Example DTI for Ethereum
 *
 * @see {@link https://dtif.org/ | Digital Token Identifier Foundation}
 * @see {@link https://www.iso.org/standard/77895.html | ISO 24165}
 * @public
 */

export type DTI = string;

/**
 * Notabene Asset Identifier
 * @public
 */

/**
 * Internal identifier for assets in the Notabene system
 *
 * @remarks
 * A standardized string format used within Notabene to identify cryptocurrencies,
 * tokens, and other digital assets. This is Notabene's legacy asset identification
 * system that may be used alongside CAIP-19 and DTI identifiers.
 *
 * @example "ETH_USDT" // USDT token on Ethereum
 * @example "BTC" // Bitcoin
 * @see {@link CAIP19} For chain-agnostic asset identifiers
 * @see {@link DTI} For ISO standardized identifiers
 * @public
 */

export type NotabeneAsset = string;

/**
 * The asset of a transaction either a Notabene asset, a CAIP-19 asset, or a DTI.
 * @public
 */
export type TransactionAsset = NotabeneAsset | CAIP19 | DTI;

/**
 * A blockchain address
 * @public
 */

/**
 * A native blockchain address string
 *
 * @remarks
 * Represents a blockchain address in the native format specific to a particular chain.
 * This could be an Ethereum address, Bitcoin address, or other chain-specific format.
 * The address format and validation rules depend on the underlying blockchain.
 *
 * @example "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" // Ethereum address
 * @example "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" // Bitcoin address
 * @example "cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0" // Cosmos address
 * @public
 */

export type BlockchainAddress = string;

/**
 * A travel address
 * @public

 * A standardized travel rule address format
 *
 * @remarks
 * Represents a special address format used for travel rule compliance. Travel addresses
 * are prefixed with 'ta' and contain encoded information about the transaction
 * and counterparty details required for travel rule reporting.
 *
 * The format ensures consistent handling of travel rule data across different
 * VASPs and blockchain networks while maintaining privacy.
 *
 * @example "ta1234abcd..." // Example travel rule address
 * @see {@link BlockchainAddress} For native chain addresses
 * @see {@link CAIP10} For chain-agnostic addresses

 */ export type TravelAddress = `ta${string}`;

/**
 * A crypto credential
 * @public
 */ export type CryptoCredential = `${string}.${string}.mastercard`;

/**
 * The destination of a transaction either a blockchain address, a CAIP-19 address, or a travel address.
 * @public
 */
export type Destination =
  | BlockchainAddress
  | CAIP10
  | CryptoCredential
  | TravelAddress;

/**
 * The source of a transaction
 * @public
 */
export type Source = BlockchainAddress | CAIP10;

/**
 * A Uniform Resource Identifier
 * @remarks This type will be narrowed to `` `${string}:${string}` `` in the next major release.
 * @public
 */
export type URI = string;

/**
 * A Decentralized Identifier
 * @public
 */
export type DID = `did:${string}:${string}`;

/**
 * A LEI Legal Entity Identifier
 * @public
 */
export type LEI = string;

/**
 * 3 letter ISO currency code
 * @public
 */
export type ISOCurrency = string;

/**
 * The theme of the Notabene SDK
 * @public
 */
export type Theme = {
  mode: 'light' | 'dark'; // Defaults to 'light'
  backgroundColor?: string;
  primaryColor?: string;
  primaryForeground?: string;
  secondaryColor?: string;
  secondaryForeground?: string;
  fontFamily?: string;
  logo?: string;
};

/**
 * The type of Agent. Either a wallet or a VASP
 * @public
 */
export enum AgentType {
  PRIVATE = 'WALLET',
  VASP = 'VASP',
}

/**
 * Who is the agent acting on behalf of the counterparty
 * @public
 */
export interface Agent {
  did: DID;
  type: AgentType;
  logo?: URI;
  url?: URI;
  name?: string;
  verified?: boolean;
}

/**
 * The type of counterparty. Either a natural person or a legal person. If the customer is the same as the counterparty then the counterparty is a self.
 * @public
 */
/**
 * Enum defining the types of persons/entities in a transaction
 *
 * @remarks
 * This classification system aligns with FATF travel rule requirements and defines:
 * - NATURAL: Individual human persons acting in their own capacity
 * - LEGAL: Registered organizations, companies, or other legal entities
 * - SELF: When the counterparty is the same as the customer (first party transaction)
 *
 * The type affects what information must be collected and transmitted as part of
 * travel rule compliance. Different verification and due diligence requirements
 * apply to each type.
 *
 * @see {@link NaturalPerson} For natural person data requirements
 * @see {@link LegalPerson} For legal person data requirements
 * @public
 */
export enum PersonType {
  NATURAL = 'natural',
  LEGAL = 'legal',
  SELF = 'self', // first party
}

/**
 * A VASP agent acting on behalf of the counterparty
 * @public
 */
export interface VASP extends Agent {
  lei?: LEI;
  logo?: URI;
  website?: URI;
  countryOfRegistration?: ISOCountryCode;
  jurisdictions?: string;
}

/**
 * A wallet agent acting on behalf of the counterparty
 * @public
 */
export interface Wallet extends Agent {
  proof: OwnershipProof;
  wallet_connect_id?: string;
}

/**
 * A blockchain account
 * @public
 */
export interface Account {
  did?: DID;
  blockchainAddress?: BlockchainAddress;
  chain?: CAIP2;
  caip10?: CAIP10;
  identifier?: string;
}

/**
 * The counterparty of a transaction.
 * @public
 */
/**
  * Interface representing a party involved in a transaction other than the initiator
  *
  * @remarks
fines the core properties that identify and describe a counterparty:
  * - name: The display or legal name of the counterparty
  * - accountNumber: An account identifier/reference number
  * - did: Decentralized identifier for the counterparty
  * - type: Classification as natural person, legal entity, or self
  * - verified: Whether the counterparty's identity has been verified
  * - geographicAddress: Physical/mailing address information
  * - nationalIdentification: Government-issued ID details
  * - website: Official web presence
  * - phone: Contact phone number
  * - email: Contact email address
  *
  * This interface serves as the base for more specific counterparty types:
  * @see {@link NaturalPerson} For individual person properties
  * @see {@link LegalPerson} For organization/entity properties
  *
  * @public
  */
export interface Counterparty {
  name?: string;
  accountNumber?: string;
  did?: DID;
  type?: PersonType;
  verified?: boolean;
  geographicAddress?: Address;
  nationalIdentification?: NationalIdentification;
  website?: URI;
  phone?: string;
  email?: string;
}

/**
 * Interface representing a natural person (individual) involved in a transaction
 *
 * @remarks
 * Extends the baseinterface to add properties specific to individual persons:
 * - type: Must be PersonType.NATURAL to identify as an individual
 * - dateOfBirth: Optional ISO format birth date for identity verification
 * - placeOfBirth: Optional birth place for identity verification
 * - countryOfResidence: Optional ISO country code of current residence
 * - name: Required full legal name of the individual
 *
 * This interface captures the additional identifying information required for
 * natural persons under FATF Travel Rule requirements. The properties align
 * with standard KYC (Know Your Customer) data collection practices.
 *
 * @see {@link Counterparty} For base properties common to all counterparties
 * @see {@link PersonType} For person type classification
 * @public
 */
export interface NaturalPerson extends Counterparty {
  type: PersonType.NATURAL;
  dateOfBirth?: ISODate;
  placeOfBirth?: string;
  countryOfResidence?: ISOCountryCode;
  name: string;
}
/**
 * Field names for NaturalPerson
 * @public
 */
export type NaturalPersonFieldName =
  | 'name' // Full legal name
  | 'website' // Primary website of entity
  | 'email' // Contact email
  | 'phone' // Contact mobile phone
  | 'geographicAddress' // Address string
  | 'nationalIdentification' // National Identification number
  | 'dateOfBirth' // Date of Birty YYYY-MM-DD
  | 'placeOfBirth' // Place of Birth
  | 'countryOfResidence'; // ISO Country code of residence of Natural Person

/**
 * Field properties for national identifier type selection
 * @public
 */
export type NationalIdentifierTypeFieldOptions = {
  values?: NationalIdentifierTypeCode[];
};

/**
 * Field properties for natural person fields
 * @public
 */
export type NaturalPersonFields = Partial<{
  name: FieldOptions;
  website: FieldOptions;
  email: FieldOptions;
  phone: FieldOptions;
  geographicAddress: FieldOptions;
  nationalIdentification: FieldOptions & {
    nationalIdentifierType: NationalIdentifierTypeFieldOptions;
  };
  dateOfBirth: FieldOptions;
  placeOfBirth: FieldOptions;
  countryOfResidence: FieldOptions;
}>;

/**
 * Interface representing a legal entity (organization/company) involved in a transaction
 *
 * @remarks
 * Extends the baseface to add properties specific to legal entities:
 * - type: MustPersonType.LEGAL to identify as an organization
 * - name: Required registered legal name of the entity
 * - lei: Optional Legal Entity Identifier for regulated entities
 * - logo: Optional URI to the organization's logo image
 * - countryOfRegistration: Optional ISO country code where entity is registered
 *
 * This interface captures the additional identifying information required for
 * legal persons under FATF Travel Rule requirements. The properties align with
 * standard business KYC (Know Your Businessta collection practices.
 *
 * @see {@link Counterparty} For base properties common to all counterparties
 * @see {@link PersonType} For person type classification
 * @see {@link LEI} For Legal Entity Identifier format
 * @public
 */
export interface LegalPerson extends Counterparty {
  type: PersonType.LEGAL;
  name: string;
  lei?: LEI;
  logo?: URI;
  countryOfRegistration?: ISOCountryCode;
}

export type LegalPersonFieldName =
  | 'name' // Full legal name
  | 'lei' // Legal Entity Identifier
  | 'website' // Primary website of entity
  | 'email' // Contact email
  | 'phone' // Contact mobile phone
  | 'geographicAddress' // Address string
  | 'nationalIdentification' // National Identification number
  | 'countryOfRegistration'; // ISO Country code of registration of Legal Person

/**
 * Field properties for legal person fields
 * @public
 */
export type LegalPersonFields = Partial<{
  name: FieldOptions;
  lei: FieldOptions;
  website: FieldOptions;
  email: FieldOptions;
  phone: FieldOptions;
  geographicAddress: FieldOptions;
  nationalIdentification: FieldOptions & {
    nationalIdentifierType: NationalIdentifierTypeFieldOptions;
  };
  countryOfRegistration: FieldOptions;
}>;

/**
 * Fields specific to the originator of a transaction
 * @public
 */
type OriginatorFields = {
  source: Source | Source[];
};

/**
 * Fields specific to the beneficiary of a transaction
 * @public
 */
type BeneficiaryFields = {
  destination: Destination;
};

/**
 * Fields specific to a deposit request
 * @public
 */
type DepositRequestFields = {
  destination: BlockchainAddress | CAIP10;
  asset: TransactionAsset;
  amountDecimal: string | number;
  travelAddress?: TravelAddress;
  cryptoCredential?: CryptoCredential;
};

type RequestID = UUID;

/**
 * Base interface for requests sent to SDK components
 *
 * @remarks
 * Defines core properties that all component requests share:
 * - Optional unique request ID for tracking/correlating requests and responses
 * - Optional customer detailsfor pre-filling component data
 *
 * This interface is extended by specific request types like:
 * - Transaction requests for sending/receiving assets
 * - Connection requests for establishing VASP to VASP communication
 *
 * @see {@link Transaction} For transaction-specific request properties
 * @see {@link ConnectionRequest} For connection-specific request properties
 * @public
 */
export interface ComponentRequest {
  requestId?: RequestID;
  customer?: Counterparty;
}

/**
 * Core transaction interface representing a crypto asset transfer between parties
 *
 * @remarks
 * Extends ComponentRequest to add transaction-specific properties:
 * - agent: The entity facilitating/executing the transaction
 * - counterparty: The other party involved in the transaction
 * - asset: The cryptocurrency or token being transferred
 * - amountDecimal: The amount to transfer in decimal format
 * - proof: Optional ownership proof verifying control of involved addresses
 * - assetPrice: Optional price information in a fiat currency
 *
 * This interface serves as the base for specific transaction types like:
 * - Withdrawals for sending assets out
 * - Deposits for receiving assets
 * - Deposit requests for requesting asset transfers
 *
 * @see {@link Withdrawal} For withdrawal-specific transaction properties
 * @see {@link Deposit} For deposit-specific transaction properties
 * @see {@link Agent} For agent details
 * @see {@link Counterparty} For counterparty information
 * @public
 */
export interface Transaction extends ComponentRequest {
  transactionId?: string;
  agent: Agent;
  counterparty: Counterparty;
  asset: TransactionAsset;
  amountDecimal: string | number;
  proof?: OwnershipProof;
  assetPrice?: {
    price: number;
    currency: ISOCurrency;
  };
  account?: Account;
}

export interface RefreshSource {
  url: URI;
  key: string;
  /**
   * The connection id (also embedded in `url`). Exposed directly so consumers can
   * correlate a Counterparty Assist webhook event (whose `payload.id` is this id)
   * without parsing it out of the url.
   */
  id: string;
}

export interface Refreshable {
  refreshSource?: RefreshSource;
}

/**
 * An object representing a withdrawal transaction
 * @public
 */
export interface Withdrawal
  extends BeneficiaryFields,
    Transaction,
    Refreshable {}

/**
 * An object representing a deposit transaction
 * @public
 */
export interface Deposit extends OriginatorFields, Transaction, Refreshable {}

/**
 * An object representing a request for a deposit
 * @public
 */
export interface DepositRequest
  extends DepositRequestFields,
    ComponentRequest {}

/**
 * An object representing options for a Deposit Request
 * @public
 */
export interface DepositRequestOptions {
  showQrCode?: boolean; // Defaults to true
}

/** Output fields populated by the component on completion */
export interface InvoiceReaderResponse {
  /** TAIP-16 compliant invoice data (populated by the component after PDF parsing) */
  invoice?: Invoice;
  merchant?: Party;
  customer?: Party;
}

/**
 * An object representing a connection request
 * @public
 */
export interface ConnectionRequest extends ComponentRequest {
  asset: TransactionAsset;
  /**
   * The account to collect a proof for.
   *
   * @remarks
   * When set, the component narrows the connected wallet to this account and
   * only offers to verify that one, instead of letting the user pick any
   * address the wallet reports. Connecting fails if the wallet does not hold
   * it. When omitted, the user chooses which of their addresses to prove.
   *
   * A bare blockchain address is resolved against the chain of {@link ConnectionRequest.asset}.
   *
   * @see {@link OwnershipProof.address} For the proved account on the response
   */
  address?: BlockchainAddress | CAIP10;
}

/**
 * An object representing options for a Connection Request
 * @public
 */

export type ConnectionOptions = Omit<
  TransactionOptions,
  'allowedAgentTypes' | 'allowedCounterpartyTypes' | 'vasps' | 'fields' | 'hide'
>;

/**
 * The verification status of a transaction
 * @public
 */
export enum Status {
  EMPTY = 'empty',
  VERIFY = 'verify',
  PENDING = 'pending',
  VERIFIED = 'verified',
  BANNED = 'banned',
}

/**
 * Represents a legacy V1 API asset format supporting both Notabene and CAIP-19 identifiers
 *
 * @remarks
 * Used for backwards compatibility with V1 API transaction payloads:
 * - Can be either a simple Notabene asset string
 * - Or an object containing a CAIP-19 identifier
 *
 * @example "ETH_USDT" // Notabene asset format
 * @example \{ caip19: "eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f" \} // CAIP-19 format
 * @see {@link NotabeneAsset} For Notabene asset format
 * @see {@link CAIP19} For CAIP-19 asset format
 * @public
 */
export type V1Asset = NotabeneAsset | { caip19: CAIP19 };

/**
 * Transaction payload suitable for calling Notabene v1 tx/create
 * @public
 */
export type V1Transaction = {
  transactionAsset: V1Asset;
  transactionAmount: string;
  originatorEqualsBeneficiary?: boolean;
  originatorVASPdid: DID;
  beneficiaryVASPdid: DID;
  beneficiaryProof?: OwnershipProof;
  originatorProof?: OwnershipProof;
  originator?: Originator;
  beneficiary: Beneficiary;
  transactionId?: string;
};

/**
 * Base response interface for all SDK component operations
 *
 * @remarks
 * Provides standardized response propertiesfor component interactions:
 * - requestID: Links response back to the originating request
 * - valid: Boolean indicating if the operation was valid/successful
 * - status: Current verification status of the operation
 * - errors: Array of validation errors if any occurred
 *
 * This interface is extended by specific response types like:
 * - TransResponse for transaction operations
 * - ConnectionResponse for VASP connection operations
 *
 * @see {@link Status} For possible status values
 * @see {@link ValidationError} For error structure
 * @see {@link TransactionResponse} For transaction-specific responses
 * @public
 */
export interface ComponentResponse {
  requestID: RequestID;
  valid: boolean;
  status: Status;
  errors: ValidationError[];
}

/**
 * Response interface for transaction-related operations
 *
 * @remarks
 * Extends ComponentResponse to add transaction-specific response data:
 * - value: The resulting transaction value of generic type V
 * - ivms101: IVMS 101 travel rule data for the transaction
 * - proof: Optional ownership proof details if required
 * - txCreate: Optional V1 transaction payload for legacy API compatibility
 * - txUpdate: Optional V1 transaction payload for legacy API compatibility
 *
 * @typeParam V - Type of the transaction value being returned
 *
 * @see {@link ComponentResponse} For base response properties
 * @see {@link IVMS101} For travel rule data structure
 * @see {@link OwnershipProof} For proof details
 * @see {@link V1Transaction} For legacy transaction format
 * @public
 */
export interface TransactionResponse<V> extends ComponentResponse {
  value: V;
  ivms101: IVMS101;
  proof?: OwnershipProof;
  txCreate?: V1Transaction;
  txUpdate?: V1Transaction;
}

/**
 * Validation error
 * @public
 */
export type ValidationError = {
  attribute: string;
  message: string;
};

/**
 * Field properties
 * @public
 */
export type FieldOptions =
  | boolean
  | string[] // fields to show
  | {
      optional: boolean; // Shown but optional
    };

/**
 * Field type configuration
 * @public
 */

export type FieldTypes = {
  naturalPerson?: NaturalPersonFields;
  legalPerson?: LegalPersonFields;
};

/**
 * VASP Visibility Control representing allow/deny behaviour for VASP visibility
 *
 * @remarks
 * - ALLOWED: Include VASPs you have explicitly allowed in the Notabene Network
 * - PENDING: Include VASPs neither allowed nor denied
 * @public
 */
export enum VASPSearchControl {
  ALLOWED = 'allowed',
  PENDING = 'pending',
}

/**
 * Trust status assigned to a VASP in the Notabene network.
 *
 * Used by {@link VASPOptions.showTrustStatus} to filter which VASPs are listed in the picker.
 *
 * @public
 */
export type VASPTrustStatus = 'TRUSTED' | 'NEW' | 'FLAGGED' | 'BANNED';

/**
 * Options controlling which VASPs are listed and searchable in the picker.
 *
 * Two mutually exclusive variants:
 *
 * - **V1** — `addUnknown`, `onlyActive`, `searchable` (filters by {@link VASPSearchControl} status).
 * - **V2** — `addUnknown`, `onlyActive`, `showTrustStatus` (filters by {@link VASPTrustStatus}).
 *
 * `searchable` (V1-only) cannot be combined with `showTrustStatus` (V2-only);
 * TypeScript will reject the mix at compile time. `addUnknown` and `onlyActive` are valid in both variants.
 *
 * @example V1
 * ```ts
 * { addUnknown: true, onlyActive: true, searchable: [VASPSearchControl.ALLOWED] }
 * ```
 *
 * @example V2
 * ```ts
 * { addUnknown: true, onlyActive: true, showTrustStatus: ['TRUSTED', 'NEW'] }
 * ```
 *
 * @public
 */
export type VASPOptions =
  // V1 vasps options
  | {
      addUnknown?: boolean;
      onlyActive?: boolean;
      searchable?: VASPSearchControl[]; // If array left empty all VASPs will be searchable
    }
  // V2 vasps options
  | {
      // Typing `searchable` as `undefined` (rather than omitting it) makes TS reject
      // mixing V1 and V2 options, e.g. { searchable: [...], showTrustStatus: [...] }.
      searchable?: undefined;
      addUnknown?: boolean;
      onlyActive?: boolean;
      showTrustStatus?: VASPTrustStatus[];
    };

/**
 * Available methods for identity verification
 * @public
 */
export enum IdentityVerificationMethod {
  SMS = 'sms',
}

/**
 * Status of a code verification
 * @public
 */
export enum CodeVerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  FAILED = 'failed',
  EXPIRED = 'expired',
  MAX_ATTEMPTS_REACHED = 'max_attempts_reached',
  UNREACHABLE = 'unreachable',
}

/**
 * Configuration options for identity verification
 * @public
 */
export type IdentityVerificationConfig = {
  /** The required verification method. If not specified, none will be used */
  requiredMethod?: IdentityVerificationMethod;
};

/**
 * Counterparty Assist Configuration options for recipient selection
 *
 * @remarks
 * Controls for each person type, whether to show the share feature or not.
 *
 * @public
 */
export type CounterpartyAssistConfig =
  | boolean
  | {
      counterpartyTypes: PersonType[];
      /** @remarks Requires a transactionId to be passed in. */
      identityVerification?: IdentityVerificationConfig;
      /**
       * Optional URL that receives an `EC.counterpartyAssist*` webhook when the
       * counterparty completes or closes their part. MVP-only per-link override;
       * superseded by Portal-managed subscriptions post-migration.
       *
       * Transmitted and stored as plaintext, so do not embed secrets (e.g. `?token=`)
       * in this URL. Payloads carry the encrypted `sealed` blob (a successful decrypt
       * is itself an authenticity check); signed delivery is provided by the future
       * Svix-backed pipeline.
       */
      webhookUrl?: string;
    };

/**
 * A section of a WithdrawalAssist or DepositAssist screen that can be left out,
 * via {@link TransactionOptions.hide}.
 *
 * `'header'` is the card header — its status icon, title, description and
 * participant logo. The card body and footer are unaffected, so the Notabene
 * attribution in the footer still shows.
 *
 * @public
 */
export type HideSection =
  | 'asset'
  | 'destination'
  | 'counterparty'
  | 'agent'
  | 'header';

/**
 * Sections in a WithdrawalAssist screen
 *
 * @deprecated Use {@link HideSection} instead. Members stay assignable to their
 * literals, so existing callers keep compiling.
 *
 * @alpha
 */
export enum ValidationSections {
  ASSET = 'asset',
  DESTINATION = 'destination',
  COUNTERPARTY = 'counterparty',
  AGENT = 'agent',
}
/**
 * Specify what to do under the provided threshold.
 *
 * Eg. to allow self-declaration for all transactions under 1000 EUR
 *
 * Note to support threshold you MUST include the Asset Price in the Transaction
 *
 * @see {@link Transaction} Transaction object
 *
 * @public
 */

export interface ThresholdOptions {
  threshold: number; // The threshold amount eg 1000
  currency: ISOCurrency; // Currency of threshold
  proofTypes?: ProofTypes[]; // If left empty no proof will be required under threshold
}
/**
 * Options that can be placed in either the main or fallback sections of the agent selection step.
 *
 * @remarks
 * Combines proof types from {@link ProofTypes} with additional UI-specific options:
 * - `ProofTypes.SelfDeclaration` — ownership proof via self-declaration
 * - `ProofTypes.Screenshot` — ownership proof via screenshot upload
 * - `ProofTypes.MicroTransfer` — ownership proof via micro-transfer
 * - `'signature'` — wallet connection for ownership proof via signature
 * - `'manual-signing'` — ownership proof via manual message signing
 * - `'add-vasp'` — manually add an unlisted exchange/VASP (hosted flow)
 * - `'contact-support'` — show a contact support button
 *
 * Options are automatically filtered by flow (e.g. `add-vasp` is ignored in self-hosted).
 * Including an option implicitly enables that capability.
 *
 * @public
 */
export type SectionOption =
  | 'self-declaration' // ProofTypes.SelfDeclaration
  | 'screenshot' // ProofTypes.Screenshot
  | 'microtransfer' // ProofTypes.MicroTransfer
  | 'signature'
  | 'manual-signing'
  | 'add-vasp'
  | 'contact-support';

/**
 * Configuration for the contact support action.
 *
 * @remarks
 * Contact support is **enabled** by including `'contact-support'` in
 * `agentSections.main` or `agentSections.fallback`. This object only
 * configures the behaviour when the feature is enabled.
 *
 * - With `contactSupport: { supportUrl: "..." }` — clicking sends an info
 *   message to the host **and** attempts to open the URL as a fallback.
 * - Without `contactSupport` — clicking only sends an info message; the
 *   host decides what to do.
 *
 * @public
 */
export interface ContactSupportConfig {
  /** URL to open when the user clicks the support button */
  supportUrl: string;
}

/**
 * Explicit layout configuration for the agent selection step.
 *
 * @remarks
 * Controls which options appear in the main selection area vs. behind the
 * "Can't find what you're looking for?" fallback toggle.
 *
 * When the main section has no options (empty or all filtered out), fallback options
 * are promoted and shown inline. When the main section has only one option, a dedicated
 * single-option layout is used.
 *
 * @public
 */
export interface AgentSections {
  /** Options shown in the main selection area (always visible) */
  main?: SectionOption[];
  /** Options shown behind the "Can't find what you're looking for?" fallback toggle */
  fallback?: SectionOption[];
}

/**
 * Configuration for the terms and conditions consent checkbox.
 *
 * @remarks
 * - `undefined` or `true`: show default T&C (current behavior)
 * - `false`: hide T&C entirely
 * - `{ label?, description? }`: show with custom text (translations are the customer's responsibility)
 *
 * @public
 */
export type ConsentConfig =
  | boolean
  | {
      /** Custom label text. Replaces the default "Accept terms and conditions". */
      label?: string;
      /** Custom description text. Replaces the default sharing-info description. */
      description?: string;
    };

/**
 * Configuration options for Transaction components
 * @public
 */
export interface TransactionOptions {
  /**
   * Explicit layout configuration for the agent selection step.
   * When provided, takes precedence over legacy fields (`proofs.fallbacks`, `vasps.addUnknown`).
   */
  agentSections?: AgentSections;
  proofs?: {
    reuseProof?: boolean; // Defaults true
    microTransfer?: {
      destination: BlockchainAddress;
      amountSubunits: string;
      requireHash?: boolean; // Defaults true
    };
    fallbacks?: ProofTypes[]; // Legacy — replaced by agentSections.fallback
    deminimis?: ThresholdOptions;
  };
  jurisdiction?: string;
  allowedAgentTypes?: AgentType[]; // Defaults to All
  allowedCounterpartyTypes?: PersonType[]; // Defaults to All
  fields?: FieldTypes;
  vasps?: VASPOptions;
  /**
   * Sections of the component to leave out. Hiding `'header'` is useful when the
   * surrounding page already states what the user is being asked to do, so ours
   * would repeat or contradict it.
   */
  hide?: HideSection[];
  counterpartyAssist?: CounterpartyAssistConfig;
  contactSupport?: ContactSupportConfig; // Requires 'contact-support' in agentSections
  consent?: ConsentConfig; // Defaults to true
  autoSubmit?: boolean; // Defaults to false
  /**
   * Wallet connection behaviour.
   */
  wallets?: {
    /**
     * EXPERIMENTAL. No stability guarantee; may change or be removed in a minor release.
     *
     * Prefer a wallet's `https://` universal link over its custom scheme (for example
     * `metamask://`) when connecting a mobile wallet. Useful when embedding inside a mobile
     * in-app webview, which cannot launch another app on its own and so needs the host app
     * to handle every custom scheme it might encounter.
     *
     * Off by default. Has no effect for wallets whose registry entry declares no universal
     * link, which is most of them today. Where a wallet does declare one, this also changes
     * behaviour in an ordinary mobile browser, and a universal link can be worse there if
     * the wallet's Android app links are not verified.
     *
     * Behaviour therefore depends on the wallet and on your host app. Verify against the
     * wallets your users actually use before enabling this in production.
     *
     * @defaultValue false
     */
    experimentalPreferUniversalLinks?: boolean;
    /**
     * Restrict the mobile wallets offered over WalletConnect to this list.
     *
     * Useful when you only support a fixed set of wallets, for example because your app
     * allowlists their deep links, or because your compliance policy approves specific
     * wallets.
     *
     * Entries are WalletConnect Explorer wallet ids, 64-character hex strings. Wallet names
     * are not accepted, because the Explorer registry keys on these ids. Look them up in
     * Reown's Wallets List (https://docs.reown.com/cloud/wallets/wallet-list) or WalletGuide
     * (https://walletguide.walletconnect.network/).
     *
     * A wallet can have more than one id. Coinbase, Binance, OKX and Talisman each have two
     * Explorer listings, so list every id for a wallet or one of its listings will still be
     * offered.
     *
     * This restricts WalletConnect's own wallet list only. It does not restrict browser
     * extension wallets, does not affect hardware wallets, and does not control whether
     * WalletConnect is offered at all.
     *
     * Absent or empty means no restriction.
     *
     * @example
     * ```ts
     * // MetaMask and both Coinbase listings
     * allowedWalletConnectIds: [
     *   'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
     *   'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
     *   'd0ca99ff52b99abc48743dad0f7fc891e041be73574f7fac4afe5d4bb83845c8'
     * ]
     * ```
     */
    allowedWalletConnectIds?: string[];
  };
}
/**
 * Component Message Type enum representing different message types that can be sent
 * between the host and component.
 *
 * @remarks
 * - COMPLETE: Indicates a completed operation with response data
 * - RESIZE: Request to adjust component size/dimensions
 * - RESULT: Operation result notification
 * - READY: Component is initialized and ready
 * - INVALID: Validation failed with errors
 * - ERROR: Operation encountered an error
 * - CANCEL: Operation was cancelled
 * @public
 */
export enum CMType {
  COMPLETE = 'complete',
  RESIZE = 'resize',
  RESULT = 'result',
  READY = 'ready',
  INVALID = 'invalid',
  ERROR = 'error',
  CANCEL = 'cancel',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Represents a completed component message
 * @typeParam T - The overall Value type being returned
 * @param response - The Response object which wraps T
 * @public
 */
export type Completed<T> = {
  type: CMType.COMPLETE;
  response: TransactionResponse<T>;
};

/**
 * Represents a ready component message
 * @public
 */
export type Ready = {
  type: CMType.READY;
};

/**
 * Represents a resize request component message. This is handled by the library.
 * @internal
 */
export type ResizeRequest = {
  type: CMType.RESIZE;
  height: number;
};

/**
 * Represents an error identifier code
 * @public
 */
export enum ErrorIdentifierCode {
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  WALLET_CONNECTION_FAILED = 'WALLET_CONNECTION_FAILED',
  WALLET_NOT_SUPPORTED = 'WALLET_NOT_SUPPORTED',
  TOKEN_INVALID = 'TOKEN_INVALID',
}

/**
 * Identifier codes for warning messages
 * @public
 */
export enum WarningIdentifierCode {
  WALLET_ADDRESS_NOT_CONNECTED = 'WALLET_ADDRESS_NOT_CONNECTED',
  WALLET_LOCKED = 'WALLET_LOCKED',
  WALLET_UNREACHABLE = 'WALLET_UNREACHABLE',
  JURISDICTIONAL_REQUIREMENTS_UNAVAILABLE = 'JURISDICTIONAL_REQUIREMENTS_UNAVAILABLE',
  IDV_UNAVAILABLE = 'IDV_UNAVAILABLE',
  ASSET_NOT_FOUND = 'ASSET_NOT_FOUND',
}

/**
 * Represents an error component message
 * @param message - Error message
 * @param description - Description of the error message
 * @param identifier - Identifier code of the error message
 * @public
 */
export type Error = {
  type: CMType.ERROR;
  message: string;
  description?: string;
  identifier?: ErrorIdentifierCode;
};

/**
 * Represents a cancel component message
 * @internal
 */
export type Cancel = {
  type: CMType.CANCEL;
};

/**
 * Represents an invalid value component message
 * @typeParam T - The overall Value type being returned
 * @param value - The current Partial value
 * @param errors - Array of validation errors
 * @internal
 */
export type InvalidValue<T> = {
  type: CMType.INVALID;
  value: Partial<T>;
  errors: ValidationError[];
};

/**
 * Represents a warning component message
 * @param message - Warning message
 * @param description - Description of the warning message
 * @param identifier - Identifier code of the warning message
 * @public
 */
export type Warning = {
  type: CMType.WARNING;
  message: string;
  description?: string;
  identifier?: WarningIdentifierCode;
};

/**
 * Identifier codes for info messages
 * @public
 */
export enum InfoIdentifierCode {
  CONTACT_SUPPORT = 'CONTACT_SUPPORT',
}

/**
 * Represents an info component message
 * @param message - Info message
 * @param description - Description of the info message
 * @param identifier - Identifier code of the info message
 * @public
 */
export type Info = {
  type: CMType.INFO;
  message: string;
  description?: string;
  identifier?: InfoIdentifierCode;
};

/**
 * Union type representing all possible messages that can be sent from a component
 *
 * @remarks
 * Components communicate their state and results back to the host application
 * through these message types:
 * - Completed: Operation finished successfully with response data
 * - Cancel: User cancelled the operation
 * - Error: Operation failed with error message
 * - ResizeRequest: Component needs to adjust its dimensions
 * - InvalidValue: Validation failed with current partial value
 *
 * @typeParam T - The value type that will be returned in Completed messages
 *
 * @see {@link Completed} For successful completion message format
 * @see {@link Cancel} For cancellation message format
 * @see {@link Error} For error message format
 * @see {@link Ready} For ready message format
 * @see {@link ResizeRequest} For resize message format
 * @see {@link InvalidValue} For validation failure message format
 * @see {@link Warning} For warning message format
 * @see {@link Info} For info message format
 * @public
 */
export type ComponentMessage<T> =
  | Completed<T>
  | Cancel
  | Error
  | Ready
  | ResizeRequest
  | InvalidValue<T>
  | Warning
  | Info;

/**
 * Host Message Type enum representing different message types that can be sent
 * from the host application.
 *
 * @remarks
 * - UPDATE: Message to update component value/state
 * - REQUEST_RESPONSE: Message requesting a response from component
 * @public
 */
export enum HMType {
  UPDATE = 'update',
  REQUEST_RESPONSE = 'requestResponse',
}

/**
 * Message type for updating component state and configuration from host application
 *
 * @remarks
 * Defines the structure of update messages sent from host to component:
 * - type: Identifies this as an update message
 * - value: New partial state/data to update the component with
 * - options: Optional configuration parameters to modify component behavior
 *
 * The host can use this to dynamically update both the component's data
 * and its configuration without requiring a full reload/reinitialize.
 *
 * @typeParam T - The type of the value being updated
 * @typeParam O - The type of the optional configuration parameters
 *
 * @see {@link HMType} For message type constants
 * @see {@link HostMessage} For full host message type union
 * @public
 */
export type UpdateValue<T, O> = {
  type: HMType.UPDATE;
  value: Partial<T>;
  options?: O;
};

/**
 * Union type representing all possible messages that can be sent from the host application
 * to a component
 *
 * @remarks
 * Currently only supports update messages which allow the host to modify component
 * and configuration. The host uses these messages to communicate changes to the component
 * without requiring full reinitialization.
 *
 * @typeParam T - The value type that components operate on
 * @typeParam O - The options type used to configure component behavior
 *
 * @see {@link UpdateValue} For the structure of update messages
 * @see {@link HMType} For message type constants
 * @public
 */
export type HostMessage<T, O> = UpdateValue<T, O>;

/**
 * Options for callback and redirect URIs
 * @public
 */
export interface CallbackOptions {
  callback?: URI;
  redirectUri?: URI;
}

/**
 * Status of the ownership proof verification process
 *
 * @remarks
 * Represents the different states that an ownership proof can be in during and after verification:
 * - PENDING: Initial state where verification is in progress or awaiting processing
 * - FAILED: The proof was rejected due to failing verification checks
 * - FLAGGED: The proof requires manual review due to suspicious or unclear verification results
 * - VERIFIED: The proof has passed all verification checks successfully
 *
 * @public
 */
export enum ProofStatus {
  PENDING = 'pending', // Verification is pending
  FAILED = 'rejected', // Rejected
  FLAGGED = 'flagged', // Flagged for manual review
  VERIFIED = 'verified', // Verified
}

/**
 * Types of ownership proofs supported by the system
 *
 * @remarks
 * Supported proof types:
 * - SelfDeclaration: User self-declares ownership without cryptographic proof
 * - EIP191: Ethereum personal signature following EIP-191 standard
 * - SIWE: Sign-In with Ethereum message signature (EIP-4361)
 * - SIWX: Sign-In with X message signature
 * - SOL_SIWX: Sign-In with Solana message signature (SIWE for Solana)
 * - EIP712: Ethereum typed data signature following EIP-712 standard
 * - BIP137: Bitcoin message signature following BIP-137
 * - BIP322: Bitcoin message signature following BIP-322
 * - TIP191: Tron message signing
 * - ED25519: Ed25519 signature (used in Solana)
 * - XRP_ED25519: Ed25519 signature (used in XRP)
 * - XLM_ED25519: Ed25519 signature (used in Stellar)
 * - MicroTransfer: Proof via small blockchain transaction
 * - Screenshot: Image proof of ownership/access
 * - CIP8: Cardano message signing standard (CIP-8)
 *
 * @see {@link SignatureProof} For signature-based proofs
 * @see {@link DeclarationProof} For self-declaration proofs
 * @see {@link MicroTransferProof} For transaction-based proofs
 * @see {@link ScreenshotProof} For screenshot proofs
 * @public
 */
export enum ProofTypes {
  SelfDeclaration = 'self-declaration',
  SIWE = 'siwe',
  SIWX = 'siwx',
  SOL_SIWX = 'sol-siwx',
  EIP191 = 'eip-191',
  EIP712 = 'eip-712',
  EIP1271 = 'eip-1271',
  BIP137 = 'bip-137',
  BIP322 = 'bip-322',
  TIP191 = 'tip-191',
  ED25519 = 'ed25519',
  XRP_ED25519 = 'xrp-ed25519',
  XLM_ED25519 = 'xlm-ed25519',
  CIP8 = 'cip-8',
  COSMOS = 'cosmos-ecdsa',
  MicroTransfer = 'microtransfer',
  Screenshot = 'screenshot',
  Connect = 'connect',
  CONCORDIUM = 'concordium',
}

/**
 * Base interface for proving ownership of an account or address
 *
 * @remarks
 * TheOwnershipProof interface provides a common structure for different types of ownership verification:
 * - All proofs must specify their type from the supported ProofTypes enum
 * - Current verification status is tracked via ProofStatus
 * - Links the proof to a decentralized identifier (DID)
 * - Specifies the blockchain account/address being proven using CAIP-10 format
 *
 * This interface is extended by specific proof types like:
 * - SignatureProof for cryptographic signatures
 * - DeclarationProof for self-declarations
 * - MicroTransferProof for transaction-based proof
 * - ScreenshotProof for image-based verification
 *
 * @see {@link ProofTypes} For supported proof methods
 * @see {@link ProofStatus} For possible verification states
 * @see {@link CAIP10} For address format specification
 * @public
 */
export interface OwnershipProof {
  type: ProofTypes;
  status: ProofStatus;
  did: DID;
  address: CAIP10;
}

/**
 * Input for SIWX message signing
 * Every SIWX message must include the following fields:
 * - domain
 * - address
 * - statement
 * - uri
 * - version
 * - chainId
 *
 * Optional fields:
 * - nonce
 * - issuedAt
 * - expirationTime
 * - notBefore
 * - requestId
 * - resources
 *
 * @public
 */
export interface SIWXInput {
  domain: string;
  address: string;
  statement?: string;
  uri?: string;
  version?: string;
  chainId?: string;
  nonce?: string;
  issuedAt?: string;
  expirationTime?: string;
  notBefore?: string;
  requestId?: string;
  resources?: readonly string[];
}

/**
 * Metadata for Solana SIWX ownership proofs
 * @remarks
 * - Includes the account public key and address
 * - Includes the signed message
 * - Includes the signature
 * - Includes the message
 *
 * @see {@link SignatureProof} For signature-based proofs
 * @public
 */
export interface SolanaMetadata {
  account: {
    address: string;
    publicKey: Uint8Array;
  };
  signedMessage: Uint8Array;
  signature: Uint8Array;
  message: SIWXInput;
}

/**
 * Metadata for Cosmos ownership proofs
 * @remarks
 * - Includes the public key
 * @public
 */
export interface CosmosMetadata {
  pub_key: { type: string; value: string };
}

/**
 * Interface for signature-based ownership proofs that use cryptographic message signing
 *
 * @remarks
 * Extends the base OwnershipProface to add signature-specific properties:
 * - Supports multiple signature standards like EIP-191, EIP-712, BIP-137, SIWE
 * - Includes the cryptographic proof signature string
 * - Contains an attestation message that was signed
 * - Records which wallet provider was used for signing
 *
 * The signature proves ownership by demonstrating control of the private keys
 * associated with the claimed address.
 *
 * @see {@link ProofTypes} For supported signature types
 * @see {@link OwnershipProof} For base proof properties
 * @public
 */
export interface SignatureProof extends OwnershipProof {
  type:
    | ProofTypes.EIP191
    | ProofTypes.EIP712
    | ProofTypes.EIP1271
    | ProofTypes.BIP137
    | ProofTypes.BIP322
    | ProofTypes.ED25519
    | ProofTypes.TIP191
    | ProofTypes.SIWX
    | ProofTypes.SOL_SIWX
    | ProofTypes.SIWE
    | ProofTypes.CIP8
    | ProofTypes.XRP_ED25519
    | ProofTypes.CONCORDIUM
    | ProofTypes.XLM_ED25519
    | ProofTypes.COSMOS;

  proof: string;
  attestation: string;
  wallet_provider: string;
  xpub?: string;
  chainSpecificData?:
    | {
        cardanoCoseKey?: string; // Cardano COSE key https://cips.cardano.org/cip/CIP-0030
      }
    | SolanaMetadata
    | CosmosMetadata;
}

/**
 * Ownership Proof using Self Declaration
 * @public
 */
export interface DeclarationProof extends OwnershipProof {
  type: ProofTypes.SelfDeclaration;
  attestation: string;
  confirmed: boolean;
}

/**
 * Interface for recording that user connected their wallet.
 *
 * @remarks
 * - Records which wallet provider was used to connect
 *
 * The signature proves ownership by demonstrating control of the private keys
 * associated with the claimed address.
 *
 * @see {@link ProofTypes} For supported signature types
 * @see {@link OwnershipProof} For base proof properties
 * @public
 */
export interface ConnectionRecord extends OwnershipProof {
  type: ProofTypes.Connect;
  proof: string;
  attestation: string;
  wallet_provider: string;
}

/**
 * Ownership Proof using Micro Transfer
 * @public
 */
export interface MicroTransferProof extends OwnershipProof {
  type: ProofTypes.MicroTransfer;
  proof: string;
  chain: CAIP2;
  asset: CAIP19;
  destination: BlockchainAddress;
  amountSubunits: string;
}

/**
 * Ownership Proof using Screenshot
 * @public
 */
export interface ScreenshotProof extends OwnershipProof {
  type: ProofTypes.Screenshot;
  url: string;
}
