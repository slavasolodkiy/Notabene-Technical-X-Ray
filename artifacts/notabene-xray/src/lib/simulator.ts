/** Pure, deterministic teaching model. It performs no I/O, crypto, or settlement. */
export interface SimulationInput {
  wallet: 'hosted' | 'self-hosted';
  person: 'natural' | 'legal';
  jurisdiction: 'GB' | 'EU' | 'US' | 'SG' | 'JP';
  value: number;
  proof: 'signature' | 'satoshi' | 'screenshot' | 'self-declaration' | 'reusable' | 'third-party';
  policy: 'authorize' | 'reject' | 'flag';
  counterpartyFound: boolean;
}
export interface SimulationStep {
  id: string; title: string; state: string; description: string;
  facets: {
    actor: string;
    data: string;
    trust: string;
    codeApi: string;
    source: string;
    stateFacet: string;
    does: string;
    doesNotDo: string;
  };
  sourceUrls: string[]; artifacts: Record<string, unknown>;
}
export interface SimulationResult {
  steps: SimulationStep[]; requirements: string[]; warnings: string[]; sourceUrls: string[];
}

export const defaultInput: SimulationInput = {
  wallet: 'hosted', person: 'natural', jurisdiction: 'EU', value: 1000,
  proof: 'self-declaration', policy: 'authorize', counterpartyFound: true
};

const API = 'https://node-open-api-specs.s3.eu-central-1.amazonaws.com/openapi.json';
const WH = 'https://devx.notabene.id/docs/webhook-details';
const PII = 'https://devx.notabene.id/docs/pii-requirements.md';
const TAP = 'https://tap.rsvp';
const A = 'did:web:alice-vasp.example';
const B = 'did:web:bob-vasp.example';
const AP = 'customer:alice-company-a';
const BP = 'customer:bob-company-b';
const SRC = 'eip155:1:0xAliceSynthetic';
const DST = 'eip155:1:0xBobSynthetic';
const TX = 'sim-transfer-0001';
const PID = 'sim-policy-0001';
const uniq = (xs: string[]) => [...new Set(xs)];

type Rule = {
  display: string; currency: string; comparator: string; result: 'TRIGGERED'|'BASELINE'|'UNKNOWN';
  definition: string|null; requirements: string[]; warnings: string[]; urls: string[];
};
const baseline = [
  'Vendor PD: originator name (applicable natural/legal branch)', 'Vendor PD: originator account number',
  'Vendor PD: beneficiary name (applicable natural/legal branch)', 'Vendor PD: beneficiary account number'
];

