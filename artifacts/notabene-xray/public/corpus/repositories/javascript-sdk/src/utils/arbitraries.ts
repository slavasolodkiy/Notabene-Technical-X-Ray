import fc from 'fast-check';
import type {
  Agent,
  AgentSections,
  BlockchainAddress,
  CAIP10,
  CAIP19,
  CAIP2,
  CAIP220,
  CallbackOptions,
  ConnectionOptions,
  ConnectionRequest,
  ContactSupportConfig,
  Counterparty,
  CryptoCredential,
  Deposit,
  DepositRequest,
  DepositRequestOptions,
  DID,
  FieldTypes,
  HideSection,
  ISOCurrency,
  ISODate,
  NaturalPerson,
  SectionOption,
  ThresholdOptions,
  TransactionAsset,
  TransactionOptions,
  TravelAddress,
  VASPOptions,
  VASPTrustStatus,
  Withdrawal,
} from '../types';
import { AgentType, PersonType, ProofTypes, VASPSearchControl } from '../types';
import {
  CAIP10_MATCHER,
  CAIP19_MATCHER,
  CAIP220_MATCHER,
  CAIP2_MATCHER,
} from './caip';

const LOCALE = new RegExp(/^[a-z]{2}(-[A-Z]{2})?$/);
const COMPONENT_MATCHER = /^[a-z0-9-_]+$/;

// Arbitraries
export const arbitraryCAIP10 = (): fc.Arbitrary<CAIP10> =>
  fc.stringMatching(CAIP10_MATCHER) as fc.Arbitrary<CAIP10>;

export const arbitraryCAIP2 = (): fc.Arbitrary<CAIP2> =>
  fc.stringMatching(CAIP2_MATCHER) as fc.Arbitrary<CAIP2>;

export const arbitraryCAIP19 = (): fc.Arbitrary<CAIP19> =>
  fc.stringMatching(CAIP19_MATCHER) as fc.Arbitrary<CAIP19>;

export const arbitraryCAIP220 = (): fc.Arbitrary<CAIP220> =>
  fc.stringMatching(CAIP220_MATCHER) as fc.Arbitrary<CAIP220>;

export const arbitraryLocale = (): fc.Arbitrary<string> =>
  fc.stringMatching(LOCALE) as fc.Arbitrary<string>;

// Arbitraries
export const arbitraryComponent = (): fc.Arbitrary<string> =>
  fc.stringMatching(COMPONENT_MATCHER);

export const abitraryCallbackOptions = (): fc.Arbitrary<CallbackOptions> =>
  fc.record({
    callback: fc.webUrl(),
    redirectUri: fc.webUrl(),
  });

export const arbitraryDID = (): fc.Arbitrary<DID> =>
  fc.string().map((s) => `did:ethr:${s}` as DID);

export const arbitraryBlockchainAddress = (): fc.Arbitrary<BlockchainAddress> =>
  fc.hexaString({ minLength: 40, maxLength: 40 }).map((s) => `0x${s}`);

export const arbitraryTransactionAsset = (): fc.Arbitrary<TransactionAsset> =>
  fc.oneof(
    fc.string(), // NotabeneAsset
    arbitraryCAIP19(), // CAIP19
    fc.string().map((s) => `DTI${s.slice(0, 5)}`), // DTI
  );

export const arbitraryAgent = (): fc.Arbitrary<Agent> =>
  fc.record({
    did: arbitraryDID(),
    type: fc.constantFrom(...Object.values(AgentType)),
    logo: fc.option(fc.webUrl()),
    url: fc.option(fc.webUrl()),
    name: fc.option(fc.string()),
    verified: fc.boolean(),
  });

// Generates decimal strings with 18+ fractional digits to test precision beyond float64
const arbitraryHighPrecisionDecimal = (): fc.Arbitrary<string> =>
  fc
    .tuple(
      fc.integer({ min: 0, max: 999999 }),
      fc.stringMatching(/^\d{18,24}$/),
    )
    .map(([integer, fractional]) => `${integer}.${fractional}`);

