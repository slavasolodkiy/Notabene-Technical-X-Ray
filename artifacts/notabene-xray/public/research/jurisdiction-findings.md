# Jurisdiction research findings

**As of:** 2026-09-24  
**Method:** public web search, unauthenticated documentation/JSON retrieval, and primary-law retrieval only. No transaction or authenticated endpoint was used.

## Key Facts

- **VERIFIED — public rules service.** Notabene documents public presentation-definition URLs and a public jurisdiction threshold index. The index includes GB (0/1000, EUR), France (0, EUR), US (3000, USD), Singapore (0/1500, SGD), Japan (0, JPY), and a FATF fallback (`FA-1000`, USD). [JUR-01, JUR-04]
- **VERIFIED — executable logical shape.** Presentation definitions use JSONPath field constraints, `rule: all` for conjunctions, and `rule: pick` with `count: 1` for one-of alternatives. [JUR-05–JUR-12]
- **VERIFIED — current UK boundary.** From 2026-06-30, qualifying transfers trigger the additional-originator-data branch at **GBP 800 or more**, including apparently linked transfers. The 2023 EUR 1,000 text is superseded for current-law decisions. [GAP-JUR-01, JUR-19]
- **VERIFIED — UK law/vendor discrepancy.** Current law is `GBP 800` with `>=`; Notabene’s public artifacts remain `GB-0`/`GB-1000` with index currency EUR. Vendor selection at the new legal boundary and vendor FX source/time are UNKNOWN. [GAP-JUR-01, JUR-04, JUR-06]
- **VERIFIED — EU scope.** Regulation (EU) 2023/1113 has no general EUR 1,000 crypto Travel Rule exemption. EUR 1,000 is relevant to ownership/control assessment for self-hosted-address transfers, and the text says **exceeding**, not equal. It applies from 2024-12-30. [JUR-02]
- **VERIFIED — EU Boolean mismatch.** Article 14(1)(d) requires `(address including country AND official document number AND customer ID) OR (date AND place of birth)`. `FR-0` instead permits exactly one of address, national ID, customer ID, or date-and-place-of-birth, so the vendor definition is broader than the legal expression. [JUR-02, JUR-07]
- **VERIFIED — US boundary.** 31 CFR 1010.410(e)-(f) uses **USD 3,000 or more**. The legal record/transmission fields exceed the subset represented by `US-3000`. [JUR-15, JUR-08]
- **VERIFIED — Singapore equality.** PSN02 places transfers **below or equal to SGD 1,500** in the base-information branch and transfers **exceeding SGD 1,500** in the enhanced one-of branch. [JUR-16]
- **VERIFIED — Singapore legal-person mismatch.** PSN02 permits date/place of incorporation or registration as appropriate, while `SG-1500`’s corresponding descriptor has no legal-person paths. [GAP-JUR-02, JUR-10]
- **VERIFIED — Japan implementation artifact.** `JP-0` requires baseline names/accounts plus address **or** customer identification. [JUR-11]
- **VERIFIED — Notabene-stated fallback.** Notabene says FATF guidelines are used where no specific legislation exists and EU countries follow TFR. The exact internal fallback selection and precedence are not public. [JUR-01, JUR-12]

## Notable Claims Requiring Cross-Reference

