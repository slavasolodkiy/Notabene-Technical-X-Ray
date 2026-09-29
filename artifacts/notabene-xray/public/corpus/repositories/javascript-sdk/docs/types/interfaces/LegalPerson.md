[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / LegalPerson

# Interface: LegalPerson

Interface representing a legal entity (organization/company) involved in a transaction

## Remarks

Extends the baseface to add properties specific to legal entities:
- type: MustPersonType.LEGAL to identify as an organization
- name: Required registered legal name of the entity
- lei: Optional Legal Entity Identifier for regulated entities
- logo: Optional URI to the organization's logo image
- countryOfRegistration: Optional ISO country code where entity is registered

This interface captures the additional identifying information required for
legal persons under FATF Travel Rule requirements. The properties align with
standard business KYC (Know Your Businessta collection practices.

## See

 - [Counterparty](Counterparty.md) For base properties common to all counterparties
 - [PersonType](../enumerations/PersonType.md) For person type classification
 - [LEI](../type-aliases/LEI.md) For Legal Entity Identifier format

## Extends

- [`Counterparty`](Counterparty.md)

## Properties

### accountNumber?

> `optional` **accountNumber**: `string`

#### Inherited from

[`Counterparty`](Counterparty.md).[`accountNumber`](Counterparty.md#accountnumber)

#### Defined in

[types.ts:356](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L356)

***

### countryOfRegistration?

> `optional` **countryOfRegistration**: `string`

#### Defined in

[types.ts:459](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L459)

***

### did?

> `optional` **did**: \`did:$\{string\}:$\{string\}\`

#### Inherited from

[`Counterparty`](Counterparty.md).[`did`](Counterparty.md#did)

#### Defined in

[types.ts:357](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L357)

***

### email?

> `optional` **email**: `string`

#### Inherited from

[`Counterparty`](Counterparty.md).[`email`](Counterparty.md#email)

#### Defined in

[types.ts:364](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L364)

***

### geographicAddress?

> `optional` **geographicAddress**: [`Address`](../../ivms/types/type-aliases/Address.md)

#### Inherited from

[`Counterparty`](Counterparty.md).[`geographicAddress`](Counterparty.md#geographicaddress)

#### Defined in

[types.ts:360](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L360)

***

### lei?

> `optional` **lei**: `string`

#### Defined in

[types.ts:457](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L457)

***

### logo?

> `optional` **logo**: `string`

#### Defined in

[types.ts:458](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L458)

***

### name

> **name**: `string`

#### Overrides

[`Counterparty`](Counterparty.md).[`name`](Counterparty.md#name)

#### Defined in

[types.ts:456](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L456)

***

### nationalIdentification?

> `optional` **nationalIdentification**: [`NationalIdentification`](../../ivms/types/type-aliases/NationalIdentification.md)

#### Inherited from

[`Counterparty`](Counterparty.md).[`nationalIdentification`](Counterparty.md#nationalidentification)

#### Defined in

[types.ts:361](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L361)

***

### phone?

> `optional` **phone**: `string`

#### Inherited from

[`Counterparty`](Counterparty.md).[`phone`](Counterparty.md#phone)

#### Defined in

[types.ts:363](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L363)

***

### type

> **type**: [`LEGAL`](../enumerations/PersonType.md#legal)

#### Overrides

[`Counterparty`](Counterparty.md).[`type`](Counterparty.md#type)

#### Defined in

[types.ts:455](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L455)

***

### verified?

> `optional` **verified**: `boolean`

#### Inherited from

[`Counterparty`](Counterparty.md).[`verified`](Counterparty.md#verified)

#### Defined in

[types.ts:359](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L359)

***

### website?

> `optional` **website**: `string`

#### Inherited from

[`Counterparty`](Counterparty.md).[`website`](Counterparty.md#website)

#### Defined in

[types.ts:362](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L362)
