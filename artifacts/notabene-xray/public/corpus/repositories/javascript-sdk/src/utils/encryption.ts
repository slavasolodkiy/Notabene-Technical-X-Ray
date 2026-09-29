/**
 * Result of a sealing operation, containing ciphertext and encryption key.
 */
export interface Sealed {
  /** Base64-encoded ciphertext combined with initialization vector (IV) */
  readonly ciphertext: string;
  /** Base64-encoded encryption key */
  readonly key: string;
}

/**
 * Encrypts an object using AES-GCM encryption.
 * @template T Type of data to encrypt
 * @param data Data to encrypt
 * @param existingKey Optional existing key to use for encryption
 * @returns Promise resolving to a Sealed object containing ciphertext and key
 */
export async function seal<T>(data: T, existingKey?: string): Promise<Sealed> {
  // Convert the object to a JSON string
  const plaintext = JSON.stringify(data);
  const encoder = new TextEncoder();

  // Restore or generate a random encryption key
  const rawKey = existingKey
    ? base64ToUint8Array(existingKey)
    : crypto.getRandomValues(new Uint8Array(32));
  const key = await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt'],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV

  // Encrypt the plaintext
  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoder.encode(plaintext),
  );

  // Combine the IV and ciphertext, separated by `-`
  const ciphertext = `${arrayBufferToBase64(iv)}-${arrayBufferToBase64(ciphertextBuffer)}`;

  // Return the base64 encoded ciphertext and key
  return {
    ciphertext,
    key: arrayBufferToBase64(rawKey),
  };
}

/**
 * Decrypts previously sealed object.
 * @template T Type of data that was encrypted
 * @param sealed Sealed object containing ciphertext and key
 * @returns Promise resolving to the original decrypted data
 */
export async function unseal<T>({ ciphertext, key }: Sealed): Promise<T> {
  // Split the IV and the ciphertext
  const [ivBase64, ciphertextBase64] = ciphertext.split('-');

  // Decode the key, IV, and ciphertext
  const rawKey = new Uint8Array(
    atob(key)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );
  const iv = base64ToUint8Array(ivBase64);
  const ciphertextBuffer = base64ToUint8Array(ciphertextBase64);

  // Import the key
  const keyObj = await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['decrypt'],
  );

  // Decrypt the ciphertext
  const decoder = new TextDecoder();
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    keyObj,
    ciphertextBuffer,
  );

  // Parse and return the original object
  return JSON.parse(decoder.decode(plaintextBuffer));
}

/**
 * Converts an ArrayBuffer to a Base64 string
 * @param buffer The ArrayBuffer to convert
 * @returns Base64 encoded string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

/**
 * Converts a Base64 string to a Uint8Array
 * @param base64 The Base64 string to convert
 * @returns Uint8Array containing the decoded data
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}
