[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ComponentRequest

# Interface: ComponentRequest

Base interface for requests sent to SDK components

## Remarks

Defines core properties that all component requests share:
- Optional unique request ID for tracking/correlating requests and responses
- Optional customer detailsfor pre-filling component data

This interface is extended by specific request types like:
- Transaction requests for sending/receiving assets
- Connection requests for establishing VASP to VASP communication

## See

 - [Transaction](Transaction.md) For transaction-specific request properties
 - [ConnectionRequest](ConnectionRequest.md) For connection-specific request properties

## Extended by

- [`Transaction`](Transaction.md)
- [`DepositRequest`](DepositRequest.md)
- [`ConnectionRequest`](ConnectionRequest.md)

## Properties

### customer?

> `optional` **customer**: [`Counterparty`](Counterparty.md)

#### Defined in

[types.ts:537](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L537)

***

### requestId?

> `optional` **requestId**: `string`

#### Defined in

[types.ts:536](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L536)
