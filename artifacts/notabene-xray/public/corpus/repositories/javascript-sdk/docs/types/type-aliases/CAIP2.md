[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / CAIP2

# Type Alias: CAIP2

> **CAIP2**: \`$\{string\}:$\{string\}\`

Chain Agnostic Blockchain Identifier (CAIP-2)
Represents a blockchain in a chain-agnostic way following the CAIP-2 specification.
The identifier consists of a namespace and reference separated by a colon.

Format: `namespace:reference`
- namespace: Represents the blockchain namespace (e.g. 'eip155', 'bip122', 'cosmos')
- reference: Chain-specific identifier within that namespace

## Examples

```ts
"eip155:1" // Ethereum Mainnet
```

```ts
"bip122:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f" // Bitcoin Mainnet
```

```ts
"cosmos:cosmoshub-3" // Cosmos Hub Mainnet
```

## See

[CAIP-2 Specification](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)

## Defined in

[types.ts:57](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L57)
