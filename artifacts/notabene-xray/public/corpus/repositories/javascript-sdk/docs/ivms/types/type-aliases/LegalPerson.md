[**@notabene/javascript-sdk**](../../../README.md)

***

[@notabene/javascript-sdk](../../../modules.md) / [ivms/types](../README.md) / LegalPerson

# Type Alias: LegalPerson

> **LegalPerson**: `object`

Legal Person
Represents a legal person with all associated information

## Type declaration

### countryOfRegistration?

> `optional` **countryOfRegistration**: [`ISOCountryCode`](ISOCountryCode.md)

The country in which the legal person is registered

### customerNumber?

> `optional` **customerNumber**: `string`

A distinct identifier that uniquely identifies the person to the institution in context

### geographicAddress?

> `optional` **geographicAddress**: [`Address`](Address.md)[]

The address of the legal person

### name

> **name**: [`LegalPersonName`](LegalPersonName.md)

The name of the legal person

### nationalIdentification?

> `optional` **nationalIdentification**: [`NationalIdentification`](NationalIdentification.md)

A distinct identifier used by governments to uniquely identify a legal person

## Defined in

[ivms/types.ts:259](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/ivms/types.ts#L259)
