[**@notabene/javascript-sdk**](../../../README.md)

***

[@notabene/javascript-sdk](../../../modules.md) / [ivms/types](../README.md) / Address

# Type Alias: Address

> **Address**: `object`

Address
Represents a physical address

## Type declaration

### addressLine?

> `optional` **addressLine**: `string`[]

Information that locates and identifies a specific address, presented in free format text.

### addressType

> **addressType**: [`AddressTypeCode`](AddressTypeCode.md)

Identifies the nature of the address.

### buildingName?

> `optional` **buildingName**: `string`

Name of the building or house.

### buildingNumber?

> `optional` **buildingNumber**: `string`

Number that identifies the position of a building on a street.

### country

> **country**: [`ISOCountryCode`](ISOCountryCode.md)

Nation with its own government.

### countrySubDivision?

> `optional` **countrySubDivision**: `string`

Identifies a subdivision of a country such as state, region, province.

### department?

> `optional` **department**: `string`

Identification of a division of a large organisation or building.

### districtName?

> `optional` **districtName**: `string`

Identifies a subdivision within a country subdivision.

### floor?

> `optional` **floor**: `string`

Floor or storey within a building.

### postBox?

> `optional` **postBox**: `string`

Numbered box in a post office.

### postcode?

> `optional` **postcode**: `string`

Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail.

### room?

> `optional` **room**: `string`

Building room number.

### streetName?

> `optional` **streetName**: `string`

Name of a street or thoroughfare.

### subDepartment?

> `optional` **subDepartment**: `string`

Identification of a sub-division of a large organisation or building.

### townLocationName?

> `optional` **townLocationName**: `string`

Specific location name within the town.

### townName

> **townName**: `string`

Name of a built-up area, with defined boundaries, and a local government.

## Defined in

[ivms/types.ts:119](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/ivms/types.ts#L119)
