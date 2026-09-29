[**@notabene/javascript-sdk**](../../../README.md)

***

[@notabene/javascript-sdk](../../../modules.md) / [ivms/types](../README.md) / NationalIdentification

# Type Alias: NationalIdentification

> **NationalIdentification**: `object`

National Identification
Represents a national identifier for a person or entity

## Type declaration

### countryOfIssue?

> `optional` **countryOfIssue**: [`ISOCountryCode`](ISOCountryCode.md)

Country that issued the national identifier

### nationalIdentifier?

> `optional` **nationalIdentifier**: `string`

National identifier (max 35 characters)

### nationalIdentifierType?

> `optional` **nationalIdentifierType**: [`NationalIdentifierTypeCode`](NationalIdentifierTypeCode.md)

Type of national identifier

### registrationAuthority?

> `optional` **registrationAuthority**: `string`

Registration authority (format: RA followed by 6 digits)

## Defined in

[ivms/types.ts:91](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/ivms/types.ts#L91)
