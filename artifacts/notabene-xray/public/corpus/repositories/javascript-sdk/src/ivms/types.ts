/**
 * ISO-3166 Alpha-2 country code
 * @example "US" for United States, "GB" for United Kingdom
 * @public
 */
export type ISOCountryCode = string;

/**
 * A point in time, represented as a day within the calendar year. Compliant with ISO 8601.
 * Format: YYYY-MM-DD
 * @example "2023-05-15" for May 15, 2023
 * @public
 */
export type ISODate = `${number}-${number}-${number}`;

/**
 * Natural Person Name Type Code
 * Specifies the type of name for a natural person
 *
 * @public
 */
export type NaturalPersonNameTypeCode =
  | 'ALIA' // Alias name: A name other than the legal name by which a natural person is also known
  | 'BIRT' // Name at birth: The name given to a natural person at birth
  | 'MAID' // Maiden name: The original name of a natural person who has changed their name after marriage
  | 'LEGL' // Legal name: The name that identifies a natural person for legal, official or administrative purposes
  | 'MISC'; // Unspecified: A name by which a natural person may be known but which cannot otherwise be categorized

/**
 * Legal Person Name Type Code
 * Specifies the type of name for a legal person
 * @public
 */
export type LegalPersonNameTypeCode =
  | 'LEGL' // Legal name: Official name under which an organisation is registered
  | 'SHRT' // Short name: Specifies the short name of the organisation
  | 'TRAD'; // Trading name: Name used by a business for commercial purposes

/**
 * Address Type Code
 * Specifies the type of address
 * @public
 */
export type AddressTypeCode =
  | 'HOME' // Residential: Address is the home address
  | 'BIZZ' // Business: Address is the business address
  | 'GEOG'; // Geographic: Address is the unspecified physical (geographical) address

/**
 * National Identifier Type Code
 * Specifies the type of national identifier
 * @public
 */
export type NationalIdentifierTypeCode =
  | 'ARNU' // Alien registration number
  | 'CCPT' // Passport number
  | 'RAID' // Registration authority identifier
  | 'DRLC' // Driver license number
  | 'FIIN' // Foreign investment identity number
  | 'TXID' // Tax identification number
  | 'SOCS' // Social security number
  | 'IDCD' // Identity card number
  | 'LEIX' // Legal Entity Identifier
  | 'MISC'; // Unspecified

/**
 * Transliteration Method Code
 * Specifies the method used to transliterate text
 * @public
 */
export type TransliterationMethodCode =
  | 'arab' // Arabic (Arabic language) - ISO 233-2:1993
  | 'aran' // Arabic (Persian language) - ISO 233-3:1999
  | 'armn' // Armenian - ISO 9985:1996
  | 'cyrl' // Cyrillic - ISO 9:1995
  | 'deva' // Devanagari & related Indic - ISO 15919:2001
  | 'geor' // Georgian - ISO 9984:1996
  | 'grek' // Greek - ISO 843:1997
  | 'hani' // Han (Hanzi, Kanji, Hanja) - ISO 7098:2015
  | 'hebr' // Hebrew - ISO 259-2:1994
  | 'kana' // Kana - ISO 3602:1989
  | 'kore' // Korean - Revised Romanization of Korean
  | 'thai' // Thai - ISO 11940-2:2007
  | 'othr'; // Script other than those listed above - Unspecified

/**
 * National Identification
 * Represents a national identifier for a person or entity
 * @public
 */
export type NationalIdentification = {
  /** National identifier (max 35 characters) */
  nationalIdentifier?: string;
  /** Type of national identifier */
  nationalIdentifierType?: NationalIdentifierTypeCode;
  /** Country that issued the national identifier */
  countryOfIssue?: ISOCountryCode;
  /** Registration authority (format: RA followed by 6 digits) */
  registrationAuthority?: string;
};

/**
 * Date and Place of Birth
 * Represents the date and place of birth for a natural person
 * @public
 */
