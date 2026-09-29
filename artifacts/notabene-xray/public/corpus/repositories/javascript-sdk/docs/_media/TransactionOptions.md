[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / TransactionOptions

# Interface: TransactionOptions

Configuration options for Transaction components

## Properties

### allowedAgentTypes?

> `optional` **allowedAgentTypes**: [`AgentType`](../enumerations/AgentType.md)[]

#### Defined in

[types.ts:854](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L854)

***

### allowedCounterpartyTypes?

> `optional` **allowedCounterpartyTypes**: [`PersonType`](../enumerations/PersonType.md)[]

#### Defined in

[types.ts:855](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L855)

***

### counterpartyAssist?

> `optional` **counterpartyAssist**: [`CounterpartyAssistConfig`](../type-aliases/CounterpartyAssistConfig.md)

#### Defined in

[types.ts:859](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L859)

***

### fields?

> `optional` **fields**: [`FieldTypes`](../type-aliases/FieldTypes.md)

#### Defined in

[types.ts:856](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L856)

***

### hide?

> `optional` **hide**: [`ValidationSections`](../enumerations/ValidationSections.md)[]

#### Defined in

[types.ts:858](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L858)

***

### jurisdiction?

> `optional` **jurisdiction**: `string`

#### Defined in

[types.ts:853](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L853)

***

### proofs?

> `optional` **proofs**: `object`

#### deminimis?

> `optional` **deminimis**: [`ThresholdOptions`](ThresholdOptions.md)

#### fallbacks?

> `optional` **fallbacks**: [`ProofTypes`](../enumerations/ProofTypes.md)[]

#### microTransfer?

> `optional` **microTransfer**: `object`

##### microTransfer.amountSubunits

> **amountSubunits**: `string`

##### microTransfer.destination

> **destination**: `string`

#### reuseProof?

> `optional` **reuseProof**: `boolean`

#### Defined in

[types.ts:843](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L843)

***

### vasps?

> `optional` **vasps**: [`VASPOptions`](../type-aliases/VASPOptions.md)

#### Defined in

[types.ts:857](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L857)
