[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / SignatureProof

# Interface: SignatureProof

Interface for signature-based ownership proofs that use cryptographic message signing

## Remarks

Extends the base OwnershipProface to add signature-specific properties:
- Supports multiple signature standards like EIP-191, EIP-712, BIP-137, SIWE
- Includes the cryptographic proof signature string
- Contains an attestation message that was signed
- Records which wallet provider was used for signing

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

[types.ts:1218](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1218)

***

### chainSpecificData?

> `optional` **chainSpecificData**: `object` & `Record`\<`string`, `unknown`\>

#### Type declaration

##### cardanoCoseKey?

> `optional` **cardanoCoseKey**: `string`

#### Defined in

[types.ts:1221](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1221)

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

[types.ts:1217](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1217)

***

### status

> **status**: [`ProofStatus`](../enumerations/ProofStatus.md)

#### Inherited from

[`OwnershipProof`](OwnershipProof.md).[`status`](OwnershipProof.md#status)

#### Defined in

[types.ts:1177](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1177)

***

### type

> **type**: [`SIWE`](../enumerations/ProofTypes.md#siwe) \| [`SIWX`](../enumerations/ProofTypes.md#siwx) \| [`SOL_SIWX`](../enumerations/ProofTypes.md#sol_siwx) \| [`EIP191`](../enumerations/ProofTypes.md#eip191) \| [`EIP712`](../enumerations/ProofTypes.md#eip712) \| [`EIP1271`](../enumerations/ProofTypes.md#eip1271) \| [`BIP137`](../enumerations/ProofTypes.md#bip137) \| [`BIP322`](../enumerations/ProofTypes.md#bip322) \| [`BIP137_XPUB`](../enumerations/ProofTypes.md#bip137_xpub) \| [`TIP191`](../enumerations/ProofTypes.md#tip191) \| [`ED25519`](../enumerations/ProofTypes.md#ed25519) \| [`XRP_ED25519`](../enumerations/ProofTypes.md#xrp_ed25519) \| [`XLM_ED25519`](../enumerations/ProofTypes.md#xlm_ed25519) \| [`CIP8`](../enumerations/ProofTypes.md#cip8) \| [`CONCORDIUM`](../enumerations/ProofTypes.md#concordium)

#### Overrides

[`OwnershipProof`](OwnershipProof.md).[`type`](OwnershipProof.md#type)

#### Defined in

[types.ts:1200](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1200)

***

### wallet\_provider

> **wallet\_provider**: `string`

#### Defined in

[types.ts:1219](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1219)

***

### xpub?

> `optional` **xpub**: `string`

#### Defined in

[types.ts:1220](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1220)
