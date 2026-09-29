[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / ComponentMessage

# Type Alias: ComponentMessage\<T\>

> **ComponentMessage**\<`T`\>: [`Completed`](Completed.md)\<`T`\> \| [`Cancel`](Cancel.md) \| [`Error`](Error.md) \| [`Ready`](Ready.md) \| [`ResizeRequest`](ResizeRequest.md) \| [`InvalidValue`](InvalidValue.md)\<`T`\> \| [`Warning`](Warning.md) \| [`Info`](Info.md)

Union type representing all possible messages that can be sent from a component

## Type Parameters

• **T**

The value type that will be returned in Completed messages

## Remarks

Components communicate their state and results back to the host application
through these message types:
- Completed: Operation finished successfully with response data
- Cancel: User cancelled the operation
- Error: Operation failed with error message
- ResizeRequest: Component needs to adjust its dimensions
- InvalidValue: Validation failed with current partial value

## See

 - [Completed](Completed.md) For successful completion message format
 - [Cancel](Cancel.md) For cancellation message format
 - [Error](Error.md) For error message format
 - [Ready](Ready.md) For ready message format
 - [ResizeRequest](ResizeRequest.md) For resize message format
 - [InvalidValue](InvalidValue.md) For validation failure message format
 - [Warning](Warning.md) For warning message format
 - [Info](Info.md) For info message format

## Defined in

[types.ts:1009](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L1009)
