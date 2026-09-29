<div align="center">

<img src="https://assets-global.website-files.com/5e68f0772de982756aa8c1a4/5eee5fb470215e6ecdc34b94_Full_transparent_black_1280x413.svg" height=50>
<br>
# Notabene SafeConnect Components JavaScript SDK

[![pipeline status](https://gitlab.com/notabene/open-source/javascript-sdk/badges/master/pipeline.svg)](https://gitlab.com/notabene/open-source/javascript-sdk/-/commits/master)
[![npm version](https://img.shields.io/npm/v/@notabene/javascript-sdk.svg)](https://www.npmjs.com/package/@notabene/javascript-sdk)
[![npm downloads](https://img.shields.io/npm/dm/@notabene/javascript-sdk.svg)](https://www.npmjs.com/package/@notabene/javascript-sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@notabene/javascript-sdk)](https://bundlephobia.com/package/@notabene/javascript-sdk)
[![Types](https://img.shields.io/npm/types/@notabene/javascript-sdk)](https://www.npmjs.com/package/@notabene/javascript-sdk)
[![License](https://img.shields.io/npm/l/@notabene/javascript-sdk)](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/main/LICENSE.md)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@notabene/javascript-sdk)](https://libraries.io/npm/@notabene%2Fjavascript-sdk)

This library is the JavaScript SDK for loading the Notabene UX components in the front-end.

[Additional Documentation](https://devx.notabene.id/docs/embedded=ux)

</div>

## Table of Contents

- [Notabene SafeConnect Components JavaScript SDK](#notabene-safeconnect-components-javascript-sdk)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Core Concepts](#core-concepts)
    - [Authentication](#authentication)
  - [General Component Usage](#general-component-usage)
    - [Embedded Component](#embedded-component)
      - [Dynamic updates](#dynamic-updates)
    - [Modal](#modal)
    - [Popup](#popup)
    - [Linked Component](#linked-component)
  - [Components](#components)
  - [Assisted Withdrawal](#assisted-withdrawal)
    - [Parameters](#parameters)
    - [Configuration Options](#configuration-options)
  - [Connect Wallet](#connect-wallet)
    - [Parameters](#parameters-1)
    - [Configuration Options](#configuration-options-1)
  - [Deposit Request](#deposit-request)
    - [Parameters](#parameters-2)
  - [Deposit Assist](#deposit-assist)
    - [Parameters](#parameters-3)
  - [Invoice Reader](#invoice-reader)
    - [Response](#response)
  - [Counterparty Assist](#counterparty-assist)
    - [Use Cases](#use-cases)
    - [Counterparty Assist Configuration](#counterparty-assist-configuration)
    - [Component Response](#component-response)
    - [Retrieving Completed Data](#retrieving-completed-data)
  - [Error handling](#error-handling)
      - [Error reference](#error-reference)
  - [Warning Message handling](#warning-message-handling)
      - [Warning reference](#warning-reference)
  - [Info Message handling](#info-message-handling)
      - [Info reference](#info-reference)
  - [Transaction parameters](#transaction-parameters)
    - [Asset specification](#asset-specification)
    - [Transaction amount](#transaction-amount)
    - [Destination](#destination)
    - [Origin](#origin)
    - [Asset Price](#asset-price)
  - [Configuration](#configuration)
    - [Transaction Options](#transaction-options)
    - [Common use cases](#common-use-cases)
      - [Only allow first party transactions](#only-allow-first-party-transactions)
      - [Only VASP to VASP transactions](#only-vasp-to-vasp-transactions)
      - [Only Self-hosted wallet transactions](#only-self-hosted-wallet-transactions)
    - [Agent Section Layout](#agent-section-layout)
      - [Section Options](#section-options)
      - [Fallback Promotion](#fallback-promotion)
      - [Legacy Behavior](#legacy-behavior)
      - [Contact Support](#contact-support)
    - [Configuring ownership proofs](#configuring-ownership-proofs)
      - [Supporting Micro Transactions (aka Satoshi tests)](#supporting-micro-transactions-aka-satoshi-tests)
      - [Fallback Proof Options](#fallback-proof-options)
    - [Counterparty Field Properties](#counterparty-field-properties)
      - [Full Example](#full-example)
      - [Field reference](#field-reference)
    - [Configure Counterparty Assist](#counterparty-assist-configuration)
  - [Locales](#locales)
  - [Theming](#theming)
  - [License](#license)

## Installation

There are two options for loading the Notabene SDK:

```bash
<script id="notabene" async src="https://unpkg.com/@notabene/javascript-sdk@next/dist/notabene.js"></script>
```

Or installing the library:

Using Yarn:

```bash
yarn add @notabene/javascript-sdk
```

Using NPM:

```bash
npm install @notabene/javascript-sdk
```

If you installed the library into your project, you can import it into your project:

```js
import Notabene from '@notabene/javascript-sdk';
```

## Quick Start

```js
// 1. Create Notabene instance
const notabene = new Notabene({
  nodeUrl: 'https://api.notabene.id',
  authToken: 'YOUR_CUSTOMER_TOKEN',
});

// 2. Create and mount withdrawal component
const withdrawal = notabene.createWithdrawalAssist({
  asset: 'ETH',
  destination: '0x1234...',
  amountDecimal: 1.0,
});
withdrawal.mount('#nb-withdrawal');

// 3. Handle completion
const { valid, value, txCreate } = await withdrawal.completion();
if (valid) {
  // Submit to your backend
}
```

## Core Concepts

### Authentication

Use the [customer token endpoint](https://devx.notabene.id/docs/customertoken) with your access token to receive a token with a customer's scope.

> ⚠️ **IMPORTANT** ⚠️
>
> When requesting the `customer token` you **must pass a unique `customerRef` per customer** for ownership proof reusability, otherwise you might encounter unwanted behavior.

Create a new Notabene instance:

```js
const notabene = new Notabene({
  nodeUrl: 'https://api.notabene.id', // use `https://api.notabene.dev` for testing
  authToken: '{CUSTOMER_TOKEN}',
  locale: 'de', // default locale = `en`
});
```

Use the same `nodeUrl` that you use to interact with the Notabene API.

## General Component Usage

Each component can be used in various ways depending on your use case.

### Embedded Component

This will let you embed the component into your existing withdrawal flow.

Create an html element to contain the component:

```html
<div id="nb-withdrawal/>
```

Instantiate the withdrawal element and mount it using the id from above

```js
const withdrawal = notabene.createWithdrawalAssist(tx, options);
withdrawal.mount('#nb-withdrawal');
```

The simplest way to get the result is to use:

```js
try {
  const { valid, value, txCreate, ivms101, proof } =
    await withdrawal.completion();
  if (valid) {
    // Submit result to your backend
  }
} catch (e) {
  console.error(e);
}
```

#### Dynamic updates

To update the component as users enter transaction details:

```js
withdrawal.update({
  asset: 'ETH',
  destination: '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819',
  amountDecimal: 1.12,
});
```

To be notified once the validation is completed so you can submit the withdrawal to your back end:

```js
withdrawal.on('complete', { valid, value, txCreate, ivms101, proof } => ...)
```

To be notified of any validation errors use:

```js
withdrawal.on('error',error => ...)
```

To be notified of any errors that won't require remounting the instance use:

```js
withdrawal.on('warning', error => ...)
```

To be notified when the component is Ready:

```js
withdrawal.on('ready', ({ type }) => {
  console.log(type === 'ready');
});
```

Calling `on` returns a function that will allow you to cleanly unsubscribe.

```js
const unsubscribe = withdrawal.on('complete', { valid, value, txCreate, ivms101, proof } => ...)

// Clean up
unsubscribe()

```

### Modal

All components support being opened in a modal using `openModal()`, which returns a promise.

```js
const withdrawal = notabene.createWithdrawalAssist(tx, options);
try {
  const { valid, value, txCreate, ivms101, proof } =
    await withdrawal.openModal();
  if (valid) {
    // Submit result to your backend
  }
} catch (e) {
  console.error(e);
}
```

### Popup

All components support being opened in a popup window using `popup()`, which returns a promise.

Many embedded wallets refuse to work in an iframe. In this case it is better to use a popup window.

Unfortunately there are also some restrictions on popup windows:

- [Popup window Restrictions](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#restrictions)

* [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)

```js
const withdrawal = notabene.createWithdrawalAssist(tx, options);
try {
  const { valid, value, txCreate, ivms101, proof } = await withdrawal.popup();
  if (valid) {
    // Submit result to your backend
  }
} catch (e) {
  console.error(e);
}
```

### Linked Component

In some cases, in particular institutional or mobile apps you may prefer to link your customers to the component through an email or redirect the user to it in a mobile app.

```js
const withdrawal = notabene.createWithdrawalAssist(tx, options, {
  callback: /// a serverside backend url
  redirectUri: // URI of website or mobile app to redirect user to after completion
});

// NodeJS redirect. Link also works in an email.
res.redirect(withdrawal.url);
```

Bear in mind that this is a full screen view for your users.

The two parameters that should be configured are:

- `callback` - a URL for your serverside. On completion this will receive an HTTP POST with the result as a json body and the `authToken` as an `Authorization: Bearer` header.
- `redirectUri` - the user will be redirected here on completion. The result parameters will be json encoded in the URL fragment. You can use a mobile app schema to intercept these in your mobile app.

**Note** for data privacy reasons the callback will be coming from your users web browser and not from our infrastructure, so no static IP is currently possible. Instead please check the `authToken` provided with the request.

## Components

## Assisted Withdrawal

The Withdrawal Assist component helps you collect additional required information from your user during a standard crypto withdrawal process.

```js
const withdrawal = notabene.createWithdrawalAssist({
  asset: 'ETH',
  destination: '0x...',
  amountDecimal: 1.23,
  assetPrice: {
    currency: 'USD', // ISO currency code
    price: 1700.12, // Asset price
  },
  customer: {
    name: 'John Smith',
    email: "john.smith@domain.com",
  },
});
```

### Parameters

- `asset`: The cryptocurrency or token being transferred. See [Asset Specification](#asset-specification)
- `destination`: The destination or blockchain address for the withdrawal. See [Destination](#destination)
- `amountDecimal`: The amount to transfer in decimal format. See [Transaction Amount](#transaction-amount)
- `assetPrice`: Optional price information in a fiat currency. See [Asset Price](#asset-price)
- `customer`: Optional Customer object containing their name and email

If any of the required parameters are missing the component will just show the Notabene badge.

### Configuration Options

Include configuration Options as a second optional parameter:

```js
const withdrawal = notabene.createWithdrawalAssist(
  {
    asset: 'ETH',
    destination: '0x...',
    amountDecimal: 1.23,
    assetPrice: {
      currency: 'USD', // ISO currency code
      price: 1700.12, // Asset price
    },
    customer: {
      name: 'John Smith',
      email: "john.smith@domain.com",
    },
  },
  {
    proofs: {
      microTransfer: {
        destination: '0x...',
        amountSubunits: '12344',
        requireHash: true,
      },
    },
  },
);
```

See [Transaction Options](#transaction-options)

## Connect Wallet

The Connect Wallet component helps you collect and verify the address of your users self-hosted wallet in one go.

### Parameters

- `asset`: The cryptocurrency or token being transferred. See [Asset Specification](#asset-specification)
- `address`: Optional account to collect a proof for, as a blockchain address or CAIP-10 identifier. When set, the component narrows the connected wallet to this account and only offers to verify that one; connecting fails if the wallet does not hold it. When omitted, the user chooses which of their addresses to prove.

```js
const connect = notabene.createConnectWallet({
  asset: 'ETH',
  address: '0x...',
});

const { proof, txCreate } = await connect.openModal();
```

The proved account is returned on `proof.address` as a CAIP-10 identifier.

## Deposit Request

The Deposit Request lets your customers request deposits that are fully Travel Rule compliant.

```js
const depositRequest = notabene.createDepositRequest({
  asset: 'ETH',
  destination: '0x...',
  amountDecimal: 1.23,
  customer: {
    name: 'John Smith',
  },
});
```

### Parameters

- `asset`: The cryptocurrency or token being transferred. See [Asset Specification](#asset-specification)
- `destination`: The destination or blockchain address for the withdrawal. See [Destination](#destination)
- `amountDecimal`: Optional amount to deposit in decimal format. See [Transaction Amount](#transaction-amount)
- `customer`: Optional Customer object containing their name

If any of the required parameters are missing the component will just show the Notabene badge.

## Deposit Assist

The Deposit Assist component helps you collect missing Travel Rule data after a deposit has already been recorded on-chain. For example, if the deposit arrived with incomplete originator information, you can use Deposit Assist to request this information from your end-user.

```js
const deposit = notabene.createDepositAssist(
  {
    asset: 'ETH',
    amountDecimal: 1.23,
    source: '0x...',
    transactionId: "UUID"
  },
  {
    // Optional transaction options
  },
);
```

### Parameters

- `asset`: The cryptocurrency or token being transferred. See [Asset Specification](#asset-specification)
- `source`: The source or blockchain address for the deposit. See [Origin](#origin)
- `amountDecimal`: Optional amount to deposit in decimal format. See [Transaction Amount](#transaction-amount)
- `transactionId`: Optional transactionId of a Notabene transaction. Will be returned with the payload to assist updating the Transaction

If any of the required parameters are missing the component will just show the Notabene badge.

## Invoice Reader

The Invoice Reader component extracts structured [TAIP-16](https://tap.rsvp/TAIPs/taip-16) invoice data from a PDF invoice. The component renders a drag-and-drop upload UI; once the user drops a PDF, it is parsed and the extracted invoice, merchant, and customer data are returned to the host.

It takes no input parameters.

```js
const reader = notabene.createInvoiceReader();
reader.mount('#nb-invoice-reader');

const { invoice, merchant, customer } = await reader.completion();
```

It also supports `openModal()` and `popup()` like the other components:

```js
// Modal
const { invoice, merchant, customer } = await notabene
  .createInvoiceReader()
  .openModal();

// Popup
const { invoice, merchant, customer } = await notabene
  .createInvoiceReader()
  .popup();
```

### Response

The component emits a `complete` event (and resolves the `completion()` / `openModal()` / `popup()` promise) with an `InvoiceReaderResponse`:

| Field      | Type      | Description                                                                                       |
|------------|-----------|---------------------------------------------------------------------------------------------------|
| `invoice`  | `Invoice` | The parsed TAIP-16 invoice (id, issueDate, currencyCode, lineItems, total, taxTotal, …)           |
| `merchant` | `Party`   | The parsed TAIP-16 party issuing the invoice, extracted from the PDF                                             |
| `customer` | `Party`   | The  parsed TAIP-16 party the invoice is addressed to, extracted from the PDF                                     |

All fields are optional — if the PDF cannot be parsed or a section is missing, the corresponding field will be `undefined`.

---

## Counterparty Handoff

**Counterparty Assist** is a feature built into the existing **Withdrawal** and **Deposit Assist** components. When enabled, it allows users to hand off data collection to a counterparty — or to another device — by sharing a secure link. This helps ensure more accurate and complete information, especially when the counterparty is best suited to provide the required data.

This feature does not function as a standalone component. Instead, it augments the Withdrawal and Deposit flows when configured.

### Use Cases

#### Third Parties (`natural`, `legal`)

During the counterparty data collection step, users can generate and share a link to allow third-party counterparties (individuals or organizations) to enter their own data. This ensures data accuracy and supports robust address verification by allowing the rightful owner to provide the necessary information.

#### First Parties (`self`)

During the address verification step, users can share a link to complete self-hosted wallet proof submissions on another device. This is especially useful if the original device used to initiate the process doesn't support signing or wallet access.

### Counterparty Assist Configuration

You can enable **Counterparty Assist** by specifying the counterparty types you want the feature to apply to using the counterpartyAssist configuration field.

- `false`: Disable the feature explicitly
- `undefined` (not configured): Feature is disabled by default
- `{ counterpartyTypes: [PersonType.SELF, PersonType.NATURAL, PersonType.LEGAL] }`: Enable for specific counterparty types

**Example Config**

```js
import Notabene, {
  PersonType,
} from '@notabene/javascript-sdk';

// Counterparty assist is enabled for specific counterparty types
const options: TransactionOptions = {
  ...
  counterpartyAssist: {
    counterpartyTypes: [
      PersonType.LEGAL,   // JS: 'legal'
      PersonType.NATURAL, // JS: 'natural'
      PersonType.SELF,    // JS: 'self'
    ],
  }
};
```

### Component Response

The component emits a response once a participant has completed their portion of the process. Depending on the party type — **Third Party** (`natural`, `legal`) or **First Party** (`self`) — the behavior and expectations differ slightly.

#### Third Parties (`natural`, `legal`)

When a third party completes their step after following the shared link, the host application will receive a **`COMPLETE`** message from the component. However, because not all required data may be available at this point, the `response` object will include the information gathered so far, along with a `refreshSource` field. This allows the host to fetch the latest encrypted data once it's available.

##### Refresh Source Fields

| Field | Type   | Description                                                                                      |
|-------|--------|--------------------------------------------------------------------------------------------------|
| `url` | URI    | The endpoint where the host can retrieve the encrypted data.                                     |
| `key` | string | The encryption key used to decrypt the PII (Personally Identifiable Information). Not stored by Notabene. |

**Example Response**

```js
{
  type: CMType.COMPLETE, // 'complete'
  response: { // transaciton data + refresh source
    destination: "0xFf9A04788972C3803959454ECAE1ed327826a216",
    asset: "eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      customer: {
        type: "natural",
        name: "sdfsd",
        email: "sdjlf@sdlfj.com"
      },
    amountDecimal: 100,
    counterparty: {
      type: "natural"
    },
    account: {
      caip10: "eip155:1:0xFf9A04788972C3803959454ECAE1ed327826a216",
      blockchainAddress: "0xFf9A04788972C3803959454ECAE1ed327826a216",
      chain: "eip155:1",
      did: "did:pkh:eip155:1:0xFf9A04788972C3803959454ECAE1ed327826a216",
      valid: true
    },
    refreshSource: {
      url: "https://safe-connections.notabene.id/17f76e4c-9a2a-4c34-afcb-b4868e609a96", // endpoint to retreive data
      key: "1Lcp5SFhaMHH7CAEILrS8IWA6BXS4tFZunPx08WU5Ok=" // key that can be used to decrypt data
    }
  }
}
```

#### First Parties (`self`)

When the user is the originator (i.e., acting on their own behalf), they complete the verification process via a shared link and are then prompted to return to the original page to continue.

Upon completion, the component emits a **`COMPLETE`** response. In this case, the component handles all necessary data updates internally, so **no additional action is required from the host** to retrieve updated data. The host can directly proceed to submit the transfer to the Notabene API.

### Retrieving Completed Data  
**(Third Parties Only: `natural`, `legal`)**

When data submission is handed off to third parties, we cannot predict how long it will take them to complete the process. For this reason, we provide the host with all the information needed to retrieve the data and allow them to design how the user experiences this flow.

To simplify retrieval and decryption, we provide an asynchronous [`getRefreshResult`](./docs/notabene/functions/getRefreshResult.md) function. It accepts a `refreshSource` and returns information about the associated transaction. 


**Example**

```js
import { getRefreshResult } from "@notabene/javascript-sdk";

const transaction = await getRefreshResult({
  url: "https://safe-connections.notabene.id/17f76e4c-9a2a-4c34-afcb-b4868e609a96",
  key: "1Lcp5SFhaMHH7CAEILrS8IWA6BXS4tFZunPx08WU5Ok="
})
```

#### Response from `getRefreshResult`

| **Property** | **Type**                              | **Optional?** | **Description**                                                                 |
|--------------|---------------------------------------|---------------|---------------------------------------------------------------------------------|
| `id`         | `UUID`                                | No            | Unique identifier for the transaction.                                          |
| `metadata`   | `ConnectionMetadata`                  | No            | Metadata associated with the transaction.                                       |
| `status`     | `'active'` \| `'completed'` \| `'closed'` | No         | Current status of the transaction’s data collection.                           |
| `tx`         | `T`                                   | Yes           | Ongoing transaction data (available when status is `active`).                   |
| `result`     | `TransactionResponse<T>`              | Yes           | Finalized transaction data (available when status is `completed`).             |


**Example Active Transaction Data**

```js
{
  "id": "17f76e4c-9a2a-4c34-afcb-b4868e609a96",
  "metadata": {
    "participants": [
      "did:ethr:0x54b75d2a0925508682e65194cccb6f1e8eaafb2c"
    ],
    "nodeUrl": "https://api-qa.eu.notabene.id",
    "transactionType": "withdraw"
  },
  "status": "active",
  "tx": {
    //...
  }
}
```

**Example Completed Transaction Data**

```js
{
  "id": "17f76e4c-9a2a-4c34-afcb-b4868e609a96",
  "metadata": {
    "participants": [
      "did:ethr:0x54b75d2a0925508682e65194cccb6f1e8eaafb2c" // DID of transaction participants
    ],
    "nodeUrl": "https://api-qa.eu.notabene.dev",
    "transactionType": "withdraw"
  },
  "status": "completed",
  "result": { // the response returned from the embedded component when all information is successfully collected
    "proof": {
      //...
    },
    "txCreate": {
      //...
    },
    "errors": [],
    "status": "pending",
    "valid": true,
    "value": {
      //...
    },
    "ivms101": {
      //...
    }
  }
}

```

Once the host has retrieved the completed data, they can finalize the transaction by submitting it to the Notabene API.

## Error handling

If any error occurs, the `error` event is passed containing a message.

```ts
withdrawal.on('error', (error) => ...)
```

An example error object.

```ts
type Error = {
  type: CMType.Error;
  message: string;
  description: string;
  identifier: ErrorIdentifierCode;
};
```
Errors can be handled in this way:

```ts
component.on('error', (error) => {
  if (error.type === CMType.Error) {
    switch (error.identifier) {
      case ErrorIdentifierCode.SERVICE_UNAVAILABLE:
        // handle the error
        break;
      //...
    }
  }
});
```

#### Error reference

|                ErrorIdentifierCode          |                   Description/Message                                                          | In Use   |
|--------------------------|----------------------------------------------------------------------------------------------------------|---|
| SERVICE_UNAVAILABLE      | The Notabene service is currently unavailable                                                            | ✅  |
| TOKEN_INVALID            | Auth Token is Invalid                                                                                    | ✅  |
| WALLET_CONNECTION_FAILED | The connection to the wallet service failed, possibly due to network issues or unsupported wallet types. | ✅  |
| WALLET_NOT_SUPPORTED     | The wallet used does not support the required functionality or blockchain.                               |   |

## Warning Message Handling

Warning messages include an identifier code to help developers diagnose and handle specific error conditions.

```ts
component.on('warning', (event) => {
  switch(event.identifier) {
    case WarningIdentifierCode.WALLET_ADDRESS_NOT_CONNECTED:
      // Handle wallet connection issue
      break;
    case WarningIdentifierCode.IDV_UNAVAILABLE:
      // Handle identity verification service unavailability
      break;
    case WarningIdentifierCode.WALLET_LOCKED:
      // Handle wallet locked or password is either not entered or invalid
      break;
    case WarningIdentifierCode.WALLET_UNREACHABLE:
      // Handle wallet connection failure
      break;
    case WarningIdentifierCode.JURISDICTIONAL_REQUIREMENTS_UNAVAILABLE:
      // Handle jurisdictional compliance check failure
      break;
  }
});
```

### Warning Reference

| Identifier Code | Description | Status |
|----------------|-------------|--------|
| `WALLET_ADDRESS_NOT_CONNECTED` | The specified wallet address is not connected to the selected wallet | ✅ Active |
| `IDV_UNAVAILABLE` | Identity verification service is unavailable for the transaction  | ✅ Active |
| `WALLET_LOCKED` | The wallet in use is either locked or not open. | ✅ Active |
| `WALLET_UNREACHABLE` | Connection to wallet failed due to network issues or unsupported wallet type | ✅ Active |
| `JURISDICTIONAL_REQUIREMENTS_UNAVAILABLE` | Unable to retrieve jurisdictional compliance requirements | ✅ Active |

## Info Message handling

Info messages notify the host application of events within the component. Some are purely informational, while others (identified by an `identifier` code) may require host-side handling.

```ts
component.on('info', (event) => {
  switch (event.identifier) {
    case InfoIdentifierCode.CONTACT_SUPPORT:
      // User clicked the contact support button — open a support modal, redirect, etc.
      break;
  }
});
```

#### Info reference

| Identifier Code | Description | Status |
|----------------|-------------|--------|
| `CONTACT_SUPPORT` | User clicked the contact support button | ✅ Active |

## Transaction parameters

### Asset specification

The `asset` field the following types of assets specified:

- `notabene_asset` code passed as a`string`. See [Notabene Assets Service](https://devx.notabene.id/docs/coins-decimals#assets-service-api).
- [CAIP-19](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-19.md_) is a chain agnostic format allows you to support the widest amount of assets and blockchains including NFTs.

### Transaction amount

Use one of the following

- `amountDecimal` A number specifying the amount in decimal format. Eg. `amountDecimal=1.1` would mean 1.1 of for example BTC or ETH.

### Destination

Specify the beneficiary address as `destination` using one of the following formats:

- [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md_) is a chain agnostic format allows you to specify the specific blockchain and address
- [EIP-3770](https://eips.ethereum.org/EIPS/eip-3770) EVM URI
- [BIP-21](https://en.bitcoin.it/wiki/BIP_0021) Bitcoin URI
- Native blockchain address

### Source

Specify the originator address as `source` using one of the following formats:

- [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md_) is a chain agnostic format allows you to specify the specific blockchain and address
- [EIP-3770](https://eips.ethereum.org/EIPS/eip-3770) EVM URI
- [BIP-21](https://en.bitcoin.it/wiki/BIP_0021) Bitcoin URI
- Native blockchain address

### Asset Price

The price of the asset is used to determine certain rules based on thresholds. We recommond you pass in your price like this:

```ts
assetPrice: {
  currency: 'USD', // ISO currency code
  price: 1700.12, // Asset price
};
```

## Configuration

### Transaction Options

Some components can be configured using an optional [TransactionOptions](./docs/types/interfaces/TransactionOptions.md) object.

The following shows the full set of options in typescript:

```ts
import Notabene, {
  AgentType,
  PersonType,
  ProofTypes,
  type SectionOption,
} from '@notabene/javascript-sdk';

const options: TransactionOptions = {
  jurisdiction: "US", // Defaults to the jurisdiction associated with customer token
  agentSections: { // Explicit control over agent selection layout
    main: ['signature', 'screenshot', 'microtransfer'],
    fallback: ['add-vasp', 'self-declaration'],
    // When agentSections is set, proofs.fallbacks and vasps.addUnknown below are ignored
  },
  proofs: {
    reuseProof: true, // Defaults true
    microTransfer: {
      destination: '0x...',
      amountSubunits: '12344',
      requireHash: true,
    },
    fallbacks: [ProofTypes.Screenshot, ProofTypes.SelfDeclaration], // js ['screenshot','self-declaration']
    deminimis: {
      threshold: 1000,
      currency: 'EUR',
      proofTypes: [ProofTypes.SelfDeclaration],
    },
  },
  allowedAgentTypes: [AgentType.PRIVATE, AgentType.VASP], // js ['WALLET','VASP']
  allowedCounterpartyTypes: [
    PersonType.LEGAL, // JS: 'legal'
    PersonType.NATURAL, // JS: 'natural'
    PersonType.SELF, // JS: 'self'
  ],
  fields: {
    naturalPerson: {
      name: true, // Default true
      website: { optional: true },
      email: true,
      phone: true,
      geographicAddress: false,
      nationalIdentification: false,
      dateOfBirth: false,
      placeOfBirth: false,
      countryOfResidence: true,
    },
    legalPerson: {
      name: true, // Default true
      lei: true, // Default true
      website: { optional: true }, // Default true
      email: true,
      phone: true,
      geographicAddress: false,
      nationalIdentification: false,
      countryOfRegistration: true,
    },
  },
  vasps: {
    // V1 options — `searchable` is mutually exclusive with V2 `showTrustStatus` below
    addUnknown: true, // Allow users to add a missing VASP - Defaults to false
    onlyActive: true, // Only list active VASPs - Default false
    searchable: [
      VASPSearchControl.ALLOWED, // JS: 'allowed'
      VASPSearchControl.PENDING, // JS: 'pending'
    ], // Control searches for VASPs - Defaults to undefined
  },
  // V2 alternative — filter by trust status instead of `searchable`. `addUnknown`
  // and `onlyActive` remain valid; `searchable` cannot be combined with `showTrustStatus`:
  // vasps: {
  //   addUnknown: true,
  //   onlyActive: true,
  //   showTrustStatus: ['TRUSTED', 'NEW'], // 'TRUSTED' | 'NEW' | 'FLAGGED' | 'BANNED'
  // },
  counterpartyAssist: { // Allows users to share a link to collect counterparty data
    counterpartyTypes: [
      PersonType.LEGAL, // JS: 'legal'
      PersonType.NATURAL, // JS: 'natural'
      PersonType.SELF, // JS: 'self'
    ],
  },
  contactSupport: { // Configures the contact support button (enabled via agentSections)
    supportUrl: 'https://support.example.com',
  },
  hide: ['asset', 'destination'], // Don't show specific sections of component. Also accepts 'header' to drop the card header (icon, title, description, participant logo)
  autoSubmit: false // Automatically sends the complete event and hides the complete button -  Default false
};

const withdrawal = notabene.createWithdrawalAssist(tx, options);
```

The options can additionally be updated dynamically with the `update()` function.

```js
withdrawal.update(
  {
    asset: 'ETH',
    destination: '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819',
    amountDecimal: 1.12,
  },
  {
    proofs: {
      microTransfer: {
        destination: '0x...',
        amountSubunits: '12344',
        requireHash: true,
      },
    },
  },
);
```

### Common use cases

#### Only allow first party transactions

```ts
const firstParty: TransactionOptions = {
  allowedCounterpartyTypes: [
    PersonType.SELF, // JS: 'self'
  ],
};
```

#### Only VASP to VASP transactions

```ts
const vasp2vasp: TransactionOptions = {
  allowedAgentTypes: [AgentType.VASP], // js ['VASP']
};
```

#### Only Self-hosted wallet transactions

```ts
const options: TransactionOptions = {
  allowedAgentTypes: [AgentType.PRIVATE], // js ['WALLET']
};
```

### Configuring National Identifier Type

The National Identifier Type is a dropdown that allows the developer configure the types of national identifiers they are supporting.

```ts
const options: TransactionOptions = {
  fields: {
    naturalPerson: {
      name: {optional: false},
      nationalIdentification: {
        optional: true, // allow optional national identification
        nationalIdentifierType: {
          values: ['ARNU', 'CCPT', 'RAID', 'DRLC', 'TXID', 'SOCS'], // default values
        },
      },
    },
    legalPerson: {
      name: true,
      lei: {optional: true},
      nationalIdentification: {
        optional: false, // require national identification
        nationalIdentifierType: {
          values: ['RAID', 'TXID', 'MISC'], // default values
        },
      },
    },
  },
};
```

### Agent Section Layout

The `agentSections` option gives explicit control over which options appear in the main selection area vs. behind the "Can't find what you're looking for?" fallback toggle in the agent selection step.

```ts
const options: TransactionOptions = {
  agentSections: {
    main: ['signature', 'screenshot', 'microtransfer'],
    fallback: ['add-vasp', 'self-declaration'],
  },
};
```

When `agentSections` is provided, the following legacy fields are ignored:
- `proofs.fallbacks` — use `agentSections.fallback` instead
- `vasps.addUnknown` — include `'add-vasp'` in `agentSections` instead

Fields like `proofs.deminimis`, `proofs.microTransfer`, and `proofs.reuseProof` continue to work as before.

#### Section Options

| Option | Flow | Description |
|--------|------|-------------|
| `'signature'` | Self-hosted | Wallet connection for ownership proof via signature |
| `'self-declaration'` | Self-hosted | Self-declaration of wallet ownership (`ProofTypes.SelfDeclaration`) |
| `'screenshot'` | Self-hosted | Ownership proof via screenshot upload (`ProofTypes.Screenshot`) |
| `'microtransfer'` | Self-hosted | Ownership proof via micro-transfer (`ProofTypes.MicroTransfer`) |
| `'manual-signing'` | Self-hosted | Ownership proof via manual message signing (no `ProofTypes` equivalent) |
| `'add-vasp'` | Hosted | Manually add an unlisted exchange/VASP |
| `'contact-support'` | Both | Show a contact support button |

Options are automatically filtered by flow — e.g. `'add-vasp'` is ignored in the self-hosted tab, `'signature'` is ignored in the hosted tab. Including an option implicitly enables that capability (e.g. `'add-vasp'` enables VASP creation without needing `vasps.addUnknown`).

#### Fallback Promotion

When the main section has **no options** (either empty, omitted, or all filtered out for the current flow), fallback options are automatically promoted and shown inline instead of behind the toggle.

```ts
// Only fallback options — these get promoted to main since main is empty
const options: TransactionOptions = {
  agentSections: {
    fallback: ['self-declaration'],
  },
};
```

#### Legacy Behavior

When `agentSections` is **not** provided, the existing behavior using `proofs.fallbacks` and `vasps.addUnknown` is preserved.

#### Contact Support

Include `'contact-support'` in `agentSections.main` or `agentSections.fallback` to show a contact support button in the agent selection step.

```ts
const options: TransactionOptions = {
  agentSections: {
    main: ['signature'],
    fallback: ['contact-support'],
  },
};
```

By default, clicking the button sends an `info` message to the host application, letting the host decide what to do (open a modal, redirect, etc.).

To also provide a URL that the widget attempts to open as a fallback, use the `contactSupport` config:

```ts
const options: TransactionOptions = {
  agentSections: {
    main: ['signature'],
    fallback: ['contact-support'],
  },
  contactSupport: {
    supportUrl: 'https://support.example.com',
  },
};
```

| Property | Type | Description |
|----------|------|-------------|
| `supportUrl` | `string` | URL to open when the user clicks the support button |

> **Note:** If `'contact-support'` is not included in `agentSections`, the button is hidden regardless of the `contactSupport` configuration.

### Configuring ownership proofs

By default components support message signing proofs.

#### Supporting Micro Transactions (aka Satoshi tests)

You can support Micro Transfers (aka Satoshi tests) by adding a deposit address for the test.

Your compliance team will have to determine how to handle and verify these transactions in the rules engine or individually.

| Property | Type | Description |
|----------|------|-------------|
| `destination` | `string` | The deposit address for the micro-transfer test |
| `amountSubunits` | `string` | The amount in subunits (e.g. satoshis, wei) to send |
| `requireHash` | `boolean` | When `true`, the user must provide the transaction hash as proof (default true) |

```ts
const options: TransactionOptions = {
  proofs: {
    microTransfer: {
      destination: '0x...',
      amountSubunits: '1234',
      requireHash: true,
    },
    fallbacks: [ProofTypes.Screenshot, ProofTypes.SelfDeclaration], // js ['screenshot','self_declaration']
  },
};
```

Notabene does not currently verify these tests automatically as you likely already have the infrastructure to do so.

You will receive a response back from the component containing a proof object. For MicroTransfers it will look like this:

```ts
type MicroTransferProof {
  type: ProofTypes.MicroTransfer;
  status: ProofStatus.PENDING;
  did: DID;
  address: CAIP10; // CAIP10 account to be verified
  txhash: string; // Transaction Hash to verify
  chain: CAIP2; // CAIP2 identifier of blockchain
  amountSubunits: string; // Amount in subunits eg (satoshi or wei) to be verified
}
```

#### Fallback Proof Options

You may accept a few options if none of the other are available. We do not recommend them, as they do not provide sufficient proof. However many VASPs do allow them for now:

```ts
const options: TransactionOptions = {
  proofs: {
    fallbacks: [ProofTypes.Screenshot, ProofTypes.SelfDeclaration], // js ['screenshot','self_declaration']
  },
};
```

The two options are:

- `screenshot` Where a user is requested to upload a screenshot of their wallet
- `self-declaration` Where a user self declares that they control the wallet address

### Counterparty Field Properties

By default, counterparty fields are determined based on the rules of the jurisdiction associated with the VASP using the component. This ensures compliance even when fields are not explicitly configured.

If a specific jurisdiction is manually configured, the component will instead derive the fields according to that jurisdiction’s rules.

For VASPs seeking more granular control over the fields displayed to customers about counterparties, the fields object can be used to customize visibility. Required and optional fields can be configured independently for both natural and legal persons.

We recommend working closely with your compliance team when making these configurations, as regulatory requirements vary significantly across jurisdictions.

Each field can be configured like this:

- `true` required field
- `false` don't show
- `{ optional: true }` show but don't require

Eg:

```ts
{
  naturalPerson: {
    website: { optional: true },
    email: true,
    phone: false,
  }
}
```

The above will always ask the user for the following for natural persons:

- `name` since it is on by default (you can disable it explicitly by setting it to `false`)
- `website` is show but is optional
- `email` is required

#### Full Example

```ts
const options: TransactionOptions = {
  fields: {
    naturalPerson: {
      name: true, // Default true
      website: { optional: true },
      email: true,
      phone: true,
      geographicAddress: false,
      nationalIdentification: false,
      dateOfBirth: {
        transmit: true,
      },
      placeOfBirth: false,
      countryOfResidence: true,
    },
    legalPerson: {
      name: true, // Default true
      lei: {optional: true }, // Default optional
      website: { optional: true }, // Default optional
      email: true,
      phone: true,
      geographicAddress: false,
      nationalIdentification: false,
      countryOfRegistration: true,
    },
  },
};
```

#### Field reference

| Field name               | Natural | Legal | IVMS101 | description                                   |
| ------------------------ | ------- | ----- | ------- | --------------------------------------------- |
| `name`                   | ✅      | ✅    | 🟩      | Full name                                     |
| `email`                  | 🟩      | 🟩    | --      | Email (for your internal purposes)            |
| `website`                | --      | ✅    | --      | Business Website (for your internal purposes) |
| `phone`                  | 🟩      | 🟩    | --      | Mobile Phone (for your internal purposes)     |
| `geographicAddress`      | 🟩      | 🟩    | 🟩      | Residencial or business address               |
| `nationalIdentification` | 🟩      | 🟩    | 🟩      | National Identification number                |
| `dateOfBirth`            | 🟩      | --    | 🟩      | Date of birth                                 |
| `placeOfBirth`           | 🟩      | --    | 🟩      | Place of birth                                |
| `countryOfResidence`     | 🟩      | --    | 🟩      | Country of Residence                          |
| `lei`                    | --      | ✅    | 🟩      | LEI (Legal Entity Identifier)                 |
| `countryOfRegistration`  | --      | 🟩    | 🟩      | Country of Registration                       |

## Locales

See [locales](src/locales.ts) for the list of supported locales.

## Theming

You can optionally theme the UI when creating an instance of `Notabene`

```js
const notabene = new Notabene({
  nodeUrl: 'https://api.notabene.id',
  authToken: 'YOUR_CUSTOMER_TOKEN',
  theme: {
    mode: 'light',                // Color mode: 'light' or 'dark'
    primaryColor: '#0a852d',      // Main brand color (buttons, highlights, accents)
    primaryForeground: '#000000', // Text/icon color displayed on top of primaryColor
    backgroundColor: '#ffffff',   // Base background color for the component
    fontFamily: 'Montserrat'      // Font family (supports Google Fonts)
  }
});
```

## [License](LICENSE.md)

MIT © Notabene Inc.
