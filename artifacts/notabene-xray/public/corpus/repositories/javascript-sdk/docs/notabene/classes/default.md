[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [notabene](../README.md) / default

# Class: default

Primary constructor for Notabene UX elements

This class provides methods to create and manage various Notabene components
such as withdrawal assist, deposit assist, connect, and deposit request.
It also handles URL generation and fragment decoding for these components.

## Constructors

### new default()

> **new default**(`config`): [`default`](default.md)

Creates a new instance of the Notabene SDK

#### Parameters

##### config

[`NotabeneConfig`](../interfaces/NotabeneConfig.md)

Configuration options for the Notabene SDK

#### Returns

[`default`](default.md)

#### Defined in

[notabene.ts:217](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L217)

## Methods

### componentUrl()

> **componentUrl**\<`V`, `O`\>(`path`, `value`, `configuration`?, `callbacks`?): `string`

**`Internal`**

Generates a URL for a Notabene component

#### Type Parameters

• **V**

• **O**

#### Parameters

##### path

`string`

The path of the component

##### value

`V`

Transaction data

##### configuration?

`O`

Optional transaction configuration

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

`string`

component URL

#### Defined in

[notabene.ts:235](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L235)

***

### createComponent()

> **createComponent**\<`V`, `O`\>(`path`, `value`, `options`?, `callbacks`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<`V`, `O`\>

**`Internal`**

Creates a new embedded component

#### Type Parameters

• **V**

• **O**

#### Parameters

##### path

`string`

The path of the component

##### value

`Partial`\<`V`\>

Transaction data

##### options?

`O`

Optional transaction options

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<`V`, `O`\>

A new EmbeddedComponent instance

#### Defined in

[notabene.ts:277](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L277)

***

### createConnectWallet()

> **createConnectWallet**(`value`, `options`?, `callbacks`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<[`ConnectionRequest`](../../types/interfaces/ConnectionRequest.md), [`ConnectionOptions`](../../types/type-aliases/ConnectionOptions.md)\>

**`Alpha`**

Creates a connect component

#### Parameters

##### value

[`ConnectionRequest`](../../types/interfaces/ConnectionRequest.md)

Connection request data

##### options?

[`ConnectionOptions`](../../types/type-aliases/ConnectionOptions.md)

Optional transaction options

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<[`ConnectionRequest`](../../types/interfaces/ConnectionRequest.md), [`ConnectionOptions`](../../types/type-aliases/ConnectionOptions.md)\>

A new EmbeddedComponent instance for connection

#### Defined in

[notabene.ts:320](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L320)

***

### createDepositAssist()

> **createDepositAssist**(`value`, `options`?, `callbacks`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<[`Deposit`](../../types/interfaces/Deposit.md), [`TransactionOptions`](../../types/interfaces/TransactionOptions.md)\>

Creates a deposit assist component

#### Parameters

##### value

`Partial`\<[`Deposit`](../../types/interfaces/Deposit.md)\>

Partial deposit transaction data

##### options?

[`TransactionOptions`](../../types/interfaces/TransactionOptions.md)

Optional transaction options

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<[`Deposit`](../../types/interfaces/Deposit.md), [`TransactionOptions`](../../types/interfaces/TransactionOptions.md)\>

A new EmbeddedComponent instance for deposit assistance

#### Defined in

[notabene.ts:364](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L364)

***

### createDepositRequest()

> **createDepositRequest**(`value`, `options`?, `callbacks`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<[`DepositRequest`](../../types/interfaces/DepositRequest.md), [`DepositRequestOptions`](../../types/interfaces/DepositRequestOptions.md)\>

Creates a deposit request component

#### Parameters

##### value

[`DepositRequest`](../../types/interfaces/DepositRequest.md)

Deposit request data

##### options?

[`DepositRequestOptions`](../../types/interfaces/DepositRequestOptions.md)

Optional transaction options

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<[`DepositRequest`](../../types/interfaces/DepositRequest.md), [`DepositRequestOptions`](../../types/interfaces/DepositRequestOptions.md)\>

A new EmbeddedComponent instance for deposit requests

#### Defined in

[notabene.ts:342](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L342)

***

### createWithdrawalAssist()

> **createWithdrawalAssist**(`value`, `options`?, `callbacks`?): [`EmbeddedComponent`](EmbeddedComponent.md)\<[`Withdrawal`](../../types/interfaces/Withdrawal.md), [`TransactionOptions`](../../types/interfaces/TransactionOptions.md)\>

Creates a withdrawal assist component

#### Parameters

##### value

`Partial`\<[`Withdrawal`](../../types/interfaces/Withdrawal.md)\>

Withdrawal transaction data

##### options?

[`TransactionOptions`](../../types/interfaces/TransactionOptions.md)

Optional transaction options

##### callbacks?

[`CallbackOptions`](../../types/interfaces/CallbackOptions.md)

Optional callback configuration

#### Returns

[`EmbeddedComponent`](EmbeddedComponent.md)\<[`Withdrawal`](../../types/interfaces/Withdrawal.md), [`TransactionOptions`](../../types/interfaces/TransactionOptions.md)\>

A new EmbeddedComponent instance for withdrawal assistance

#### Defined in

[notabene.ts:298](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/notabene.ts#L298)
