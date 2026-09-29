[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / CAIP10

# Type Alias: CAIP10

> **CAIP10**: \`$\{CAIP2\}:$\{string\}\`

Chain Agnostic Account Identifier (CAIP-10)
Represents an account/address on a specific blockchain following the CAIP-10 specification.
Extends CAIP-2 by adding the account address specific to that chain.

Format: `{caip2}:{address}`
- caip2: The CAIP-2 chain identifier (e.g. 'eip155:1')
- address: Chain-specific account address format

## Examples

```ts
"eip155:1:0x742d35Cc6634C0532925a3b844Bc454e4438f44e" // Ethereum account on mainnet
```

```ts
"bip122:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f:128Lkh3S7CkDTBZ8W7BbpsN3YYizJMp8p6" // Bitcoin account on mainnet
```

```ts
"cosmos:cosmoshub-3:cosmos1t2uflqwqe0fsj0shcfkrvpukewcw40yjj6hdc0" // Cosmos account
```

## See

[CAIP-10 Specification](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md)

## Defined in

[types.ts:74](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L74)
