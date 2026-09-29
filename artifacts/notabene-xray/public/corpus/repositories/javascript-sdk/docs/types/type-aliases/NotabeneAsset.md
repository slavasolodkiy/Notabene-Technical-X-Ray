[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / NotabeneAsset

# Type Alias: NotabeneAsset

> **NotabeneAsset**: `string`

Internal identifier for assets in the Notabene system

## Remarks

A standardized string format used within Notabene to identify cryptocurrencies,
tokens, and other digital assets. This is Notabene's legacy asset identification
system that may be used alongside CAIP-19 and DTI identifiers.

## Examples

```ts
"ETH_USDT" // USDT token on Ethereum
```

```ts
"BTC" // Bitcoin
```

## See

 - [CAIP19](CAIP19.md) For chain-agnostic asset identifiers
 - [DTI](DTI.md) For ISO standardized identifiers

## Defined in

[types.ts:140](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L140)
