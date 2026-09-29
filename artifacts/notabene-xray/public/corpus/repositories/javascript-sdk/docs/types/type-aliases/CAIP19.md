[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / CAIP19

# Type Alias: CAIP19

> **CAIP19**: \`$\{CAIP2\}/$\{string\}:$\{string\}\`

Chain Agnostic Asset Identifier (CAIP-19)
Represents an asset/token on a specific blockchain following the CAIP-19 specification.
Extends CAIP-2 by adding asset type and identifier information.

Format: `{caip2}/{asset_namespace}:{asset_reference}`
- caip2: The CAIP-2 chain identifier (e.g. 'eip155:1')
- asset_namespace: The asset standard (e.g. 'erc20', 'erc721', 'slip44')
- asset_reference: Chain/standard-specific asset identifier

## Examples

```ts
"eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f" // DAI token on Ethereum mainnet
```

```ts
"eip155:1/erc721:0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" // CryptoKitties NFT contract
```

```ts
"cosmos:cosmoshub-3/slip44:118" // ATOM token on Cosmos Hub
```

## See

[CAIP-19 Specification](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-19.md)

## Defined in

[types.ts:92](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L92)
