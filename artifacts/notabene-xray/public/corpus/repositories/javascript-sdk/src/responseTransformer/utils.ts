import { CAIP10Schema } from '@taprsvp/types';
import type {
  NaturalPersonName,
  NaturalPersonNameV2,
  Person,
  PersonV2,
} from '../ivms';
import type { Deposit, Withdrawal } from '../types';

export function isDeposit(
  transaction: Withdrawal | Deposit,
): transaction is Deposit {
  return (transaction as Deposit).source !== undefined;
}

export function isWithdrawal(
  transaction: Withdrawal | Deposit,
): transaction is Withdrawal {
  return !isDeposit(transaction);
}

/**
 * Resolves a party's IRI identifier from their email, if available.
 */
export function getPartyId(party?: {
  email?: string;
}): `${string}:${string}` | undefined {
  if (party?.email) {
    return `mailto:${party.email}`;
  }
  return undefined;
}

/**
 * Converts NaturalPersonName from V1 format to V2 format
 * Changes the nameIdentifierType field name to naturalPersonNameIdentifierType
 */
export function convertNaturalPersonNameToV2(
  name: NaturalPersonName,
): NaturalPersonNameV2 {
  const { nameIdentifier, ...rest } = name;
  return {
    ...rest,
    nameIdentifier: nameIdentifier?.map(({ nameIdentifierType, ...rest }) => ({
      ...rest,
      naturalPersonNameIdentifierType: nameIdentifierType,
    })),
  };
}

/**
 * Converts a Person from V1 format to V2 format
 * Applies deep conversion to natural person names and adds account number
 */
export function convertPersonToV2(
  person: Person,
  accountNumber: string,
): PersonV2 {
  return {
    naturalPerson: person.naturalPerson
      ? {
          ...person.naturalPerson,
          name: convertNaturalPersonNameToV2(person.naturalPerson.name),
        }
      : undefined,
    legalPerson: person.legalPerson,
    accountNumber: [accountNumber],
  };
}

/**
 * Extracts the chain prefix ({namespace}:{chainId}) from a CAIP-10 address
 * @param caip10Address - An address in the format {namespace}:{chainId}:{address}
 * @returns The chain prefix (e.g., eip155:1)
 * @throws Error if the address is not in valid CAIP-10 format
 *
 * @example
 * getCaip10ChainPrefix('eip155:1:0x123...') // returns 'eip155:1'
 * getCaip10ChainPrefix('solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:7kfAoE5o...') // returns 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
 */
export function getCaip10ChainPrefix(caip10Address: string): string {
  const result = CAIP10Schema.safeParse(caip10Address);
  if (!result.success) {
    throw new Error(
      `Invalid CAIP-10 format: "${caip10Address}". Expected format: {namespace}:{chainId}:{address}`,
    );
  }

  // Extract chain (namespace:chainId) by removing the last segment (address)
  const lastColonIndex = caip10Address.lastIndexOf(':');
  return caip10Address.slice(0, lastColonIndex);
}
