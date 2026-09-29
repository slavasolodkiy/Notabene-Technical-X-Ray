[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / HostMessage

# Type Alias: HostMessage\<T, O\>

> **HostMessage**\<`T`, `O`\>: [`UpdateValue`](UpdateValue.md)\<`T`, `O`\>

Union type representing all possible messages that can be sent from the host application
to a component

## Type Parameters

• **T**

The value type that components operate on

• **O**

The options type used to configure component behavior

## Remarks

Currently only supports update messages which allow the host to modify component
and configuration. The host uses these messages to communicate changes to the component
without requiring full reinitialization.

## See

 - [UpdateValue](UpdateValue.md) For the structure of update messages
 - [HMType](../enumerations/HMType.md) For message type constants

## Defined in

[types.ts:1074](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1074)
