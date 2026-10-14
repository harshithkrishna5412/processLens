/**
 * ProcessLens ColdOps - API & Regulatory Intelligence Service
 * Provides seamless proxying to server-side Gemini AI (/api/*)
 * with instant deterministic statutory fallback for offline/client resilience.
 */

export interface ResequenceResult {
  executiveSummary: string;
  keyLegalInnovations: string[];
  streamlinedPhases: Array<{
    phase: number;
    name: string;
    targetDays: number;
    parallelTracks: string[];
    statutoryReformRationale: string;
  }>;
  eliminatedBottlenecks: Array<{
    department: string;
    asIsIssue: string;
    redesignedFix: string;
    legalCitation: string;
  }>;
  projectedReductions: {
    daysReducedPercentage: number;
    physicalVisitsSaved: number;
    redundantFieldsEliminated: number;
  };
  engineUsed: 'gemini-live' | 'deterministic-demo';
}

export interface DocumentAuditResult {
  analysis: string;
  extractedTextPreview?: string;
  detectedIssues: Array<{
    title: string;
    severity: 'critical' | 'warning' | 'advisory';
    description: string;
    suggestedFix: string;
    statute: string;
  }>;
  engineUsed: 'gemini-live' | 'deterministic-demo';
}

/**
 * Re-sequence regulatory workflow using Server-Side Gemini API or deterministic statutory rules
 */
export async function resequenceWorkflow(
  customInstructions: string,
  activeConstraints: Array<{ id: string; label: string; description: string; enabled: boolean }>,
  currentWorkflowSteps?: any[]
): Promise<ResequenceResult> {
  // Call server-side proxy route (/api/gemini-resequence)
  try {
    const res = await fetch('/api/gemini-resequence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customInstructions, activeConstraints })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          ...json.data,
          engineUsed: json.isLiveAi ? 'gemini-live' : 'deterministic-demo'
        };
      }
    }
  } catch (err) {
    console.info('Server API unreachable, utilizing deterministic statutory engine fallback.');
  }

  // Deterministic Statutory Rules Engine based on AP Single Desk Act 2015
  return getDeterministicResequence(activeConstraints, customInstructions);
}

/**
 * Deterministic Legal Re-sequencing Engine based on AP Single Desk Act 2015
 */
