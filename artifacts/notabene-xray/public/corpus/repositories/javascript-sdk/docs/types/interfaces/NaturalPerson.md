[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / NaturalPerson

# Interface: NaturalPerson

Interface representing a natural person (individual) involved in a transaction

## Remarks

Extends the baseinterface to add properties specific to individual persons:
- type: Must be PersonType.NATURAL to identify as an individual
- dateOfBirth: Optional ISO format birth date for identity verification
- placeOfBirth: Optional birth place for identity verification
- countryOfResidence: Optional ISO country code of current residence
- name: Required full legal name of the individual

This interface captures the additional identifying information required for
natural persons under FATF Travel Rule requirements. The properties align
with standard KYC (Know Your Customer) data collection practices.

## See

 - [Counterparty](Counterparty.md) For base properties common to all counterparties
 - [PersonType](../enumerations/PersonType.md) For person type classification

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

### countryOfResidence?

> `optional` **countryOfResidence**: `string`

#### Defined in

[types.ts:390](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L390)

***

### dateOfBirth?

> `optional` **dateOfBirth**: \`$\{number\}-$\{number\}-$\{number\}\`

#### Defined in

[types.ts:388](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L388)

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

### name

> **name**: `string`

#### Overrides

[`Counterparty`](Counterparty.md).[`name`](Counterparty.md#name)

#### Defined in

[types.ts:391](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L391)

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

### placeOfBirth?

> `optional` **placeOfBirth**: `string`

#### Defined in

[types.ts:389](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L389)

***

### type

> **type**: [`NATURAL`](../enumerations/PersonType.md#natural)

#### Overrides

[`Counterparty`](Counterparty.md).[`type`](Counterparty.md#type)

#### Defined in

[types.ts:387](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L387)

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
