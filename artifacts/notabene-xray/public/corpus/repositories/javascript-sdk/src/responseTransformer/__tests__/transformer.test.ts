import { describe, expect, it } from 'vitest';
import type { OriginatorV2 } from '../../ivms/v2Types';
import type { Deposit, TransactionResponse, Withdrawal } from '../../types';
import { PersonType } from '../../types';
import {
  componentResponseToTxRequests,
  enrichConfig,
  uuid,
} from '../transformer';

// Common test constants
const TEST_DELEGATE_TOKEN = 'test-delegate-token';
const TEST_ORIGINATOR_ID = 'did:test:originator-id';
const TEST_BENEFICIARY_ID = 'did:test:beneficiary-id';

const TEST_ADDRESS = '0xd7914021b50a5090d3a13bb4ecae2abf014fafbd';
const TEST_ADDRESS_DID = `did:pkh:eip155:1:${TEST_ADDRESS}`;
const TEST_ASSET = 'eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

const ORIGINATOR_VASP_DID =
  'did:ethr:0x7c546f3df830a3e0a63de13d4ae32d64f26e74b2';
const BENEFICIARY_VASP_DID =
  'did:ethr:0x54b75d2a0925508682e65194cccb6f1e8eaafb2c';

const DEPOSIT_TX_ID = 'b638210e-b99d-4bd3-afaa-6c9b5362f944';

// Common proof object for self-declaration
const selfDeclarationProof = {
  type: 'self-declaration',
  did: TEST_ADDRESS_DID,
  address: `eip155:1:${TEST_ADDRESS}`,
  attestation: `I hereby declare that the beneficiary blockchain address ${TEST_ADDRESS} belongs to the beneficiary.`,
  confirmed: true,
  status: 'verified',
};

// Common geographic address
const geographicAddress = {
  addressType: 'GEOG',
  townName: 'Test Town',
  addressLine: ['123 Test Street'],
  country: 'AF',
};

// Common national identification
const nationalIdentification = {
  nationalIdentifier: 'adfsdff',
  nationalIdentifierType: 'IDCD',
  countryOfIssue: 'AQ',
};

// Common account object
const testAccount = {
  caip10: `eip155:1:${TEST_ADDRESS}`,
  blockchainAddress: TEST_ADDRESS,
  chain: 'eip155:1',
  did: TEST_ADDRESS_DID,
  valid: true,
};

// Common wallet agent
const walletAgent = {
  type: 'WALLET',
  verified: true,
  did: TEST_ADDRESS_DID,
};

// NOTE: These responses are examples from GoodbyeFiat.
// We need to cast the type as it is missing requestID which is required by the TransactionResponse type.
const depositResponse = {
  proof: selfDeclarationProof,
  txUpdate: {
    originatorProof: selfDeclarationProof,
    transactionAsset: { caip19: TEST_ASSET },
    transactionAmount: '10000000000',
    originatorEqualsBeneficiary: false,
    beneficiaryVASPdid: BENEFICIARY_VASP_DID,
    beneficiary: {},
    originator: {
      originatorPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                {
                  primaryIdentifier: 'Doe',
                  secondaryIdentifier: 'Jane',
                  nameIdentifierType: 'LEGL',
                },
              ],
            },
            geographicAddress: [geographicAddress],
          },
        },
      ],
    },
    transactionId: DEPOSIT_TX_ID,
  },
  errors: [],
  status: 'pending',
  valid: true,
  value: {
    source: TEST_ADDRESS,
    amountDecimal: 10000,
    asset: TEST_ASSET,
    transactionId: DEPOSIT_TX_ID,
    customer: { type: 'natural', name: 'Jane Doe' },
    agent: walletAgent,
    account: testAccount,
    counterparty: {
      type: 'natural',
      name: 'Jane Doe',
      verified: false,
      geographicAddress,
    },
  },
  ivms101: {
    originator: {
      originatorPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                {
                  primaryIdentifier: 'Doe',
                  secondaryIdentifier: 'Jane',
                  nameIdentifierType: 'LEGL',
                },
              ],
            },
            geographicAddress: [geographicAddress],
          },
        },
      ],
    },
  },
} as unknown as TransactionResponse<Deposit>;

