[**@notabene/javascript-sdk**](../../README.md)

***

[@notabene/javascript-sdk](../../modules.md) / [types](../README.md) / PersonType

# Enumeration: PersonType

Enum defining the types of persons/entities in a transaction

## Remarks

This classification system aligns with FATF travel rule requirements and defines:
- NATURAL: Individual human persons acting in their own capacity
- LEGAL: Registered organizations, companies, or other legal entities
- SELF: When the counterparty is the same as the customer (first party transaction)

The type affects what information must be collected and transmitted as part of
travel rule compliance. Different verification and due diligence requirements
apply to each type.

## See

 - [NaturalPerson](../interfaces/NaturalPerson.md) For natural person data requirements
 - [LegalPerson](../interfaces/LegalPerson.md) For legal person data requirements

## Enumeration Members

### LEGAL

> **LEGAL**: `"legal"`

#### Defined in

[types.ts:291](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L291)

***

### NATURAL

> **NATURAL**: `"natural"`

#### Defined in

[types.ts:290](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L290)

***

### SELF

> **SELF**: `"self"`

#### Defined in

[types.ts:292](https://gitlab.com/notabene/open-source/javascript-sdk/-/blob/52abba74a4a6b14d6ca0d23191964d38919d32ea/src/types.ts#L292)