function ruleFor(i: SimulationInput): Rule {
  if (i.jurisdiction === 'GB') {
    const on = i.value >= 1000;
    return { display: 'United Kingdom — Notabene vendor-PD illustration (EUR input)', currency: 'EUR',
      comparator: 'GB-0 and GB-1000 are published; production selector and GBP/EUR conversion UNKNOWN', result: 'UNKNOWN',
      definition: null,
      requirements: ['UNKNOWN: cannot choose GB-0 or GB-1000 from this EUR input without a supported comparator',
        ...baseline, ...(on ? ['If GB-1000 were selected: vendor PD offers one originator national ID OR geographic address OR (date AND place of birth) OR customer ID'] : [])],
      warnings: [
        'GB input is EUR solely to illustrate the public vendor index/GB-0/GB-1000 artifacts. It is not a current-law valuation.',
        'Current UK law changed on 2026-06-30: the additional-information threshold is >= GBP 800 (including apparently linked transfers), not EUR 1,000.',
        'No GBP/EUR conversion, FX source, valuation time, or vendor comparator is available here. Therefore current-law evaluation and the vendor definition selected at GBP 800 are UNKNOWN.',
        'The illustrative EUR 1,000 branch must not be treated as a compliance result.',
        'For legal persons, GB-1000 permits a national-ID branch broader than the current regulation’s customer-ID-or-specified-address alternatives.',
        'The all-executing-businesses-in-UK qualification is not modeled.'
      ],
      urls: ['https://pd.notabene.id/ivms101/v2/GB-0.json','https://pd.notabene.id/ivms101/v2/GB-1000.json','https://www.legislation.gov.uk/uksi/2017/692/regulation/64C'] };
  }
  if (i.jurisdiction === 'EU') {
    return { display: 'European Union (France FR-0 representative definition)', currency: 'EUR',
      comparator: 'all values; self-hosted control assessment only > EUR 1,000', result: 'TRIGGERED',
      definition: 'https://pd.notabene.id/ivms101/v2/FR-0.json',
      requirements: [...baseline, 'Vendor FR-0 PD: exactly one originator date AND place of birth OR customer ID OR geographic address OR national ID',
        ...(i.wallet === 'self-hosted' && i.value > 1000 ? ['Assess ownership/control of self-hosted address'] : [])],
      warnings: [
        'FR-0 is only a vendor presentation-definition illustration and must not be presented as EU compliance.',
        'EU Article 14(1)(d) requires (address including country AND official personal document number AND customer ID) OR (date AND place of birth). FR-0 instead permits a materially broader four-way pick-one.',
        'Article 14 also conjunctively requires applicable DLT/account identifiers and conditional LEI/equivalent data; those paths are not visible in FR-0 and may exist elsewhere in the transfer payload.',
        'EUR 1,000 is not a general EU Travel Rule threshold; self-hosted assessment uses >, not >=.'
      ],
      urls: ['https://pd.notabene.id/ivms101/v2/FR-0.json','https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1113'] };
  }
  if (i.jurisdiction === 'US') {
    const on = i.value >= 3000;
    return { display: 'United States', currency: 'USD', comparator: '>= USD 3,000',
      result: on ? 'TRIGGERED' : 'UNKNOWN', definition: on ? 'https://pd.notabene.id/ivms101/v2/US-3000.json' : null,
      requirements: on ? ['Originator name','Originator geographic address','Originator account number','Beneficiary name','Beneficiary account number'] : ['UNKNOWN: no public US below-threshold definition was established'],
      warnings: [on ? 'US-3000 is an IVMS implementation view, not the complete CFR record.' : 'Below USD 3,000 behavior is UNKNOWN; absence of US-0 does not mean no requirements.', 'Aggregation is unknown in the collected matrix.'],
      urls: ['https://pd.notabene.id/ivms101/v2/US-3000.json','https://www.ecfr.gov/current/title-31/subtitle-B/chapter-X/part-1010/subpart-E/section-1010.410'] };
  }
  if (i.jurisdiction === 'SG') {
    const on = i.value > 1500;
    return { display: 'Singapore', currency: 'SGD', comparator: '> SGD 1,500; lower branch <= SGD 1,500',
      result: i.value === 1500 ? 'UNKNOWN' : on ? 'TRIGGERED' : 'BASELINE', definition: i.value === 1500 ? null : `https://pd.notabene.id/ivms101/v2/SG-${on ? '1500' : '0'}.json`,
      requirements: i.value === 1500 ? ['UNKNOWN: vendor definition at the exact boundary; statutory lower branch differs from the undocumented vendor index equality rule', ...baseline] : on ? [...baseline,'Vendor PD: exactly one originator address OR national ID OR date-and-place of birth (natural person)'] : baseline,
      warnings: ['Exactly SGD 1,500 uses the lower legal branch from PSN02 “exceeds” wording.', 'Vendor-index equality is UNKNOWN; the filename does not establish >=.', 'For a legal-person originator, SG-1500 does not expose the law’s incorporation/registration date-and-place alternative; vendor PD and legal data are not equivalent.'],
      urls: ['https://pd.notabene.id/ivms101/v2/SG-0.json','https://pd.notabene.id/ivms101/v2/SG-1500.json','https://www.mas.gov.sg/-/media/annex-a8-mas-notice-psn02.pdf'] };
  }
  return { display: 'Japan — Notabene implementation view', currency: 'JPY',
    comparator: 'JP-0 artifact exists; production selector and precise legal comparator UNKNOWN', result: 'UNKNOWN',
    definition: null,
    requirements: ['UNKNOWN: JP-0 artifact does not establish its production selection or complete Japanese legal requirements', ...baseline],
    warnings: ['JP-0 is a vendor implementation view, not complete Japanese law.', 'Precise 2026 scope, comparator, reciprocity, and aggregation remain UNKNOWN.'],
    urls: ['https://pd.notabene.id/ivms101/v2/JP-0.json','https://www.fsa.go.jp/en/newsletter/weekly2023/540.html'] };
}

