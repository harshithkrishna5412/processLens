# ProcessLens AI — AI-Powered Government Process Simplification Platform

> **A two-layer regulatory intelligence and supply-chain readiness engine.**  
> Built for the Government of Andhra Pradesh Ease of Doing Business (EODB) framework, modeling food processing and cold-chain compliance (FSSAI FoSCoS, AP Single Desk, APPCB, Fire Services, and APEPDCL).

---

## 1. Overview: What ProcessLens AI Does

ProcessLens AI simplifies complex, multi-agency government approval processes by transforming fragmented sequential compliance pipelines into transparent, concurrent, and legally grounded workflows:

1. **Regulatory Workflow Explorer**:
   - Compares the **Current As-Is Process** (14 sequential stages, 6 disconnected portals, 7 physical visits, 124 business days) with a **Redesigned 4-Phase Concurrency Model** (38 business days, 2 physical visits).
   - Allows users to **add, edit, and delete process steps**, modifying durations, physical visit requirements, and statutory classifications in real-time.
   - Grounded in statutory authorities: *AP Single Desk Clearance Act 2015 (Sec 12 Deemed Approvals & Sec 15 Joint Inspections)*, *FSS Act 2006*, *Water & Air Acts*, and *AP Fire Service Act 1999*.
   - Clearly differentiates **Existing Statutory Law**, **Existing Executive Rules**, and **Proposed Policy Reforms**.

2. **Reusable Applicant Profile & Statutory Field Mapper**:
   - Single Source of Truth (SSOT) capturing corporate KYC, land coordinates, refrigeration capacity (2,500 MT, Ammonia R-717), and utility demands.
   - Maps enterprise details dynamically to 4 distinct departmental application forms (*FSSAI FoSCoS Form B*, *AP Single Desk CAF*, *APPCB CTE*, and *GVMC Trade License*).
   - Enforces legal governance badges: **Approved Reuse**, **Format Converted**, **Must Verify Independently** (e.g. NABL water test), and **Legally Restricted** (e.g. FoSTaC certified supervisor mandates).
   - Fully persistent via browser `localStorage`, with JSON Import/Export capabilities.

3. **AI Document Assistant & Inconsistency Auditor**:
   - Supports uploading real documents (`.pdf`, `.txt`, `.json`, `.csv`, `.md`, `.png`, `.jpg`, `.jpeg` up to 10 MB) alongside 6 pre-packaged synthetic dossiers.
   - Extracts key parameters and detects cross-document contradictions (e.g., covered plinth area mismatches, 150 kVA grid feasibility vs 280 kVA motor demand, missing ammonia emergency scrubbers).
   - Graceful error handling for corrupted, unreadable, or oversized attachments.
   - All findings are labeled as AI decision-support suggestions requiring human officer verification.

4. **Operational Readiness & ColdOps Intelligence (Two-Layer Integration)**:
   - Connects regulatory clearance velocity directly to the physical commissioning critical path (*Civil Foundation → PUF Panels & Compressors → 11kV Substation Energization → Chamber Pre-cooling → Commercial Cargo Inflow*).
   - **Interactive Delay Simulator**: Models how a +15 to +60 day delay in regulatory approvals postpones warehouse go-live, burns ₹42,000/day in generator diesel fuel, and strands perishable harvest intake.
   - **Chamber Telemetry & FEFO Dispatch**: Real-time temperature monitoring across 4 cold rooms, live temperature excursion alerts (-18.2°C breach), and First-Expired, First-Out (FEFO) inventory queue.

5. **Measurable Impact Dashboard & Report Export**:
   - Dynamic calculations reacting to user workflow modifications: physical visits (-71%), repeated data fields (-79%), document submissions (-77%), and turnaround days (-69%).
   - One-click **Download Audit Report**: Generates formatted PDF documents (via native print engine), structured Markdown files (`.md`), or machine-readable JSON dossiers (`.json`).

---

## 2. Technology Stack

- **Frontend Core**: React 19, TypeScript 7, Vite 8
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animation & Transitions**: Motion (Framer Motion v12)
- **AI & Reasoning Engine**: `@google/genai` TypeScript SDK (Gemini 3.8 Flash) with a high-precision deterministic statutory legal rules engine fallback
- **Server Runtime (Optional Full-Stack)**: Express 4, Node.js / `tsx`

---

## 3. How to Install and Run Locally (Windows / macOS / Linux)

