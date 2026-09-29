[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / Counterparty

# Interface: Counterparty

Interface representing a party involved in a transaction other than the initiator

## Remarks

fines the core properties that identify and describe a counterparty:
- name: The display or legal name of the counterparty
- accountNumber: An account identifier/reference number
- did: Decentralized identifier for the counterparty
- type: Classification as natural person, legal entity, or self
- verified: Whether the counterparty's identity has been verified
- geographicAddress: Physical/mailing address information
- nationalIdentification: Government-issued ID details
- website: Official web presence
- phone: Contact phone number
- email: Contact email address

This interface serves as the base for more specific counterparty types:

## See

 - [NaturalPerson](NaturalPerson.md) For individual person properties
 - [LegalPerson](LegalPerson.md) For organization/entity properties

## Extended by

- [`NaturalPerson`](NaturalPerson.md)
- [`LegalPerson`](LegalPerson.md)

## Properties

### accountNumber?

> `optional` **accountNumber**: `string`

#### Defined in

[types.ts:356](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L356)

***

### did?

> `optional` **did**: \`did:$\{string\}:$\{string\}\`

#### Defined in

[types.ts:357](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L357)

***

### email?

> `optional` **email**: `string`

#### Defined in

[types.ts:364](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L364)

***

### geographicAddress?

> `optional` **geographicAddress**: [`Address`](../../ivms/types/type-aliases/Address.md)

#### Defined in

[types.ts:360](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L360)

***

### name?

> `optional` **name**: `string`

#### Defined in

[types.ts:355](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L355)

***

### nationalIdentification?

> `optional` **nationalIdentification**: [`NationalIdentification`](../../ivms/types/type-aliases/NationalIdentification.md)

#### Defined in

[types.ts:361](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L361)

***

### phone?

> `optional` **phone**: `string`

#### Defined in

[types.ts:363](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L363)

***

### type?

> `optional` **type**: [`PersonType`](../enumerations/PersonType.md)

#### Defined in

[types.ts:358](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L358)

***

### verified?

> `optional` **verified**: `boolean`

#### Defined in

[types.ts:359](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L359)

***

### website?

> `optional` **website**: `string`

#### Defined in

[types.ts:362](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L362)
