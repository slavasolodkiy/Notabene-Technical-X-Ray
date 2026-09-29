# Jurisdiction rules and presentation definitions

**Research date:** 2026-09-24  
**Scope:** public evidence only; outbound, VASP-to-VASP transfers unless stated otherwise.

> This is an engineering reconstruction, not legal advice. A presentation definition is a Notabene implementation artifact, not the law itself. The simulator must show the source, valuation inputs, direction, counterparty type and unresolved assumptions; it must never label an outcome “compliant”.

## 1. What is public

| Layer | Finding | Status | Sources |
|---|---|---:|---|
| Jurisdiction index | Notabene publishes an unauthenticated `jurisdiction-thresholds.json` containing country code, currency, one or more thresholds, and presentation-definition URLs. | VERIFIED | [JUR-01](https://devx.notabene.id/docs/pii-requirements.md), [JUR-04](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json) |
| Requirements | Public presentation definitions map requirements to IVMS101 JSONPaths. Their `submission_requirements` express required groups with `rule: all`, and alternatives with `rule: pick` plus `count: 1`. | VERIFIED | [JUR-05](https://pd.notabene.id/ivms101/v2/GB-0.json), [JUR-06](https://pd.notabene.id/ivms101/v2/GB-1000.json) |
| Validation | Notabene documents a `validate-pii` API that reports `isValid`, `missingFields`, and `validPaths` for a supplied presentation-definition URL. No authenticated call was made. | VERIFIED | [JUR-01](https://devx.notabene.id/docs/pii-requirements.md) |
| Fallback | Notabene says jurisdictions without specific legislation use FATF guidelines; it publishes `FA-1000.json`. It also says all EU countries follow TFR. | VERIFIED documentation and published artifact, not a verified universal production selector; legal applicability remains contextual | [JUR-01](https://devx.notabene.id/docs/pii-requirements.md), [JUR-12](https://pd.notabene.id/ivms101/v2/FA-1000.json) |
| Direction selection | The public index and definitions do not encode incoming/outgoing direction, counterparty jurisdiction precedence, exchange-rate source, valuation instant, linked-transfer aggregation, or threshold selection algorithm. | UNKNOWN | [JUR-01](https://devx.notabene.id/docs/pii-requirements.md), [JUR-04](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json) |

## 2. Presentation-definition semantics

The common baseline group in GB, France, Singapore and Japan requires:

1. originator natural-person name tuple **or** legal-person name tuple;
2. originator `accountNumber[0]`;
3. beneficiary natural-person name tuple **or** legal-person name tuple; and
4. beneficiary `accountNumber[0]`.

“Natural or legal” here is a person-type branch, not permission to omit the applicable person name. Account-number fallbacks in law (for example, a unique transaction identifier) are represented inside Notabene’s IVMS mapping as `accountNumber`; the public definitions do not explain the normalization step. **Status: INFERRED.**

Examples of real OR logic:

- **GB-1000:** baseline **AND exactly one of** originator national identification, geographic address, date-and-place-of-birth, or customer identification. [JUR-06]
- **FR-0 / EU representative:** baseline **AND exactly one of** date-and-place-of-birth, customer identification, geographic address, or national identification. [JUR-07]
- **SG-1500:** baseline **AND exactly one of** national identification, date-and-place-of-birth, or geographic address. [JUR-10]
- **JP-0:** baseline **AND exactly one of** geographic address or customer identification. [JUR-11]
- **US-3000:** originator name **AND** geographic address **AND** beneficiary name **AND** both account numbers; no `pick` group. [JUR-08]

Within an alternative, all listed component JSONPaths carry `predicate: required`. A simulator should therefore treat “date and place of birth” as a compound alternative, not two independent options.

## 3. Law versus Notabene implementation

### United Kingdom

Current regulation 64C requires the names and account numbers (or unique transaction identifier) for inter-cryptoasset-business transfers. If every executing cryptoasset business is carrying on business in the UK, additional originator information is supplied on beneficiary-business request. Otherwise, from **2026-06-30**, a transfer **equal to or exceeding GBP 800**, including apparently linked transfers, must also carry paragraph (6) information. For an individual that is exactly one of customer ID, address, a birth-certificate/passport/national-ID-card number, or date and place of birth. For a firm it is customer ID **or** the specified registered/principal-place-of-business address. Originator information must be independently verified. **Status: VERIFIED.** [GAP-JUR-01]

The previously cited 2023 point-in-time text used **EUR 1,000**; it is retained as historical evidence only and is superseded for a 2026 decision. [JUR-19, GAP-JUR-01]

Notabene still publishes `GB-0` and `GB-1000`, and its current public index labels GB currency as **EUR**. That is a vendor artifact, not the current legal threshold. Public evidence does not state which definition Notabene selects at GBP 800, which comparator it applies to the vendor threshold, or which FX source/time it uses. **Status: UNKNOWN.** `GB-1000` also permits legal-person national identification even though current regulation 64C(6)(a) gives firms only customer ID or the specified business address; for individuals its generic national-identification object does not constrain the identifier to the three statutory document types. **Status: INFERRED mismatch.** [JUR-04, JUR-06, GAP-JUR-01]

### European Union (France as representative member)

EU Regulation 2023/1113 applies from 2024-12-30 irrespective of transfer amount. Article 14 requires originator name, applicable DLT/account identifier, and **either** `(address including country AND official personal document number AND customer identification number)` **or** `(date of birth AND place of birth)`. It separately requires beneficiary name and applicable DLT/account identifiers, and conditionally requires LEIs/equivalent identifiers when provided and supported. The EUR 1,000 rule is not a general Travel Rule threshold: for a self-hosted address it triggers measures to assess client ownership/control only when the amount **exceeds EUR 1,000**. **Status: VERIFIED.** [JUR-02]

Notabene’s France entry is `FR-0`: its vendor definition permits exactly one of address, national identification, customer identification, or date-and-place-of-birth. This is materially broader than Article 14(1)(d): address alone, document number alone, or customer ID alone can satisfy `FR-0` but cannot satisfy the first legal branch. It also does not expose DLT-address or LEI paths. Those may live elsewhere in the transfer payload, but the definition alone cannot establish that. **Status: VERIFIED law/vendor mismatch; whole-product handling UNKNOWN.** [JUR-02, JUR-07]

### United States

31 CFR 1010.410(e)-(f) applies to nonbank financial-institution transmittals of **USD 3,000 or more** and specifies records/travel information including transmittor name/address, amount, execution date, payment instructions, recipient financial institution and received recipient information. [JUR-15]

Notabene publishes only `US-3000` in the index. It requires originator name/address, beneficiary name, and originator/beneficiary account numbers. Public evidence does not establish what definition, if any, the service selects below USD 3,000, or how all regulatory fields outside IVMS PII are represented. **Status: UNKNOWN.**

### Singapore

MAS Notice PSN02 paragraph 13.4 requires originator name/account (or unique transaction reference) and beneficiary name/account for transfers **below or equal to SGD 1,500**. Paragraph 13.6 requires those fields plus **any one** of address, unique identification number, or date and place of birth/incorporation/registration only when the transfer **exceeds SGD 1,500**. [JUR-16]

Notabene publishes `SG-0` and `SG-1500`. For natural persons the fuller definition has the same high-level three-way one-of shape, but the public index does not document whether it is selected at equality. Selecting it at `>= 1500` would conflict with PSN02’s “exceeds” boundary. For legal persons, PSN02 permits date and place of incorporation/registration, while `SG-1500` has an empty legal-person path array for its date-and-place descriptor. A simulator must encode the legal `> 1500` boundary independently and must not claim the vendor definition fully represents the legal-person branch. **Status: VERIFIED boundary ambiguity and mapping mismatch.** [GAP-JUR-02, JUR-10]

### Japan

Notabene publishes a zero-threshold `JP-0` requiring the baseline plus originator geographic address **or** customer identification. [JUR-11]

Japan FSA’s English 2023 notice says travel-rule amendments took effect 2023-06-01 and describes scope involving crypto-assets/electronic payment instruments, including special handling around unhosted wallets and target jurisdictions. [JUR-17] Public English evidence collected here was insufficient to verify the exact statutory field list, equality boundary, reciprocal-jurisdiction scope as of 2026-09-24, or whether `JP-0` is exhaustive. Those points are **UNKNOWN** and the simulator should label the row “Notabene implementation view”, not “Japanese law”.

## 4. Same-transfer comparison

### Explicit assumptions

- 1 ETH, outbound from an originating VASP in the named jurisdiction to an identifiable foreign beneficiary VASP.
- Natural-person originator Alice; natural-person beneficiary Bob; one transfer, not linked or batched; both have VASP account identifiers.
- **Illustrative valuation instant:** 2026-09-24 12:00 UTC.
- **Assumed rates, not observed market data:** 1 ETH = USD 4,000 = EUR 3,400 = GBP 2,950 = SGD 5,100 = JPY 590,000.
- Valuation provider/method: user-supplied scenario constants. These values demonstrate branch selection only.
- For current UK law the comparison uses GBP 2,950. EUR 3,400 is retained only to show the separate, stale-looking Notabene index input; no vendor selector behavior is inferred.

| Originating jurisdiction | Current-law result | Public Notabene artifact (separate comparison) | Legal qualification |
|---|---|---|---|
| UK / GB | GBP 2,950 `>=` GBP 800: baseline plus the applicable paragraph (6) one-of branch | Index still exposes EUR 1,000 → `GB-1000`; whether/how Notabene selects it for a GBP 800 legal trigger is **UNKNOWN**. Its fields are baseline plus national ID **OR** address **OR** date+place of birth **OR** customer ID. | Current law and vendor artifact disagree in currency/amount. Do not derive one from the other. |
| EU / France | All amounts: Alice name + applicable account/DLT identifier + **either** (address including country **AND** official document number **AND** customer ID) **OR** (date **AND** place of birth); beneficiary and conditional identifier duties also apply | `FR-0` instead accepts exactly one of date+place of birth **OR** customer ID **OR** address **OR** national ID. | The vendor OR does **not** reproduce Article 14(1)(d). DLT address and possible LEI are not visible in this PII definition. |
| US | USD 4,000 `>=` USD 3,000: §1010.410 record/transmission branch applies | `US-3000` requires Alice name **AND** geographic address **AND** account; Bob name **AND** account. | The artifact is not the complete §1010.410 record; legal and vendor evaluations remain separate. |
| Singapore | SGD 5,100 `>` SGD 1,500: baseline plus one legal enhanced alternative | `SG-1500` requires Alice name/account; Bob name/account; and exactly one of Alice national ID **OR** date+place of birth **OR** geographic address. | Example is unambiguously above, but public vendor equality selection remains UNKNOWN; legal-person incorporation/registration is missing from the artifact. |
| Japan | Precise 2026 legal branch remains **UNKNOWN** from collected primary evidence | `JP-0` starts at index threshold zero and requires Alice name/account; Bob name/account; and address **OR** customer ID. | Implementation artifact verified; it is not asserted as Japanese law. |

## 5. Simulator-safe evaluation

1. Require `amountCrypto`, `asset`, `valuationTimestamp`, `fiatCurrency`, `fiatValue`, `rate`, `rateSource`, origin jurisdiction, direction and counterparty type.
2. Do decimal arithmetic; never binary floating point.
3. Apply an explicitly sourced legal comparator (`>=`, `>`, or `all`) and linked-transfer policy. Do not derive it from a filename or vendor threshold.
4. Evaluate and return `legalRule` and `notabenePresentationDefinition` independently; never use a vendor definition as proof that the legal branch is satisfied.
5. Expand `all` groups conjunctively and `pick/count:1` groups as one-of alternatives.
6. If vendor selection, below-threshold definition, FX policy or direction rule is not public, return `UNKNOWN`, not an empty requirement set or a guessed definition.
7. Show source links and a “scenario only—not a compliance determination” disclaimer on every result.

The machine-readable implementation matrix is in [`data/jurisdiction-matrix.json`](../data/jurisdiction-matrix.json).


## v2 index audit and evidence limits

**VERIFIED artifact:** the 2026-09-24 capture has 76 entries, 72 distinct keys, BR ×3, LI_old ×2 and IS_old ×2. XX_old is still inForce at EUR 1,000 and incorrectly links its narrative to Hong Kong; 27 individual EU member states have zero-threshold entries. US1-3000 adds beneficiary address, US2-0 requires originator date/place of birth and country of residence, and US0-0 has an originator-address set. Which variant a product selects is **UNKNOWN**. ID and GI use near-1,000 threshold strings; comparator-workaround intent is **INFERRED**.

**VERIFIED:** UK regulation 64C annotation F2 names SI 2026/621 regulation 32, effective 30 June 2026. The current-law comparison does not establish the vendor's deployed FX or selector behavior.

**VERIFIED artifact / INFERRED secondary alignment / UNKNOWN primary-law completeness:** JP-0 is threshold zero with address OR customer ID. Vendor narrative and the audit's secondary sources support no de minimis, but primary Japanese text was not fetched. Do not adopt the audit's definitive “resolved” wording or use the vendor artifact as legal proof.

**VERIFIED artifact / UNKNOWN runtime selection:** FA-1000 and pseudo-jurisdiction FA are published (USD 1,000, baseline plus four-way pick:1). This closes artifact existence only; no universal automatic fallback, precedence, comparator or absence-of-local-law determination was observed.

Sources: [index](https://pd.notabene.id/ivms101/v2/jurisdiction-thresholds.json), [US1](https://pd.notabene.id/ivms101/v2/US1-3000.json), [US2](https://pd.notabene.id/ivms101/v2/US2-0.json), [US0](https://pd.notabene.id/ivms101/v2/US0-0.json), [XX_old](https://pd.notabene.id/ivms101/v2/XX_old-1000.json), [JP](https://pd.notabene.id/ivms101/v2/JP-0.json), [Japan narrative](https://notabene.id/world/japan), [FA](https://pd.notabene.id/ivms101/v2/FA-1000.json), [64C](https://www.legislation.gov.uk/uksi/2017/692/regulation/64C).