const withdrawalResponse = {
  proof: selfDeclarationProof,
  txCreate: {
    beneficiaryProof: selfDeclarationProof,
    transactionAsset: { caip19: TEST_ASSET },
    transactionAmount: '100000000000',
    originatorEqualsBeneficiary: false,
    originatorVASPdid: ORIGINATOR_VASP_DID,
    beneficiary: {
      beneficiaryPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                {
                  primaryIdentifier: 'Doe',
                  secondaryIdentifier: 'Jane',
                  nameIdentifierType: 'LEGL',
                },
              ],
            },
            geographicAddress: [geographicAddress],
            nationalIdentification,
            countryOfResidence: 'AF',
            dateAndPlaceOfBirth: {
              dateOfBirth: '2025-12-02',
              placeOfBirth: 'Somewhere',
            },
          },
        },
      ],
    },
  },
  errors: [],
  status: 'pending',
  valid: true,
  value: {
    destination: TEST_ADDRESS,
    asset: TEST_ASSET,
    customer: { type: 'natural', name: 'John', email: 'test@gmail.com' },
    amountDecimal: 100000,
    counterparty: {
      type: 'natural',
      name: 'Jane Doe',
      verified: false,
      website: 'http://www.janedoe.com',
      email: 'jane@doe.com',
      phone: '23423432',
      dateOfBirth: '2025-12-02',
      placeOfBirth: 'Somewhere',
      countryOfResidence: 'AF',
      geographicAddress,
      nationalIdentification,
    },
    account: testAccount,
    agent: walletAgent,
  },
  ivms101: {
    beneficiary: {
      beneficiaryPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                {
                  primaryIdentifier: 'Doe',
                  secondaryIdentifier: 'Jane',
                  nameIdentifierType: 'LEGL',
                },
              ],
            },
            geographicAddress: [geographicAddress],
            nationalIdentification,
            countryOfResidence: 'AF',
            dateAndPlaceOfBirth: {
              dateOfBirth: '2025-12-02',
              placeOfBirth: 'Somewhere',
            },
          },
        },
      ],
    },
  },
} as unknown as TransactionResponse<Withdrawal>;

const withdrawalSelfVaspResponse = {
  txCreate: {
    transactionAsset: { caip19: TEST_ASSET },
    transactionAmount: '10000000000',
    originatorEqualsBeneficiary: true,
    originatorVASPdid: ORIGINATOR_VASP_DID,
    beneficiaryVASPdid: BENEFICIARY_VASP_DID,
    beneficiaryVASPname: 'Beneficiary VASP Inc',
    beneficiary: {
      beneficiaryPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                { primaryIdentifier: 'John', nameIdentifierType: 'LEGL' },
              ],
            },
          },
        },
      ],
    },
  },
  errors: [],
  status: 'pending',
  valid: true,
  value: {
    destination: TEST_ADDRESS,
    asset: TEST_ASSET,
    customer: { type: 'natural', name: 'John', email: 'test@gmail.com' },
    amountDecimal: 10000,
    agent: {
      name: 'Beneficiary VASP Inc',
      did: BENEFICIARY_VASP_DID,
      jurisdictions: null,
      logo: null,
      type: 'VASP',
    },
    counterparty: {
      type: 'self',
      name: 'John',
      email: 'test@gmail.com',
      did: 'did:key:z6Mkimok1nXUmbMeGGQ4cgJMMGPiWn9yYyappc9YenKTLqgf',
      verified: true,
    },
    account: testAccount,
  },
  ivms101: {
    beneficiary: {
      beneficiaryPersons: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                { primaryIdentifier: 'John', nameIdentifierType: 'LEGL' },
              ],
            },
          },
        },
      ],
    },
  },
} as unknown as TransactionResponse<Withdrawal>;

