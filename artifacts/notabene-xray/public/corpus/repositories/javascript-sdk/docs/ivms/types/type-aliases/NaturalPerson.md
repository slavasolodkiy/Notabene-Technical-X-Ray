[**@notabene/javascript-sdk**](../../../README.md)

***

[@notabene/javascript-sdk](../../../modules.md) / [ivms/types](../README.md) / NaturalPerson

# Type Alias: NaturalPerson

> **NaturalPerson**: `object`

Natural Person
Represents a natural person with all associated information

## Type declaration

### countryOfResidence?

> `optional` **countryOfResidence**: [`ISOCountryCode`](ISOCountryCode.md)

Country in which a person resides (the place of a person's home)

### customerIdentification?

> `optional` **customerIdentification**: `string`

A distinct identifier that uniquely identifies the person to the institution in context

### dateAndPlaceOfBirth?

> `optional` **dateAndPlaceOfBirth**: [`DateAndPlaceOfBirth`](DateAndPlaceOfBirth.md)

Date and place of birth of a person

### geographicAddress?

> `optional` **geographicAddress**: [`Address`](Address.md)[]

The particulars of a location at which a person may be communicated with

### name

> **name**: [`NaturalPersonName`](NaturalPersonName.md)

The distinct words used as identification for an individual

### nationalIdentification?

> `optional` **nationalIdentification**: [`NationalIdentification`](NationalIdentification.md)

A distinct identifier used by governments to uniquely identify a natural person

## Defined in

[ivms/types.ts:201](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/ivms/types.ts#L201)
