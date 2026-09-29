[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / Transaction

# Interface: Transaction

Core transaction interface representing a crypto asset transfer between parties

## Remarks

Extends ComponentRequest to add transaction-specific properties:
- agent: The entity facilitating/executing the transaction
- counterparty: The other party involved in the transaction
- asset: The cryptocurrency or token being transferred
- amountDecimal: The amount to transfer in decimal format
- proof: Optional ownership proof verifying control of involved addresses
- assetPrice: Optional price information in a fiat currency

This interface serves as the base for specific transaction types like:
- Withdrawals for sending assets out
- Deposits for receiving assets
- Deposit requests for requesting asset transfers

## See

 - [Withdrawal](Withdrawal.md) For withdrawal-specific transaction properties
 - [Deposit](Deposit.md) For deposit-specific transaction properties
 - [Agent](Agent.md) For agent details
 - [Counterparty](Counterparty.md) For counterparty information

## Extends

- [`ComponentRequest`](ComponentRequest.md)

## Extended by

- [`DepositTransaction`](DepositTransaction.md)
- [`Withdrawal`](Withdrawal.md)

## Properties

### account?

> `optional` **account**: [`Account`](Account.md)

#### Defined in

[types.ts:573](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L573)

***

### agent

> **agent**: [`Agent`](Agent.md)

#### Defined in

[types.ts:564](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L564)

***

### amountDecimal

> **amountDecimal**: `number`

#### Defined in

[types.ts:567](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L567)

***

### asset

> **asset**: `string`

#### Defined in

[types.ts:566](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L566)

***

### assetPrice?

> `optional` **assetPrice**: `object`

#### currency

> **currency**: `string`

#### price

> **price**: `number`

#### Defined in

[types.ts:569](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L569)

***

### counterparty

> **counterparty**: [`Counterparty`](Counterparty.md)

#### Defined in

[types.ts:565](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L565)

***

### customer?

> `optional` **customer**: [`Counterparty`](Counterparty.md)

#### Inherited from

[`ComponentRequest`](ComponentRequest.md).[`customer`](ComponentRequest.md#customer)

#### Defined in

[types.ts:537](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L537)

***

### proof?

> `optional` **proof**: [`OwnershipProof`](OwnershipProof.md)

#### Defined in

[types.ts:568](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L568)

***

### requestId?

> `optional` **requestId**: `string`

#### Inherited from

[`ComponentRequest`](ComponentRequest.md).[`requestId`](ComponentRequest.md#requestid)

#### Defined in

[types.ts:536](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L536)
