import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Support larger document attachments and image base64 payloads safely
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize Google GenAI client if key exists in environment
const rawApiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const isKeyValid = Boolean(rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' && rawApiKey.trim().length > 5);
const apiKey = isKeyValid ? rawApiKey!.trim() : null;

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log('[Server] GoogleGenAI client successfully initialized with Gemini model gemini-3.8-flash.');
  } catch (err: any) {
    console.warn('[Server] Failed to initialize GoogleGenAI client:', err.message);
  }
} else {
  console.log('[Server] No GEMINI_API_KEY detected. Running in Zero-Config Statutory Deterministic Mode.');
}

// System Health and AI Configuration Status
app.get('/api/system-status', (_req: Request, res: Response) => {
  return res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(aiClient),
    model: 'gemini-3.8-flash',
    mode: aiClient ? 'live-gemini-ai' : 'statutory-deterministic-fallback',
    serverPort: port,
    framework: 'ProcessLens ColdOps (AP Single Desk & FoSCoS)'
  });
});

// Live AI Re-Sequencing Endpoint
app.post('/api/gemini-resequence', async (req: Request, res: Response) => {
  try {
    const { customInstructions, activeConstraints } = req.body;

    const prompt = `You are a Senior Regulatory Reform and Industrial Policy Architect for the Government of Andhra Pradesh specializing in food processing and cold chain logistics compliance.
Analyze the multi-departmental approvals for a 2,500 MT cold storage and seafood/horticulture processing unit in Visakhapatnam involving:
- FSSAI FoSCoS State Manufacturing License
- AP Single Desk Clearance (APSWCS)
- AP Pollution Control Board (APPCB CTE & CTO)
- AP State Disaster Response & Fire Services (Provisional & Final NOC)
- Directorate of Factories & Boilers (Pressure Vessel & Blueprint)
- APEPDCL (High-Tension Power Grid Sanction)
- Greater Visakhapatnam Municipal Corporation (GVMC Trade License)

Active Reform Constraints:
${Array.isArray(activeConstraints) ? activeConstraints.map((c: any) => `- ${c.label}: ${c.description}`).join('\n') : 'Default single-desk parallelization'}

Custom User Guidance:
${customInstructions || 'Optimize for maximum concurrency, eliminate physical visits via single joint inspection, and explain legal justifications.'}

Please return a valid JSON object matching this schema:
{
  "executiveSummary": "string",
  "keyLegalInnovations": ["string", "string", "string"],
  "streamlinedPhases": [
    {
      "phase": 1,
      "name": "string",
      "targetDays": 10,
      "parallelTracks": ["string", "string"],
      "statutoryReformRationale": "string"
    }
  ],
  "eliminatedBottlenecks": [
    {
      "department": "string",
      "asIsIssue": "string",
      "redesignedFix": "string",
      "legalCitation": "string"
    }
  ],
  "projectedReductions": {
    "daysReducedPercentage": 69,
    "physicalVisitsSaved": 5,
    "redundantFieldsEliminated": 66
  }
}
Return only valid JSON.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, isLiveAi: true });
      } catch (err: any) {
        console.warn('Gemini API call returned error, falling back to structured domain response:', err.message);
      }
    }

    // High-fidelity domain fallback if no API key or on API transient error
    const fallbackResponse = {
      executiveSummary: "Dynamic Re-sequencing Engine applied statutory parallelization across 4 synchronized phases. By leveraging Section 12 (Deemed Approvals) and Section 15 (Single Joint Site Inspection) of the Andhra Pradesh Single Desk Clearance Act 2015, the overall lead time is collapsed from 124 business days to 38 days, while reducing mandatory physical visits from 7 to 2.",
      keyLegalInnovations: [
        "Decoupled structural factory stamping from preliminary power allocation, eliminating a 26-day critical path dependency.",
        "Invoked FSSAI Risk-Based Inspection Scheme (Order No. 15(31)2020) to convert pre-licensing food safety inspection into a post-commissioning audit within 90 days.",
        "Enacted AP Single Desk Joint Inspection Protocol combining APPCB, Fire Services, and GVMC into a single scheduled 2-hour physical audit."
      ],
      streamlinedPhases: [
        {
          phase: 1,
          name: "Unified Digital CAF & Rapid Infrastructure Reservation",
          targetDays: 10,
          parallelTracks: [
            "Single-Desk Common Application Form (CAF) automated multi-portal schema dispatch",
            "Concurrent GIS-based Feeder capacity check (APEPDCL) & Water sanction"
          ],
          statutoryReformRationale: "AP Single Desk Clearance Act 2015 Sec 4 creates single statutory submission with immediate inter-agency routing."
        },
        {
          phase: 2,
          name: "Parallel Technical Sanctions & Deemed Clearances",
          targetDays: 15,
          parallelTracks: [
            "APPCB Consent to Establish (Orange Category fast-track)",
            "Concurrent Joint Fire NOC and Factory BIM Blueprint Review"
          ],
          statutoryReformRationale: "Substituted consecutive reviews with single unified CAD evaluation; enforces Day 14 deemed approval."
        },
        {
          phase: 3,
          name: "Digital FoSCoS Filing & Accredited Third-Party Engineering Verification",
          targetDays: 10,
          parallelTracks: [
            "FSSAI FoSCoS Form B filing with digital FSMS plan & NABL water report",
            "Joint third-party hydro-testing of ammonia receiver and weighbridge calibration"
          ],
          statutoryReformRationale: "Decentralized competent engineer certification under SMPV Rules 2016 replaces state boiler inspector delays."
        },
        {
          phase: 4,
          name: "Single Joint Multi-Agency Inspection & Instant Activation",
          targetDays: 3,
          parallelTracks: [
            "One 2-hour multi-departmental joint on-site inspection (FSSAI, APPCB, Fire)",
            "Simultaneous deemed issuance of CTO, Fire Occupancy, and FoSCoS License QR code"
          ],
          statutoryReformRationale: "AP Single Desk Act 2015 Sec 15 strictly prohibits departmental officers from conducting unscheduled solo inspections."
        }
      ],
      eliminatedBottlenecks: [
        {
          department: "FSSAI FoSCoS",
          asIsIssue: "Demands factory blueprint approval and power meter energization before accepting license application.",
          redesignedFix: "Accepts standardized digital plan; issues conditional license allowing trial food batch production.",
          legalCitation: "FSS (Licensing & Registration) Regs 2011, Sec 2.1.4 & FSSAI Order 2020"
        },
        {
          department: "AP State Disaster Response & Fire Services",
          asIsIssue: "Requires separate preliminary site visit solely to measure access road width.",
          redesignedFix: "Verifies road width via APIIC master industrial park GIS cadastral map, waiving in-person visit.",
          legalCitation: "AP Fire Service Act 1999 Sec 13 & NBC 2016"
        },
        {
          department: "AP Pollution Control Board (APPCB)",
          asIsIssue: "Consecutive 21-day review for CTE, followed by separate 20-day review for CTO after full machinery installation.",
          redesignedFix: "Fast-tracks Orange Category food cold storage; automatically triggers CTO upon ETP commissioning certificate upload.",
          legalCitation: "Water Act 1974 Sec 25 & AP Ease of Doing Business Policy"
        }
      ],
      projectedReductions: {
        daysReducedPercentage: 69.4,
        physicalVisitsSaved: 5,
        redundantFieldsEliminated: 66
      }
    };

    return res.json({ success: true, data: fallbackResponse, isLiveAi: false });
  } catch (error: any) {
    console.error('Error in resequence endpoint:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Document Intelligence Assistant Endpoint
app.post('/api/gemini-doc-audit', async (req: Request, res: Response) => {
  try {
    const { userQuery, selectedDocCode, documentText } = req.body;

    const prompt = `You are a Senior Regulatory Compliance Auditor for the Government of Andhra Pradesh reviewing regulatory dossiers for industrial and cold chain operations.
Document Under Review: ${selectedDocCode || 'Applicant Dossier'}
User Query / Audit Focus: ${userQuery || 'Analyze cross-document risks, area mismatches, and refrigerant compliance.'}

${documentText ? `Document Text Content to Evaluate:\n"""\n${documentText.slice(0, 8000)}\n"""\n` : ''}

Provide a rigorous statutory audit explaining:
1. Cross-document discrepancies or statutory omissions (such as covered plinth area, electrical power contract demand vs equipment HP, toxic refrigerant safety under MSIHC 1989, or missing water testing reports under FSSAI).
2. The specific Andhra Pradesh and Central acts governing these issues (e.g., AP Fire Service Act 1999 Sec 13, Electricity Act 2003 Sec 126, Food Safety & Standards Act 2006, AP Single Desk Clearance Act 2015, Water Act 1974).
3. The exact corrective remediation actions the applicant must take before submitting their Common Application Form (CAF).

Keep it scannable, precise, professional, and authoritative. Return text with clear bullet points and bold headers.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });
        return res.json({ success: true, analysis: response.text, isLiveAi: true });
      } catch (err: any) {
        console.warn('Gemini Doc Audit API error, fallback to expert analysis:', err.message);
      }
    }

    const fallbackAnalysis = `### Statutory Audit Findings & Regulatory Risk Assessment

1. **Covered Plinth Area Violation (Severe Legal Hazard)**:
   - **Cross-Document Discrepancy**: FoSCoS Layout (DOC-01) declares **18,500 Sq.Ft**, Fire NOC (DOC-02) inspected **16,200 Sq.Ft**, and APIIC Lease Deed (DOC-05) legally caps plinth coverage at **17,500 Sq.Ft**.
   - **Statutory Violation**: Operating an uninspected 2,300 sq.ft zone violates **Section 13 of the AP Fire Service Act 1999** (imprisonment up to 3 months or fine up to ₹50,000). Exceeding 17,500 sq.ft violates **APIIC Zoning Clause 18**, allowing APIIC to unilaterally terminate the lease.
   - **Remediation**: Resubmit revised CAD drawings capping total plinth at 17,500 sq.ft, reallocate cold chamber volume, and obtain an amended Provisional Fire NOC before filing FoSCoS Form B.

2. **Electrical Connected Demand Deficit (150 kVA Feasibility vs. 280 kVA Demand)**:
   - **Cross-Document Discrepancy**: APEPDCL Feasibility Letter (DOC-04) strictly limits feeder draw to **150 kVA**, while the APPCB CTE Order (DOC-03) and Frick India Equipment Spec (DOC-06) establish connected motor demand at **280 kVA (300 HP)**.
   - **Statutory Violation**: Drawing 280 kVA on a 150 kVA sanction constitutes unauthorized use under **Section 126 of the Electricity Act 2003**, mandating immediate power disconnection and 200% penalty tariff.
   - **Remediation**: File an urgent petition through the AP Single Desk for HT line augmentation to a dedicated 33/11 kV feeder transformer.

3. **Ammonia Refrigerant Safety Defect (Public Safety Hazard)**:
   - **Cross-Document Discrepancy**: DOC-06 lists 1,200 kg of toxic Anhydrous Ammonia (R-717), but DOC-02 treats the occupancy as a non-hazardous warehouse without scrubbers.
   - **Statutory Violation**: Direct breach of **Manufacture, Storage and Import of Hazardous Chemical (MSIHC) Rules 1989**.
   - **Remediation**: Endorse emergency water spray scrubbers and toxic gas sensor maps on the final Fire Occupancy submission.`;

    return res.json({ success: true, analysis: fallbackAnalysis, isLiveAi: false });
  } catch (error: any) {
    console.error('Error in doc audit endpoint:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve production static build
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Vite middleware for development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
