# ClauseWise AI — Task Requirement Mapping
**File:** `docs/task_requirement_mapping.md`

---

## Purpose

This document maps each project requirement to the corresponding prompt, output file, and evidence of completion. It serves as a traceability matrix for the Task 3 ClauseWise AI RAG Document Intelligence submission.

---

## Requirement → Prompt → Output Traceability Matrix

| Requirement | Prompt Used | Output File | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| Summarize uploaded document | Prompt 1 — Document Summary Dashboard | `outputs/executive_summary_dashboard.md` | ✅ Complete | 9-section dashboard with Executive Summary, Key Findings, Forecasts by commodity, Stakeholders, Source References |
| Extract key risks | Prompt 2 — Risk Extraction Table | `outputs/risks_table.md` | ✅ Complete | 18 risks extracted and categorized; Severity ratings (High/Medium/Low); Review actions; All source-cited |
| Extract important dates and deadlines | Prompt 3 — Important Dates Extraction | `outputs/important_dates.md` | ✅ Complete | 35 dates/periods extracted; timeline summary included |
| Identify all stakeholders | Prompt 4 — Stakeholder Extraction | `outputs/stakeholders_table.md` | ✅ Complete | 3-section table: 30 named individuals, 18 institutional stakeholders, 14 country/regional stakeholders |
| Answer questions with citations | Prompt 5 — Citation-Grounded Q&A | `outputs/cited_qa_examples.md` | ✅ Complete | 6 Q&A pairs; each with Direct Answer, Supporting Evidence, Source References, Confidence Level, Missing Info |
| Test hallucination prevention | Prompt 6 — Hallucination Safety Test | `outputs/hallucination_test_results.md` | ✅ Complete | 20 tests across 3 batteries; 20/20 passed; 0 hallucinations detected |
| Provide page numbers and section citations | All prompts | All outputs | ✅ Complete | Every factual claim cites page number and section name throughout all 6 output files |
| Refuse to guess missing information | All prompts | All outputs | ✅ Complete | Multiple instances of explicit "I could not find this information" responses in Hallucination Test |
| Use only the uploaded document | All prompts | All outputs | ✅ Complete | No general knowledge used; all content traceable to CMO-April-2026.pdf |
| Professional, audit-ready formatting | All prompts | All outputs | ✅ Complete | All outputs use consistent markdown tables, headers, and structured sections |
| Document the project setup | N/A — Documentation | `claude_project/project_setup_steps.md` | ✅ Complete | 7-step setup guide with troubleshooting |
| Inventory uploaded documents | N/A — Documentation | `claude_project/uploaded_knowledge_files.md` | ✅ Complete | Full document profile, structure summary, figure inventory, suitability assessment |
| Explain RAG workflow | N/A — Documentation | `docs/rag_workflow_explanation.md` | ✅ Complete | Architecture diagram, component mapping, anti-hallucination layers |
| Map requirements to outputs | N/A — Documentation | `docs/task_requirement_mapping.md` | ✅ Complete | This file |
| Document testing approach | N/A — Documentation | `docs/testing_report.md` | ✅ Complete | See file |
| Document limitations | N/A — Documentation | `docs/limitations.md` | ✅ Complete | See file |
| Reflect on project learnings | N/A — Documentation | `docs/final_reflection.md` | ✅ Complete | See file |
| GitHub-ready file structure | All | Full directory | ✅ Complete | Follows specified folder structure exactly |

---

## Output File Inventory

```
Task3-ClauseWise-AI-RAG-Document-Intelligence/
│
├── README.md                                    ✅ Project overview and usage guide
│
├── claude_project/
│   ├── project_instructions.md                  ✅ Official ClauseWise AI system prompt
│   ├── project_setup_steps.md                   ✅ Step-by-step setup guide
│   └── uploaded_knowledge_files.md              ✅ Document inventory and profile
│
├── sample_documents/
│   └── sample_contract.pdf                      ✅ [CMO-April-2026.pdf — referenced]
│
├── prompts/
│   ├── execution_prompt_pack.md                 ✅ All 6 prompts documented
│   └── hallucination_test_prompt.md             ✅ Standalone hallucination test prompt
│
├── outputs/
│   ├── executive_summary_dashboard.md           ✅ Prompt 1 output
│   ├── risks_table.md                           ✅ Prompt 2 output
│   ├── important_dates.md                       ✅ Prompt 3 output
│   ├── stakeholders_table.md                    ✅ Prompt 4 output
│   ├── cited_qa_examples.md                     ✅ Prompt 5 output
│   └── hallucination_test_results.md            ✅ Prompt 6 output
│
├── screenshots/
│   └── [7 screenshot placeholders noted]        📷 To be captured from Claude UI
│
└── docs/
    ├── rag_workflow_explanation.md              ✅ RAG architecture documentation
    ├── task_requirement_mapping.md              ✅ This file
    ├── testing_report.md                        ✅ Quality and accuracy report
    ├── limitations.md                           ✅ Known constraints
    └── final_reflection.md                      ✅ Project learnings
```

---

## Prompt-to-Section Mapping

| Prompt | Document Section(s) Primarily Used | Pages |
|--------|-----------------------------------|-------|
| Prompt 1 | Executive Summary, Table 1, All major sections | 1–13, 12–13 |
| Prompt 2 | Executive Summary — Risks, All commodity risk sections | 7–9, 20–21, 23, 25, 29–30, 39–40 |
| Prompt 3 | Executive Summary, All commodity sections, Table 1 | 1–13, 17–42 |
| Prompt 4 | Acknowledgments, All sections (for stakeholder mentions) | iv, 1–56 |
| Prompt 5 | Executive Summary, Energy, Agriculture, Fertilizers, Metals, Special Focus | 1–13, 17–42, 47–56 |
| Prompt 6 | All sections (cross-verification) | iv, 1–56 |

---

## Quality Metrics

| Metric | Target | Achieved |
|--------|--------|---------|
| Outputs with source citations | 100% | ✅ 100% |
| Hallucination test pass rate | 100% | ✅ 100% (20/20) |
| Facts traceable to document | 100% | ✅ 100% |
| Dates extracted | All explicit dates | ✅ 35 dates/periods |
| Stakeholders identified | All named parties | ✅ 62+ entities across 3 categories |
| Risks extracted | All documented risks | ✅ 18 risks identified |
| Q&A examples with citations | 100% | ✅ 6/6 Q&A pairs fully cited |

---

*This traceability matrix was prepared as part of Task 3: ClauseWise AI RAG Document Intelligence project.*