const arbitraryAmountDecimal = (): fc.Arbitrary<string | number> =>
  fc.oneof(fc.float({ min: 0, noNaN: true }), arbitraryHighPrecisionDecimal());

export const arbitraryCounterparty = (): fc.Arbitrary<Counterparty> =>
  arbitraryNaturalPerson(); // For simplicity we'll just use NaturalPerson

export const arbitraryWithdrawal = (): fc.Arbitrary<Withdrawal> =>
  fc.record({
    agent: arbitraryAgent(),
    counterparty: arbitraryCounterparty(),
    asset: arbitraryTransactionAsset(),
    amountDecimal: arbitraryAmountDecimal(),
    destination: fc.oneof(arbitraryBlockchainAddress(), arbitraryCAIP10()),
  });

export const arbitraryConnectionRequest = (): fc.Arbitrary<ConnectionRequest> =>
  fc.record({
    asset: arbitraryTransactionAsset(),
    requestId: fc.option(fc.uuid()),
    customer: fc.option(arbitraryCounterparty()),
    address: fc.option(
      fc.oneof(arbitraryBlockchainAddress(), arbitraryCAIP10()),
    ),
  });

// Helper for ISO date format
export const arbitraryISODate = (): fc.Arbitrary<ISODate> =>
  fc.date().map((d) => {
    const [year, month, day] = d.toISOString().split('T')[0].split('-');
    return `${year}-${month}-${day}` as ISODate;
  });

// Helper for ISO currency
export const arbitraryISOCurrency = (): fc.Arbitrary<ISOCurrency> =>
  fc.constantFrom('USD', 'EUR', 'GBP', 'JPY');

export const arbitraryNaturalPerson = (): fc.Arbitrary<NaturalPerson> =>
  fc.record({
    type: fc.constant(PersonType.NATURAL),
    name: fc.string(),
    accountNumber: fc.option(fc.string()),
    did: fc.option(arbitraryDID()),
    verified: fc.option(fc.boolean()),
    website: fc.option(fc.webUrl()),
    phone: fc.option(fc.string()),
    email: fc.option(fc.string()),
    dateOfBirth: fc.option(arbitraryISODate()),
    placeOfBirth: fc.option(fc.string()),
    countryOfResidence: fc.option(fc.string()),
  });

export const arbitraryTravelAddress = (): fc.Arbitrary<TravelAddress> =>
  fc.string().map((s) => `ta${s}` as TravelAddress);

export const arbitraryCryptoCredential = (): fc.Arbitrary<CryptoCredential> =>
  fc
    .tuple(fc.string(), fc.string())
    .map(([a, b]) => `${a}.${b}.mastercard` as CryptoCredential);

export const arbitraryDepositRequest = (): fc.Arbitrary<DepositRequest> =>
  fc.record({
    agent: arbitraryAgent(),
    counterparty: arbitraryCounterparty(),
    asset: arbitraryTransactionAsset(),
    amountDecimal: arbitraryAmountDecimal(),
    destination: fc.oneof(arbitraryBlockchainAddress(), arbitraryCAIP10()),
    travelAddress: fc.option(arbitraryTravelAddress()),
    cryptoCredential: fc.option(arbitraryCryptoCredential()),
  });

// Options arbitraries
export const arbitraryThresholdOptions = (): fc.Arbitrary<ThresholdOptions> =>
  fc.record({
    threshold: fc.float(),
    currency: arbitraryISOCurrency(),
    proofTypes: fc.option(
      fc.array(fc.constantFrom(...Object.values(ProofTypes))),
    ),
  });

export const arbitraryFieldTypes = (): fc.Arbitrary<FieldTypes> =>
  fc.record({
    naturalPerson: fc.option(
      fc.dictionary(
        fc.string(),
        fc.oneof(
          fc.boolean(),
          fc.record({
            optional: fc.boolean(),
            transmit: fc.boolean(),
          }),
        ),
      ),
    ),
    legalPerson: fc.option(
      fc.dictionary(
        fc.string(),
        fc.oneof(
          fc.boolean(),
          fc.record({
            optional: fc.boolean(),
            transmit: fc.boolean(),
          }),
        ),
      ),
    ),
  });

