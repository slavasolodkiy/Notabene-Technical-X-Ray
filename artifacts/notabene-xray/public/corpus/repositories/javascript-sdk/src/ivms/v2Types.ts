import type {
  NaturalPerson,
  NaturalPersonName,
  NaturalPersonNameTypeCode,
  Person,
} from './types';

export type OriginatorV2 = {
  originatorPerson: PersonV2[];
};

export type BeneficiaryV2 = {
  beneficiaryPerson: PersonV2[];
};

export type NaturalPersonNameIDV2 = {
  primaryIdentifier?: string;
  secondaryIdentifier?: string;
  naturalPersonNameIdentifierType?: NaturalPersonNameTypeCode;
};

export type NaturalPersonNameV2 = Omit<NaturalPersonName, 'nameIdentifier'> & {
  nameIdentifier?: NaturalPersonNameIDV2[];
};

export type NaturalPersonV2 = Omit<NaturalPerson, 'name'> & {
  name: NaturalPersonNameV2;
  customerIdentification?: string;
};

export type PersonV2 = Omit<Person, 'naturalPerson'> & {
  naturalPerson?: NaturalPersonV2;
  accountNumber?: string[];
};
