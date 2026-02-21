# FinSearch

FinSearch is a verified opportunity platform that helps young people build a trusted professional and financial identity through real work, verified reviews, and responsible growth.  
Instead of relying only on legacy signals (background, connections, or traditional history), FinSearch turns real activity into data that institutions can understand.  
This project is a front-end prototype built for hackathon demonstration.

---

## The Problem

Many capable teenagers and young adults are invisible to formal systems:
- They lack early work history that employers trust
- They lack formal credit signals that lenders require
- They lack “proof” that universities and institutions can easily validate

This creates a loop: **limited opportunity → limited proof → limited opportunity**.

---

## What FinSearch Does

FinSearch provides:
- **Opportunity discovery**: match users to skill-based work opportunities
- **Verified proof**: simulate employer confirmation + a public “proof log” (demo ledger)
- **Financial guidance**: show simple next-best actions after earnings
- **Long-term scoring**: a score that grows over years, representing verified trust signals

---

## Demo Flow (Loop)

1. **Landing Page** (`index.html`)
2. **Create Account** (`pages/onboarding.html`)
3. **Opportunity Match + Proposal** (`pages/job-match.html`)
4. **Job Completion + Review + Earnings Guidance** (`pages/job-complete.html`)
5. **Score Reveal + Readiness Tracks** (`pages/score-reveal.html`)
6. **Dashboard** (`pages/dashboard.html`)
7. **Comparison View** (`pages/comparison.html`)

---

## Tech Used

- HTML5
- CSS3 (single global stylesheet)
- Vanilla JavaScript (localStorage-based demo state)
- Optional local dev server (Live Server)

---

## How to Run Locally
## Ollama AI (Local LLM) — Proposal Generation

This demo uses **Ollama** to generate the job proposal on the Job Match screen.

### Requirements
- Ollama installed and running
- A local model (recommended: `mistral`)
- Node.js installed (to run the small bridge server)

### Run Ollama
```bash
ollama pull mistral
ollama list

### Option 1: VS Code Live Server (Recommended)
1. Install the VS Code extension **Live Server**
2. Right-click `index.html`
3. Click **Open with Live Server**

### Option 2: Simple local server (if you have Node.js)
```bash
npx serve .