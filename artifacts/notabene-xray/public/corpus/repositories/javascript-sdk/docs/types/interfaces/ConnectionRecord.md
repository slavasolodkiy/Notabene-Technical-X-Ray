[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ConnectionRecord

# Interface: ConnectionRecord

Interface for recording that user connected their wallet.

## Remarks

- Records which wallet provider was used to connect

The signature proves ownership by demonstrating control of the private keys
associated with the claimed address.

## See

 - [ProofTypes](../enumerations/ProofTypes.md) For supported signature types
 - [OwnershipProof](OwnershipProof.md) For base proof properties

## Extends

- [`OwnershipProof`](OwnershipProof.md)

## Properties

### address

> **address**: \`$\{string\}:$\{string\}:$\{string\}\`

#### Inherited from

[`OwnershipProof`](OwnershipProof.md).[`address`](OwnershipProof.md#address)

#### Defined in

[types.ts:1179](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1179)

***

### attestation

> **attestation**: `string`

#### Defined in

[types.ts:1252](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1252)

***

### did

> **did**: \`did:$\{string\}:$\{string\}\`

#### Inherited from

[`OwnershipProof`](OwnershipProof.md).[`did`](OwnershipProof.md#did)

#### Defined in

[types.ts:1178](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1178)

***

### proof

> **proof**: `string`

#### Defined in

[types.ts:1251](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1251)

***

### status

> **status**: [`ProofStatus`](../enumerations/ProofStatus.md)

#### Inherited from

[`OwnershipProof`](OwnershipProof.md).[`status`](OwnershipProof.md#status)

#### Defined in

[types.ts:1177](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1177)

***

### type

> **type**: [`Connect`](../enumerations/ProofTypes.md#connect)

#### Overrides

[`OwnershipProof`](OwnershipProof.md).[`type`](OwnershipProof.md#type)

#### Defined in

[types.ts:1250](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1250)

***

### wallet\_provider

> **wallet\_provider**: `string`

#### Defined in

[types.ts:1253](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1253)