function person(kind: SimulationInput['person'], who: 'a'|'b') {
  const alice = who === 'a', accountNumber = [alice ? 'SIM-ACCOUNT-A' : 'SIM-ACCOUNT-B'];
  if (kind === 'natural') return { naturalPerson: {
    name: { nameIdentifier: [{ primaryIdentifier: alice ? 'Alice' : 'Bob', secondaryIdentifier: alice ? 'Company A' : 'Company B', naturalPersonNameIdentifierType: 'LEGL' }] },
    geographicAddress: [{ addressType: 'BIZZ', addressLine: ['Synthetic address'], country: alice ? 'GB' : 'SG' }],
    customerIdentification: alice ? 'SIM-ALICE' : 'SIM-BOB',
    dateAndPlaceOfBirth: { dateOfBirth: alice ? '1990-01-01' : '1991-02-02', placeOfBirth: 'Synthetic place' }
  }, accountNumber };
  return { legalPerson: {
    name: { nameIdentifier: [{ legalPersonName: alice ? 'Alice Company A' : 'Bob Company B', legalPersonNameIdentifierType: 'LEGL' }] },
    geographicAddress: [{ addressType: 'BIZZ', addressLine: ['Synthetic registered address'], country: alice ? 'GB' : 'SG' }],
    customerIdentification: alice ? 'SIM-COMPANY-A' : 'SIM-COMPANY-B',
    nationalIdentification: { nationalIdentifier: alice ? 'SIM-A-REG' : 'SIM-B-REG', nationalIdentifierType: 'RAID', countryOfIssue: alice ? 'GB' : 'SG' },
    countryOfRegistration: alice ? 'GB' : 'SG'
  }, accountNumber };
}

