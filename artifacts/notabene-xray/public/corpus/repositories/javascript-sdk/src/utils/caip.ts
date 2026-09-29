// Regexes
export const ACCOUNT_ADDRESS_REGEX = '[-.%a-zA-Z0-9]{1,128}';
export const CAIP2_REGEX = '[-a-z0-9]{3,8}:[-_a-zA-Z0-9]{1,32}';
export const CAIP10_REGEX = `^${CAIP2_REGEX}:${ACCOUNT_ADDRESS_REGEX}$`;
export const CAIP19_REGEX = `^${CAIP2_REGEX}/[-a-z0-9]{3,8}:[-.%a-zA-Z0-9]{1,128}(/[-.%a-zA-Z0-9]{1,78})?$`;
export const CAIP220_REGEX = `^${CAIP2_REGEX}:[block:]?tx/[-.%a-zA-Z0-9]{1,128}$`;
export const CRYPTO_SYMBOL_REGEX = '^[A-Z0-9]{2,10}$';
export const DTI_REGEX = '^[A-Za-z0-9]{10}$';
export const COMBINED_ASSET_REGEX = `(${CRYPTO_SYMBOL_REGEX})|(${CAIP19_REGEX})|(${DTI_REGEX})`;

// Matchers
export const CAIP2_MATCHER = new RegExp(CAIP2_REGEX);
export const CAIP10_MATCHER = new RegExp(CAIP10_REGEX);
export const CAIP19_MATCHER = new RegExp(CAIP19_REGEX);
export const CAIP220_MATCHER = new RegExp(CAIP220_REGEX);
export const COMBINED_ASSET_MATCHER = new RegExp(COMBINED_ASSET_REGEX);
