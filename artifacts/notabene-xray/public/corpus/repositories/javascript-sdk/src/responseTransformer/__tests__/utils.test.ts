import { describe, expect, it } from 'vitest';
import { getCaip10ChainPrefix, getPartyId } from '../utils';

describe('getPartyId', () => {
  it('should return mailto: IRI when party has email', () => {
    expect(getPartyId({ email: 'test@example.com' })).toBe(
      'mailto:test@example.com',
    );
  });

  it('should return undefined when party has no email', () => {
    expect(getPartyId({})).toBeUndefined();
  });

  it('should return undefined when party is undefined', () => {
    expect(getPartyId(undefined)).toBeUndefined();
  });

  it('should return undefined when called with no arguments', () => {
    expect(getPartyId()).toBeUndefined();
  });
});

describe('getCaip10ChainPrefix', () => {
  it('should extract chain prefix from EIP155 CAIP-10 address', () => {
    const caip10 = 'eip155:1:0xd7914021b50a5090d3a13bb4ecae2abf014fafbd';
    const result = getCaip10ChainPrefix(caip10);
    expect(result).toBe('eip155:1');
  });

  it('should extract chain prefix from Solana CAIP-10 address', () => {
    const caip10 =
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:7kfAoE5opxrCN7rHjBNWvZQ1Fxm7vvhqZz9ZQWF8XGTo';
    const result = getCaip10ChainPrefix(caip10);
    expect(result).toBe('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp');
  });

  it('should extract chain prefix from Polygon CAIP-10 address', () => {
    const caip10 = 'eip155:137:0xd7914021b50a5090d3a13bb4ecae2abf014fafbd';
    const result = getCaip10ChainPrefix(caip10);
    expect(result).toBe('eip155:137');
  });

  it('should throw error for invalid CAIP-10 format', () => {
    expect(() => getCaip10ChainPrefix('invalid')).toThrow(
      'Invalid CAIP-10 format: "invalid". Expected format: {namespace}:{chainId}:{address}',
    );
  });

  it('should throw error for CAIP-10 with missing address', () => {
    expect(() => getCaip10ChainPrefix('eip155:1')).toThrow(
      'Invalid CAIP-10 format',
    );
  });
});
