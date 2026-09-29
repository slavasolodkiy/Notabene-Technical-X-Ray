[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / OwnershipProof

# Interface: OwnershipProof

Base interface for proving ownership of an account or address

## Remarks

TheOwnershipProof interface provides a common structure for different types of ownership verification:
- All proofs must specify their type from the supported ProofTypes enum
- Current verification status is tracked via ProofStatus
- Links the proof to a decentralized identifier (DID)
- Specifies the blockchain account/address being proven using CAIP-10 format

This interface is extended by specific proof types like:
- SignatureProof for cryptographic signatures
- DeclarationProof for self-declarations
- MicroTransferProof for transaction-based proof
- ScreenshotProof for image-based verification

## See

 - [ProofTypes](../enumerations/ProofTypes.md) For supported proof methods
 - [ProofStatus](../enumerations/ProofStatus.md) For possible verification states
 - [CAIP10](../type-aliases/CAIP10.md) For address format specification

## Extended by

- [`SignatureProof`](SignatureProof.md)
- [`DeclarationProof`](DeclarationProof.md)
- [`ConnectionRecord`](ConnectionRecord.md)
- [`MicroTransferProof`](MicroTransferProof.md)
- [`ScreenshotProof`](ScreenshotProof.md)

## Properties

### address

> **address**: \`$\{string\}:$\{string\}:$\{string\}\`

#### Defined in

[types.ts:1179](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1179)

***

### did

> **did**: \`did:$\{string\}:$\{string\}\`

#### Defined in

[types.ts:1178](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1178)

***

### status

> **status**: [`ProofStatus`](../enumerations/ProofStatus.md)

#### Defined in

[types.ts:1177](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1177)

***

### type

> **type**: [`ProofTypes`](../enumerations/ProofTypes.md)

#### Defined in

[types.ts:1176](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1176)
