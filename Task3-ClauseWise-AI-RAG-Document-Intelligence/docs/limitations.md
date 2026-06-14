# ClauseWise AI — Known Limitations
**File:** `docs/limitations.md`

---

## Overview

This document transparently identifies the known constraints, edge cases, and limitations of the ClauseWise AI RAG Document Intelligence system as demonstrated in Task 3. Understanding these limitations is essential for responsible deployment and accurate portfolio representation.

---

## Limitation 1 — Simulated RAG, Not True RAG Architecture

**Description:**
ClauseWise AI simulates a RAG workflow using Claude Projects' native knowledge base feature, rather than implementing a full production RAG pipeline with a dedicated vector database, embedding model, and retrieval engine.

**Implication:**
- In a production system, a true RAG pipeline would allow finer control over chunk size, retrieval strategy, top-K selection, and relevance scoring.
- Claude Projects retrieval is handled internally by Anthropic's infrastructure and is not fully transparent or configurable by the user.
- There is no explicit control over which document chunks are retrieved for any given query.

**Mitigation Applied:**
The system prompt enforces citation requirements that force the model to surface its sources, making retrieval partially observable through the citations in outputs.

**Severity:** Medium — Sufficient for portfolio demonstration; insufficient for enterprise production deployment without architectural upgrades.

---

## Limitation 2 — Document Type Mismatch

**Description:**
ClauseWise AI was designed and prompted for **legal and technical document analysis** (contracts, NDAs, SOWs, regulatory documents). The document uploaded for Task 3 — the World Bank Commodity Markets Outlook, April 2026 — is an **economic research report**, not a legal document.

**Implication:**
- Several output categories in the system prompt template (e.g., "Key Clauses," "Obligations," "Penalties") are not directly applicable to an economic research report.
- The system required adaptation of terminology: "clauses" → "key findings"; "obligations" → "policy implications."
- The hallucination test questions (medical advice, criminal penalties, ₹10 crore fines) were correctly handled as "not found," but they were also specifically designed for contract documents, making some tests less discriminating for this document type.

**Mitigation Applied:**
The system adapted its output framework appropriately. A disclaimer was added to all outputs: "This is document analysis only, not financial/legal advice."

**Severity:** Low for this task — adaptation was successful. Medium for real-world deployment if document type matching is not managed.

---

## Limitation 3 — Context Window Constraints

**Description:**
The World Bank Commodity Markets Outlook, April 2026 is approximately 69 pages with dense numerical data, 21+ figures, and extensive tables. Very large documents may exceed Claude's effective context window for certain types of analysis, particularly when simultaneous comparison of multiple tables and figures is required.

**Implication:**
- Figure content (actual chart data) was not directly readable from the PDF images in some cases — only figure captions and surrounding text were reliably extracted.
- Highly detailed numerical comparisons across all 46 commodity forecasts in Table 1 relied on the text rendering of the table.
- In very long conversations within a project, earlier document context may be deprioritized.

**Mitigation Applied:**
All outputs were verified against explicit textual statements in the document. Figure captions and surrounding prose were used where figure image data was not directly readable.

**Severity:** Low for this document size. High for documents exceeding 100+ pages without chunking strategies.

---

## Limitation 4 — No Real-Time Data Access

**Description:**
ClauseWise AI can only analyze what is in the uploaded document. It cannot access real-time commodity prices, updated IEA data, or any information published after the document's data cutoff of April 20, 2026.

**Implication:**
- The analysis reflects the state of commodity markets as of April 20, 2026.
- Any market developments after that date (e.g., actual Strait of Hormuz reopening timeline, final 2026 oil prices) cannot be incorporated.
- Users relying on this analysis for investment or policy decisions must supplement it with current data.

**Mitigation Applied:**
All outputs clearly note the April 20, 2026 data cutoff. All forecasts are labeled as projections with uncertainty acknowledged.

**Severity:** Medium — Inherent to any document-based RAG system; not a system failure, but a use-case boundary.

---

## Limitation 5 — Image and Figure Data Extraction

