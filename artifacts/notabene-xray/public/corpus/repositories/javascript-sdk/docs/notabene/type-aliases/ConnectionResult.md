[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [notabene](../README.md) / ConnectionResult

# Type Alias: ConnectionResult\<T\>

> **ConnectionResult**\<`T`\>: \{ `id`: [`UUID`](../../types/type-aliases/UUID.md); `metadata`: [`ConnectionMetadata`](../interfaces/ConnectionMetadata.md); `status`: `"closed"`; \} \| \{ `id`: [`UUID`](../../types/type-aliases/UUID.md); `metadata`: [`ConnectionMetadata`](../interfaces/ConnectionMetadata.md); `result`: [`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`T`\>; `status`: `"completed"`; \} \| \{ `id`: [`UUID`](../../types/type-aliases/UUID.md); `metadata`: [`ConnectionMetadata`](../interfaces/ConnectionMetadata.md); `status`: `"active"`; `tx`: `T`; \}

## Type Parameters

• **T** *extends* [`ComponentRequest`](../../types/interfaces/ComponentRequest.md)

## Defined in

[utils/connections.ts:35](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L35)
