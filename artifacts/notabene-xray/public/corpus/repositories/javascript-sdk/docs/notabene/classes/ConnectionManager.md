[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [notabene](../README.md) / ConnectionManager

# Class: ConnectionManager

Manages encrypted connections using Cloudflare Durable Objects

## Constructors

### new ConnectionManager()

> **new ConnectionManager**(`endpoint`): [`ConnectionManager`](ConnectionManager.md)

#### Parameters

##### endpoint

`string`

#### Returns

[`ConnectionManager`](ConnectionManager.md)

#### Defined in

[utils/connections.ts:115](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L115)

## Methods

### close()

> **close**(`id`): `Promise`\<`void`\>

Closes a connection

#### Parameters

##### id

`string`

Connection ID

#### Returns

`Promise`\<`void`\>

Promise resolving when the connection is closed

#### Defined in

[utils/connections.ts:262](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L262)

***

### create()

> **create**\<`T`\>(`data`, `metadata`): `Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Creates a new encrypted connection

#### Type Parameters

• **T** *extends* [`ComponentRequest`](../../types/interfaces/ComponentRequest.md)

Type of component request

#### Parameters

##### data

[`ConnectionData`](../interfaces/ConnectionData.md)\<`T`\>

The component request data to encrypt and store

##### metadata

[`ConnectionMetadata`](../interfaces/ConnectionMetadata.md)

Connection metadata including participants and transaction type

#### Returns

`Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Promise resolving to connection details including ID, version, and encryption key

#### Defined in

[utils/connections.ts:126](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L126)

***

### get()

> **get**\<`T`\>(`id`, `key`): `Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Retrieves and decrypts connection data

#### Type Parameters

• **T** *extends* [`ComponentRequest`](../../types/interfaces/ComponentRequest.md)

Type of component request

#### Parameters

##### id

`string`

Connection ID

##### key

`string`

Encryption key from previous create/update operation

#### Returns

`Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Promise resolving to connection details including decrypted data

#### Defined in

[utils/connections.ts:223](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L223)

***

### update()

> **update**\<`T`\>(`id`, `data`, `version`, `status`, `key`): `Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Updates an existing connection with new encrypted data

#### Type Parameters

• **T** *extends* [`ComponentRequest`](../../types/interfaces/ComponentRequest.md)

Type of component request

#### Parameters

##### id

`string`

Connection ID

##### data

[`ConnectionData`](../interfaces/ConnectionData.md)\<`T`\>

New data to encrypt and store

##### version

`number`

Current version number

##### status

[`ConnectionStatus`](../type-aliases/ConnectionStatus.md)

New connection status

##### key

`string`

Current encryption key

#### Returns

`Promise`\<[`ConnectionResponse`](../interfaces/ConnectionResponse.md)\<`T`\>\>

Promise resolving to updated connection details including new encryption key

#### Defined in

[utils/connections.ts:174](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/utils/connections.ts#L174)
