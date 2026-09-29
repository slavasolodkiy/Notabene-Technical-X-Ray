[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / TravelAddress

# Type Alias: TravelAddress

> **TravelAddress**: \`ta$\{string\}\`

A travel address

A standardized travel rule address format

## Remarks

Represents a special address format used for travel rule compliance. Travel addresses
are prefixed with 'ta' and contain encoded information about the transaction
and counterparty details required for travel rule reporting.

The format ensures consistent handling of travel rule data across different
VASPs and blockchain networks while maintaining privacy.

## Example

```ts
"ta1234abcd..." // Example travel rule address
```

## See

 - [BlockchainAddress](BlockchainAddress.md) For native chain addresses
 - [CAIP10](CAIP10.md) For chain-agnostic addresses

## Defined in

[types.ts:187](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L187)
