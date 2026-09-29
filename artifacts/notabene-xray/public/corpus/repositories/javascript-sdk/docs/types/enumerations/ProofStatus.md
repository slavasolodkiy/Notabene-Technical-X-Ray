[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ProofStatus

# Enumeration: ProofStatus

Status of the ownership proof verification process

## Remarks

Represents the different states that an ownership proof can be in during and after verification:
- PENDING: Initial state where verification is in progress or awaiting processing
- FAILED: The proof was rejected due to failing verification checks
- FLAGGED: The proof requires manual review due to suspicious or unclear verification results
- VERIFIED: The proof has passed all verification checks successfully

## Enumeration Members

### FAILED

> **FAILED**: `"rejected"`

#### Defined in

[types.ts:1099](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1099)

***

### FLAGGED

> **FLAGGED**: `"flagged"`

#### Defined in

[types.ts:1100](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1100)

***

### PENDING

> **PENDING**: `"pending"`

#### Defined in

[types.ts:1098](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1098)

***

### VERIFIED

> **VERIFIED**: `"verified"`

#### Defined in

[types.ts:1101](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1101)