export type DateAndPlaceOfBirth = {
  /** Date of birth in ISO 8601 format (YYYY-MM-DD) */
  dateOfBirth?: ISODate;
  /** Place of birth (max 70 characters) */
  placeOfBirth?: string;
};

/**
 * Address
 * Represents a physical address
 * @public
 */
export type Address = {
  /** Identifies the nature of the address. */
  addressType: AddressTypeCode;
  /** Identification of a division of a large organisation or building. */
  department?: string;
  /** Identification of a sub-division of a large organisation or building. */
  subDepartment?: string;
  /** Name of a street or thoroughfare. */
  streetName?: string;
  /** Number that identifies the position of a building on a street. */
  buildingNumber?: string;
  /** Name of the building or house. */
  buildingName?: string;
  /** Floor or storey within a building. */
  floor?: string;
  /** Numbered box in a post office. */
  postBox?: string;
  /** Building room number. */
  room?: string;
  /** Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail. */
  postcode?: string;
  /** Name of a built-up area, with defined boundaries, and a local government. */
  townName: string;
  /** Specific location name within the town. */
  townLocationName?: string;
  /** Identifies a subdivision within a country subdivision. */
  districtName?: string;
  /** Identifies a subdivision of a country such as state, region, province. */
  countrySubDivision?: string;
  /** Information that locates and identifies a specific address, presented in free format text. */
  addressLine?: string[];
  /** Nation with its own government. */
  country: ISOCountryCode;
};

/**
 * Local Natural Person Name ID
 * Represents a local name identifier for a natural person
 * @public
 */
export type LocalNaturalPersonNameID = {
  /** Primary identifier, maximum 100 characters in local format */
  primaryIdentifier?: string;
  /** Secondary identifier, maximum 100 characters in local format */
  secondaryIdentifier?: string;
  /** Type of name identifier */
  nameIdentifierType?: NaturalPersonNameTypeCode;
};

/**
 * Natural Person Name ID
 * Represents a name identifier for a natural person
 * @public
 */
export type NaturalPersonNameID = {
  /** Primary identifier, maximum 100 characters */
  primaryIdentifier?: string;
  /** Secondary identifier, maximum 100 characters */
  secondaryIdentifier?: string;
  /** Type of name identifier */
  nameIdentifierType?: NaturalPersonNameTypeCode;
};

/**
 * Natural Person Name
 * Represents the full name structure for a natural person
 * @public
 */
export type NaturalPersonName = {
  /** Array of name identifiers */
  nameIdentifier?: NaturalPersonNameID[];
  /** Array of local name identifiers */
  localNameIdentifier?: LocalNaturalPersonNameID[];
  /** Array of phonetic name identifiers */
  phoneticNameIdentifier?: LocalNaturalPersonNameID[];
};

/**
 * Natural Person
 * Represents a natural person with all associated information
 * @public
 */
export type NaturalPerson = {
  /** The distinct words used as identification for an individual */
  name: NaturalPersonName;
  /** The particulars of a location at which a person may be communicated with */
  geographicAddress?: Address[];
  /** A distinct identifier used by governments to uniquely identify a natural person */
  nationalIdentification?: NationalIdentification;
  /** A distinct identifier that uniquely identifies the person to the institution in context */
  customerIdentification?: string;
  /** Date and place of birth of a person */
  dateAndPlaceOfBirth?: DateAndPlaceOfBirth;
  /** Country in which a person resides (the place of a person's home) */
  countryOfResidence?: ISOCountryCode;
};

/**
 * Local Legal Person Name ID
 * Represents a local name identifier for a legal person
 * @public
 */
export type LocalLegalPersonNameID = {
  /** Name of the legal person, maximum 100 characters in local format */
  legalPersonName?: string;
  /** Type of legal person name identifier */
  legalPersonNameIdentifierType?: LegalPersonNameTypeCode;
};

/**
 * Legal Person Name ID
 * Represents a name identifier for a legal person
 * @public
 */