- **UNKNOWN — threshold selector equality.** The threshold index gives numbers and URLs but no selector algorithm. Singapore demonstrates why filenames cannot determine equality: `SG-1500` is enhanced, while primary law assigns exactly SGD 1,500 to the lower branch. [JUR-04, JUR-10, JUR-16]
- **VERIFIED discrepancy — GB currency entry.** `GB.currency` remains EUR with threshold 1000, while current regulation 64C is GBP 800. Public Notabene evidence does not explain update timing, FX conversion or selector behavior. [GAP-JUR-01, JUR-04]
- **INFERRED — GB field mismatch.** `GB-1000` permits legal-person national identification, but current regulation 64C(6)(a) gives firms customer ID or specified business address. Its generic natural-person national ID also does not enforce the statute’s three permitted document types. [GAP-JUR-01, JUR-06]
- **VERIFIED — EU expressions must remain separate.** Treat Article 14’s compound two-branch expression independently from `FR-0`’s four-way vendor `pick`; passing the latter is not evidence of satisfying the former. [JUR-02, JUR-07]
- **UNKNOWN — account/address normalization.** Several laws permit a unique transaction identifier where no account exists, while the IVMS presentation definitions require `accountNumber[0]`. Public definitions do not show whether a blockchain address or transaction identifier is normalized into that field.
- **UNKNOWN — direction and precedence.** Public artifacts do not state whether originator jurisdiction, beneficiary jurisdiction, stricter-of-both, entity configuration, or counterparty request chooses the final definition.
- **UNKNOWN — US below USD 3,000.** The public index has only `US-3000`; absence of `US-0` is not proof that no information is collected below threshold.
- **UNKNOWN — current Japanese legal mapping.** The FSA English page establishes a 2023 effective date and broad scope, but the exact current field mapping and reciprocal-jurisdiction conditions were not established from the collected English primary text. `JP-0` must be presented as Notabene’s mapping.
- **INFERRED — EU non-PII transfer fields.** DLT addresses and LEIs required conditionally by EU law are absent from `FR-0`; they may be carried outside encrypted IVMS PII, but this research did not establish that pipeline.

## Source Quality Assessment

- **Tier 1:** EUR-Lex regulation, UK legislation, eCFR/FinCEN regulation, MAS notice, and Japan FSA pages are primary legal/regulatory sources. They control over vendor summaries for legal boundaries.
- **Tier 1 (implementation):** Notabene’s public JSON presentation definitions and threshold index are direct evidence of its published implementation artifacts, but not authoritative statements of law.
- **Tier 2:** Notabene Developer Hub documentation is authoritative for documented product behavior, while its legal summaries require primary-law cross-reference.
- **Currentness:** the Notabene PII page reports `updatedAt: 2025-12-23`; eCFR displayed an update status of 2026-09-22. The current UK source reports all changes known in force through 2026-09-23 and a 2026-06-30 amendment; JUR-19 is retained only as historical 2023 text. MAS source carries revision history. No source supports claiming the matrix is exhaustive or universally current.

## Gaps & Unanswered Questions

1. When current UK law triggers at GBP 800, which Notabene definition is selected and why does the public index still expose EUR 1,000?
2. What exchange-rate provider, timestamp, rounding rule and stale-rate policy does production use for cross-currency vendor selection?
3. Are linked transfers aggregated by Notabene, or must the customer submit an already-aggregated fiat value?
4. How are originator and beneficiary jurisdiction conflicts resolved, and does transfer direction change selection?
5. How are unique transaction identifiers, wallet addresses and account numbers mapped into IVMS101?
6. What is the US behavior below USD 3,000?
7. What is the definitive 2026 Japanese legal field list and covered-destination list?
8. Does `FA-1000` apply below threshold through another baseline definition, or only at/above a customer-selected threshold?
9. Where are EU DLT address, LEI/equivalent identifier and self-hosted ownership/control results carried?
10. Are public presentation definitions versioned immutably? Their URLs contain `v2`, but no publication date, ETag history or semantic version was established.

## Sources

- [JUR-01] Notabene, “PII requirements,” updated 2025-12-23.
- [JUR-02] Regulation (EU) 2023/1113, EUR-Lex.
- [JUR-04] Notabene public jurisdiction thresholds.
- [JUR-05–JUR-12] Notabene public GB, FR, US, SG, JP and FATF presentation definitions.
- [JUR-14] FCA operational expectations, 2023.
- [JUR-15] 31 CFR 1010.410, eCFR.
- [JUR-16] MAS Notice PSN02.
- [JUR-17] Japan FSA Weekly Review No. 540.
- [JUR-19] UK MLR regulation 64C point-in-time text.
- [GAP-JUR-01] Current UK MLR regulation 64C, including 2026-06-30 amendment.
- [GAP-JUR-02] Current MAS Notice PSN02 comparator and field text.
