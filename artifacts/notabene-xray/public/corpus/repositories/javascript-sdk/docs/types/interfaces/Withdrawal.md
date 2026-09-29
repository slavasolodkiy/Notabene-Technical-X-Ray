[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / Withdrawal

# Interface: Withdrawal

An object representing a withdrawal transaction

## Extends

- `BeneficiaryFields`.[`Transaction`](Transaction.md).[`Refreshable`](Refreshable.md)

## Properties

### account?

> `optional` **account**: [`Account`](Account.md)

#### Inherited from

[`Transaction`](Transaction.md).[`account`](Transaction.md#account)

#### Defined in

[types.ts:573](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L573)

***

### agent

> **agent**: [`Agent`](Agent.md)

#### Inherited from

[`Transaction`](Transaction.md).[`agent`](Transaction.md#agent)

#### Defined in

[types.ts:564](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L564)

***

### amountDecimal

> **amountDecimal**: `number`

#### Inherited from

[`Transaction`](Transaction.md).[`amountDecimal`](Transaction.md#amountdecimal)

#### Defined in

[types.ts:567](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L567)

***

### asset

> **asset**: `string`

#### Inherited from

[`Transaction`](Transaction.md).[`asset`](Transaction.md#asset)

#### Defined in

[types.ts:566](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L566)

***

### assetPrice?

> `optional` **assetPrice**: `object`

#### currency

> **currency**: `string`

#### price

> **price**: `number`

#### Inherited from

[`Transaction`](Transaction.md).[`assetPrice`](Transaction.md#assetprice)

#### Defined in

[types.ts:569](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L569)

***

### counterparty

> **counterparty**: [`Counterparty`](Counterparty.md)

#### Inherited from

[`Transaction`](Transaction.md).[`counterparty`](Transaction.md#counterparty)

#### Defined in

[types.ts:565](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L565)

***

### customer?

> `optional` **customer**: [`Counterparty`](Counterparty.md)

#### Inherited from

[`Transaction`](Transaction.md).[`customer`](Transaction.md#customer)

#### Defined in

[types.ts:537](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L537)

***

### destination?

> `optional` **destination**: `string`

#### Inherited from

`BeneficiaryFields.destination`

#### Defined in

[types.ts:502](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L502)

***

### proof?

> `optional` **proof**: [`OwnershipProof`](OwnershipProof.md)

#### Inherited from

[`Transaction`](Transaction.md).[`proof`](Transaction.md#proof)

#### Defined in

[types.ts:568](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L568)

***

### refreshSource?

> `optional` **refreshSource**: [`RefreshSource`](RefreshSource.md)

#### Inherited from

[`Refreshable`](Refreshable.md).[`refreshSource`](Refreshable.md#refreshsource)

#### Defined in

[types.ts:582](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L582)

***

### requestId?

> `optional` **requestId**: `string`

#### Inherited from

[`Transaction`](Transaction.md).[`requestId`](Transaction.md#requestid)

#### Defined in

[types.ts:536](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L536)
