# Jurisdiction gap-fill: comparator and Boolean logic

**Research date:** 2026-09-24  
**Scope:** public primary sources and public Notabene presentation-definition JSON only. This is a source comparison, not legal advice or an implementation specification.

## Executive finding

- **[VERIFIED — current UK law]** Regulation 64C(4), as amended from 2026-06-30, triggers the additional paragraph (6) information when an in-scope transfer is **equal to or exceeds £800**, including apparently linked transfers. The existing architecture and matrix use the superseded **EUR 1,000** text from the 2023 point-in-time version. [GAP-JUR-01]
- **[VERIFIED — current vendor artifact]** Notabene's public index/definitions still expose `GB-0` and `GB-1000`, and the index labels GB as EUR. [JUR-04, JUR-05, JUR-06]
- **[VERIFIED — exact UK law/vendor mismatch]** Current law is `GBP 800` with `>=`; the public vendor artifact is named `GB-1000` and indexed in EUR. The public vendor sources do not state a comparator or explain whether/when they were updated for the 2026 amendment. Therefore a current-law branch cannot be derived from the vendor index without inventing conversion, valuation, or selector behavior. **Unresolved vendor behavior:** which definition Notabene selects at £800, and which FX source/time it would use, remain **UNKNOWN**.
- **[VERIFIED — exact EU law/vendor mismatch]** Article 14(1)(d) requires **(address including country AND official personal document number AND customer identification number) OR (date AND place of birth)**. `FR-0` instead permits exactly one of address, national identification, customer identification, or date-and-place-of-birth. The vendor OR is therefore materially broader than the legal OR: address alone, document number alone, or customer ID alone can satisfy `FR-0` but not Article 14(1)(d). [JUR-02, JUR-07]
- **[VERIFIED — exact Singapore boundary gap]** Current PSN02 puts equality in the lower branch (`<= S$1,500`) and enhanced data only in the `> S$1,500` branch. The raw vendor files are `SG-0` and `SG-1500`, but neither the filename nor public index states whether `SG-1500` is selected at equality. **Unresolved vendor behavior:** equality selection remains **UNKNOWN**. [GAP-JUR-02, JUR-04, JUR-09, JUR-10]
- **[VERIFIED — exact Singapore legal-person mismatch]** PSN02's third enhanced alternative is date and place of birth, **incorporation, or registration**, as appropriate. In `SG-1500`, the date-and-place descriptor has natural-person paths and an empty legal-person path array. Thus the raw definition does not represent the incorporation/registration alternative for a legal-person originator. [GAP-JUR-02, JUR-10]

## United Kingdom

### Comparator and scope

- **[VERIFIED]** Paragraph (5) baseline information accompanies every inter-cryptoasset-business transfer: originator and beneficiary names, plus their account numbers or, where absent, the unique transaction identifier. These are conjunctive transfer requirements. [GAP-JUR-01]
- **[VERIFIED]** If every executing cryptoasset business is carrying on business in the UK, paragraph (6) is supplied on the beneficiary business's request; the threshold rule in paragraph (4) does not govern that all-UK case. [GAP-JUR-01]
- **[VERIFIED]** Otherwise, paragraph (6) is additionally mandatory at **£800 or more**, aggregating transfers that appear linked. The comparator is `>=`. [GAP-JUR-01]
- **[VERIFIED]** For an individual originator, paragraph (6) is exactly one of customer identification number, address, one of three specified document numbers, or date and place of birth. Date and place of birth is one compound alternative. [GAP-JUR-01]
- **[VERIFIED]** For a firm originator, paragraph (6) is customer identification number **or** the specified registered/principal-place-of-business address. [GAP-JUR-01]

### Notabene comparison

- **[VERIFIED]** `GB-1000` encodes baseline `all` plus a `pick`, `count: 1` among national identification, geographic address, date-and-place-of-birth, and customer identification. [JUR-06]
- **[VERIFIED]** The definition exposes national-identification, address, and customer-ID paths for both natural and legal persons; date-and-place-of-birth is natural-person-only. [JUR-06]
- **[INFERRED — mapping mismatch]** For firms, allowing Notabene's legal-person national-identification branch is broader than regulation 64C(6)(a), which lists only customer ID or the specified office/business address. For individuals, the generic IVMS national-identification object does not itself constrain the identifier to birth certificate, passport, or national identity card number. [GAP-JUR-01, JUR-06]

