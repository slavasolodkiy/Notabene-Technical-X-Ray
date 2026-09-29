/**
 * Types that are not available in @notabene/javascript-sdk
 * These are specific to the API transformation logic
 */

import type { Agent, DID, IRI } from '@taprsvp/types';
import type { BeneficiaryV2, OriginatorV2 } from '../ivms';

export interface DelegateToken {
  sub?: DID;
  iss?: DID;
  scope?: 'delegate';
  exp?: number;
  iat?: number;
}

export interface BaseRequestConfig {
  originatorId?: IRI;
  beneficiaryId?: IRI;
}

export interface ResponseToTxCreateRequestConfig extends BaseRequestConfig {
  referenceId?: string;
  settlementAddress?: string;
}

export interface ResponseToIVMS101RequestConfig extends BaseRequestConfig {
  originator?: OriginatorV2;
  beneficiary?: BeneficiaryV2;
}

export type ResponseToTxRequestConfig = ResponseToTxCreateRequestConfig &
  ResponseToIVMS101RequestConfig;

export interface TransactionCreateRequestV2 {
  originator: {
    '@id': string;
  };
  beneficiary: {
    '@id': string;
  };
  asset: string;
  amount: string;
  agents: Agent[];
  ref: string;
}

export interface TransactionIVMS101Request {
  ivms101: {
    originator?: OriginatorV2;
    beneficiary?: BeneficiaryV2;
  };
}
