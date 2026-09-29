[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / V1Transaction

# Type Alias: V1Transaction

> **V1Transaction**: `object`

Transaction payload suitable for calling Notabene v1 tx/create

## Type declaration

### beneficiary

> **beneficiary**: [`Beneficiary`](../../ivms/types/type-aliases/Beneficiary.md)

### beneficiaryProof?

> `optional` **beneficiaryProof**: [`OwnershipProof`](../interfaces/OwnershipProof.md)

### beneficiaryVASPdid

> **beneficiaryVASPdid**: [`DID`](DID.md)

### originator?

> `optional` **originator**: [`Originator`](../../ivms/types/type-aliases/Originator.md)

### originatorEqualsBeneficiary?

> `optional` **originatorEqualsBeneficiary**: `boolean`

### originatorProof?

> `optional` **originatorProof**: [`OwnershipProof`](../interfaces/OwnershipProof.md)

### originatorVASPdid

> **originatorVASPdid**: [`DID`](DID.md)

### transactionAmount

> **transactionAmount**: `string`

### transactionAsset

> **transactionAsset**: [`V1Asset`](V1Asset.md)

### transactionId?

> `optional` **transactionId**: `string`

## Defined in

[types.ts:677](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L677)
