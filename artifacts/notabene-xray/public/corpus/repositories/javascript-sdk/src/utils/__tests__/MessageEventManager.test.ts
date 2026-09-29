import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type TransactionOptions,
  type UpdateValue,
  type Withdrawal,
} from '../../types';
import { MessageEventManager } from '../MessageEventManager';

describe('MessageEventManager', () => {
  let messageEventManager: MessageEventManager<Withdrawal, TransactionOptions>;
  let mockPort: MessagePort;

  beforeEach(() => {
    mockPort = {
      onmessage: null,
      postMessage: vi.fn(),
      start: vi.fn(),
    } as unknown as MessagePort;

    messageEventManager = new MessageEventManager<
      Withdrawal,
      TransactionOptions
    >();
  });

  describe('setPort', () => {
    it('should ignore undefined port', () => {
      expect(() =>
        messageEventManager.setPort(undefined as unknown as MessagePort),
      ).not.toThrow();
    });
  });

  describe('setPort with valid port', () => {
    beforeEach(() => {
      messageEventManager.setPort(mockPort);
    });

    it('should start the port when initialized', () => {
      expect(mockPort.start).toHaveBeenCalled();
    });

    it('should subscribe and receive messages of a specific type', () => {
      const completeHandler = vi.fn();
      messageEventManager.on('complete', completeHandler);

      const completeMessage = { type: 'complete' };
      mockPort.onmessage!({ data: completeMessage } as MessageEvent);

      expect(completeHandler).toHaveBeenCalledWith(completeMessage);
    });

    it('should not call handlers for different message types', () => {
      const updateHandler = vi.fn();
      const errorHandler = vi.fn();
      messageEventManager.on('update', updateHandler);
      messageEventManager.on('error', errorHandler);

      const errorMessage = { type: 'error', message: 'Something went wrong' };
      mockPort.onmessage!({ data: errorMessage } as MessageEvent);

      expect(updateHandler).not.toHaveBeenCalled();
      expect(errorHandler).toHaveBeenCalledWith(errorMessage);
    });

    it('should unsubscribe handlers', () => {
      const updateHandler = vi.fn();
      messageEventManager.on('update', updateHandler);
      messageEventManager.off('update', updateHandler);

      const updateMessage = { type: 'update', data: { foo: 'bar' } };
      mockPort.onmessage!({ data: updateMessage } as MessageEvent);

      expect(updateHandler).not.toHaveBeenCalled();
    });

    it('should allow multiple subscribers for the same message type', () => {
      const updateHandler1 = vi.fn();
      const updateHandler2 = vi.fn();
      messageEventManager.on('update', updateHandler1);
      messageEventManager.on('update', updateHandler2);

      const updateMessage = { type: 'update', data: { foo: 'bar' } };
      mockPort.onmessage!({ data: updateMessage } as MessageEvent);

      expect(updateHandler1).toHaveBeenCalledWith(updateMessage);
      expect(updateHandler2).toHaveBeenCalledWith(updateMessage);
    });

    it('should send messages through the port', () => {
      const message: UpdateValue<Withdrawal, TransactionOptions> = {
        // @ts-expect-error Type '"update"' is not assignable to type 'HMType.UPDATE'.
        type: 'update',
        value: { requestId: 'id' },
      };
      messageEventManager.send(message);

      expect(mockPort.postMessage).toHaveBeenCalledWith(message);
    });

    it('should ignore messages without a type', () => {
      const handler = vi.fn();
      messageEventManager.on('update', handler);

      const invalidMessage = { data: 'no type field' };
      mockPort.onmessage!({ data: invalidMessage } as MessageEvent);

      expect(handler).not.toHaveBeenCalled();
    });

    it('on returns unsubscribe function', () => {
      const messageType = 'customEvent';
      const callback = vi.fn();
      const unsubscribe = messageEventManager.on(messageType, callback);

      // Verify it's a function
      expect(typeof unsubscribe).toBe('function');

      // Call it and verify the handler is removed
      unsubscribe();

      // Simulate a message - callback should not be called
      mockPort.onmessage!({ data: { type: messageType } } as MessageEvent);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
