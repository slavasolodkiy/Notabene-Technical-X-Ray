[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ProofTypes

# Enumeration: ProofTypes

Types of ownership proofs supported by the system

## Remarks

Supported proof types:
- SelfDeclaration: User self-declares ownership without cryptographic proof
- EIP191: Ethereum personal signature following EIP-191 standard
- SIWE: Sign-In with Ethereum message signature (EIP-4361)
- SIWX: Sign-In with X message signature
- SOL_SIWX: Sign-In with Solana message signature (SIWE for Solana)
- EIP712: Ethereum typed data signature following EIP-712 standard
- BIP137: Bitcoin message signature following BIP-137
- BIP322: Bitcoin message signature following BIP-322
- TIP191: Tron message signing
- ED25519: Ed25519 signature (used in Solana)
- XRP_ED25519: Ed25519 signature (used in XRP)
- XLM_ED25519: Ed25519 signature (used in Stellar)
- XPUB: Extended public key signature for HD wallets
- MicroTransfer: Proof via small blockchain transaction
- Screenshot: Image proof of ownership/access
- CIP8: Cardano message signing standard (CIP-8)

## See

 - [SignatureProof](../interfaces/SignatureProof.md) For signature-based proofs
 - [DeclarationProof](../interfaces/DeclarationProof.md) For self-declaration proofs
 - [MicroTransferProof](../interfaces/MicroTransferProof.md) For transaction-based proofs
 - [ScreenshotProof](../interfaces/ScreenshotProof.md) For screenshot proofs

## Enumeration Members

### BIP137

> **BIP137**: `"bip-137"`

#### Defined in

[types.ts:1140](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1140)

***

### BIP137\_XPUB

> **BIP137\_XPUB**: `"xpub"`

#### Defined in

[types.ts:1142](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1142)

***

### BIP322

> **BIP322**: `"bip-322"`

#### Defined in

[types.ts:1141](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1141)

***

### CIP8

> **CIP8**: `"cip-8"`

#### Defined in

[types.ts:1147](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1147)

***

### CONCORDIUM

> **CONCORDIUM**: `"concordium"`

#### Defined in

[types.ts:1151](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1151)

***

### Connect

> **Connect**: `"connect"`

#### Defined in

[types.ts:1150](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1150)

***

### ED25519

> **ED25519**: `"ed25519"`

#### Defined in

[types.ts:1144](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1144)

***

### EIP1271

> **EIP1271**: `"eip-1271"`

#### Defined in

[types.ts:1139](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1139)

***

### EIP191

> **EIP191**: `"eip-191"`

#### Defined in

[types.ts:1137](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1137)

***

### EIP712

> **EIP712**: `"eip-712"`

#### Defined in

[types.ts:1138](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1138)

***

### MicroTransfer

> **MicroTransfer**: `"microtransfer"`

#### Defined in

[types.ts:1148](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1148)

***

### Screenshot

> **Screenshot**: `"screenshot"`

#### Defined in

[types.ts:1149](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1149)

***

### SelfDeclaration

> **SelfDeclaration**: `"self-declaration"`

#### Defined in

[types.ts:1133](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1133)

***

### SIWE

> **SIWE**: `"siwe"`

#### Defined in

[types.ts:1134](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1134)

***

### SIWX

> **SIWX**: `"siwx"`

#### Defined in

[types.ts:1135](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1135)

***

### SOL\_SIWX

> **SOL\_SIWX**: `"sol-siwx"`

#### Defined in

[types.ts:1136](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1136)

***

### TIP191

> **TIP191**: `"tip-191"`

#### Defined in

[types.ts:1143](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1143)

***

### XLM\_ED25519

> **XLM\_ED25519**: `"xlm-ed25519"`

#### Defined in

[types.ts:1146](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1146)

***

### XRP\_ED25519

> **XRP\_ED25519**: `"xrp-ed25519"`

#### Defined in

[types.ts:1145](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1145)