### Prerequisites
- [Node.js](https://nodejs.org/) version 18 or higher
- npm (bundled with Node.js)

### Step-by-Step Local Setup

1. **Open your terminal (PowerShell or Command Prompt on Windows)**:
   ```cmd
   cd path\to\ProcessLens-AI
   ```

2. **Install dependencies**:
   ```cmd
   npm install
   ```

3. **Start the development server**:
   ```cmd
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 4. How to Configure Optional AI Services

ProcessLens AI is **100% functional out of the box in Demo Mode** with its built-in deterministic statutory legal rules engine. Zero API keys are required to explore workflows, edit profiles, audit documents, simulate cold-chain cascades, or export reports.

### Optional: Enabling Live Gemini AI Generation
If you wish to enable live generative AI responses from Google's latest Gemini 3.8 Flash model:

#### Option A: Client-Side (Easiest for Static Hosting)
1. Open the app in your browser.
2. Click the **Gear (Settings)** icon in the top-right corner of the navigation bar.
3. Paste your free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
4. Click **Save Configuration**. The key is stored solely in your personal browser's `localStorage` and is never sent to any third party.

#### Option B: Environment Variable (Server-Side)
1. Copy `.env.example` to `.env`:
   ```cmd
   copy .env.example .env
   ```
2. Set your API key in `.env`:
   ```env
   GEMINI_API_KEY="AIzaSyYourActualKeyHere"
   ```
3. Restart the server (`npm run dev`).

---

## 5. How to Build the Production Version

To compile the application into high-performance, minified static assets:

```cmd
npm run build
```

The output will be generated inside the `dist/` directory:
- `dist/index.html`
- `dist/assets/*.js`
- `dist/assets/*.css`
- `dist/404.html` (SPA routing fallback for GitHub Pages)
- `dist/_redirects` (SPA routing fallback for Cloudflare Pages and Netlify)

You can preview the production build locally with:
```cmd
npm run preview
```

---

## 6. How to Deploy Free Using Selected Host

ProcessLens AI is architected to be hosted **100% free forever** on static hosting platforms.

### Recommended Platform: Cloudflare Pages
**Why Cloudflare Pages?**
- Unlimited bandwidth and free global CDN on 300+ edge locations.
- Zero configuration for SPA routing (the included `public/_redirects` file handles `/* /index.html 200` automatically).
- Fast, instant automated deployments from GitHub.

**Deployment Steps for Cloudflare Pages**:
1. Push your repository to [GitHub](https://github.com).
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
3. Click **Create Application** → **Pages** → **Connect to Git**.
4. Select your `ProcessLens-AI` repository.
5. In Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**. Your site will be live on `https://your-project.pages.dev` in seconds!

---

### Alternative: GitHub Pages
1. Push your repository to GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Use the standard static Vite workflow (or deploy the `dist/` folder).
5. The included `public/404.html` guarantees that refreshing any page route will not produce a 404 error.

---

### Alternative: Vercel or Netlify (Free Tier)
1. Import your GitHub repository in the Vercel or Netlify dashboard.
2. Vercel automatically detects Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

---

## 7. Feature Matrix: Working vs. Simulated vs. API Key

| Feature | Without API Key (Demo Mode) | With Gemini API Key | Requires Paid Host? |
| :--- | :--- | :--- | :--- |
| **Workflow Explorer** | Fully interactive (deterministic AP statutory legal engine) | Live generative re-sequencing via Gemini 3.8 Flash | No (100% Free) |
| **Step Adding / Editing** | Fully functional (real-time recalculation) | Fully functional | No (100% Free) |
| **Applicant Profile SSOT** | Fully functional (localStorage persistence, JSON export/import) | Fully functional | No (100% Free) |
| **Form Mapping & Guardrails** | Fully dynamic across 4 departmental forms | Fully dynamic | No (100% Free) |
| **Document Upload & OCR** | PDF, image, text parsing with rule-based conflict checks | Full multimodal Gemini analysis | No (100% Free) |
| **Operational Readiness Delay** | Interactive slider (+0 to +60d) with live financial calculations | Interactive slider | No (100% Free) |
| **Chamber Telemetry & FEFO** | Live temperature tracking & excursion alerts | Live temperature tracking | No (100% Free) |
| **Impact Dashboard** | Dynamic metrics reacting to user step modifications | Dynamic metrics | No (100% Free) |
| **Audit Report Export** | PDF (Print), Markdown (.md), and JSON (.json) downloads | PDF, Markdown, and JSON downloads | No (100% Free) |

---

## 8. How to Change Sample Regulatory Workflows & Assumptions

All regulatory data, time limits, and baseline numbers are cleanly modularized:

- **Process Steps & Statutory Sections**: Edit `/src/data/regulatoryData.ts` to adjust standard turnaround days, add departments, or change legal citations.
- **Applicant Profile Defaults**: Edit `/src/data/profileData.ts` to configure the default business entity (e.g., location, cold storage capacity, or utility demands).
- **Synthetic Regulatory Documents**: Edit `/src/data/documentsData.ts` to add sample clearances or introduce custom document conflicts.
- **Chamber Telemetry & Inventory Batches**: Edit `/src/data/inventoryData.ts` to configure cold room temperature setpoints, batch expiry dates, and sensor IDs.

---

## 9. Regulatory & Legal Disclaimer

The lead-time reduction (124 to 38 business days) modeled in ProcessLens AI represents a **computational simulation benchmark** based on statutory SLAs codified in the *Andhra Pradesh Single Desk Clearance Act, 2015 (Act No. 19 of 2015)* and FSSAI Executive Orders. Modeled scenarios assume complete, compliant documentation filings by the applicant. **AI systems cannot unilaterally grant statutory licenses or waive mandatory physical inspections without valid legislative authority.**

---

## 10. License

Apache-2.0 License.