## Singapore

### Comparator and Boolean structure

- **[VERIFIED]** Current PSN02 paragraph 13.4 applies when the transfer is below or equal to S$1,500 and requires originator name **AND** originator account/unique reference **AND** beneficiary name **AND** beneficiary account/unique reference. [GAP-JUR-02]
- **[VERIFIED]** Paragraph 13.6 applies only when the amount **exceeds** S$1,500. It adds identity verification and requires the paragraph 13.4 data **AND any one of** address, unique identification number, or date and place of birth/incorporation/registration. [GAP-JUR-02]
- **[VERIFIED]** `SG-1500` has the same high-level natural-person shape: baseline `all` plus `pick`, `count: 1`, with national ID, date-and-place-of-birth, or geographic address. [JUR-10]
- **[VERIFIED]** The public vendor artifacts do not encode the legal `>` comparator. A filename ending in `1500` is not evidence for either `>` or `>=`. [JUR-04, JUR-10]

## European Union (France vendor definition as comparator)

- **[VERIFIED]** Article 14 applies the accompanying-information duty irrespective of amount. Recital 30 expressly states that crypto-asset transfers should face the same requirements regardless of amount and whether domestic or cross-border. [JUR-02]
- **[VERIFIED]** Article 14(1) joins originator name, applicable DLT/account identifier, paragraph (d) identity information, and conditional LEI/equivalent data. Article 14(2) separately joins beneficiary name, applicable DLT/account identifier, and conditional LEI/equivalent data. [JUR-02]
- **[VERIFIED]** Within Article 14(1)(d), the first branch is conjunctive: address including country **and** official personal document number **and** customer identification number. The alternative branch is date **and** place of birth. It is not a four-way OR. [JUR-02]
- **[VERIFIED]** The EUR 1,000 comparator is not a general Travel Rule threshold. For transfers to or from a self-hosted address, ownership/control assessment applies only when the amount **exceeds EUR 1,000** (`>`). [JUR-02]
- **[VERIFIED]** `FR-0` correctly uses a zero threshold and baseline `all`, but its `pick`, `count: 1` across four identity options does not reproduce Article 14(1)(d)'s compound first branch. The PII definition also does not expose DLT-address or conditional LEI paths. [JUR-07]
- **[UNKNOWN]** DLT addresses and LEIs may be represented elsewhere in Notabene's transfer payload. The presentation definition alone cannot establish omission from the whole product.

## Japan evidence check

- **[VERIFIED — existing evidence]** `JP-0` is baseline `all` plus exactly one of geographic address or customer identification. This establishes only the public Notabene implementation artifact. [JUR-11]
- **[VERIFIED — search discovery only]** A local-language query (`金融庁 トラベルルール 通知事項 送付人 受取人`) surfaced an FSA 2026 primary PDF on covered jurisdictions, including an English “Jurisdictions subject to travel rules” result dated 2026-06-18. It supports that the reciprocal-jurisdiction list has changed since the 2023 evidence, but it was not one of the two fetched gap sources and is not used to assert the statutory field list.
- **[UNKNOWN]** Within the allowed search/fetch budget, no fetched current Japanese primary text established an exhaustive current field list or a threshold comparator. Accordingly, no law-to-`JP-0` equivalence is claimed, and no implementation rule is invented.

## Safe disposition

- **[VERIFIED]** Replace no rule solely from this research file: the assignment was gap identification, not implementation.
- **[RECOMMENDED FROM VERIFIED EVIDENCE]** Treat the UK matrix's EUR 1,000 rule as stale after 2026-06-30; keep vendor selection separately UNKNOWN.
- **[RECOMMENDED FROM VERIFIED EVIDENCE]** Encode legal Boolean expressions independently from vendor presentation requirements. In particular, do not flatten the EU compound branch or infer Singapore equality semantics from a filename.