describe('componentResponseToTxRequests', () => {
  it('should transform a deposit response using txUpdate', () => {
    const result = componentResponseToTxRequests(
      depositResponse,
      TEST_DELEGATE_TOKEN,
      {
        originatorId: TEST_ORIGINATOR_ID,
        beneficiaryId: TEST_BENEFICIARY_ID,
      },
    );

    expect(result).toEqual({
      createTx: {
        originator: { '@id': TEST_ORIGINATOR_ID },
        beneficiary: { '@id': TEST_BENEFICIARY_ID },
        asset: TEST_ASSET,
        amount: '10000',
        agents: [
          {
            '@id': BENEFICIARY_VASP_DID,
            for: TEST_BENEFICIARY_ID,
            role: 'VASP',
          },
          {
            '@id': TEST_ADDRESS_DID,
            for: TEST_ORIGINATOR_ID,
            role: 'SourceAddress',
          },
        ],
        ref: DEPOSIT_TX_ID,
      },
      ivms101: {
        ivms101: {
          originator: {
            originatorPerson: [
              {
                naturalPerson: {
                  name: {
                    nameIdentifier: [
                      {
                        primaryIdentifier: 'Doe',
                        secondaryIdentifier: 'Jane',
                        naturalPersonNameIdentifierType: 'LEGL',
                      },
                    ],
                  },
                  geographicAddress: [geographicAddress],
                },
                legalPerson: undefined,
                accountNumber: [TEST_ADDRESS],
              },
            ],
          },
          beneficiary: undefined,
        },
      },
      confirmRelationship: { proof: selfDeclarationProof },
    });
  });

  it('should transform a deposit response with source array and settlementAddress', () => {
    const depositWithSourceArray = {
      ...depositResponse,
      value: {
        ...depositResponse.value,
        source: [TEST_ADDRESS_DID, 'did:pkh:eip155:1:0xsecondaddress'],
      },
    } as unknown as TransactionResponse<Deposit>;

    const settlementAddress = '0xsettlementaddress123';

    const result = componentResponseToTxRequests(
      depositWithSourceArray,
      TEST_DELEGATE_TOKEN,
      {
        originatorId: TEST_ORIGINATOR_ID,
        beneficiaryId: TEST_BENEFICIARY_ID,
        settlementAddress,
      },
    );

    expect(result.createTx.agents).toEqual([
      {
        '@id': BENEFICIARY_VASP_DID,
        for: TEST_BENEFICIARY_ID,
        role: 'VASP',
      },
      {
        '@id': TEST_ADDRESS_DID,
        for: TEST_ORIGINATOR_ID,
        role: 'SourceAddress',
      },
      {
        '@id': `did:pkh:eip155:1:${settlementAddress}`,
        for: BENEFICIARY_VASP_DID,
        role: 'SettlementAddress',
      },
    ]);
  });

  it('should transform a withdrawal response using txCreate', () => {
    const result = componentResponseToTxRequests(
      withdrawalResponse,
      TEST_DELEGATE_TOKEN,
      {
        originatorId: TEST_ORIGINATOR_ID,
        beneficiaryId: TEST_BENEFICIARY_ID,
      },
    );

    expect(result).toEqual({
      createTx: {
        originator: { '@id': TEST_ORIGINATOR_ID },
        beneficiary: { '@id': TEST_BENEFICIARY_ID },
        asset: TEST_ASSET,
        amount: '100000',
        agents: [
          { '@id': ORIGINATOR_VASP_DID, for: TEST_ORIGINATOR_ID, role: 'VASP' },
          {
            '@id': TEST_ADDRESS_DID,
            for: TEST_BENEFICIARY_ID,
            role: 'SettlementAddress',
          },
        ],
        ref: expect.any(String),
      },
      ivms101: {
        ivms101: {
          originator: undefined,
          beneficiary: {
            beneficiaryPerson: [
              {
                naturalPerson: {
                  name: {
                    nameIdentifier: [
                      {
                        primaryIdentifier: 'Doe',
                        secondaryIdentifier: 'Jane',
                        naturalPersonNameIdentifierType: 'LEGL',
                      },
                    ],
                  },
                  geographicAddress: [geographicAddress],
                  nationalIdentification,
                  countryOfResidence: 'AF',
                  dateAndPlaceOfBirth: {
                    dateOfBirth: '2025-12-02',
                    placeOfBirth: 'Somewhere',
                  },
                },
                legalPerson: undefined,
                accountNumber: [TEST_ADDRESS],
              },
            ],
          },
        },
      },
      confirmRelationship: { proof: selfDeclarationProof },
    });
  });

  it('should transform a self-transfer withdrawal with VASP agent and use originator data for beneficiary', () => {
    const originatorData: OriginatorV2 = {
      originatorPerson: [
        {
          naturalPerson: {
            name: {
              nameIdentifier: [
                {
                  primaryIdentifier: 'Smith',
                  secondaryIdentifier: 'John',
                  naturalPersonNameIdentifierType: 'LEGL',
                },
              ],
            },
          },
          accountNumber: [TEST_ORIGINATOR_ID],
        },
      ],
    };

    const result = componentResponseToTxRequests(
      withdrawalSelfVaspResponse,
      TEST_DELEGATE_TOKEN,
      {
        originatorId: TEST_ORIGINATOR_ID,
        beneficiaryId: TEST_BENEFICIARY_ID,
        originator: originatorData,
      },
    );

    // No confirmRelationship since there's no proof (VASP agent, not wallet)
    expect(result.confirmRelationship).toBeUndefined();

    expect(result).toEqual({
      createTx: {
        originator: { '@id': TEST_ORIGINATOR_ID },
        beneficiary: { '@id': TEST_BENEFICIARY_ID },
        asset: TEST_ASSET,
        amount: '10000',
        agents: [
          { '@id': ORIGINATOR_VASP_DID, for: TEST_ORIGINATOR_ID, role: 'VASP' },
          {
            '@id': BENEFICIARY_VASP_DID,
            for: TEST_BENEFICIARY_ID,
            role: 'VASP',
          },
          {
            '@id': TEST_ADDRESS_DID,
            for: BENEFICIARY_VASP_DID,
            role: 'SettlementAddress',
          },
        ],
        ref: expect.any(String),
      },
      ivms101: {
        ivms101: {
          originator: originatorData,
          // For self-transfers, beneficiary uses the same originator data
          beneficiary: { beneficiaryPerson: originatorData.originatorPerson },
        },
      },
    });
  });
});

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('uuid', () => {
  it('should return a valid UUID v4 format', () => {
    const result = uuid();
    expect(result).toMatch(UUID_REGEX);
  });

  it('should return unique values on each call', () => {
    const results = new Set(Array.from({ length: 100 }, () => uuid()));
    expect(results.size).toBe(100);
  });

  it('should always have version 4 indicator', () => {
    for (let i = 0; i < 50; i++) {
      const result = uuid();
      expect(result[14]).toBe('4');
    }
  });

  it('should always have a valid variant nibble (8, 9, a, or b)', () => {
    for (let i = 0; i < 50; i++) {
      const result = uuid();
      expect('89ab').toContain(result[19]);
    }
  });
});

