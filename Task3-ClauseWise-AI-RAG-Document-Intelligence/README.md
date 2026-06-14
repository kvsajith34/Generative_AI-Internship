# ClauseWise AI — RAG Document Intelligence
### Task 3 | AI Document Analysis Portfolio Project

---

## Project Overview

**ClauseWise AI** is a professional document intelligence assistant built on Claude Projects (claude.ai). It simulates a **Retrieval-Augmented Generation (RAG)** workflow to analyze legal and technical documents — extracting risks, dates, stakeholders, and key findings — with mandatory source citations and built-in hallucination prevention.

This repository documents Task 3 of the ClauseWise AI project: a complete end-to-end analysis of the **World Bank Group's Commodity Markets Outlook, April 2026** — a 69-page economic research report documenting one of the most significant commodity market disruptions in recorded history.

---

## Document Analyzed

| Field | Detail |
|-------|--------|
| **Document** | Commodity Markets Outlook, April 2026 |
| **Publisher** | World Bank Group |
| **Type** | Semi-annual Economic Research Report |
| **Data Cutoff** | April 20, 2026 |
| **Pages** | ~69 |
| **Key Event Covered** | Middle East war → Strait of Hormuz closure → Largest oil supply shock on record (~10 mb/d) |

---

## Repository Structure

```
## 📁 Project Structure

```text
Task3-ClauseWise-AI-RAG-Document-Intelligence/
│
├── README.md                              ← Project overview, workflow summary, usage guide, and task explanation
│
├── claude_project/
│   ├── project_instructions.md           ← Official ClauseWise AI Claude Project instructions / system prompt
│   ├── project_setup_steps.md            ← Step-by-step guide for creating and configuring the Claude Project
│   └── uploaded_knowledge_files.md       ← Uploaded knowledge file inventory and document profile
│
├── docs/
│   ├── final_reflection.md               ← Final project learnings, outcomes, and internship reflection
│   ├── limitations.md                    ← Known limitations, scope boundaries, and document-type constraints
│   ├── rag_workflow_explanation.md       ← Explanation of the simulated RAG workflow and document intelligence pipeline
│   ├── task_requirement_mapping.md       ← Mapping between internship Task 3 requirements and project implementation
│   └── testing_report.md                 ← Quality assurance report, citation checks, and hallucination safety testing summary
│
├── outputs/
│   ├── cited_qa_examples.md              ← Citation-grounded Q&A examples generated from the uploaded document
│   ├── executive_summary_dashboard.md    ← Full document intelligence dashboard with summary, risks, dates, and stakeholders
│   ├── hallucination_test_results.md     ← Hallucination safety test results showing unsupported-question refusal behavior
│   ├── important_dates.md                ← Extracted dates, periods, timelines, and time-based references
│   ├── risks_table.md                    ← Extracted risk table with categories, severity levels, impacts, and sources
│   └── stakeholders_table.md             ← Stakeholder/entity mapping extracted from the document
│
├── prompts/
│   ├── execution_prompt_pack.md          ← Complete prompt pack used for summary, risks, dates, stakeholders, and Q&A
│   └── hallucination_test_prompt.md      ← Dedicated prompt used to test hallucination resistance and factual grounding
│
├── sample_documents/
│   └── CMO-April-2026.pdf                ← Source document used for ClauseWise AI analysis: World Bank CMO April 2026 report
│
└── screenshots/
    ├── claude_project_home.png           ← Screenshot proof of the Claude Project home/setup page
    └── summary_dashboard.png             ← Screenshot proof of the generated summary dashboard output
```

```

---

## Key Outputs at a Glance

### Prompt 1 — Document Intelligence Dashboard
A 9-section structured dashboard covering: document identification, executive summary, key findings, commodity price forecasts for 15+ commodities, risks, important dates, stakeholders, missing information, and source references.

### Prompt 2 — Risk Extraction Table
**18 risks** identified and categorized across energy, food security, fertilizer supply, base metals, macroeconomic, and climate dimensions. Each row includes severity rating (High/Medium/Low), potential impact, suggested review action, and source citation.

