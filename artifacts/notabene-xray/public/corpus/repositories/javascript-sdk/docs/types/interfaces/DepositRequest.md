[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / DepositRequest

# Interface: DepositRequest

An object representing a request for a deposit

## Extends

- `DepositRequestFields`.[`ComponentRequest`](ComponentRequest.md)

## Properties

### amountDecimal

> **amountDecimal**: `number`

#### Inherited from

`DepositRequestFields.amountDecimal`

#### Defined in

[types.ts:512](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L512)

***

### asset

> **asset**: `string`

#### Inherited from

`DepositRequestFields.asset`

#### Defined in

[types.ts:511](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L511)

***

### cryptoCredential?

> `optional` **cryptoCredential**: \`$\{string\}.$\{string\}.mastercard\`

#### Inherited from

`DepositRequestFields.cryptoCredential`

#### Defined in

[types.ts:514](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L514)

***

### customer?

> `optional` **customer**: [`Counterparty`](Counterparty.md)

#### Inherited from

[`ComponentRequest`](ComponentRequest.md).[`customer`](ComponentRequest.md#customer)

#### Defined in

[types.ts:537](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L537)

***

### destination

> **destination**: `string`

#### Inherited from

`DepositRequestFields.destination`

#### Defined in

[types.ts:510](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L510)

***

### requestId?

> `optional` **requestId**: `string`

#### Inherited from

[`ComponentRequest`](ComponentRequest.md).[`requestId`](ComponentRequest.md#requestid)

#### Defined in

[types.ts:536](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L536)

***

### travelAddress?

> `optional` **travelAddress**: \`ta$\{string\}\`

#### Inherited from

`DepositRequestFields.travelAddress`

#### Defined in

[types.ts:513](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L513)