export type LegalPersonNameID = {
  /** Name by which the legal person is known */
  legalPersonName: string;
  /** The nature of the name specified */
  legalPersonNameIdentifierType: LegalPersonNameTypeCode;
};

/**
 * Legal Person Name
 * Represents the full name structure for a legal person
 * @public
 */
export type LegalPersonName = {
  /** Array of name identifiers */
  nameIdentifier: LegalPersonNameID[];
  /** Array of local name identifiers */
  localNameIdentifier?: LocalLegalPersonNameID[];
  /** Array of phonetic name identifiers */
  phoneticNameIdentifier?: LocalLegalPersonNameID[];
};

/**
 * Legal Person
 * Represents a legal person with all associated information
 * @public
 */
export type LegalPerson = {
  /** The name of the legal person */
  name: LegalPersonName;
  /** The address of the legal person */
  geographicAddress?: Address[];
  /** A distinct identifier that uniquely identifies the person to the institution in context */
  customerNumber?: string;
  /** A distinct identifier used by governments to uniquely identify a legal person */
  nationalIdentification?: NationalIdentification;
  /** The country in which the legal person is registered */
  countryOfRegistration?: ISOCountryCode;
};

/**
 * Person
 * Represents either a natural person or a legal person
 * @public
 */
export type Person = {
  /** Natural person information */
  naturalPerson?: NaturalPerson;
  /** Legal person information */
  legalPerson?: LegalPerson;
};

/**
 * Intermediary VASP
 * Represents an intermediary Virtual Asset Service Provider
 * @public
 */
export type IntermediaryVASP = {
  /** The intermediary VASP information */
  intermediaryVASP?: Person;
  /** The sequence number of this VASP in the transfer path */
  sequence?: number;
};

/**
 * Originator
 * Represents the account holder who initiates the VA transfer
 * @public
 */
export type Originator = {
  /** Array of persons associated with the originator */
  originatorPersons?: Person[];
  /** Array of account numbers, maximum 100 characters each */
  accountNumber?: string[];
};

/**
 * Beneficiary
 * Represents the receiver of the requested VA transfer
 * @public
 */
export type Beneficiary = {
  /** Array of persons associated with the beneficiary */
  beneficiaryPersons?: Person[];
  /** Array of account numbers, maximum 100 characters each */
  accountNumber?: string[];
};

/**
 * Originating VASP
 * Represents the VASP which initiates the VA transfer
 * @public
 */
export type OriginatingVASP = {
  /** The originating VASP information */
  originatingVASP?: Person;
};

/**
 * Beneficiary VASP
 * Represents the VASP which receives the VA transfer
 * @public
 */
export type BeneficiaryVASP = {
  /** The beneficiary VASP information */
  beneficiaryVASP?: Person;
};

/**
 * Transfer Path
 * Represents the path of intermediary VASPs in a transfer
 * @public
 */
export type TransferPath = {
  /** Array of intermediary VASPs involved in the transfer */
  transferPath?: IntermediaryVASP[];
};

/**
 * 6.7
 * Data describing the contents of the payload.
 */
export interface PayloadMetadata {
  /** The method used to map from a national system of writing to Latin script. */
  transliterationMethod?: TransliterationMethodCode[];
  /** The version of IVMS 101 to which the payload complies. */
  payloadVersion: PayloadVersionCode;
}
/**
 * The version of IVMS 101 to which the payload complies.
 */
export enum PayloadVersionCode {
  /** Published May 2020 */
  V101 = '101',
  /** Published August 2023 */
  V101_2023 = '101.2023',
}

/**
 * IVMS101 definition
 *
 * @public
 */
export type IVMS101 = {
  originator?: Originator;
  beneficiary?: Beneficiary;
  originatingVASP?: OriginatingVASP;
  beneficiaryVASP?: BeneficiaryVASP;
  transferPath?: TransferPath;
  payloadMetadata?: PayloadMetadata;
};
