# ClauseWise AI — Claude Project Setup Steps
**File:** `claude_project/project_setup_steps.md`

---

## Overview

This document outlines the step-by-step process used to configure the ClauseWise AI RAG Document Intelligence system within a Claude Project on claude.ai. These steps can be reproduced to set up the same workflow for any legal or technical document.

---

## Prerequisites

- An active Claude.ai account (Pro or Team plan recommended for Project and knowledge base features)
- The document(s) you wish to analyze (PDF, DOCX, or TXT format)
- The ClauseWise AI system prompt (see `project_instructions.md`)

---

## Step-by-Step Setup Guide

### Step 1 — Create a New Claude Project

1. Log in to [claude.ai](https://claude.ai)
2. Navigate to the **Projects** section in the left sidebar
3. Click **"+ New Project"**
4. Name the project: `ClauseWise AI — Document Intelligence`
5. Add a brief description: *"RAG-simulated document analysis assistant for legal and technical documents"*
6. Click **"Create Project"**

---

### Step 2 — Configure the Project Instructions (System Prompt)

1. Inside your new project, click **"Edit Project Instructions"** or **"Set Instructions"**
2. Paste the complete ClauseWise AI system prompt from `project_instructions.md`
3. The system prompt establishes:
   - ClauseWise AI's identity and purpose
   - Strict document-only answering rules
   - Citation format requirements (`Source: Page X, Section Y — Clause Title`)
   - Hallucination prevention rules
   - Output structure (Executive Summary, Key Clauses, Risks, etc.)
4. Click **"Save"** to apply the instructions

> **Tip:** The system prompt persists across all conversations within this project, ensuring consistent behavior.

---

### Step 3 — Upload Your Document to the Project Knowledge Base

1. Inside the project, locate the **"Add to Project"** or **"Knowledge"** section
2. Click **"Upload files"**
3. Select your document — for this task: `CMO-April-2026.pdf` (World Bank Commodity Markets Outlook, April 2026)
4. Wait for the upload and processing to complete (typically 30–120 seconds for a PDF of this size)
5. Confirm the file appears in the project knowledge base

> **Note:** Claude Projects support PDF, DOCX, and text file formats. The document is automatically chunked and made available for retrieval within the project.

---

### Step 4 — Verify Document Access

1. Start a new conversation within the project
2. Ask a simple verification question such as: *"What document has been uploaded to this project?"*
3. ClauseWise AI should respond by identifying the document title, type, and publisher from the knowledge base
4. If the document is not recognized, re-upload and retry

---

### Step 5 — Run the Execution Prompt Pack

Execute prompts sequentially or in combination. The full prompt pack is in `prompts/execution_prompt_pack.md`:

| Prompt | Task | Expected Output File |
|--------|------|---------------------|
| Prompt 1 | Document Summary Dashboard | `executive_summary_dashboard.md` |
| Prompt 2 | Risk Extraction Table | `risks_table.md` |
| Prompt 3 | Important Dates Extraction | `important_dates.md` |
| Prompt 4 | Stakeholder Extraction | `stakeholders_table.md` |
| Prompt 5 | Citation-Grounded Q&A | `cited_qa_examples.md` |
| Prompt 6 | Hallucination Safety Test | `hallucination_test_results.md` |

---

### Step 6 — Save and Export Outputs

1. Copy each Claude output into the corresponding markdown file in the `outputs/` folder
2. Review each output for:
   - Source citations present on every factual claim
   - No invented information
   - Professional, audit-ready formatting
3. Commit all files to your GitHub repository

---

### Step 7 — Capture Screenshots (for Portfolio Submission)

Recommended screenshots to capture:

| Screenshot File | What to Capture |
|----------------|----------------|
| `claude_project_home.png` | The Claude Project home screen showing the project name and description |
| `project_knowledge_uploaded.png` | The knowledge base section showing the uploaded document |
| `project_instructions.png` | The project instructions/system prompt configuration screen |
| `summary_dashboard.png` | The executive summary dashboard output in the Claude chat |
| `risk_extraction.png` | The risk extraction table output in the Claude chat |
| `cited_qa.png` | The cited Q&A example output in the Claude chat |
| `hallucination_test.png` | The hallucination test results in the Claude chat |

---

## Technical Notes

- **Knowledge Base Retrieval:** Claude Projects store document content and make it available as context during conversations. This simulates a RAG (Retrieval-Augmented Generation) workflow without requiring a custom vector database.
- **Context Persistence:** The uploaded document and system prompt persist across all sessions within the project.
- **Model Used:** Claude Sonnet 4.6 (claude.ai default as of June 2026)
- **Data Cutoff Alignment:** This project uses a document with a data cutoff of April 20, 2026, which is within Claude's knowledge period, ensuring the AI can accurately assess document completeness.

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Document not recognized | Re-upload the file; ensure it is under the file size limit; try converting PDF to text |
| Claude answers from general knowledge | Check that system prompt hallucination rules are active; remind Claude in chat: "Answer only from the uploaded document" |
| Missing citations in output | Re-run the prompt with explicit instruction: "Every factual answer must include a page number and section name" |
| Project instructions not applying | Navigate to Project Settings and re-save the system prompt |

---

*These setup steps were documented as part of Task 3: ClauseWise AI RAG Document Intelligence project.*
