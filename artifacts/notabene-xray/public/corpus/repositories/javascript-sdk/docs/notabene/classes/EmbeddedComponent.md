[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [notabene](../README.md) / EmbeddedComponent

# Class: EmbeddedComponent\<V, O\>

An embedded Notabene component

## Type Parameters

• **V**

• **O**

## Constructors

### new EmbeddedComponent()

> **new EmbeddedComponent**\<`V`, `O`\>(`url`, `value`, `options`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<`V`, `O`\>

Creates an instance of EmbeddedComponent.

#### Parameters

##### url

`string`

The URL of the embedded component

##### value

`Partial`\<`V`\>

The initial transaction value

##### options?

`O`

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<`V`, `O`\>

#### Defined in

[components/EmbeddedComponent.ts:34](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L34)

## Accessors

### errors

#### Get Signature

> **get** **errors**(): [`ValidationError`](../../types/type-aliases/ValidationError.md)[]

##### Returns

[`ValidationError`](../../types/type-aliases/ValidationError.md)[]

#### Defined in

[components/EmbeddedComponent.ts:72](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L72)

***

### options

#### Get Signature

> **get** **options**(): `undefined` \| `O`

##### Returns

`undefined` \| `O`

#### Defined in

[components/EmbeddedComponent.ts:68](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L68)

***

### url

#### Get Signature

> **get** **url**(): `string`

Gets the URL of the embedded component

##### Returns

`string`

The URL of the embedded component

#### Defined in

[components/EmbeddedComponent.ts:56](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L56)

***

### value

#### Get Signature

> **get** **value**(): `Partial`\<`V`\>

Gets the current transaction value

##### Returns

`Partial`\<`V`\>

The current transaction value

#### Defined in

[components/EmbeddedComponent.ts:64](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L64)

## Methods

### closeModal()

> **closeModal**(): `void`

Closes the modal dialog

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:240](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L240)

***

### completion()

> **completion**(): `Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

Waits for the component to complete and returns the transaction response

#### Returns

`Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

A promise that resolves with the transaction response

#### Defined in

[components/EmbeddedComponent.ts:173](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L173)

***

### embed()

> **embed**(`parent`, `modal`): `void`

Embeds the component into a parent element

#### Parameters

##### parent

`Element`

The parent element to embed the component into

##### modal

`boolean` = `false`

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:100](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L100)

***

### mount()

> **mount**(`parentId`): `void`

Mounts the component to a parent element

#### Parameters

##### parentId

`string`

The ID of the parent element

#### Returns

`void`

#### Throws

Will throw an error if the parent element is not found

#### Defined in

[components/EmbeddedComponent.ts:90](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L90)

***

### off()

> **off**(`messageType`, `callback`): `void`

Removes an event listener for a specific message type

#### Parameters

##### messageType

`string`

The type of message to stop listening for

##### callback

[`MessageCallback`](../type-aliases/MessageCallback.md)\<`V`\>

The callback function to remove

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:154](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L154)

***

### on()

> **on**(`messageType`, `callback`): () => `void`

Adds an event listener for a specific message type

#### Parameters

##### messageType

`string`

The type of message to listen for

##### callback

[`MessageCallback`](../type-aliases/MessageCallback.md)\<`V`\>

The callback function to execute when the message is received

#### Returns

`Function`

##### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:144](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L144)

***

### open()

> **open**(): `void`

Opens the component URL in the current window

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:80](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L80)

***

### openModal()

> **openModal**(): `Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

Opens the component in a modal dialog

#### Returns

`Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

#### Defined in

[components/EmbeddedComponent.ts:202](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L202)

***

### popup()

> **popup**(): `Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

Opens the component in a popup window. This may be needed to support many self-hosted wallets

#### Returns

`Promise`\<[`TransactionResponse`](../../types/interfaces/TransactionResponse.md)\<`V`\>\>

A promise that resolves with the transaction response

#### See

 - [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#restrictions)
 - [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)

#### Defined in

[components/EmbeddedComponent.ts:255](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L255)

***

### removeEmbed()

> **removeEmbed**(): `void`

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:126](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L126)

***

### send()

> **send**(`message`): `void`

Sends a message to the embedded component

#### Parameters

##### message

[`HostMessage`](../../types/type-aliases/HostMessage.md)\<`V`, `O`\>

The message to send

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:134](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L134)

***

### update()

> **update**(`value`, `options`?): `void`

Updates the transaction value and sends an update message to the component

#### Parameters

##### value

`Partial`\<`V`\>

The new transaction value

##### options?

`O`

#### Returns

`void`

#### Defined in

[components/EmbeddedComponent.ts:162](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/components/EmbeddedComponent.ts#L162)
