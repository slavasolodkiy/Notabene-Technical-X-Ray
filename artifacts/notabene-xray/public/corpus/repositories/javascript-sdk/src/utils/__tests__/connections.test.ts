import fc from 'fast-check';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { DID, RefreshSource } from '../../types';
import {
  ConnectionManager,
  type ConnectionStatus,
  decryptCounterpartyAssistPayload,
  getRefreshResult,
  type TransactionType,
} from '../connections';
import { seal } from '../encryption';

// Mock fetch globally
const fetchMock = vi.fn();
global.fetch = fetchMock;

// Helper to generate valid DID strings
const arbDID = fc
  .tuple(fc.string(), fc.string())
  .map(([method, id]) => `did:${method}:${id}` as DID);

const arbTx = fc.record({
  requestId: fc.option(fc.uuid(), { nil: undefined }),
  customer: fc.option(
    fc.record({
      name: fc.string(),
      email: fc.option(fc.string(), { nil: undefined }),
      phone: fc.option(fc.string(), { nil: undefined }),
      type: fc.constant(undefined), // Optional PersonType
      accountNumber: fc.option(fc.string(), { nil: undefined }),
      did: fc.option(arbDID, { nil: undefined }),
      verified: fc.option(fc.boolean(), { nil: undefined }),
      website: fc.option(fc.webUrl(), { nil: undefined }),
      geographicAddress: fc.option(fc.constant(undefined), {
        nil: undefined,
      }),
      nationalIdentification: fc.option(fc.constant(undefined), {
        nil: undefined,
      }),
    }),
    { nil: undefined },
  ),
});

// Test helper to create arbitrary ComponentRequests
const arbComponentRequest = fc.record({
  tx: arbTx,
  authToken: fc.option(fc.string(), { nil: undefined }),
  txOptions: fc.option(fc.record({}), { nil: undefined }),
});

// New arbitrary for ConnectionMetadata
const arbConnectionMetadata = fc.record({
  participants: fc.array(fc.string(), { minLength: 1 }), // At least one participant
  nodeUrl: fc.webUrl(),
  transactionType: fc.constantFrom<TransactionType>('withdraw', 'deposit'),
  webhookUrl: fc.option(fc.webUrl(), { nil: undefined }),
});

