[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / InvalidValue

# Type Alias: InvalidValue\<T\>

> **InvalidValue**\<`T`\>: `object`

**`Internal`**

Represents an invalid value component message

## Type Parameters

• **T**

The overall Value type being returned

## Type declaration

### errors

> **errors**: [`ValidationError`](ValidationError.md)[]

### type

> **type**: [`INVALID`](../enumerations/CMType.md#invalid)

### value

> **value**: `Partial`\<`T`\>

## Param

The current Partial value

## Param

Array of validation errors

## Defined in

[types.ts:955](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L955)
