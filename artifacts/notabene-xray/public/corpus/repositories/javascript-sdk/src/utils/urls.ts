export function encodeObjectToFragment(obj: any) {
  return Object.entries(obj)
    .map(([key, value]) => {
      // Change condition to check for undefined/null specifically
      if (value === undefined || value === null) return undefined;
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(
        typeof value === 'object' ? JSON.stringify(value) : String(value), // Use String() to handle all primitive types
      );
      return `${encodedKey}=${encodedValue}`;
    })
    .filter((entry) => entry !== undefined)
    .join('&');
}
/**
 * Decodes a URL fragment into an object
 *
 * @param fragment - The URL fragment to decode
 * @returns An object containing the decoded key-value pairs
 * @public
 */
export function decodeFragmentToObject(
  fragment: string,
): Record<string, string> {
  const withoutHash = fragment.slice(1);
  if (!withoutHash) return {}; // Return empty object for empty fragment

  const pairs = withoutHash.split('&').filter(Boolean); // Filter out empty strings
  return pairs.reduce(
    (obj, pair) => {
      const [key, value] = pair.split('=');
      if (key) {
        // Only add if key exists
        obj[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
      return obj;
    },
    {} as Record<string, string>,
  );
}