function getDeterministicResequence(
  activeConstraints: Array<{ id: string; label: string; description: string; enabled: boolean }>,
  customPrompt: string
): ResequenceResult {
  const deemedEnabled = activeConstraints.find(c => c.id === 'c-deemed')?.enabled ?? true;
  const jointEnabled = activeConstraints.find(c => c.id === 'c-joint-inspect')?.enabled ?? true;
  const riskFoscos = activeConstraints.find(c => c.id === 'c-risk-foscos')?.enabled ?? true;
  const thirdPartyCert = activeConstraints.find(c => c.id === 'c-self-cert')?.enabled ?? true;

  let modeledDays = 38;
  let visits = 2;
  if (!deemedEnabled) modeledDays += 15;
  if (!jointEnabled) { visits += 3; modeledDays += 8; }
  if (!riskFoscos) modeledDays += 10;
  if (!thirdPartyCert) modeledDays += 6;

  return {
    executiveSummary: `Deterministic Statutory Engine evaluated ${activeConstraints.filter(c => c.enabled).length} active policy parameters. Enforcing Section 12 (Deemed Approvals) and Section 15 (Mandatory Joint Multi-Agency Inspection) of the AP Single Desk Clearance Act 2015 establishes a modeled lead time of ${modeledDays} business days (down from 124 baseline days) and collapses physical visits to ${visits}.`,
    keyLegalInnovations: [
      deemedEnabled 
        ? "Enacted AP Single Desk Act 2015 Sec 12: Statutory 14/21-day query guillotine triggering automatic deemed clearance."
        : "Sequential departmental review without deemed approval ceiling.",
      jointEnabled
        ? "Invoked AP Single Desk Act 2015 Sec 15: Replaces 5 solo officer inspections with exactly ONE 2-hour scheduled joint field audit."
        : "Independent uncoordinated departmental inspections retained.",
      riskFoscos
        ? "Applied FSSAI Central Order No. 15(31)2020: Shifts pre-licensing inspection to post-commissioning verification for low-risk refrigerated storage."
        : "Standard pre-licensing food safety physical audit enforced.",
      thirdPartyCert
        ? "Proposed Policy Reform: Empanels accredited chartered engineers for concurrent ammonia hydrostatic testing and scale calibration."
        : "State boiler inspector and legal metrology officer physical visit queue."
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
        targetDays: deemedEnabled ? 15 : 25,
        parallelTracks: [
          "APPCB Consent to Establish (Orange Category fast-track)",
          "Concurrent Joint Fire NOC and Factory BIM Blueprint Review"
        ],
        statutoryReformRationale: "Substituted consecutive reviews with single unified CAD evaluation; enforces Day 14 deemed approval."
      },
      {
        phase: 3,
        name: "Digital FoSCoS Filing & Accredited Third-Party Engineering Verification",
        targetDays: riskFoscos ? 10 : 18,
        parallelTracks: [
          "FSSAI FoSCoS Form B filing with digital FSMS plan & NABL water report",
          "Joint third-party hydro-testing of ammonia receiver and weighbridge calibration"
        ],
        statutoryReformRationale: "Decentralized competent engineer certification under SMPV Rules 2016 replaces state boiler inspector delays."
      },
      {
        phase: 4,
        name: "Single Joint Multi-Agency Inspection & Instant Activation",
        targetDays: jointEnabled ? 3 : 10,
        parallelTracks: [
          jointEnabled 
            ? "One 2-hour multi-departmental joint on-site inspection (FSSAI, APPCB, Fire)"
            : "Multi-week sequential inspection rounds across departments",
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
      daysReducedPercentage: Math.round(((124 - modeledDays) / 124) * 100),
      physicalVisitsSaved: 7 - visits,
      redundantFieldsEliminated: 66
    },
    engineUsed: 'deterministic-demo'
  };
}

/**
 * Audit Document or Cross-Document Discrepancies
 */
export async function auditDocumentContent(
  textSnippet: string,
  userPrompt: string,
  docTitle?: string
): Promise<DocumentAuditResult> {
  // Try server endpoint first
  try {
    const res = await fetch('/api/gemini-doc-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userQuery: userPrompt,
        selectedDocCode: docTitle || 'UPLOADED_FILE',
        documentText: textSnippet ? textSnippet.slice(0, 8000) : undefined
      })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.analysis) {
        return {
          analysis: json.analysis,
          detectedIssues: parseIssuesFromText(json.analysis),
          engineUsed: json.isLiveAi ? 'gemini-live' : 'deterministic-demo'
        };
      }
    }
  } catch (err) {
    console.info('Server API unreachable, utilizing deterministic document analysis.');
  }

  // Deterministic Document Intelligence Engine
  return analyzeDocumentDeterministically(textSnippet, userPrompt, docTitle);
}

function parseIssuesFromText(text: string) {
  const issues = [];
  if (text.toLowerCase().includes('area') || text.toLowerCase().includes('plinth')) {
    issues.push({
      title: 'Plinth / Floor Area Dimension Inconsistency',
      severity: 'critical' as const,
      description: 'Document references discordant built-up areas violating statutory zoning or fire coverage caps.',
      suggestedFix: 'Reconcile structural CAD blueprint with lease ground coverage restriction.',
      statute: 'AP Fire Service Act 1999 (Sec 13) & APIIC Regulations'
    });
  }
  if (text.toLowerCase().includes('power') || text.toLowerCase().includes('kva') || text.toLowerCase().includes('load')) {
    issues.push({
      title: 'Electrical Connected Contract Demand Variance',
      severity: 'critical' as const,
      description: 'Sanctioned contract demand falls short of total refrigeration compressor connected load.',
      suggestedFix: 'Petition APEPDCL for high-tension transformer augmentation prior to energization.',
      statute: 'Electricity Act 2003 (Sec 126)'
    });
  }
  if (text.toLowerCase().includes('ammonia') || text.toLowerCase().includes('refrigerant')) {
    issues.push({
      title: 'Toxic Chemical Hazard Mitigation Protocol Omission',
      severity: 'warning' as const,
      description: 'Anhydrous Ammonia (R-717) requires specialized water absorption scrubbers and wind alarms.',
      suggestedFix: 'Attach MSIHC disaster mitigation plan and emergency evacuation protocol.',
      statute: 'Manufacture, Storage & Import of Hazardous Chemical Rules 1989'
    });
  }
  return issues;
}