describe('ConnectionManager', () => {
  let manager: ConnectionManager;
  const testEndpoint = 'https://test-endpoint.com';

  beforeEach(() => {
    manager = new ConnectionManager(testEndpoint);
    fetchMock.mockReset();
  });

  describe('create', () => {
    it('should successfully create a new connection', async () => {
      await fc.assert(
        fc.asyncProperty(
          arbComponentRequest,
          arbConnectionMetadata,
          async (request, metadata) => {
            // Mock successful response
            const mockResponse = {
              id: 'test-id',
              version: 1,
              status: 'active',
              metadata,
              sealed: ['encrypted-data'],
            };

            fetchMock.mockResolvedValueOnce({
              ok: true,
              json: async () => mockResponse,
            });

            const result = await manager.create(request, metadata);

            // Verify fetch was called correctly
            expect(fetchMock).toHaveBeenCalledWith(testEndpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: expect.any(String),
            });

            // Verify response structure
            expect(result).toEqual({
              id: mockResponse.id,
              metadata: mockResponse.metadata,
              status: mockResponse.status,
              version: mockResponse.version,
              data: request,
              key: expect.any(String),
            });
          },
        ),
      );
    });

    it('should throw error on failed creation', async () => {
      await fc.assert(
        fc.asyncProperty(
          arbComponentRequest,
          arbConnectionMetadata,
          async (request, metadata) => {
            // Mock failed response
            fetchMock.mockResolvedValueOnce({
              ok: false,
              text: async () => 'Creation failed',
            });

            await expect(manager.create(request, metadata)).rejects.toThrow(
              'Failed to create connection',
            );
          },
        ),
      );
    });
  });

  describe('update', () => {
    it('should successfully update an existing connection', async () => {
      const testData = { requestId: 'test-123' };
      const sealed = await seal(testData);

      await fc.assert(
        fc.asyncProperty(
          fc.uuid(),
          arbComponentRequest,
          fc.integer(),
          async (id, request, version) => {
            // Mock successful response
            const mockResponse = {
              id,
              metadata: arbConnectionMetadata,
              status: 'completed',
              version: version + 1,
              sealed: [sealed.ciphertext],
            };

            fetchMock.mockResolvedValueOnce({
              ok: true,
              json: async () => mockResponse,
            });

            const result = await manager.update(
              id,
              request,
              version,
              'completed',
              sealed.key,
            );

            // Verify fetch was called correctly
            expect(fetchMock).toHaveBeenCalledWith(`${testEndpoint}/${id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: expect.any(String),
            });

            // Verify response structure
            expect(result).toEqual({
              id: mockResponse.id,
              version: mockResponse.version,
              status: mockResponse.status,
              metadata: mockResponse.metadata,
              data: request,
              key: sealed.key,
            });
          },
        ),
      );
    });

    it('should throw error on failed update due to invalid key', async () => {
      const { key: newKey } = await seal('testData');

      await fc.assert(
        fc.asyncProperty(
          fc.uuid(),
          arbComponentRequest,
          fc.integer(),
          async (id, request, version) => {
            // Mock failed response
            fetchMock.mockResolvedValueOnce({
              ok: false,
              text: async () => 'Update failed',
            });

            await expect(
              manager.update(id, request, version, 'active', newKey),
            ).rejects.toThrow('Failed to update connection');
          },
        ),
      );
    });
  });

  describe('get', () => {
    it('should successfully retrieve and decrypt connection data', async () => {
      // Create a real sealed object to use in our test
      const testData = { requestId: 'test-123' };
      const sealed = await seal(testData);

      await fc.assert(
        fc.asyncProperty(fc.uuid(), async (id) => {
          // Mock successful response with real encrypted data
          const mockResponse = {
            id,
            version: 1,
            status: 'active',
            metadata: arbConnectionMetadata,
            sealed: [sealed.ciphertext], // Use the real ciphertext
          };

          fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
          });

          const result = await manager.get(id, sealed.key); // Use the matching key

          // Verify fetch was called correctly
          expect(fetchMock).toHaveBeenCalledWith(`${testEndpoint}/${id}`, {
            method: 'GET',
          });

          // Verify response structure
          expect(result).toEqual({
            id: mockResponse.id,
            version: mockResponse.version,
            status: mockResponse.status,
            metadata: mockResponse.metadata,
            data: testData, // Should match our original test data
            key: sealed.key,
          });
        }),
      );
    });

    it('should throw error on failed retrieval', async () => {
      await fc.assert(
        fc.asyncProperty(fc.uuid(), fc.string(), async (id, key) => {
          // Mock failed response
          fetchMock.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Retrieval failed',
          });

          await expect(manager.get(id, key)).rejects.toThrow(
            'Failed to get connection',
          );
        }),
      );
    });
  });

  describe('close', () => {
    it('should successfully close a connection', async () => {
      await fc.assert(
        fc.asyncProperty(fc.uuid(), async (id) => {
          // Mock successful response
          fetchMock.mockResolvedValueOnce({
            ok: true,
          });

          await manager.close(id);

          // Verify fetch was called correctly
          expect(fetchMock).toHaveBeenCalledWith(`${testEndpoint}/${id}`, {
            method: 'DELETE',
          });
        }),
      );
    });

    it('should throw error on failed closure', async () => {
      await fc.assert(
        fc.asyncProperty(fc.uuid(), async (id) => {
          // Mock failed response
          fetchMock.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Closure failed',
          });

          await expect(manager.close(id)).rejects.toThrow(
            'Failed to close connection',
          );
        }),
      );
    });
  });

  describe('getRefreshResult', async () => {
    // Create test data and sealed object
    const tx = { requestId: 'test-123' };
    const result = { txCreate: { requestId: 'test-123' } };
    const testData = { tx, result };
    const sealed = await seal(testData);

    // Create a refresh source with the real key
    const refreshSource: RefreshSource = {
      url: 'https://test-endpoint.com',
      key: sealed.key,
      id: 'test-id',
    };

    // Common metadata for all tests
    const metadata = {
      participants: ['participant1'],
      nodeUrl: 'https://node-url.com',
      transactionType: 'withdraw' as TransactionType,
    };

    // Helper function to create mock responses
    const createMockResponse = (
      status: ConnectionStatus,
      sealedData = sealed.ciphertext,
    ) => ({
      id: 'test-id',
      metadata,
      status,
      sealed: [sealedData],
      version: 1,
    });

    it('should return basic data for closed status', async () => {
      const mockResponse = createMockResponse('closed');

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRefreshResult(refreshSource);

      expect(result).toEqual({
        id: mockResponse.id,
        metadata: mockResponse.metadata,
        status: 'closed',
      });
    });

    it('should return data with tx for active status', async () => {
      const mockResponse = createMockResponse('active');

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRefreshResult(refreshSource);

      expect(result).toEqual({
        id: mockResponse.id,
        metadata: mockResponse.metadata,
        status: 'active',
        tx,
      });
    });

    it('should return data with result for completed status', async () => {
      // Create sealed data with a result
      const transactionResponse = { success: true, data: { id: 'test-id' } };
      const completedSealed = await seal({
        tx: testData,
        result: transactionResponse,
      });

      // Create a refresh source with the new key
      const completedRefreshSource: RefreshSource = {
        url: 'https://test-endpoint.com',
        key: completedSealed.key,
        id: 'test-id',
      };

      const mockResponse = createMockResponse(
        'completed',
        completedSealed.ciphertext,
      );

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRefreshResult(completedRefreshSource);

      expect(result).toEqual({
        id: mockResponse.id,
        metadata: mockResponse.metadata,
        status: 'completed',
        result: transactionResponse,
      });
    });

    it('should throw error when no sealed data is present', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'test-id',
          metadata,
          status: 'active' as ConnectionStatus,
          sealed: null,
        }),
      });

      await expect(getRefreshResult(refreshSource)).rejects.toThrow(
        'Data missing from server response',
      );
    });

    it('should throw error on failed request', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Request failed',
      });

      await expect(getRefreshResult(refreshSource)).rejects.toThrow(
        'Failed to get connection',
      );
    });
  });
});

describe('decryptCounterpartyAssistPayload', () => {
  it('round-trips a sealed payload back to the original object', async () => {
    const original = { result: { ref: 'abc' }, tx: { amount: '10' } };
    const sealed = await seal(original);

    const decrypted = await decryptCounterpartyAssistPayload<typeof original>({
      sealed: sealed.ciphertext,
      key: sealed.key,
    });

    expect(decrypted).toEqual(original);
  });

  it('throws when the key is wrong', async () => {
    const sealed = await seal({ a: 1 });
    const other = await seal({ b: 2 });
    await expect(
      decryptCounterpartyAssistPayload({
        sealed: sealed.ciphertext,
        key: other.key,
      }),
    ).rejects.toThrow();
  });
});
