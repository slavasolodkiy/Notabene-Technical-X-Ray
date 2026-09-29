import type {
  ComponentRequest,
  RefreshSource,
  TransactionOptions,
  TransactionResponse,
  UUID,
} from '../types';
import { seal, unseal } from './encryption';

export type TransactionType = 'withdraw' | 'deposit';
export type ConnectionStatus = 'active' | 'completed' | 'closed';

export interface ConnectionData<T extends ComponentRequest> {
  readonly tx: T;
  readonly authToken?: string;
  readonly txOptions?: TransactionOptions;
  readonly result?: TransactionResponse<T>;
  readonly phoneNumber?: string;
  readonly email?: string;
}

export interface ConnectionMetadata {
  readonly nodeUrl?: string;
  readonly participants: readonly string[];
  readonly transactionType: TransactionType;
  readonly locale?: string;
  /**
   * Delivery target for Counterparty Assist completion/closure webhooks.
   * Sent and stored as plaintext so the connection can route the event, so do not
   * embed secrets (e.g. `?token=`) in this URL. Webhook payloads carry the encrypted
   * `sealed` blob, whose successful decryption is itself an authenticity check;
   * signed delivery is provided by the future Svix-backed pipeline.
   */
  readonly webhookUrl?: string;
}

export interface ConnectionResponse<T extends ComponentRequest> {
  readonly id: UUID;
  readonly version: number;
  readonly status: ConnectionStatus;
  readonly metadata: ConnectionMetadata;
  readonly data: ConnectionData<T>;
  readonly key: string;
}

export type ConnectionResult<T extends ComponentRequest> =
  | {
      readonly id: UUID;
      readonly metadata: ConnectionMetadata;
      readonly status: 'closed';
    }
  | {
      readonly id: UUID;
      readonly metadata: ConnectionMetadata;
      readonly status: 'completed';
      readonly result: TransactionResponse<T>;
    }
  | {
      readonly id: UUID;
      readonly metadata: ConnectionMetadata;
      readonly status: 'active';
      readonly tx: T;
    };

/**
 * Retrieves and processes connection refresh data
 * @template T Type of component request
 * @param refreshSource Source information for the refresh operation
 * @returns Promise resolving to connection result with decrypted data
 */
export async function getRefreshResult<T extends ComponentRequest>(
  refreshSource: Pick<RefreshSource, 'url' | 'key'>,
): Promise<ConnectionResult<T>> {
  const response = await fetch(refreshSource.url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to get connection: ${await response.text()}`);
  }

  const result = await response.json();

  if (!result.id || !result.metadata || !result.status || !result.sealed) {
    throw new Error('Data missing from server response');
  }

  const basicData = {
    id: result.id,
    metadata: result.metadata,
    status: result.status,
  };

  if (result.status === 'closed') {
    return basicData;
  }

  // Get the latest sealed data
  const latestSealed = result.sealed[result.sealed.length - 1];

  // Decrypt the data
  const data = await unseal<ConnectionData<T>>({
    ciphertext: latestSealed,
    key: refreshSource.key,
  });

  if (result.status === 'completed') {
    return {
      ...basicData,
      result: data.result,
    };
  }

  return {
    ...basicData,
    tx: data.tx,
  };
}

/**
 * Decrypt a Counterparty Assist webhook payload with the key the VASP captured
 * at connection creation. Single call, no network fetch (the webhook already
 * carried the ciphertext).
 * @public
 */
export async function decryptCounterpartyAssistPayload<T>({
  sealed,
  key,
}: {
  sealed: string;
  key: string;
}): Promise<T> {
  return unseal<T>({ ciphertext: sealed, key });
}

/**
 * Manages encrypted connections using Cloudflare Durable Objects
 */
export class ConnectionManager {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Creates a new encrypted connection
   * @template T Type of component request
   * @param data The component request data to encrypt and store
   * @param metadata Connection metadata including participants and transaction type
   * @returns Promise resolving to connection details including ID, version, and encryption key
   */
  async create<T extends ComponentRequest>(
    data: ConnectionData<T>,
    metadata: ConnectionMetadata,
  ): Promise<ConnectionResponse<T>> {
    // Encrypt the data
    const sealed = await seal(data);

    // Prepare the request body
    const body = {
      metadata,
      sealed: sealed.ciphertext,
    };

    // Create the connection
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create connection: ${await response.text()}`);
    }

    const result = await response.json();

    return {
      id: result.id,
      version: result.version,
      status: result.status,
      metadata: metadata,
      data: data,
      key: sealed.key,
    };
  }

  /**
   * Updates an existing connection with new encrypted data
   * @template T Type of component request
   * @param id Connection ID
   * @param data New data to encrypt and store
   * @param version Current version number
   * @param status New connection status
   * @param key Current encryption key
   * @returns Promise resolving to updated connection details including new encryption key
   */
  async update<T extends ComponentRequest>(
    id: UUID,
    data: ConnectionData<T>,
    version: number,
    status: ConnectionStatus,
    key: string,
  ): Promise<ConnectionResponse<T>> {
    // Encrypt the new data
    const sealed = await seal(data, key);

    // Prepare the request body
    const body = {
      sealed: sealed.ciphertext,
      version,
      status,
    };

    // Update the connection
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update connection: ${await response.text()}`);
    }

    const result = await response.json();

    return {
      id: result.id,
      metadata: result.metadata,
      version: result.version,
      status: result.status,
      data: data,
      key: sealed.key,
    };
  }

  /**
   * Retrieves and decrypts connection data
   * @template T Type of component request
   * @param id Connection ID
   * @param key Encryption key from previous create/update operation
   * @returns Promise resolving to connection details including decrypted data
   */
  async get<T extends ComponentRequest>(
    id: UUID,
    key: string,
  ): Promise<ConnectionResponse<T>> {
    // Get the connection data
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to get connection: ${await response.text()}`);
    }

    const result = await response.json();

    // Get the latest sealed data
    const latestSealed = result.sealed[result.sealed.length - 1];

    // Decrypt the data
    const data = await unseal<ConnectionData<T>>({
      ciphertext: latestSealed,
      key,
    });

    return {
      id: result.id,
      status: result.status,
      version: result.version,
      metadata: result.metadata,
      data,
      key,
    };
  }

  /**
   * Closes a connection
   * @param id Connection ID
   * @returns Promise resolving when the connection is closed
   */
  async close(id: UUID): Promise<void> {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to close connection: ${await response.text()}`);
    }
  }
}