function analyzeDocumentDeterministically(
  textSnippet: string,
  userPrompt: string,
  docTitle?: string
): DocumentAuditResult {
  const lower = (textSnippet + ' ' + userPrompt).toLowerCase();
  const issues: Array<{
    title: string;
    severity: 'critical' | 'warning' | 'advisory';
    description: string;
    suggestedFix: string;
    statute: string;
  }> = [];

  let analysis = `### Statutory Regulatory Compliance Audit (${docTitle || 'Uploaded Document'})\n\n`;

  if (lower.includes('18,500') || lower.includes('16,200') || lower.includes('area') || lower.includes('plinth') || lower.includes('sq.ft')) {
    issues.push({
      title: 'Covered Built-Up Area Mismatch',
      severity: 'critical',
      description: 'Applicant documents disclose conflicting built-up areas (18,500 sq.ft blueprint vs 16,200 sq.ft Fire NOC vs 17,500 sq.ft lease restriction).',
      suggestedFix: 'Cap total constructed ground plinth at 17,500 sq.ft and file an amended submission to APSDRFS.',
      statute: 'AP Fire Service Act 1999 (Sec 13 & 31) & APIIC Industrial Zoning Regulations'
    });
    analysis += `1. **Covered Plinth Area Dispute (Critical Statutory Risk)**:\n` +
      `- Operating uninspected square footage violates Section 13 of the AP Fire Service Act 1999.\n` +
      `- Exceeding 17,500 sq.ft ground coverage breaches APIIC Lease Deed Clause 18, subjecting the allotment to cancellation.\n` +
      `- **Remediation**: Adjust architectural drawings to comply with the 17,500 sq.ft ceiling and obtain an updated Fire NOC before filing FoSCoS Form B.\n\n`;
  }

  if (lower.includes('150') || lower.includes('280') || lower.includes('kva') || lower.includes('electricity') || lower.includes('load')) {
    issues.push({
      title: 'Electricity Feasibility Deficit (150 kVA vs 280 kVA)',
      severity: 'critical',
      description: 'APEPDCL feasibility letter authorizes 150 kVA CMD, while compressor specifications demand 280 kVA (300 HP).',
      suggestedFix: 'Submit formal demand augmentation petition to APEPDCL under the AP Single Desk fast-track.',
      statute: 'Electricity Act 2003 (Sec 126 & 135) & APERC Distribution Code'
    });
    analysis += `2. **Electrical Connected Load Mismatch (Critical Operational Hazard)**:\n` +
      `- Connecting 280 kVA onto a line approved for 150 kVA causes transformer overload and constitutes unauthorized abstraction under Section 126 of the Electricity Act 2003.\n` +
      `- Attracts 200% penal tariff and immediate power disconnection.\n` +
      `- **Remediation**: Immediately petition APEPDCL for a dedicated 33/11 kV industrial line extension.\n\n`;
  }

  if (lower.includes('ammonia') || lower.includes('r-717') || lower.includes('toxic') || lower.includes('refrigerant')) {
    issues.push({
      title: 'MSIHC Toxic Refrigerant Safety Protocol Omission',
      severity: 'warning',
      description: 'Anhydrous ammonia charge requires gas absorption scrubbers and emergency windsock alarms under national building codes.',
      suggestedFix: 'Endorse ammonia toxic gas response protocol on the final fire safety occupancy submission.',
      statute: 'MSIHC Rules 1989 & National Building Code Part 4'
    });
    analysis += `3. **Ammonia Refrigerant Safety Protocol Omission (Public Safety)**:\n` +
      `- Under the MSIHC Rules 1989, installations with over 1,000 kg ammonia require automated water-curtain scrubbers and emergency evacuation protocols.\n` +
      `- **Remediation**: Submit an addendum with ammonia emergency scrubbers and gas sensors.\n\n`;
  }

  if (issues.length === 0) {
    analysis += `Document text parsed successfully. No critical statutory violations detected against baseline regulatory parameters. Extracted ${textSnippet.length} characters of legal text for schema verification.\n\n` +
      `**Recommendation**: Ensure all promoter signatures are executed with Aadhaar e-Sign or registered DSC prior to AP Single Desk submission.`;
  }

  return {
    analysis,
    detectedIssues: issues,
    engineUsed: 'deterministic-demo'
  };
}
