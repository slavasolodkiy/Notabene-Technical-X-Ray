[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / UpdateValue

# Type Alias: UpdateValue\<T, O\>

> **UpdateValue**\<`T`, `O`\>: `object`

Message type for updating component state and configuration from host application

## Type Parameters

• **T**

The type of the value being updated

• **O**

The type of the optional configuration parameters

## Type declaration

### options?

> `optional` **options**: `O`

### type

> **type**: [`UPDATE`](../enumerations/HMType.md#update)

### value

> **value**: `Partial`\<`T`\>

## Remarks

Defines the structure of update messages sent from host to component:
- type: Identifies this as an update message
- value: New partial state/data to update the component with
- options: Optional configuration parameters to modify component behavior

The host can use this to dynamically update both the component's data
and its configuration without requiring a full reload/reinitialize.

## See

 - [HMType](../enumerations/HMType.md) For message type constants
 - [HostMessage](HostMessage.md) For full host message type union

## Defined in

[types.ts:1052](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1052)
