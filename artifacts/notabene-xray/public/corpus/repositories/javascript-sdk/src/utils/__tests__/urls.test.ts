import { fc, test } from '@fast-check/vitest';
import { describe, expect } from 'vitest';
import { decodeFragmentToObject, encodeObjectToFragment } from '../urls';

describe('encodeObjectToFragment', () => {
  test.prop([
    fc.record({
      key1: fc.string(),
      key2: fc.string(),
      key3: fc.string(),
    }),
  ])('Should correctly encode simple string values', (obj) => {
    const encoded = encodeObjectToFragment(obj);
    const parts = encoded.split('&');

    return Object.entries(obj).every(([key, value]) => {
      const part = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      return parts.includes(part);
    });
  });

  test.prop([
    fc.record({
      str: fc.string(),
      num: fc.float(),
      bool: fc.boolean(),
    }),
  ])('Should handle different primitive types', (obj) => {
    const encoded = encodeObjectToFragment(obj);
    const parts = encoded.split('&');

    return Object.entries(obj).every(([key, value]) => {
      const part = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      return parts.includes(part);
    });
  });

  test.prop([
    fc.record({
      obj: fc.object(),
      arr: fc.array(fc.string()),
      nested: fc.record({
        a: fc.string(),
        b: fc.integer(),
      }),
    }),
  ])('Should properly encode nested objects', (obj) => {
    const encoded = encodeObjectToFragment(obj);
    const parts = encoded.split('&');

    return Object.entries(obj).every(([key, value]) => {
      const part = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      return parts.includes(part);
    });
  });

  test('Should skip undefined or null values', () => {
    const obj = {
      valid: 'value',
      empty: undefined,
      null: null,
      falsy: 0,
    };

    const encoded = encodeObjectToFragment(obj);
    expect(encoded).toBe('valid=value&falsy=0');
  });

  test('Should handle empty objects', () => {
    const encoded = encodeObjectToFragment({});
    expect(encoded).toBe('');
  });
});

describe('decodeFragmentToObject', () => {
  test.prop([
    fc.record({
      key1: fc.string(),
      key2: fc.string(),
      key3: fc.string(),
    }),
  ])('Should correctly decode URL fragment to object', (obj) => {
    const fragment =
      '#' +
      Object.entries(obj)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');

    const decoded = decodeFragmentToObject(fragment);
    return Object.entries(obj).every(([k, v]) => decoded[k] === v);
  });

  test('Should handle empty fragment', () => {
    const decoded = decodeFragmentToObject('#');
    expect(decoded).toEqual({});
  });

  test('Should handle fragment without values', () => {
    const decoded = decodeFragmentToObject('#key1=&key2=');
    expect(decoded).toEqual({ key1: '', key2: '' });
  });

  test('Should decode special characters', () => {
    const fragment = '#key1=%20space%20&key2=%3Dequals%3D&key3=%26ampersand%26';
    const decoded = decodeFragmentToObject(fragment);
    expect(decoded).toEqual({
      key1: ' space ',
      key2: '=equals=',
      key3: '&ampersand&',
    });
  });
});
