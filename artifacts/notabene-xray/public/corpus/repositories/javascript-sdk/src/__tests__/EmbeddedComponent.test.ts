import { beforeEach, describe, expect, test, vi } from 'vitest';
import EmbeddedComponent from '../components/EmbeddedComponent';
import { CMType, HMType } from '../types';

// Simple test interfaces
interface TestValue {
  name?: string;
  amount?: number;
}

interface TestOptions {
  currency?: string;
}

// Store callbacks for testing
const callbacks = new Map();

// Mock MessageEventManager
vi.mock('../utils/MessageEventManager', () => {
  return {
    MessageEventManager: vi.fn().mockImplementation(() => ({
      on: vi.fn((type, callback) => {
        callbacks.set(type, callback);
        return () => callbacks.delete(type);
      }),
      send: vi.fn((message) => {
        const callback = callbacks.get(message.type);
        if (callback) callback(message);
      }),
      off: vi.fn(),
      setPort: vi.fn(),
    })),
  };
});

describe('EmbeddedComponent', () => {
  let mockParent: HTMLElement;
  let mockAppendChild: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Clear callbacks before each test
    callbacks.clear();

    mockParent = document.createElement('div');
    vi.spyOn(document, 'querySelector').mockReturnValue(mockParent);
    mockAppendChild = vi.fn().mockImplementation((node: Node) => node);
    vi.spyOn(mockParent, 'appendChild').mockImplementation(mockAppendChild);
  });

  describe('initialization', () => {
    test('should initialize with basic values', () => {
      const url = 'https://example.com';
      const value = { name: 'Test' };
      const options = { currency: 'USD' };

      const component = new EmbeddedComponent<TestValue, TestOptions>(
        url,
        value,
        options,
      );

      expect(component.url).toBe(url);
      expect(component.value).toEqual(value);
      expect(component.options).toEqual(options);
      expect(component.errors).toEqual([]);
    });

    test('should initialize without options', () => {
      const url = 'https://example.com';
      const value = { name: 'Test' };

      const component = new EmbeddedComponent<TestValue, TestOptions>(
        url,
        value,
      );

      expect(component.url).toBe(url);
      expect(component.value).toEqual(value);
      expect(component.options).toBeUndefined();
      expect(component.errors).toEqual([]);
    });
  });

  describe('value updates', () => {
    test('should update value', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );
      const newValue = { name: 'Updated', amount: 100 };

      component.update(newValue);

      expect(component.value).toEqual(newValue);
    });

    test('should update value and options', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );
      const newValue = { name: 'Updated', amount: 100 };
      const newOptions = { currency: 'EUR' };

      component.update(newValue, newOptions);

      expect(component.value).toEqual(newValue);
      expect(component.options).toEqual(newOptions);
    });
  });

  describe('mounting', () => {
    test('should mount component to parent element', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );

      component.mount('#parent');

      expect(document.querySelector).toHaveBeenCalledWith('#parent');
      const iframe = mockAppendChild.mock.calls[0][0] as HTMLIFrameElement;
      expect(iframe).toBeTruthy();
      expect(iframe.src).toBe('https://example.com&embedded=true/');
      expect(iframe.style.width).toBe('100%');
      expect(iframe.style.height).toBe('0px');
      expect(iframe.style.border).toBe('');
    });

    test('should throw error if parent element not found', () => {
      vi.spyOn(document, 'querySelector').mockReturnValue(null);
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );

      expect(() => component.mount('#nonexistent')).toThrow(
        'parentID #nonexistent not found',
      );
    });

    test('should remove existing iframe when mounting again', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );

      // First mount
      component.mount('#parent');
      const firstIframe = mockAppendChild.mock.calls[0][0] as HTMLIFrameElement;
      const removeSpy = vi.spyOn(firstIframe, 'remove');

      // Second mount
      component.mount('#parent');

      expect(removeSpy).toHaveBeenCalled();
      expect(mockAppendChild).toHaveBeenCalledTimes(2);
    });
  });

  describe('event handling', () => {
    test('should register and unregister event listeners', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );
      const mockCallback = vi.fn();

      // Register event listener
      const unsubscribe = component.on(HMType.UPDATE, mockCallback);

      // Send a message
      component.send({ type: HMType.UPDATE, value: { name: 'test' } });
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith({
        type: HMType.UPDATE,
        value: { name: 'test' },
      });

      // Unsubscribe and send again
      unsubscribe();
      component.send({ type: HMType.UPDATE, value: { name: 'test2' } });
      expect(mockCallback).toHaveBeenCalledTimes(1); // Still 1, not called again
    });

    test('should handle resize events', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );
      component.mount('#parent');

      const iframe = mockAppendChild.mock.calls[0][0] as HTMLIFrameElement;

      // Get the resize callback and trigger it directly
      const resizeCallback = callbacks.get(CMType.RESIZE);
      resizeCallback({ type: CMType.RESIZE, height: 500 });

      expect(iframe.style.height).toBe('500px');
    });

    test('should handle validation errors', () => {
      const component = new EmbeddedComponent<TestValue, TestOptions>(
        'https://example.com',
        {},
      );
      const mockErrors = [{ field: 'name', message: 'Required' }];
      const mockValue = { name: '' };

      // Get the validation callback and trigger it directly
      const validationCallback = callbacks.get(CMType.INVALID);
      validationCallback({
        type: CMType.INVALID,
        errors: mockErrors,
        value: mockValue,
      });

      expect(component.errors).toEqual(mockErrors);
      expect(component.value).toEqual(mockValue);
    });
  });
});