| Severity | Count |
|---------|-------|
| High | 8 |
| Medium | 8 |
| Low | 2 |

### Prompt 3 — Important Dates & Timeline
**35 dates and time periods** extracted — from the data cutoff (April 20, 2026) through baseline recovery projections (2026Q4) and 2027 price reversal forecasts. Includes a visual ASCII timeline summary.

### Prompt 4 — Stakeholder Extraction
**62+ stakeholders** mapped across 3 categories:
- 30 named individuals (authors, reviewers, communications team)
- 18 institutional stakeholders (World Bank, IEA, WFP, FAO, IFA, OPEC+, etc.)
- 14 country/regional stakeholders (Middle East, China, U.S., EU, India, etc.)

### Prompt 5 — Citation-Grounded Q&A
6 research questions answered with full citations:
1. Impact of Middle East war on global oil supply
2. World Bank Brent oil price forecast 2026–2027
3. Fertilizer price changes and drivers
4. Food insecurity projections
5. Special Focus findings on geopolitical oil supply shocks
6. Macroeconomic consequences for emerging markets

### Prompt 6 — Hallucination Safety Test
**20/20 tests passed. Zero hallucinations detected.**

---

## Quality Metrics

| Metric | Target | Achieved |
|--------|--------|---------|
| Outputs with source citations | 100% | ✅ 100% |
| Hallucination test pass rate | 100% | ✅ 100% (20/20) |
| Facts traceable to document | 100% | ✅ 100% |
| Price data accuracy | 100% | ✅ 8/8 verified |
| Stakeholders correctly identified | All named | ✅ 62+ entities |
| Risks extracted | All documented | ✅ 18 identified |

---

## How to Reproduce This Analysis

### Prerequisites
- Claude.ai account (Pro or Team plan recommended)
- The document: `CMO-April-2026.pdf` (available at https://www.worldbank.org/commodities)

### Steps
1. Create a new Claude Project on claude.ai
2. Paste the system prompt from `claude_project/project_instructions.md` as Project Instructions
3. Upload `CMO-April-2026.pdf` to the project knowledge base
4. Run each prompt from `prompts/execution_prompt_pack.md` sequentially
5. Run the hallucination test from `prompts/hallucination_test_prompt.md` as a final quality check

Detailed instructions: see `claude_project/project_setup_steps.md`

---

## Core ClauseWise AI Principles

| Principle | Implementation |
|-----------|---------------|
| **Document-only** | System prompt prohibits answering from general knowledge |
| **Always cite** | Every factual claim must include `Source: Page X, Section Y` |
| **Refuse to guess** | Standard refusal language for all absent information |
| **Test for hallucinations** | 20-question safety test run after every analysis session |
| **Audit-ready output** | Structured markdown tables, consistent formatting, professional tone |

---

## Technology Stack

| Component | Tool |
|-----------|------|
| LLM | Claude (claude.ai) |
| RAG Simulation | Claude Projects — native knowledge base |
| Document Format | PDF |
| System Prompt | Custom ClauseWise AI prompt (see `claude_project/project_instructions.md`) |
| Output Format | Markdown (.md) |
| Version Control | GitHub |

---

## Document Analysis Disclaimer

All outputs in this repository are generated from the uploaded document (CMO-April-2026.pdf) only.
This is **document analysis**, not financial, legal, or investment advice.

The World Bank Commodity Markets Outlook, April 2026 is published under the **Creative Commons Attribution 3.0 IGO (CC BY 3.0 IGO)** license.

Proper attribution:
> World Bank. 2026. *Commodity Markets Outlook, April 2026*. Washington, DC: World Bank.
> License: Creative Commons Attribution CC BY 3.0 IGO.

---

## Author & Project Context

**Project:** ClauseWise AI — Task 3
**System:** Claude Projects on claude.ai
**Model:** Claude Sonnet 4.6
**Analysis Date:** June 2026
**Repository Purpose:** AI Portfolio Project — Document Intelligence & RAG Demonstration

---

*For questions about this project, refer to the documentation files in the `docs/` directory.*
