import { beforeEach, describe, expect, test } from 'vitest';
import EmbeddedComponent from '../components/EmbeddedComponent';

/**
 * Integration test (no mocks) reproducing the Banxa crash (PAY-1056):
 *
 *   TypeError: Cannot set properties of undefined (setting 'onmessage')
 *
 * Cause: Reown/WalletConnect calls `parent.postMessage(event, '*')` from
 * inside the widget iframe without transferring a MessagePort. The SDK's
 * message listener passed `event.ports[0]` (undefined) to `setPort()`.
 */

interface TestValue {
  id?: string;
}

describe('EmbeddedComponent — portless postMessage (PAY-1056)', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('should not crash when iframe sends a message without ports', () => {
    const component = new EmbeddedComponent<TestValue, unknown>(
      'about:blank?widget=true',
      {},
    );
    component.embed(container);

    const iframe = container.querySelector('iframe')!;

    expect(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          source: iframe.contentWindow,
          data: { type: 'wc_sessionUpdate' },
          ports: [],
        }),
      );
    }).not.toThrow();
  });

  test('should still accept the handshake message with a port', () => {
    const component = new EmbeddedComponent<TestValue, unknown>(
      'about:blank?widget=true',
      {},
    );
    component.embed(container);

    const iframe = container.querySelector('iframe')!;
    const channel = new MessageChannel();

    expect(() => {
      window.dispatchEvent(
        new MessageEvent('message', {
          source: iframe.contentWindow,
          data: {},
          ports: [channel.port2],
        }),
      );
    }).not.toThrow();
  });
});
