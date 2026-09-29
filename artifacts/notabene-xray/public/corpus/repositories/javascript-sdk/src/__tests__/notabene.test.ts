import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';
import Notabene from '../notabene';
import {
  abitraryCallbackOptions,
  arbitraryComponent,
  arbitraryConnectionOptions,
  arbitraryConnectionRequest,
  arbitraryDeposit,
  arbitraryDepositRequest,
  arbitraryDepositRequestOptions,
  arbitraryLocale,
  arbitraryTransactionOptions,
  arbitraryWithdrawal,
} from '../utils/arbitraries';

const arbitraryNodeUrl = () => fc.webUrl().map((u) => u.replace(/\/+$/, ''));

describe('Notabene', () => {
  describe('defaults', () => {
    test.prop([
      fc.string({ minLength: 3 }),
      arbitraryNodeUrl(),
      arbitraryComponent(),
      fc.object(),
    ])(
      'Should set the correct values',
      (authToken, nodeUrl, component, value) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });
        const url = new URL(notabene.componentUrl(component, value));
        return (
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl.replace(/\/+$/, '') &&
          url.pathname === `/${component}`
        );
      },
    );
  });

  describe('locale', () => {
    test.prop([
      fc.string({ minLength: 3 }),
      arbitraryNodeUrl(),
      arbitraryComponent(),
      fc.object(),
      arbitraryLocale(),
    ])(
      'Should set the correct values',
      (authToken, nodeUrl, component, value, locale) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
          locale,
        });
        const url = new URL(notabene.componentUrl(component, value));
        return (
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.searchParams.get('locale') === locale &&
          url.pathname === `/${component}`
        );
      },
    );
  });

  describe('minimal', () => {
    test.prop([arbitraryComponent(), fc.object()])(
      'Should set the correct values',
      (component, value) => {
        const notabene = new Notabene({});
        const url = new URL(notabene.componentUrl(component, value));
        return (
          url.hash === `#value=${encodeURIComponent(JSON.stringify(value))}` &&
          url.hostname === 'connect.notabene.id' &&
          url.pathname === `/${component}`
        );
      },
    );
  });

  describe('with uxUrl', () => {
    test.prop([
      fc.string({ minLength: 3 }),
      arbitraryNodeUrl(),
      arbitraryComponent(),
      fc.webAuthority(),
      fc.object(),
    ])(
      'Should set the correct values',
      (authToken, nodeUrl, component, uxAuthority, value) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
          uxUrl: `https://${uxAuthority}`,
        });
        const url = new URL(notabene.componentUrl(component, value));
        const [domain, port] = uxAuthority.split(':');
        return (
          url.hostname === domain &&
          url.port === (port || '') &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.pathname === `/${component}`
        );
      },
    );
  });

  describe('with value and configuration', () => {
    test.prop([
      fc.string({ minLength: 3 }),
      arbitraryNodeUrl(),
      arbitraryComponent(),
      fc.object(),
      fc.object(),
    ])(
      'Should set the correct values',
      (authToken, nodeUrl, component, value, configuration) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });
        const url = new URL(
          notabene.componentUrl(component, value, configuration),
        );
        return (
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}&configuration=${encodeURIComponent(JSON.stringify(configuration))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.pathname === `/${component}`
        );
      },
    );
  });

  describe('with value and configuration', () => {
    test.prop([
      fc.string({ minLength: 3 }),
      arbitraryNodeUrl(),
      arbitraryComponent(),
      fc.object(),
      fc.object(),
      abitraryCallbackOptions(),
    ])(
      'Should set the correct values',
      (authToken, nodeUrl, component, value, configuration, callbacks) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });
        const url = new URL(
          notabene.componentUrl(component, value, configuration, callbacks),
        );
        return (
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}&configuration=${encodeURIComponent(JSON.stringify(configuration))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.pathname === `/${component}` &&
          url.searchParams.get('callback_url') === callbacks.callback &&
          url.searchParams.get('redirect_uri') === callbacks.redirectUri
        );
      },
    );
  });

  describe('createWithdrawalAssist', () => {
    test.prop([
      fc.string({ minLength: 3 }), // authToken
      arbitraryNodeUrl(), // nodeUrl
      arbitraryWithdrawal(),
      arbitraryTransactionOptions(), // options
      abitraryCallbackOptions(), // callbacks
    ])(
      'Should create withdrawal assist component with correct URL',
      (authToken, nodeUrl, value, options, callbacks) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });

        const component = notabene.createWithdrawalAssist(
          value,
          options,
          callbacks,
        );
        const url = new URL(component.url);

        return (
          url.pathname === '/withdrawal-assist' &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}&configuration=${encodeURIComponent(JSON.stringify(options))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.searchParams.get('callback_url') === callbacks.callback &&
          url.searchParams.get('redirect_uri') === callbacks.redirectUri
        );
      },
    );
  });

  describe('createDepositRequest', () => {
    test.prop([
      fc.string({ minLength: 3 }), // authToken
      arbitraryNodeUrl(), // nodeUrl
      arbitraryDepositRequest(),
      arbitraryDepositRequestOptions(), // options
      abitraryCallbackOptions(), // callbacks
    ])(
      'Should create deposit assist component with correct URL',
      (authToken, nodeUrl, value, options, callbacks) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });

        const component = notabene.createDepositRequest(
          value,
          options,
          callbacks,
        );
        const url = new URL(component.url);

        return (
          url.pathname === '/deposit-request' &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}&configuration=${encodeURIComponent(JSON.stringify(options))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.searchParams.get('callback_url') === callbacks.callback &&
          url.searchParams.get('redirect_uri') === callbacks.redirectUri
        );
      },
    );
  });

  describe('createConnectWallet', () => {
    test.prop([
      fc.string({ minLength: 3 }), // authToken
      arbitraryNodeUrl(), // nodeUrl
      arbitraryConnectionRequest(),
      arbitraryConnectionOptions(), // options
      abitraryCallbackOptions(), // callbacks
    ])(
      'Should create connect wallet component with correct URL',
      (authToken, nodeUrl, value, options, callbacks) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });

        const component = notabene.createConnectWallet(
          value,
          options,
          callbacks,
        );
        const url = new URL(component.url);

        return (
          url.pathname === '/connect' &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify(value))}&configuration=${encodeURIComponent(JSON.stringify(options))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.searchParams.get('callback_url') === callbacks.callback &&
          url.searchParams.get('redirect_uri') === callbacks.redirectUri
        );
      },
    );
  });
  describe('nodeUrl trailing slash normalization', () => {
    it('should strip a single trailing slash', () => {
      const notabene = new Notabene({
        nodeUrl: 'https://api.eu1.notabene.id/',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.searchParams.get('nodeUrl')).toBe(
        'https://api.eu1.notabene.id',
      );
    });

    it('should strip multiple trailing slashes', () => {
      const notabene = new Notabene({
        nodeUrl: 'https://api.eu1.notabene.id///',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.searchParams.get('nodeUrl')).toBe(
        'https://api.eu1.notabene.id',
      );
    });

    it('should leave a clean URL unchanged', () => {
      const notabene = new Notabene({
        nodeUrl: 'https://api.eu1.notabene.id',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.searchParams.get('nodeUrl')).toBe(
        'https://api.eu1.notabene.id',
      );
    });

    it('should trim whitespace', () => {
      const notabene = new Notabene({
        nodeUrl: '  https://api.eu1.notabene.id  ',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.searchParams.get('nodeUrl')).toBe(
        'https://api.eu1.notabene.id',
      );
    });

    it('should throw for an invalid URL', () => {
      expect(
        () => new Notabene({ nodeUrl: 'not-a-url', authToken: 'token' }),
      ).toThrow('Invalid nodeUrl');
    });

    it('should throw for a non-http protocol', () => {
      expect(
        () =>
          new Notabene({ nodeUrl: 'ftp://example.com', authToken: 'token' }),
      ).toThrow('must start with http:// or https://');
    });

    it('should preserve URL paths', () => {
      const notabene = new Notabene({
        nodeUrl: 'https://api.notabene.id/v2',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.searchParams.get('nodeUrl')).toBe(
        'https://api.notabene.id/v2',
      );
    });
  });

  describe('createInvoiceReader', () => {
    test.prop([
      fc.string({ minLength: 3 }), // authToken
      arbitraryNodeUrl(), // nodeUrl
    ])(
      'Should create invoice reader component with correct URL',
      (authToken, nodeUrl) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });

        const component = notabene.createInvoiceReader();
        const url = new URL(component.url);

        return (
          url.pathname === '/flow-link/invoice-reader' &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(JSON.stringify({}))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl
        );
      },
    );
  });
  describe('uxUrl trailing slash normalization', () => {
    it('should strip a single trailing slash', () => {
      const notabene = new Notabene({
        uxUrl: 'https://connect.notabene.id/',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.origin).toBe('https://connect.notabene.id');
    });

    it('should strip multiple trailing slashes', () => {
      const notabene = new Notabene({
        uxUrl: 'https://connect.notabene.id///',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.origin).toBe('https://connect.notabene.id');
    });

    it('should leave a clean URL unchanged', () => {
      const notabene = new Notabene({
        uxUrl: 'https://connect.notabene.id',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.origin).toBe('https://connect.notabene.id');
    });

    it('should trim whitespace', () => {
      const notabene = new Notabene({
        uxUrl: '  https://connect.notabene.id  ',
        authToken: 'token',
      });
      const url = new URL(notabene.componentUrl('withdrawal-assist', {}));
      expect(url.origin).toBe('https://connect.notabene.id');
    });

    it('should throw for an invalid URL', () => {
      expect(
        () => new Notabene({ uxUrl: 'not-a-url', authToken: 'token' }),
      ).toThrow('Invalid uxUrl');
    });

    it('should throw for a non-http protocol', () => {
      expect(
        () => new Notabene({ uxUrl: 'ftp://example.com', authToken: 'token' }),
      ).toThrow('must start with http:// or https://');
    });
  });

  describe('createDepositAssist', () => {
    test.prop([
      fc.string({ minLength: 3 }), // authToken
      arbitraryNodeUrl(), // nodeUrl
      arbitraryDeposit(),
      arbitraryTransactionOptions(), // options
      abitraryCallbackOptions(), // callbacks
    ])(
      'Should create deposit assist component with correct URL',
      (authToken, nodeUrl, value, options, callbacks) => {
        const notabene = new Notabene({
          nodeUrl,
          authToken,
        });

        const component = notabene.createDepositAssist(
          value,
          options,
          callbacks,
        );
        const url = new URL(component.url);

        return (
          url.pathname === '/deposit-assist' &&
          url.hash ===
            `#authToken=${encodeURIComponent(authToken)}&value=${encodeURIComponent(
              JSON.stringify(value),
            )}&configuration=${encodeURIComponent(JSON.stringify(options))}` &&
          url.searchParams.get('nodeUrl') === nodeUrl &&
          url.searchParams.get('callback_url') === callbacks.callback &&
          url.searchParams.get('redirect_uri') === callbacks.redirectUri
        );
      },
    );
  });
});
