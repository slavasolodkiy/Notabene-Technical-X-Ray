[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / V1Asset

# Type Alias: V1Asset

> **V1Asset**: [`NotabeneAsset`](NotabeneAsset.md) \| \{ `caip19`: [`CAIP19`](CAIP19.md); \}

Represents a legacy V1 API asset format supporting both Notabene and CAIP-19 identifiers

## Remarks

Used for backwards compatibility with V1 API transaction payloads:
- Can be either a simple Notabene asset string
- Or an object containing a CAIP-19 identifier

## Examples

```ts
"ETH_USDT" // Notabene asset format
```

```ts
{ caip19: "eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f" } // CAIP-19 format
```

## See

 - [NotabeneAsset](NotabeneAsset.md) For Notabene asset format
 - [CAIP19](CAIP19.md) For CAIP-19 asset format

## Defined in

[types.ts:671](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L671)
