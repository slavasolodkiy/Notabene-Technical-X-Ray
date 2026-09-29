# Notabene TX Transformer

A utility module to transform Notabene component responses into API request bodies for Version 1 and Version 2 APIs.

## Usage

### Version 2 API - Complete Workflow

```typescript
import { componentResponseToTxRequests, EXAMPLE_ORIGINATOR_V2 } from '$lib/notabene-tx-transformer';

withdrawal.on('complete', async (result) => {
	// Generate all request bodies in one call
	const { createTx, appendPii, confirmRelationship } = componentResponseToTxRequests(
		result.response,
		delegateToken,
		{ originator: EXAMPLE_ORIGINATOR_V2 }
	);

	// 1. Create transaction
	const txResponse = await fetch(`/entity/${vaspDid}/tx`, {
		method: 'POST',
		body: JSON.stringify(createTx)
	});

	const txId = txResponse.transfer['@id'];

	// 2. Append PII
	await fetch(`/entity/${vaspDid}/tx/${txId}/append`, {
		method: 'POST',
		body: JSON.stringify(appendPii)
	});

	// 3. Confirm relationship (if proof exists)
	if (confirmRelationship) {
		await fetch(`/entity/${vaspDid}/relationship?to=...&from=...`, {
			method: 'PATCH',
			body: JSON.stringify(confirmRelationship)
		});
	}
});
```

### Version 2 API - Individual Functions

```typescript
import {
	componentResponseToTxCreateRequest,
	componentResponseToIVMS101
} from '$lib/notabene-tx-transformer';

// Create transaction only
const createBody = componentResponseToTxCreateRequest(response, delegateToken);

// IVMS101 data only
const ivms101Body = componentResponseToIVMS101(response, delegateToken, {
	originator: EXAMPLE_ORIGINATOR_V2
});
```

## API

### `componentResponseToTxRequests(response, delegateToken, config?)`

Transforms a Notabene component response into all V2 request bodies (createTx, appendPii, and optionally confirmRelationship).

**Parameters:**

- `response`: Response from the Notabene TX Create component
- `delegateToken`: JWT delegate token for extracting the originator ID
- `config`: Optional `ResponseToTxRequestConfig` object
  - `config.originatorId`: Auto-extracted from delegateToken if not provided
  - `config.beneficiaryId`: Auto-generated from destination if not provided
  - `config.referenceId`: Optional reference ID for the transaction
  - `config.originator`: Optional originator information in V2 format for PII append

**Returns:** Object with `createTx`, `appendPii`, and optionally `confirmRelationship`

### `componentResponseToTxCreateRequest(response, delegateToken, config?)`

Transforms a Notabene component response to a V2 transaction create request.

**Parameters:**

- `response`: Response from the Notabene TX Create component
- `delegateToken`: JWT delegate token for extracting the originator ID
- `config`: Optional configuration object
  - `config.originatorId`: Auto-extracted from delegateToken if not provided
  - `config.beneficiaryId`: Auto-generated from destination if not provided
  - `config.referenceId`: Optional reference ID for the transaction

**Returns:** Transaction create request body

### `componentResponseToIVMS101(response, delegateToken, config?)`

Transforms a Notabene component response to IVMS101 format.

**Parameters:**

- `response`: Response from the Notabene TX Create component
- `delegateToken`: JWT delegate token for extracting the originator ID
- `config`: Optional `ResponseToTxRequestConfig` object
  - `config.originatorId`: Auto-extracted from delegateToken if not provided
  - `config.beneficiaryId`: Auto-generated from destination if not provided
  - `config.referenceId`: Optional reference ID for the transaction
  - `config.originator`: Optional originator information in V2 format

**Returns:** IVMS101 formatted request body

## Module Structure

```
notabene-tx-transformer/
├── index.ts        # Main exports
├── transformer.ts  # Main transformation function
├── mappers.ts      # V1 and V2 mapping logic
├── types.ts        # Types not available in SDK
├── utils.ts        # Utility functions (getPartyId)
└── README.md       # This file
```

## Configuration

All V2 functions accept an optional `ResponseToTxRequestConfig` parameter with auto-enrichment:

- **`originatorId`**: Auto-extracted from `delegateToken.sub` if not provided
- **`beneficiaryId`**: Auto-generated as `did:key:${destination}` if not provided
- **`referenceId`**: Optional transaction reference
- **`originator`**: Optional originator information in V2 format (used in PII append requests)

## Version Differences

- **Version 1 (Legacy)**: Single-step transaction creation with embedded PII
- **Version 2**: Multi-step workflow (create → append PII → confirm relationship)
