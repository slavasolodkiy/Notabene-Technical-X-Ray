[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ComponentResponse

# Interface: ComponentResponse

Base response interface for all SDK component operations

## Remarks

Provides standardized response propertiesfor component interactions:
- requestID: Links response back to the originating request
- valid: Boolean indicating if the operation was valid/successful
- status: Current verification status of the operation
- errors: Array of validation errors if any occurred

This interface is extended by specific response types like:
- TransResponse for transaction operations
- ConnectionResponse for VASP connection operations

## See

 - [Status](../enumerations/Status.md) For possible status values
 - [ValidationError](../type-aliases/ValidationError.md) For error structure
 - [TransactionResponse](TransactionResponse.md) For transaction-specific responses

## Extended by

- [`TransactionResponse`](TransactionResponse.md)

## Properties

### errors

> **errors**: [`ValidationError`](../type-aliases/ValidationError.md)[]

#### Defined in

[types.ts:713](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L713)

***

### requestID

> **requestID**: `string`

#### Defined in

[types.ts:710](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L710)

***

### status

> **status**: [`Status`](../enumerations/Status.md)

#### Defined in

[types.ts:712](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L712)

***

### valid

> **valid**: `boolean`

#### Defined in

[types.ts:711](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L711)
