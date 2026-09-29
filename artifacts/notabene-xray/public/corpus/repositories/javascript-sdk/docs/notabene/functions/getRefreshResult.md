[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [notabene](../README.md) / getRefreshResult

# Function: getRefreshResult()

> **getRefreshResult**\<`T`\>(`refreshSource`): `Promise`\<[`ConnectionResult`](../type-aliases/ConnectionResult.md)\<`T`\>\>

Retrieves and processes connection refresh data

## Type Parameters

• **T** *extends* [`ComponentRequest`](../../types/interfaces/ComponentRequest.md)

Type of component request

## Parameters

### refreshSource

[`RefreshSource`](../../types/interfaces/RefreshSource.md)

Source information for the refresh operation

## Returns

`Promise`\<[`ConnectionResult`](../type-aliases/ConnectionResult.md)\<`T`\>\>

Promise resolving to connection result with decrypted data

## Defined in

[utils/connections.ts:60](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L60)