describe('enrichConfig', () => {
  const CUSTOMER_DID = 'did:key:customer123';
  const SOURCE_ADDRESS = '0xsource123';
  const DESTINATION_ADDRESS = '0xdest456';

  // Create a valid JWT token with the given sub claim
  // JWT format: header.payload.signature (signature not verified by decodeJwt)
  function createDelegateToken(sub: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ sub, iat: Date.now() }));
    return `${header}.${payload}.fake-signature`;
  }

  describe('withdrawal transactions', () => {
    it('should extract originatorId from delegate token and fall back to urn:uuid for beneficiaryId', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const withdrawal = {
        destination: DESTINATION_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Withdrawal;

      const result = enrichConfig({}, delegateToken, withdrawal);

      expect(result.originatorId).toBe(CUSTOMER_DID);
      expect(result.beneficiaryId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
    });

    it('should set beneficiaryId equal to originatorId for self-transfers', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const withdrawal = {
        destination: DESTINATION_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
        counterparty: { type: PersonType.SELF },
      } as Withdrawal;

      const result = enrichConfig({}, delegateToken, withdrawal);

      expect(result.originatorId).toBe(CUSTOMER_DID);
      expect(result.beneficiaryId).toBe(CUSTOMER_DID);
    });

    it('should not override provided config values', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const withdrawal = {
        destination: DESTINATION_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Withdrawal;

      const result = enrichConfig(
        {
          originatorId: TEST_ORIGINATOR_ID,
          beneficiaryId: TEST_BENEFICIARY_ID,
        },
        delegateToken,
        withdrawal,
      );

      expect(result.originatorId).toBe(TEST_ORIGINATOR_ID);
      expect(result.beneficiaryId).toBe(TEST_BENEFICIARY_ID);
    });
  });

  describe('deposit transactions', () => {
    it('should extract beneficiaryId from delegate token and fall back to urn:uuid for originatorId', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const deposit = {
        source: SOURCE_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Deposit;

      const result = enrichConfig({}, delegateToken, deposit);

      expect(result.beneficiaryId).toBe(CUSTOMER_DID);
      expect(result.originatorId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
    });

    it('should set originatorId equal to beneficiaryId for self-transfers', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const deposit = {
        source: SOURCE_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
        counterparty: { type: PersonType.SELF },
      } as Deposit;

      const result = enrichConfig({}, delegateToken, deposit);

      expect(result.beneficiaryId).toBe(CUSTOMER_DID);
      expect(result.originatorId).toBe(CUSTOMER_DID);
    });

    it('should not override provided config values', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const deposit = {
        source: SOURCE_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Deposit;

      const result = enrichConfig(
        {
          originatorId: TEST_ORIGINATOR_ID,
          beneficiaryId: TEST_BENEFICIARY_ID,
        },
        delegateToken,
        deposit,
      );

      expect(result.originatorId).toBe(TEST_ORIGINATOR_ID);
      expect(result.beneficiaryId).toBe(TEST_BENEFICIARY_ID);
    });
  });

  it('should handle invalid delegate token gracefully', () => {
    const withdrawal = {
      destination: DESTINATION_ADDRESS,
      asset: TEST_ASSET,
      amountDecimal: 100,
    } as Withdrawal;

    const result = enrichConfig({}, 'invalid-token', withdrawal);

    expect(result.originatorId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
    expect(result.beneficiaryId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
  });

  describe('UUID fallback', () => {
    it('should generate a valid urn:uuid for missing beneficiaryId', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const withdrawal = {
        destination: DESTINATION_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Withdrawal;

      const result = enrichConfig({}, delegateToken, withdrawal);

      expect(result.originatorId).toBe(CUSTOMER_DID);
      expect(result.beneficiaryId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
    });

    it('should generate a valid urn:uuid for missing originatorId', () => {
      const delegateToken = createDelegateToken(CUSTOMER_DID);
      const deposit = {
        source: SOURCE_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Deposit;

      const result = enrichConfig({}, delegateToken, deposit);

      expect(result.beneficiaryId).toBe(CUSTOMER_DID);
      expect(result.originatorId).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
    });

    it('should generate unique UUIDs for each call', () => {
      const withdrawal = {
        destination: DESTINATION_ADDRESS,
        asset: TEST_ASSET,
        amountDecimal: 100,
      } as Withdrawal;

      const result1 = enrichConfig({}, 'invalid-token', withdrawal);
      const result2 = enrichConfig({}, 'invalid-token', withdrawal);

      expect(result1.beneficiaryId).not.toBe(result2.beneficiaryId);
      expect(result1.originatorId).not.toBe(result2.originatorId);
    });
  });
});
