import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { type Agent, AgentType } from '../../types';
import { seal, unseal } from '../encryption';

// Helper to validate that two objects are deeply equal
function deepEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

describe('normal tests', () => {
  it('should correctly seal and unseal a Javascript object', async () => {
    const agent: Agent = { type: AgentType.VASP, did: 'did:web:hello.com' };
    const sealed = await seal<Agent>(agent);
    const unsealed = await unseal<Agent>(sealed);
    expect(unsealed).toEqual(agent);
  });
});
describe('seal and unseal functions with combined IV and ciphertext', () => {
  it('should correctly seal and unseal a JavaScript object', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.object(), // Generate random objects
        async (originalObject) => {
          const { ciphertext, key } =
            await seal<Record<string, unknown>>(originalObject); // Seal the object
          const unsealedObject = await unseal<Record<string, unknown>>({
            ciphertext,
            key,
          }); // Unseal the ciphertext

          // Validate that the unsealed object matches the original
          expect(deepEqual(originalObject, unsealedObject)).toBe(true);
        },
      ),
    );
  });

  it('should throw an error if the key is invalid', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.object(),
        fc.string(), // Generate a random invalid key
        async (originalObject, invalidKey) => {
          const { ciphertext } =
            await seal<Record<string, unknown>>(originalObject);

          await expect(
            unseal<Record<string, unknown>>({ ciphertext, key: invalidKey }),
          ).rejects.toThrowError();
        },
      ),
    );
  });

  it('should throw an error if the ciphertext is tampered with', async () => {
    await fc.assert(
      fc.asyncProperty(fc.object(), async (originalObject) => {
        const { ciphertext, key } =
          await seal<Record<string, unknown>>(originalObject);

        // Tamper with the ciphertext
        const tamperedCiphertext =
          ciphertext.slice(0, -1) + (ciphertext.at(-1) === 'A' ? 'B' : 'A');

        // Expect decryption to fail
        await expect(
          unseal<Record<string, unknown>>({
            ciphertext: tamperedCiphertext,
            key,
          }),
        ).rejects.toThrowError();
      }),
    );
  });
});