export const arbitraryVASPOptions = (): fc.Arbitrary<VASPOptions> =>
  fc.oneof(
    fc.record({
      addUnknown: fc.option(fc.boolean(), { nil: undefined }),
      onlyActive: fc.option(fc.boolean(), { nil: undefined }),
      searchable: fc.option(
        fc.array(
          fc.constantFrom(VASPSearchControl.ALLOWED, VASPSearchControl.PENDING),
        ),
        { nil: undefined },
      ),
    }),
    fc.record({
      addUnknown: fc.option(fc.boolean(), { nil: undefined }),
      onlyActive: fc.option(fc.boolean(), { nil: undefined }),
      showTrustStatus: fc.option(
        fc.array(
          fc.constantFrom<VASPTrustStatus>(
            'TRUSTED',
            'NEW',
            'FLAGGED',
            'BANNED',
          ),
        ),
        { nil: undefined },
      ),
    }),
  );

const SECTION_OPTIONS: SectionOption[] = [
  'self-declaration',
  'screenshot',
  'microtransfer',
  'signature',
  'manual-signing',
  'add-vasp',
  'contact-support',
];

export const arbitrarySectionOption = (): fc.Arbitrary<SectionOption> =>
  fc.constantFrom(...SECTION_OPTIONS);

export const arbitraryAgentSections = (): fc.Arbitrary<AgentSections> =>
  fc.record({
    main: fc.option(fc.array(arbitrarySectionOption())),
    fallback: fc.option(fc.array(arbitrarySectionOption())),
  });

export const arbitraryContactSupportConfig =
  (): fc.Arbitrary<ContactSupportConfig> =>
    fc.record({
      supportUrl: fc.webUrl(),
    });

export const arbitraryTransactionOptions =
  (): fc.Arbitrary<TransactionOptions> =>
    fc.record({
      agentSections: fc.option(arbitraryAgentSections()),
      proofs: fc.option(
        fc.record({
          microTransfer: fc.option(
            fc.record({
              destination: arbitraryBlockchainAddress(),
              amountSubunits: fc.string(),
              requireHash: fc.option(fc.boolean()),
            }),
          ),
          fallbacks: fc.option(
            fc.array(fc.constantFrom(...Object.values(ProofTypes))),
          ),
          deminimis: fc.option(arbitraryThresholdOptions()),
        }),
      ),
      allowedAgentTypes: fc.option(
        fc.array(fc.constantFrom(...Object.values(AgentType))),
      ),
      allowedCounterpartyTypes: fc.option(
        fc.array(fc.constantFrom(...Object.values(PersonType))),
      ),
      fields: fc.option(arbitraryFieldTypes()),
      vasps: fc.option(arbitraryVASPOptions()),
      hide: fc.option(
        fc.array(
          fc.constantFrom<HideSection>(
            'asset',
            'destination',
            'counterparty',
            'agent',
            'header',
          ),
        ),
      ),
      contactSupport: fc.option(arbitraryContactSupportConfig()),
    });

export const arbitraryDepositRequestOptions =
  (): fc.Arbitrary<DepositRequestOptions> =>
    fc.record({
      showQrCode: fc.option(fc.boolean()),
    });

export const arbitraryConnectionOptions =
  (): fc.Arbitrary<ConnectionOptions> => {
    const transactionOptions = arbitraryTransactionOptions();
    return fc.record({
      proofs: transactionOptions.map((opt) => opt.proofs),
    });
  };

export const arbitraryDeposit = (): fc.Arbitrary<Deposit> =>
  fc.record({
    agent: arbitraryAgent(),
    counterparty: arbitraryCounterparty(),
    asset: arbitraryTransactionAsset(),
    amountDecimal: arbitraryAmountDecimal(),
    origin: fc.oneof(arbitraryBlockchainAddress(), arbitraryCAIP10()),
    source: fc.oneof(arbitraryBlockchainAddress(), arbitraryCAIP10()),
  });