function ivms(kind: SimulationInput['person']) {
  return { PayloadMetadata: { payloadVersion: 'IVMS101.2023' },
    originator: { '@id': AP, originatorPerson: [person('natural','a')], accountNumber: ['SIM-ACCOUNT-A'] },
    beneficiary: { '@id': BP, beneficiaryPerson: [person(kind,'b')], accountNumber: ['SIM-ACCOUNT-B'] } };
}
function agents(wallet: SimulationInput['wallet']) {
  return [
    { '@id': SRC, role: 'SourceAddress', for: A },
    { '@id': A, role: 'VASP', for: AP },
    { '@id': DST, role: 'SettlementAddress', for: wallet === 'hosted' ? B : BP },
    ...(wallet === 'hosted' ? [{ '@id': B, role: 'VASP', for: BP }] : [])
  ];
}
function hook(message: string, payload: Record<string,unknown>) {
  return { syntheticPayload: true, message, payload, version: '1.0.0' };
}
function envelope(type: string, body: unknown) {
  return { warning: 'CONCEPTUAL DIDComm envelope — NON-CRYPTO; not encrypted, signed, packed, or base64 encoded',
    protected: '[NOT CREATED]', ciphertext: '[NOT CREATED]', recipients: [{ kid: `${B}#pii`, algorithm: '[NOT USED]' }],
    teachingBody: { id: `sim-${type.toLowerCase()}-1`, type: `https://tap.rsvp/schema/1.0#${type}`, from: A, to: [B], thid: TX, body } };
}
function proofInfo(p: SimulationInput['proof']) {
  const data: Record<typeof p,[string,string,string]> = {
    signature: ['SIGNATURE','NOT_EVALUATED','A real signature and verification would be required; neither occurred.'],
    satoshi: ['SATOSHI_TEST','NOT_EVALUATED','A real micro-transfer and confirmation would be required; who confirms it in production is UNKNOWN. Neither occurred.'],
    screenshot: ['SCREENSHOT','NOT_EVALUATED','A screenshot is review evidence, not cryptographic proof; none was collected.'],
    'self-declaration': ['SELF_DECLARATION','NOT_EVALUATED','A declaration is an assertion, not proof of wallet control; none was collected.'],
    reusable: ['REUSABLE_RELATIONSHIP','NOT_EVALUATED','A prior relationship would need to be checked; this model has no persisted records.'],
    'third-party': ['THIRD_PARTY_ATTESTATION','NOT_EVALUATED','Issuer and trust validation would be needed; no attestation was collected.']
  };
  const [type,outcome,note] = data[p];
  return { type, outcome, note, artifact: { synthetic: true, type, outcome, cryptographicallyVerified: false, evidence: '[NOT GENERATED OR COLLECTED]' } };
}