**Description:**
The uploaded PDF contains 21+ figures with embedded charts, graphs, and visual data (bar charts, line graphs, scatter plots). The ClauseWise AI system cannot directly read or extract numerical data encoded solely within chart images. It relies on:
- Figure captions (which are text and were reliably extracted)
- Surrounding prose that describes the figures
- Tables (Table 1, which is text-formatted) for precise numerical data

**Implication:**
- Some specific data points visible only in charts (e.g., exact historical price series values, precise country-level bars in regional figures) may not be extractable.
- Analysis of visual content (e.g., "Compare the shapes of Figure SF.3.A and SF.3.B") is limited.

**Mitigation Applied:**
All numerical claims in outputs were verified against textual descriptions in the document. No chart-only data was used without prose corroboration.

**Severity:** Low to Medium — The World Bank CMO provides extensive textual descriptions of all figures, minimizing this gap.

---

## Limitation 6 — No Cross-Document Analysis in This Task

**Description:**
Task 3 uploaded a single document. ClauseWise AI is capable of multi-document comparison within a Claude Project, but this capability was not exercised here.

**Implication:**
- Cannot compare April 2026 CMO findings against October 2025 CMO findings without uploading both documents.
- Cannot cross-reference against IEA primary data, USDA databases, or WFP reports directly.

**Mitigation Applied:**
The April 2026 CMO itself contains cross-references and comparisons with prior editions (e.g., "upward revision of 25 percent from the January 2026 projection"), which were captured in the analysis.

**Severity:** Low for this task's scope. Addressable by uploading multiple documents to the same project.

---

## Limitation 7 — Confidence Level Is Qualitative

**Description:**
In the Citation-Grounded Q&A outputs (Prompt 5), confidence levels (High / Medium / Low) are qualitative assessments based on how explicitly a claim is stated in the document. They are not statistically derived confidence scores.

**Implication:**
- "High" confidence means the exact figure or statement is explicitly in the document.
- "Medium" would mean the claim requires some synthesis across multiple sections.
- No probabilistic uncertainty quantification is provided.

**Mitigation Applied:**
All Q&A examples in Task 3 received "High" confidence ratings because all claims were explicitly stated in the document. The qualitative system is transparent and consistent.

**Severity:** Low — Appropriate for document analysis use cases. For financial risk modeling, quantitative confidence scoring would require additional tooling.

---

## Limitation 8 — System Prompt Does Not Prevent All Edge Case Errors

**Description:**
While the ClauseWise AI system prompt includes strong anti-hallucination rules, it relies on the underlying Claude model to comply. In extremely long conversations or adversarial prompt injections, model behavior could drift from the system prompt rules.

**Implication:**
- Extended multi-turn conversations may see increased hallucination risk as the conversation history grows.
- Adversarial users who attempt to override the system prompt with user-turn instructions could potentially bypass restrictions.

**Mitigation Applied:**
- Each analysis session starts fresh in the Claude Project.
- The Hallucination Safety Test (Prompt 6) is run as a post-analysis quality check.
- All outputs were manually verified against the source document.

**Severity:** Low in controlled portfolio use. Medium in production deployment with untrusted user inputs.

---

## Summary Table

| # | Limitation | Severity | Status |
|---|-----------|---------|--------|
| 1 | Simulated RAG (not full pipeline) | Medium | Documented; mitigated for portfolio use |
| 2 | Document type mismatch (research vs. contract) | Low | Adapted successfully |
| 3 | Context window constraints for very large documents | Low | Not an issue for this document |
| 4 | No real-time data access | Medium | Inherent to document-based RAG |
| 5 | Image/figure data extraction limits | Low–Medium | Prose descriptions sufficient |
| 6 | Single-document scope | Low | Addressable by multi-document upload |
| 7 | Qualitative confidence levels | Low | Appropriate for this use case |
| 8 | System prompt edge cases | Low | Monitored via Prompt 6 testing |

---

*This limitations document was prepared as part of Task 3: ClauseWise AI RAG Document Intelligence project. Transparent acknowledgment of limitations is a hallmark of responsible AI system documentation.*
