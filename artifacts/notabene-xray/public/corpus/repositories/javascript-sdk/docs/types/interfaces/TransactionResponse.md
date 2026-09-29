[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / TransactionResponse

# Interface: TransactionResponse\<V\>

Response interface for transaction-related operations

## Remarks

Extends ComponentResponse to add transaction-specific response data:
- value: The resulting transaction value of generic type V
- ivms101: IVMS 101 travel rule data for the transaction
- proof: Optional ownership proof details if required
- txCreate: Optional V1 transaction payload for legacy API compatibility
- txUpdate: Optional V1 transaction payload for legacy API compatibility

## See

 - [ComponentResponse](ComponentResponse.md) For base response properties
 - [IVMS101](../../ivms/types/type-aliases/IVMS101.md) For travel rule data structure
 - [OwnershipProof](OwnershipProof.md) For proof details
 - [V1Transaction](../type-aliases/V1Transaction.md) For legacy transaction format

## Extends

- [`ComponentResponse`](ComponentResponse.md)

## Type Parameters

• **V**

Type of the transaction value being returned

## Properties

### errors

> **errors**: [`ValidationError`](../type-aliases/ValidationError.md)[]

#### Inherited from

[`ComponentResponse`](ComponentResponse.md).[`errors`](ComponentResponse.md#errors)

#### Defined in

[types.ts:713](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L713)

***

### ivms101

> **ivms101**: [`IVMS101`](../../ivms/types/type-aliases/IVMS101.md)

#### Defined in

[types.ts:737](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L737)

***

### proof?

> `optional` **proof**: [`OwnershipProof`](OwnershipProof.md)

#### Defined in

[types.ts:738](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L738)

***

### requestID

> **requestID**: `string`

#### Inherited from

[`ComponentResponse`](ComponentResponse.md).[`requestID`](ComponentResponse.md#requestid)

#### Defined in

[types.ts:710](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L710)

***

### status

> **status**: [`Status`](../enumerations/Status.md)

#### Inherited from

[`ComponentResponse`](ComponentResponse.md).[`status`](ComponentResponse.md#status)

#### Defined in

[types.ts:712](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L712)

***

### txCreate?

> `optional` **txCreate**: [`V1Transaction`](../type-aliases/V1Transaction.md)

#### Defined in

[types.ts:739](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L739)

***

### txUpdate?

> `optional` **txUpdate**: [`V1Transaction`](../type-aliases/V1Transaction.md)

#### Defined in

[types.ts:740](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L740)

***

### valid

> **valid**: `boolean`

#### Inherited from

[`ComponentResponse`](ComponentResponse.md).[`valid`](ComponentResponse.md#valid)

#### Defined in

[types.ts:711](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L711)

***

### value

> **value**: `V`

#### Defined in

[types.ts:736](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L736)