export function simulate(input: SimulationInput): SimulationResult {
  if (!Number.isFinite(input.value) || input.value <= 0) throw new Error('Value must be a finite positive number.');
  const r = ruleFor(input), pii = ivms(input.person), ag = agents(input.wallet), pr = proofInfo(input.proof);
  const unresolved = r.result === 'UNKNOWN';
  const canAuthorize = input.counterpartyFound && !unresolved && input.policy === 'authorize';
  const selectedDecision = input.policy === 'authorize' ? 'AUTHORIZED' : input.policy === 'reject' ? 'REJECTED' : 'FLAGGED';
  const decision = !input.counterpartyFound || unresolved ? 'BLOCKED' : selectedDecision;
  const created = { originator:{'@id':AP}, beneficiary:{'@id':BP}, asset:'ETH', amount:'1',
    transactionValue:{amount:String(input.value),currency:r.currency}, agents:ag, ref:'sim-a-to-b-1eth' };
  const transition = (family:string,from:string,to:string,note?:string) => ({family,from,to,note});
  const steps: SimulationStep[] = [];

  // 01 Customer instruction
  steps.push({
    id: '01-instruction', title: '01 Customer instruction', state: 'OUTGOING',
    description: 'Synthetic instruction: V2 Transact amount is a decimal asset-unit string; the manually entered fiat value is not an exchange-rate calculation.',
    facets: { actor: 'Customer / Institution UI', data: 'Asset, amount, destination', trust: 'Institution input (not authenticated here)', codeApi: 'Local teaching model', source: 'V2 OpenAPI', stateFacet: 'Illustrative instruction', does: 'Nothing in this local model', doesNotDo: 'Does not receive an actual instruction' },
    sourceUrls: [API], artifacts: { selectedInputs: { ...input }, fixedScenario: { from: 'Alice Company A', to: 'Bob Company B', asset: 'ETH', amount: '1', manualFiatEquivalent: { value: input.value, currency: r.currency } } }
  });

  // 02 Customer/entity resolution
  steps.push({
    id: '02-resolution', title: '02 Customer/entity resolution', state: 'RESOLVED',
    description: 'Illustrative customer-to-entity mapping; no institution database was accessed.',
    facets: { actor: 'Institution backend (conceptual)', data: 'Customer ID → entity DID', trust: 'Local synthetic IDs', codeApi: 'Local mapping illustration', source: 'V2 OpenAPI', stateFacet: 'Synthetic mapping', does: 'Nothing in this local model', doesNotDo: 'Does not verify real-world identity' },
    sourceUrls: [API], artifacts: { originatorEntity: AP, beneficiaryEntity: BP }
  });

  // 03 Counterparty discovery
  steps.push({
    id: '03-discovery', title: '03 Counterparty discovery', state: input.counterpartyFound ? 'ASSUMED_FOUND' : 'NOT_FOUND',
    description: input.counterpartyFound ? 'Selected scenario assumes Bob’s VASP was found; no directory query occurred.' : 'Selected scenario assumes no VASP was found; no counterparty request, authorization, or settlement follows.',
    facets: { actor: 'Network discovery (illustrative)', data: 'Address → possible VASP DID', trust: 'Unverified scenario assumption', codeApi: 'POST /address-ownership/discover (illustration)', source: 'V2 OpenAPI', stateFacet: input.counterpartyFound ? 'Assumed found' : 'Assumed not found', does: 'Public API describes discovery', doesNotDo: 'Does not authorize a transfer or prove ownership' },
    sourceUrls: [API, WH], artifacts: { rest: { syntheticExchange: true, request: '[NOT SENT]', exampleMethod: 'POST', examplePath: `/entities/${A}/address-ownership/discover`, exampleBody: { asset: 'ETH', address: DST }, assumedResult: input.counterpartyFound ? { found: true, agent: { '@id': B, role: 'VASP', for: BP } } : { found: false, agent: null }, response: null },
      webhook: input.counterpartyFound ? hook('notification.transferAgentAdded', { for: A, id: TX, agentID: B, agent: { '@id': B, role: 'VASP', for: BP } }) : null,
      transitions: [transition('scenario assumption', 'UNSELECTED', input.counterpartyFound ? 'ASSUMED_FOUND' : 'NOT_FOUND', 'Not a documented agent status transition')] }
  });

  // 04 Jurisdiction selection
  steps.push({
    id: '04-jurisdiction', title: '04 Jurisdiction selection', state: r.result,
    description: `${r.display}: this local model compares manually entered ${r.currency} against “${r.comparator}” for a vendor-PD illustration only. Production jurisdiction selection is UNKNOWN; this is not a legal compliance result.`,
    facets: { actor: 'Local rule illustration', data: 'Selected jurisdiction and manual fiat value', trust: 'Public vendor PD, not production selector', codeApi: 'Local ruleFor (no vendor call)', source: 'Vendor PD / cited law', stateFacet: r.result, does: 'Publishes example presentation definitions', doesNotDo: 'Does not provide a compliance verdict or documented production selector here' },
    sourceUrls: [PII, ...r.urls], artifacts: { jurisdiction: { code: input.jurisdiction, display: r.display, currency: r.currency, value: input.value, comparator: r.comparator, result: r.result, presentationDefinition: r.definition, interpretation: 'VENDOR_PRESENTATION_DEFINITION_ILLUSTRATION_ONLY' } }
  });

  // 05 Field requirements
  steps.push({
    id: '05-fields', title: '05 Field requirements', state: unresolved ? 'UNKNOWN' : 'REQUIRED',
    description: 'Displays selected vendor-PD fields, not an exhaustive statement of applicable legal requirements.',
    facets: { actor: 'Local PD illustration', data: 'Example IVMS101 field paths', trust: 'Published PD scope only', codeApi: 'Presentation definition (illustration)', source: 'Vendor PD / cited law', stateFacet: unresolved ? 'Unknown branch' : 'Illustrative fields', does: 'Publishes PD examples', doesNotDo: 'Does not establish all fields required by law' },
    sourceUrls: [PII, ...r.urls], artifacts: { requirements: r.requirements, warnings: r.warnings }
  });

  // 06 PII collection
  const piiPath = input.wallet === 'hosted' ? `/entities/${A}/tx/${TX}/append` : `/entities/${A}/transfers/${TX}/policies/${PID}/presentation`;
  steps.push({
    id: '06-pii', title: '06 PII collection', state: !input.counterpartyFound || unresolved ? 'NOT_SUBMITTED' : 'SYNTHETIC',
    description: 'Synthetic IVMS101 shape uses singular originatorPerson/beneficiaryPerson arrays. Bob’s person type follows the control; Alice stays natural. No PII was collected, encrypted, or submitted.',
    facets: { actor: 'Institution backend (conceptual)', data: 'Synthetic IVMS101 example', trust: 'No identity checks', codeApi: piiPath + ' (example)', source: 'V2 OpenAPI / PII guide', stateFacet: 'Not submitted', does: 'Documents managed and customer-managed PII paths', doesNotDo: 'Does not validate the truth of supplied PII' },
    sourceUrls: [API, PII, WH], artifacts: { ivms101: pii,
       requestWebhook: input.counterpartyFound && !unresolved ? hook('tap.requirePresentationRequested', { for: A, id: TX, originatorAgentID: A, beneficiaryAgentID: B, originatorPresentationDefinition: r.definition, beneficiaryPresentationDefinition: r.definition, policyId: PID, callbackUrl: piiPath, encryptionKey: input.wallet === 'self-hosted' ? '[CONCEPTUAL KEY — NOT USED]' : undefined }) : null,
       rest: { syntheticExchange: true, request: '[NOT SENT]', examplePath: piiPath, exampleBody: input.wallet === 'hosted' ? { ivms101: pii } : { ivms101: '[CIPHERTEXT NOT CREATED]' }, response: null },
      encryptedVsVisible: { mode: input.wallet === 'hosted' ? 'NOTABENE_MANAGED_ILLUSTRATION' : 'CUSTOMER_MANAGED_E2E_ILLUSTRATION' }
    }
  });

  // 07 Agent chain
  steps.push({
    id: '07-agents', title: '07 Agent chain', state: input.counterpartyFound ? 'PROPOSED' : 'UNRESOLVED',
    description: 'Proposed agent graph only; no transfer was created. Self-hosted destination does not imply a discovered beneficiary VASP.',
    facets: { actor: 'Institution / Transact (conceptual)', data: 'Proposed agent graph', trust: 'Synthetic IDs and unverified links', codeApi: 'POST /tx (example)', source: 'V2 OpenAPI', stateFacet: input.counterpartyFound ? 'Proposed' : 'Unresolved', does: 'API models agent/for relationships', doesNotDo: 'Does not prove address control' },
    sourceUrls: [API], artifacts: {
       agentForDifference: input.wallet === 'hosted' ? 'Hosted example: address → VASP → customer.' : 'Self-hosted example: address → customer; recipient VASP is not inferred from that address.',
      agents: ag,
       rest: { syntheticExchange: true, request: '[NOT SENT]', examplePath: `/entities/${A}/tx`, exampleBody: created, response: null }
    }
  });

  // 08 TAP request
  steps.push({
    id: '08-tap', title: '08 TAP request', state: input.counterpartyFound ? 'CONCEPTUAL' : 'NOT_SENT',
    description: 'Conceptual TAP Transfer illustration using a V2 decimal asset-unit amount and client transfer ref. This is not a Flow payout or V1 base-unit amount; exact generated wire payload is UNKNOWN.',
    facets: { actor: 'Transact (conceptual)', data: 'Example Transfer fields', trust: 'Conceptual schema, not validated wire message', codeApi: 'TAP illustration', source: 'TAP / V2 OpenAPI', stateFacet: 'Not sent', does: 'Documents TAP messaging', doesNotDo: 'Does not form or transmit a validated TAP message here' },
    sourceUrls: [TAP, API], artifacts: {
       tapMessage: input.counterpartyFound ? { conceptualOnly: true, notWirePayload: true, '@type': 'Transfer', ...created } : null
    }
  });

  // 09 DIDComm envelope
  steps.push({
    id: '09-didcomm', title: '09 DIDComm envelope', state: input.counterpartyFound ? 'CONCEPTUAL' : 'NOT_CREATED',
    description: 'Diagram of a possible DIDComm wrapper only; no packing, encryption, signing, or key lookup occurs.',
    facets: { actor: 'DIDComm layer (conceptual)', data: 'Unencrypted example metadata', trust: 'No keys or signature', codeApi: 'DIDComm illustration', source: 'TAP / DIDComm', stateFacet: 'Not packed', does: 'Documents encrypted message transport', doesNotDo: 'Does not encrypt, sign, or send anything in this model' },
    sourceUrls: [TAP], artifacts: { didcommEnvelope: input.counterpartyFound ? envelope('Transfer', created) : null }
  });

  // 10 Authorization
  const path = input.policy === 'authorize' ? 'authorize' : input.policy === 'reject' ? 'reject' : 'flag';
  const body = input.policy === 'authorize' ? { settlementAddress: DST } : input.policy === 'reject' ? { reason: 'POLICY', comment: 'Synthetic rejection' } : { reason: 'Synthetic review flag' };
  steps.push({
    id: '10-authorization', title: '10 Authorization (including Proof)', state: decision,
    description: decision === 'BLOCKED' ? 'No decision submitted: counterparty missing or vendor requirements UNKNOWN.' : `Selected policy outcome: ${input.policy}. Proof was not evaluated; micro-transfer confirmer in production is UNKNOWN.`,
    facets: { actor: 'Institution (conceptual)', data: 'Selected policy and unevaluated proof type', trust: 'No live compliance evaluation', codeApi: `POST /tx/:tx/${path} (example)`, source: 'V2 OpenAPI', stateFacet: decision === 'BLOCKED' ? 'Blocked before decision' : 'Illustrative decision', does: 'Documents decision endpoints', doesNotDo: 'Does not verify proof, decide policy, or authorize live funds here' },
    sourceUrls: [API, WH], artifacts: {
      proofEval: pr.artifact, proofNote: pr.note,
       rest: decision === 'BLOCKED' ? { syntheticExchange: true, request: '[NOT SENT]', response: null } : { syntheticExchange: true, request: '[NOT SENT]', exampleMethod: 'POST', examplePath: `/entities/${A}/tx/${TX}/${path}`, exampleBody: body, response: null },
       webhookRequest: decision === 'BLOCKED' ? null : hook('tap.requireAuthorizationRequested', { authorizeCallbackUrl: `/entities/${A}/tx/${TX}/authorize`, rejectCallbackUrl: `/entities/${A}/tx/${TX}/reject`, beneficiaryAgentID: B, for: A, id: TX, originatorAgentID: A, purpose: null })
    }
  });

  // 11 Webhook
  steps.push({
    id: '11-webhook', title: '11 Webhook', state: decision === 'BLOCKED' ? 'NONE' : 'CONCEPTUAL',
    description: decision === 'BLOCKED' ? 'No status-change webhook: no decision was submitted.' : 'Example event shape only; no webhook was delivered. Delivery and ordering for this scenario are UNKNOWN.',
    facets: { actor: 'Notabene webhook service (conceptual)', data: 'Example event fields', trust: 'No delivery or signature', codeApi: 'Webhook illustration', source: 'Public webhook guide', stateFacet: 'Not delivered', does: 'Documents event names and delivery mechanism', doesNotDo: 'Does not deliver an event in this local model' },
    sourceUrls: [WH], artifacts: {
      webhook: decision === 'BLOCKED' ? null : hook('notification.transferStatusChanged', { for: A, fromStatus: 'OUTGOING', id: TX, toStatus: decision }),
      satisfiedWebhook: decision === 'AUTHORIZED' ? hook('tap.requireAuthorizationSatisfied', { agentID: A, for: A, id: TX }) : null
    }
  });

  // 12 External settlement execution outside Notabene
  steps.push({
    id: '12-execution', title: '12 External settlement execution outside Notabene', state: canAuthorize ? 'AWAITING_EXTERNAL_ACTION' : 'NOT_ATTEMPTED',
    description: canAuthorize ? 'Authorization alone does not move ETH; external execution would be a separate action and was not attempted.' : `No external execution after ${decision}.`,
    facets: { actor: 'Institution / external settlement rail', data: 'No signed transaction', trust: 'No chain observation', codeApi: 'External rail (not called)', source: 'V2 API / Flow guide', stateFacet: 'Not broadcast', does: 'Coordinates transfer context; not execution in this trace', doesNotDo: 'Does not move funds in this model' },
    sourceUrls: [API], artifacts: { externalExecution: { status: 'NOT_ATTEMPTED', broadcast: false, realCrypto: false } }
  });

  // 13 Settlement evidence
  steps.push({
    id: '13-evidence', title: '13 Settlement evidence', state: 'NONE',
    description: 'No settlement ID exists: nothing was broadcast. The public API accepts settlementId, but chain-verification behavior is not established by the cited evidence.',
    facets: { actor: 'Institution (if externally settled)', data: 'No settlement ID or observed hash', trust: 'No chain verification performed', codeApi: 'POST /tx/:tx/settle (not called)', source: 'V2 OpenAPI', stateFacet: 'No evidence', does: 'Documents a settlement-reporting endpoint', doesNotDo: 'Production chain-verification behavior UNKNOWN; no verification in this model' },
    sourceUrls: [API], artifacts: {
       rest: { syntheticExchange: true, request: '[NOT SENT]', response: null, reason: 'No external settlement occurred' }
    }
  });

  // 14 Final state
  steps.push({
    id: '14-final', title: '14 Final state', state: canAuthorize ? 'AUTHORIZED_NOT_SETTLED' : decision,
    description: 'Local trace complete, not a live transaction or observed terminal network state.',
    facets: { actor: 'Local teaching model', data: 'Illustrative decision only', trust: 'No persisted network state', codeApi: 'No GET /tx call', source: 'V2 OpenAPI', stateFacet: 'Trace ended, not settled', does: 'Documents transfer statuses', doesNotDo: 'Does not archive a transaction or imply settlement' },
    sourceUrls: [API], artifacts: { final: { status: decision, statusMeaning: 'SELECTED_POLICY_NOT_OBSERVED_NETWORK_STATUS', actualSettlement: false } }
  });

  const warnings = uniq(['Educational scenario only—not legal advice or a compliance determination.',
    'Jurisdiction output illustrates public vendor presentation definitions separately from law; satisfying a displayed PD is never labeled compliant.',
    'Manual fiat equivalent only: no rate, timestamp, price source, linked-transfer aggregation, or counterparty-jurisdiction precedence is evaluated.',
    'Fixed transfer: 1 ETH, Alice Company A to Bob Company B. All IDs, PII, addresses, payloads, webhooks, proofs, and responses are synthetic.',
    'Public evidence describes a partial order; this illustrative trace is not a claimed total state machine.',
     'No network, files, credentials, persistence, encryption, signatures, proof verification, or blockchain action occurs. No synthetic request is sent.',
     'The proof choice is not a proof outcome; public evidence does not establish the production micro-transfer confirmation owner or chain-verification policy.',
     'No settlementId is reported unless an external settlement actually occurs; no such settlement occurs here.', pr.note, ...r.warnings,
    ...(!input.counterpartyFound ? ['Counterparty missing: authorization and settlement are blocked regardless of selected policy.'] : []),
    ...(input.wallet === 'self-hosted' ? ['Self-hosted agent-for links do not imply proven control.'] : [])]);
  
  return { steps, requirements: r.requirements, warnings, sourceUrls: uniq(steps.flatMap(s => s.sourceUrls)) };
}
