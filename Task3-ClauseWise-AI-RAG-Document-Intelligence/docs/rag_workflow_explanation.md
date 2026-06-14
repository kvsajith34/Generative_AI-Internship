# ClauseWise AI — RAG Workflow Explanation
**File:** `docs/rag_workflow_explanation.md`

---

## What is RAG?

**Retrieval-Augmented Generation (RAG)** is an AI architecture pattern that combines two capabilities:

1. **Retrieval** — Finding and fetching relevant content from a knowledge base (documents, databases, vector stores)
2. **Generation** — Using a large language model (LLM) to synthesize, summarize, and reason over the retrieved content

RAG addresses a fundamental limitation of LLMs: their knowledge is frozen at a training cutoff date and cannot natively access proprietary or domain-specific documents. By retrieving document content at query time and injecting it into the model's context, RAG enables the LLM to answer questions grounded in specific, up-to-date, or confidential documents.

---

## How ClauseWise AI Simulates RAG

ClauseWise AI does not use a traditional RAG pipeline with a separate vector database and retrieval engine. Instead, it leverages **Claude Projects** on claude.ai to simulate the core RAG workflow natively:

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUSEWISE AI WORKFLOW                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [USER UPLOADS DOCUMENT]                                    │
│         ↓                                                   │
│  [CLAUDE PROJECT KNOWLEDGE BASE]                            │
│  • Document stored and chunked automatically                │
│  • Persistent across all project conversations              │
│         ↓                                                   │
│  [SYSTEM PROMPT INJECTION]                                  │
│  • ClauseWise AI instructions define behavior               │
│  • Strict: "Answer only from the uploaded document"         │
│  • Citation format enforced at system level                 │
│         ↓                                                   │
│  [USER QUERY]                                               │
│  e.g., "What are the key risks in this document?"           │
│         ↓                                                   │
│  [RETRIEVAL SIMULATION]                                     │
│  • Claude searches the project knowledge base               │
│  • Relevant document sections surfaced into context         │
│         ↓                                                   │
│  [GENERATION WITH GROUNDING]                                │
│  • Claude generates answer from retrieved content           │
│  • Every claim cited with page/section reference            │
│  • Refuses to answer what is not in the document            │
│         ↓                                                   │
│  [STRUCTURED OUTPUT]                                        │
│  • Dashboard / Table / Q&A / Risk Report                    │
│  • Audit-ready, portfolio-grade formatting                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## RAG Simulation: How Claude Projects Work

### Traditional RAG Architecture (for comparison)

```
User Query → Embedding Model → Vector Database → Top-K Chunks → LLM → Answer
```

### Claude Projects RAG Simulation

```
User Query → Claude Project Knowledge Base → Document Context → LLM (Claude) → Cited Answer
```

**Key Equivalences:**

| Traditional RAG Component | ClauseWise AI Equivalent |
|--------------------------|-------------------------|
| Document ingestion pipeline | Claude Project file upload |
| Chunking and embedding | Automatic (Claude handles internally) |
| Vector database | Claude Project knowledge base |
| Similarity search / retrieval | Claude's context window attention |
| LLM generation | Claude Sonnet 4.6 |
| Prompt template | ClauseWise AI system prompt |
| Grounding / anti-hallucination | System prompt rules + hallucination test |
| Output formatting | Structured markdown outputs |

---

## The ClauseWise AI Anti-Hallucination Layer

A critical feature of the ClauseWise AI RAG workflow is its explicit **hallucination prevention system**, implemented at the system prompt level:

### Layer 1: Pre-Answer Check
> "Before answering, check whether the answer is supported by the uploaded document. If not supported, refuse to answer rather than guessing."

### Layer 2: Source Citation Enforcement
> "Every factual answer must include a source reference. Prefer this citation format: `Source: Page X, Section Y — Clause Title`"

### Layer 3: Explicit Refusal Language
> "If the answer is not found in the document, say: 'I could not find this information in the uploaded document.'"

### Layer 4: Hallucination Safety Test (Prompt 6)
A dedicated test battery (20 questions) is run against every analysis session to verify that:
- Information absent from the document is correctly identified as absent
- Figures are not misattributed to wrong contexts
- Fabricated institutional actions are rejected
- General knowledge does not contaminate document-specific answers

**Result in Task 3:** 20/20 hallucination tests passed. Zero fabrications detected.

---

## Document Types Supported

ClauseWise AI is designed for, but not limited to:

| Document Type | Examples | RAG Utility |
|--------------|---------|-------------|
| Legal Contracts | NDAs, SaaS agreements, employment contracts | Clause extraction, risk flagging, obligation mapping |
| Research Reports | World Bank CMO, IMF WEO, academic papers | Finding extraction, stakeholder identification, date tracking |
| Technical Documents | SOWs, RFPs, system specifications | Requirement extraction, compliance checking |
| Policy Documents | Regulations, government circulars | Obligation mapping, deadline extraction |
| Financial Documents | Prospectuses, annual reports, filings | Risk disclosure extraction, stakeholder mapping |

---

## Why This Matters for Portfolio Projects

This workflow demonstrates three enterprise-grade AI capabilities:

1. **Grounded Generation** — The model only generates content supported by evidence
2. **Structured Extraction** — Unstructured document content is transformed into usable tables and summaries
3. **Reliable Citation** — Every claim is traceable to a specific source location

These capabilities are directly applicable to real-world use cases in legal tech, financial services, compliance, research, and knowledge management.

---

*This explanation was prepared as part of Task 3: ClauseWise AI RAG Document Intelligence project.*
