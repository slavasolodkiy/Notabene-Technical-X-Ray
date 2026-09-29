import assert from 'node:assert/strict';
import { test } from 'node:test';
import { defaultInput, simulate, type SimulationInput } from './simulator.ts';

const wallets: SimulationInput['wallet'][] = ['hosted', 'self-hosted'];
const people: SimulationInput['person'][] = ['natural', 'legal'];
const jurisdictions: SimulationInput['jurisdiction'][] = ['GB', 'EU', 'US', 'SG', 'JP'];
const proofs: SimulationInput['proof'][] = ['signature', 'satoshi', 'screenshot', 'self-declaration', 'reusable', 'third-party'];
const policies: SimulationInput['policy'][] = ['authorize', 'reject', 'flag'];
const values = [0.01, 799, 800, 999.99, 1000, 1000.01, 1500, 1500.01, 2999.99, 3000];
const facetKeys = ['actor', 'data', 'trust', 'codeApi', 'source', 'stateFacet', 'does', 'doesNotDo'];

test('all scenario controls, thresholds and branch outcomes remain deterministic and local', () => {
  let count = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (() => { throw new Error('Simulation attempted a network call'); }) as typeof fetch;
  try {
    for (const wallet of wallets) for (const person of people) for (const jurisdiction of jurisdictions)
      for (const proof of proofs) for (const policy of policies) for (const counterpartyFound of [true, false])
        for (const value of values) {
          const input: SimulationInput = { wallet, person, jurisdiction, proof, policy, counterpartyFound, value };
          const result = simulate(input);
          assert.deepEqual(result, simulate(input));
          assert.equal(result.steps.length, 14);
          assert.equal(new Set(result.steps.map(s => s.id)).size, 14);
          for (const step of result.steps) {
            for (const key of facetKeys) assert.ok(step.facets[key as keyof typeof step.facets]?.trim(), `${step.id} ${key}`);
            assert.ok(step.sourceUrls.every(url => url.startsWith('https://')));
          }
          const byId = (id: string) => result.steps.find(s => s.id.startsWith(id))!;
          const rule = byId('04').artifacts.jurisdiction as { result: string; presentationDefinition: string | null };
          const blocked = !counterpartyFound || rule.result === 'UNKNOWN';
          const decision = blocked ? 'BLOCKED' : policy === 'authorize' ? 'AUTHORIZED' : policy === 'reject' ? 'REJECTED' : 'FLAGGED';
          assert.equal(byId('10').state, decision);
          assert.equal(byId('11').state, blocked ? 'NONE' : 'CONCEPTUAL');
          assert.equal(byId('12').state, decision === 'AUTHORIZED' ? 'AWAITING_EXTERNAL_ACTION' : 'NOT_ATTEMPTED');
          assert.equal(byId('13').state, 'NONE');
          assert.equal(byId('14').state, decision === 'AUTHORIZED' ? 'AUTHORIZED_NOT_SETTLED' : decision);
          assert.equal((byId('14').artifacts.final as { actualSettlement: boolean }).actualSettlement, false);
          assert.equal((byId('13').artifacts.rest as { request: string }).request, '[NOT SENT]');
          assert.equal((byId('10').artifacts.rest as { request: string }).request, '[NOT SENT]');
          assert.equal((byId('07').artifacts.rest as { request: string }).request, '[NOT SENT]');
          assert.equal((byId('06').artifacts.rest as { request: string }).request, '[NOT SENT]');
          assert.equal((byId('03').artifacts.rest as { request: string }).request, '[NOT SENT]');
          assert.equal((byId('06').artifacts.ivms101 as any).beneficiary.beneficiaryPerson[0][person === 'legal' ? 'legalPerson' : 'naturalPerson'] !== undefined, true);
          assert.equal((byId('10').artifacts.proofEval as { outcome: string }).outcome, 'NOT_EVALUATED');
          if (!counterpartyFound) {
            assert.equal(byId('06').artifacts.requestWebhook, null);
            assert.equal(byId('08').artifacts.tapMessage, null);
            assert.equal(byId('09').artifacts.didcommEnvelope, null);
            assert.equal(byId('10').artifacts.webhookRequest, null);
          }
          if (jurisdiction === 'GB' || jurisdiction === 'JP' || (jurisdiction === 'SG' && value === 1500) || (jurisdiction === 'US' && value < 3000)) {
            assert.equal(rule.result, 'UNKNOWN');
            assert.equal(rule.presentationDefinition, null);
          }
          if (jurisdiction === 'EU') assert.equal(rule.result, 'TRIGGERED');
          if (jurisdiction === 'SG' && value !== 1500) assert.equal(rule.result, value > 1500 ? 'TRIGGERED' : 'BASELINE');
          count++;
        }
    assert.equal(count, 7200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('invalid fiat values are rejected before trace construction', () => {
  for (const value of [0, -1, NaN, Infinity, -Infinity]) {
    assert.throws(() => simulate({ ...defaultInput, value }), /finite positive number/);
  }
});

test('V2 transfer illustration does not label its amount V1 or its ref a payout ref', () => {
  const trace = simulate(defaultInput);
  const tap = trace.steps[7];
  assert.equal((tap.artifacts.tapMessage as { amount: string; ref: string }).amount, '1');
  assert.match(tap.description, /V2 decimal asset-unit amount/);
  assert.doesNotMatch(tap.description, /using V1 amount|string and payout ref/);
  assert.match(trace.steps[12].description, /chain-verification behavior is not established/);
});