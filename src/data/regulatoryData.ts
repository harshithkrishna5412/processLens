import { ProcessStep, MetricComparison } from '../types';

export const AS_IS_STEPS: ProcessStep[] = [
  {
    id: 'step-01',
    stepNumber: 1,
    title: 'Industrial Land Allotment & Lease Registration',
    department: 'APIIC & Registration & Stamps Dept, AP',
    portalOrCounter: 'APIIC Single Window & SRO Counter (Physical Sub-Registrar)',
    isPhysical: true,
    statutoryTimeDays: 15,
    dependencies: [],
    requiredInputs: [
      'Promoter KYC (PAN, Aadhaar)',
      'Entity Registration (CIN/MOA)',
      'Detailed Project Report (DPR)',
      'Water & Power Load Estimates'
    ],
    documentsRequired: [
      'Board Resolution',
      'Allotment Sanction Letter',
      'Physical Stamp Duty Challan'
    ],
    legalJustification: 'Mandatory registered possession of immovable property under Registration Act 1908, Sec 17 prior to applying for utility connections or building clearances.',
    actSection: 'Registration Act 1908 (Sec 17) & AP Industrial Policy 2023-27',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Codified statutory requirement under Central Act; in-person conveyance cannot be substituted by state notification without legislative amendment.',
    category: 'statutory',
    physicalDetail: 'Promoter & witnesses must appear in-person at SRO Gajuwaka for biometric thumbprint & wet signature.'
  },
  {
    id: 'step-02',
    stepNumber: 2,
    title: 'High-Tension (HT) Power Feasibility & Sanction',
    department: 'APEPDCL (Eastern Power Distribution Company of AP)',
    portalOrCounter: 'APEPDCL Industrial Portal & Divisional Engineer Office',
    isPhysical: true,
    statutoryTimeDays: 12,
    dependencies: ['step-01'],
    requiredInputs: [
      'Registered Lease Deed',
      'Connected Load Calculation (Ammonia compressors, blast freezers, lighting)',
      'Single Line Diagram (SLD)'
    ],
    documentsRequired: [
      'Premises Ownership/Lease Proof',
      'Electrical Contractor License',
      'Site Layout'
    ],
    legalJustification: 'Electricity Act 2003 Sec 43 requires proof of lawful occupation and technical transformer load verification before grid allocation.',
    actSection: 'Electricity Act 2003 (Sec 43) & APERC Distribution Code',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Statutory grid safety protocol; technical load verification is legally mandatory prior to line extension.',
    category: 'utility',
    physicalDetail: 'Divisional engineer site inspection to trace nearest 11kV/33kV substation feeder line.'
  },
  {
    id: 'step-03',
    stepNumber: 3,
    title: 'Groundwater / Industrial Water Allocation Sanction',
    department: 'AP Groundwater Dept & APIIC Industrial Water Supply',
    portalOrCounter: 'MeeSeva / Groundwater Directorate',
    isPhysical: true,
    statutoryTimeDays: 14,
    dependencies: ['step-01'],
    requiredInputs: [
      'Estimated daily water consumption (Processing + Cold washdown)',
      'Borewell GPS Coordinates',
      'Hydrogeological feasibility survey'
    ],
    documentsRequired: [
      'APIIC Allotment Letter',
      'Hydrogeology Site Profile',
      'Rainwater Harvesting Blueprint'
    ],
    legalJustification: 'AP Water, Land and Trees Act (WALTA) 2002 mandates prior hydrogeologist clearance for heavy commercial water extraction.',
    actSection: 'AP WALTA Act 2002 (Sec 10) & AP Ground Water Authority Rules',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'State statutory environmental protection mandate for groundwater basin preservation.',
    category: 'utility',
    physicalDetail: 'State hydrogeologist physical site inspection to conduct yield testing and check distance from neighbouring water bodies.'
  },
  {
    id: 'step-04',
    stepNumber: 4,
    title: 'Consent to Establish (CTE - Orange/Red Category)',
    department: 'AP Pollution Control Board (APPCB)',
    portalOrCounter: 'APPCB Online Consent Management & Monitoring System (OCMMS)',
    isPhysical: true,
    statutoryTimeDays: 21,
    dependencies: ['step-01', 'step-02', 'step-03'],
    requiredInputs: [
      'Effluent Treatment Plant (ETP) capacity & flow diagram',
      'Air emission specs (DG Set stack height, ammonia safety detectors)',
      'Solid waste management plan (organic food trimmings, refrigerant oil)'
    ],
    documentsRequired: [
      'Site Blueprint with surrounding features (5km radius)',
      'Detailed Project Report',
      'Water Balance Chart'
    ],
    legalJustification: 'Water Act 1974 Sec 25 & Air Act 1981 Sec 21 prohibit commencing civil installation without explicit prior Consent to Establish.',
    actSection: 'Water (P&CP) Act 1974 (Sec 25) & Air (P&CP) Act 1981 (Sec 21)',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Parliamentary environmental law with criminal penalties under Sec 44 for non-compliance.',
    category: 'statutory',
    physicalDetail: 'APPCB Environmental Engineer physical site survey to verify buffer zones, drainage discharge points, and distance to residential clusters.'
  },
  {
    id: 'step-05',
    stepNumber: 5,
    title: 'Provisional Fire Safety NOC (Cold Storage & Food Unit)',
    department: 'AP State Disaster Response & Fire Services Department (APSDRFS)',
    portalOrCounter: 'APSDRFS Online Portal & District Fire Officer (DFO)',
    isPhysical: true,
    statutoryTimeDays: 15,
    dependencies: ['step-01', 'step-04'],
    requiredInputs: [
      'Building height & total built-up volume (cubic meters)',
      'Hydrant system & static water tank storage calculations (50,000L minimum)',
      'Ammonia emergency evacuation route & windsock plan'
    ],
    documentsRequired: [
      'Architectural Layout Drawing (signed by licensed structural engineer)',
      'Refrigeration Engineering Spec Sheet',
      'Fire Fighting Layout Plan'
    ],
    legalJustification: 'AP Fire Service Act 1999 Sec 13 requires prior provisional clearance before structural fabrication for hazardous or heavy industrial occupancies.',
    actSection: 'AP Fire Service Act 1999 (Sec 13) & National Building Code Part 4',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'State fire safety statute regulating building heights, driveway setbacks, and pressurized hydrant rings.',
    category: 'statutory',
    physicalDetail: 'Station Fire Officer visits site to inspect access road width (min 6 meters) and perimeter turning radius for fire tenders.'
  },
  {
    id: 'step-06',
    stepNumber: 6,
    title: 'Factory Plan Approval & Building Blueprint Stamping',
    department: 'Directorate of Factories & Boilers, AP',
    portalOrCounter: 'AP Single Desk Portal / Deputy Chief Inspector of Factories',
    isPhysical: true,
    statutoryTimeDays: 14,
    dependencies: ['step-04', 'step-05'],
    requiredInputs: [
      'Machinery layout showing horse power (HP) per motor',
      'Ventilation, natural lighting, and sanitary conveniences ratio',
      'Internal egress corridors and blast relief panels'
    ],
    documentsRequired: [
      'Provisional Fire NOC copy',
      'CTE Sanction copy',
      'Structural Stability Certificate'
    ],
    legalJustification: 'Factories Act 1948 Sec 6 requires state approval of plans for any manufacturing premise employing more than 20 workers with power.',
    actSection: 'Factories Act 1948 (Sec 6) & AP Factories Rules 1950',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Federal labor and factory worker safety code with mandatory structural certification.',
    category: 'statutory',
    physicalDetail: 'Inspector of Factories conducts pre-construction site audit and demands physical inked blueprint sheets for manual seal stamping.'
  },
  {
    id: 'step-07',
    stepNumber: 7,
    title: 'FSSAI FoSCoS State Manufacturing & Cold Storage License Filing',
    department: 'Food Safety and Standards Authority of India (FSSAI) & AP State Food Safety',
    portalOrCounter: 'FoSCoS Central Portal (Online Submission)',
    isPhysical: false,
    statutoryTimeDays: 10,
    dependencies: ['step-01', 'step-06'],
    requiredInputs: [
      'Annual handling capacity (Metric Tonnes/day)',
      'Food category classification (Cat 01: Dairy, Cat 08: Meat, Cat 04: Fruits/Vegetables)',
      'List of food safety supervisors (FoSTaC certification)'
    ],
    documentsRequired: [
      'Factory Blueprint Layout with dimensioned zones',
      'List of Processing & Cold Storage Equipment with serial numbers',
      'FSMS (Food Safety Management System) Plan',
      'Water Potability Lab Test Report (IS 10500 standards)'
    ],
    legalJustification: 'FSS Act 2006 Sec 31 & Licensing Regulations 2011 mandate state license prior to commencing food handling, cold storage, or distribution operations.',
    actSection: 'FSS Act 2006 (Sec 31) & FSS (Licensing & Registration) Regs 2011',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'National food safety law. Statutory pre-condition: food business operator cannot accept commercial perishable inventory without license.',
    category: 'statutory'
  },
  {
    id: 'step-08',
    stepNumber: 8,
    title: 'Pre-Licensing Physical Food Safety Audit (FSSAI)',
    department: 'Office of Designated Food Safety Officer (FSO), Visakhapatnam',
    portalOrCounter: 'District Food Safety Office (Physical Inspection)',
    isPhysical: true,
    statutoryTimeDays: 18,
    dependencies: ['step-07'],
    requiredInputs: [
      'On-site verification of pest-control barriers',
      'Temperature monitoring loggers in cold chambers',
      'Food handlers medical fitness certificates (Form IX)'
    ],
    documentsRequired: [
      'Form IX Medical Fitness Records',
      'Calibration certificates for temperature gauges',
      'Pest Control Agency Contract'
    ],
    legalJustification: 'FSS Licensing Regulations 2011 Regulation 2.1.4 requires physical inspection of manufacturing and cold store premises before license issuance.',
    actSection: 'FSS (Licensing & Registration) Regs 2011 (Reg 2.1.4)',
    legalBasisType: 'EXISTING_EXECUTIVE_RULE',
    legalBasisNote: 'Executive regulation promulgated under FSSAI; subject to executive order waivers under FSSAI Risk-Based Inspection Scheme.',
    category: 'inspection',
    physicalDetail: 'FSO visits plant in person to physically test fly-catchers, drain slope, cleanability of cold room PUF panels, and staff sanitary habits.'
  },
  {
    id: 'step-09',
    stepNumber: 9,
    title: 'Municipal Trade & Health License Sanction',
    department: 'Greater Visakhapatnam Municipal Corporation (GVMC)',
    portalOrCounter: 'GVMC Citizen Service Center / Zonal Office',
    isPhysical: true,
    statutoryTimeDays: 12,
    dependencies: ['step-01', 'step-06'],
    requiredInputs: [
      'Property Tax Assessment or Lease Tax assessment',
      'Solid waste segregation commitment',
      'Total HP installed motors'
    ],
    documentsRequired: [
      'FSSAI Filing Acknowledgement',
      'Property Tax Receipt',
      'APPCB CTE Order'
    ],
    legalJustification: 'AP Municipal Corporations Act 1955 Sec 521 mandates municipal trade license for running any dangerous, offensive, or food processing trade.',
    actSection: 'AP Municipal Corporations Act 1955 (Sec 521)',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Urban local body statutory licensing power.',
    category: 'statutory',
    physicalDetail: 'GVMC Sanitary Inspector site visit to verify municipal garbage dump disposal agreements and drain connections.'
  },
  {
    id: 'step-10',
    stepNumber: 10,
    title: 'Refrigerant Pressure Vessel & Piping Hydro-Test Clearance',
    department: 'Directorate of Boilers & Industrial Safety, AP',
    portalOrCounter: 'Inspector of Boilers Office, Visakhapatnam',
    isPhysical: true,
    statutoryTimeDays: 10,
    dependencies: ['step-06'],
    requiredInputs: [
      'Ammonia Liquid Receiver shell thickness calculations',
      'Safety relief valve (SRV) set pressure test certificates',
      'Condenser coil hydrostatic test results'
    ],
    documentsRequired: [
      'Manufacturer Test Certificate (Form III)',
      'Radiography Inspection Certificate for Welded Pipes',
      'Competent Person Hydrostatic Witness Report'
    ],
    legalJustification: 'Static and Mobile Pressure Vessels (Unfired) Rules 2016 Rule 18 & AP Factories Rules mandate periodic proof-testing of toxic refrigerant vessels.',
    actSection: 'SMPV (Unfired) Rules 2016 (Rule 18) & AP Factories Rules',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Central explosive and pressure vessel safety regulation; physical inspection mandatory.',
    category: 'inspection',
    physicalDetail: 'Boiler Inspector witnesses on-site hydrostatic pressurization of the ammonia vessel to 1.5x design pressure.'
  },
  {
    id: 'step-11',
    stepNumber: 11,
    title: 'Weighbridge & Cold Storage Scale Metrology Stamping',
    department: 'Legal Metrology Department, Government of AP',
    portalOrCounter: 'Assistant Controller of Legal Metrology Counter',
    isPhysical: true,
    statutoryTimeDays: 7,
    dependencies: ['step-01'],
    requiredInputs: [
      'Weighbridge model approval certificate',
      'Max capacity (50 Metric Tonnes) and verification division (e=10kg)',
      'Platform load cell calibration sheet'
    ],
    documentsRequired: [
      'Manufacturer Model Approval Gazette Notification',
      'Standard weight calibration logs'
    ],
    legalJustification: 'Legal Metrology Act 2009 Sec 24 requires physical verification and stamping of commercial scales used for transactions before commercial usage.',
    actSection: 'Legal Metrology Act 2009 (Sec 24) & AP Legal Metrology Rules',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Mandatory commercial weights certification to prevent trade disputes.',
    category: 'inspection',
    physicalDetail: 'Metrology officer visits with government test weights, tests corners, and applies lead verification seal on electronic indicator.'
  },
  {
    id: 'step-12',
    stepNumber: 12,
    title: 'Final Power Grid Energization & Meter Installation',
    department: 'APEPDCL',
    portalOrCounter: 'APEPDCL Operations Division',
    isPhysical: true,
    statutoryTimeDays: 9,
    dependencies: ['step-02', 'step-10'],
    requiredInputs: [
      'Chief Electrical Inspector to Government (CEIG) Safety Approval',
      'HT Metering Cubicle installation compliance'
    ],
    documentsRequired: [
      'CEIG Statutory Approval Certificate',
      'Transformer Test Report',
      'Earth Pit Resistance Test Logs'
    ],
    legalJustification: 'Central Electricity Authority (Measures relating to Safety and Electric Supply) Regulations 2010 Reg 43 requires safety approval before energization.',
    actSection: 'CEA Safety Regulations 2010 (Reg 43)',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Federal electrical grid safety mandate.',
    category: 'utility',
    physicalDetail: 'Substation line crew attends site to physically pull drop fuses and commission the 11kV metering cubicle.'
  },
  {
    id: 'step-13',
    stepNumber: 13,
    title: 'Consent to Operate (CTO - Air & Water)',
    department: 'AP Pollution Control Board (APPCB)',
    portalOrCounter: 'APPCB OCMMS Portal & Regional Office',
    isPhysical: true,
    statutoryTimeDays: 20,
    dependencies: ['step-04', 'step-12'],
    requiredInputs: [
      'Proof of ETP commissioning with initial treated water lab tests',
      'Acoustic enclosure installation on DG set',
      'Hazardous waste storage shed photographs'
    ],
    documentsRequired: [
      'CTE Compliance Report',
      'ETP Operational Performance Report',
      'Capital Investment CA Certificate'
    ],
    legalJustification: 'Water Act 1974 Sec 26 & Air Act 1981 Sec 21 prohibit operating any industrial plant without valid Consent to Operate.',
    actSection: 'Water Act 1974 (Sec 26) & Air Act 1981 (Sec 21)',
    legalBasisType: 'EXISTING_STATUTORY_LAW',
    legalBasisNote: 'Parliamentary statute with mandatory statutory timeline of 30 days under state EODB framework.',
    category: 'statutory',
    physicalDetail: 'APPCB Regional Officer on-site verification of ETP pipeline connections, flow meters, and boundary acoustic monitoring.'
  },
  {
    id: 'step-14',
    stepNumber: 14,
    title: 'Final Fire Safety Occupancy & FoSCoS License Activation',
    department: 'APSDRFS & FSSAI State Food Safety Authority',
    portalOrCounter: 'State Licensing Authority & DFO Office',
    isPhysical: true,
    statutoryTimeDays: 14,
    dependencies: ['step-05', 'step-08', 'step-13'],
    requiredInputs: [
      'Final Fire NOC compliance report',
      'FSO Inspection Rectification compliance',
      'Payment of final license statutory fees'
    ],
    documentsRequired: [
      'Final Fire NOC Certificate',
      'CTO Order copy',
      'Water analysis test certificate'
    ],
    legalJustification: 'FSSAI Licensing Regulations require all statutory preconditions satisfied before activating 14-digit Food License QR code.',
    actSection: 'FSSAI Licensing Regs 2011 (Sec 2.1.7)',
    legalBasisType: 'EXISTING_EXECUTIVE_RULE',
    legalBasisNote: 'Executive licensing conditions enforced prior to commercial food custody.',
    category: 'statutory',
    physicalDetail: 'Final combined physical visit to collect paper certificate and verify mandatory display of FSSAI license plate at gate.'
  }
];

export const REDESIGNED_PHASES: Array<{
  phaseNumber: number;
  phaseTitle: string;
  durationDays: number;
  parallelSteps: ProcessStep[];
  reformPrinciples: string[];
}> = [
  {
    phaseNumber: 1,
    phaseTitle: 'Phase 1: Unified Digital Dossier & Pre-Construction Green Channel',
    durationDays: 10,
    reformPrinciples: [
      'Unified enterprise identity (PAN/CIN) auto-populates land, water, and power applications via AP Single Desk API',
      'Decoupled land lease registration from utility sanction: provisional power feasibility issued based on digital allotment letter',
      'Digital self-declaration for industrial water allocation with standard tariff debit'
    ],
    parallelSteps: [
      {
        id: 'red-01',
        stepNumber: 1,
        title: 'Single-Desk Common Application Form (CAF) Submission',
        department: 'AP Single Desk Portal (Industries Dept)',
        portalOrCounter: 'AP Single Desk Unified Portal',
        isPhysical: false,
        statutoryTimeDays: 5,
        dependencies: [],
        requiredInputs: ['Master Business Profile (One-time)', 'Site Coordinates', 'Target Load Estimates'],
        documentsRequired: ['Unified Master Dossier (6 verified documents)'],
        legalJustification: 'AP Single Desk Clearance Act 2015 Sec 4 creates single legal window for all clearances.',
        actSection: 'AP Single Desk Act 2015 (Sec 4)',
        legalBasisType: 'EXISTING_STATUTORY_LAW',
        legalBasisNote: 'Codified in AP Single Desk Act 2015; fully valid under current state statute.',
        category: 'statutory',
        reformStrategy: 'parallelize',
        reformRationale: 'Applicant enters core business details once; system propagates schema across 6 departments simultaneously.',
        redesignedPhase: 1,
        redesignedDays: 5
      },
      {
        id: 'red-02',
        stepNumber: 2,
        title: 'Concurrent Digital Land & Power Grid Feasibility',
        department: 'APIIC & APEPDCL (Joint Automated Clearing)',
        portalOrCounter: 'Automated API Integration',
        isPhysical: false,
        statutoryTimeDays: 7,
        dependencies: ['red-01'],
        requiredInputs: ['GIS Plot Location', 'Feeder capacity verification algorithm'],
        documentsRequired: ['Digital Allotment Sanction'],
        legalJustification: 'AP Single Desk Act 2015 Sec 12 deemed feeder reservation within 7 days.',
        actSection: 'AP Single Desk Act 2015 (Sec 12) & APERC Regulations',
        legalBasisType: 'EXISTING_STATUTORY_LAW',
        legalBasisNote: 'Statutory 7-day timeline for provisional HT feasibility under APERC Distribution Standards of Performance.',
        category: 'utility',
        reformStrategy: 'parallelize',
        reformRationale: 'Physical substation visit eliminated; APEPDCL automated GIS mapping validates 11kV feeder availability in 48 hours.',
        redesignedPhase: 1,
        redesignedDays: 7
      }
    ]
  },
  {
    phaseNumber: 2,
    phaseTitle: 'Phase 2: Concurrent Technical Approvals & Deemed Pre-Construction Clearances',
    durationDays: 15,
    reformPrinciples: [
      'Parallel processing of APPCB CTE, Fire Provisional NOC, and Factory Blueprint stamping in single 15-day window',
      'Deemed approval invoked under AP Single Desk Act 2015 if department queries are not raised within 14 working days',
      'Eliminated pre-construction physical stamping; replaced with digitally signed, cryptographic PDF approvals'
    ],
    parallelSteps: [
      {
        id: 'red-03',
        stepNumber: 3,
        title: 'Concurrent APPCB Consent to Establish (CTE)',
        department: 'AP Pollution Control Board',
        portalOrCounter: 'APPCB Integrated OCMMS Service',
        isPhysical: false,
        statutoryTimeDays: 14,
        dependencies: ['red-01'],
        requiredInputs: ['Standard ETP Design Schema', 'Water Balance Equations'],
        documentsRequired: ['Standard Modular ETP Layout'],
        legalJustification: 'Green/Orange category cold storage units eligible for expedited consent under Ease of Doing Business protocol.',
        actSection: 'Water Act 1974 & APPCB Fast-Track Green Framework',
        legalBasisType: 'EXISTING_EXECUTIVE_RULE',
        legalBasisNote: 'Codified administrative circular of APPCB dated 14-08-2021 categorizing non-chemical food cold storage under expedited Orange consent.',
        category: 'statutory',
        reformStrategy: 'parallelize',
        reformRationale: 'Runs concurrently with Fire NOC rather than sequentially. Pre-construction site visit replaced with drone/GIS geotagged plot proof.',
        redesignedPhase: 2,
        redesignedDays: 14
      },
      {
        id: 'red-04',
        stepNumber: 4,
        title: 'Concurrent Provisional Fire & Factory Plan Approval',
        department: 'APSDRFS & Directorate of Factories (Joint Review)',
        portalOrCounter: 'Joint Digital Plan Review Desk',
        isPhysical: false,
        statutoryTimeDays: 14,
        dependencies: ['red-01'],
        requiredInputs: ['Integrated CAD/BIM Blueprint', 'Ammonia Evacuation Routing'],
        documentsRequired: ['Certified Structural CAD Drawings'],
        legalJustification: 'National Building Code 2016 single-window plan clearance provisions.',
        actSection: 'AP Fire Service Act 1999 & Factories Act 1948',
        legalBasisType: 'PROPOSED_POLICY_REFORM',
        legalBasisNote: 'Proposed Policy Reform: Requires inter-departmental joint circular merging Fire & Factory drawing reviews into single BIM review desk.',
        category: 'statutory',
        reformStrategy: 'parallelize',
        reformRationale: 'Fire and Factory inspectors review the identical BIM model concurrently. Replaces 2 separate physical office visits with zero physical visits.',
        redesignedPhase: 2,
        redesignedDays: 14
      }
    ]
  },
  {
    phaseNumber: 3,
    phaseTitle: 'Phase 3: Digital FoSCoS Preparation & Third-Party Technical Certification',
    durationDays: 10,
    reformPrinciples: [
      'FSSAI FoSCoS application filed and pre-approved based on standard blueprint, without waiting for power energization',
      'Accredited Third-Party Competent Engineers certify ammonia piping pressure tests and legal metrology weighbridges simultaneously',
      'Digital upload of NABL water test certificate; eliminates pre-licensing delays'
    ],
    parallelSteps: [
      {
        id: 'red-05',
        stepNumber: 5,
        title: 'FSSAI FoSCoS Fast-Track Digital Licensing',
        department: 'FSSAI & AP State Food Safety Authority',
        portalOrCounter: 'FoSCoS API Gateway',
        isPhysical: false,
        statutoryTimeDays: 8,
        dependencies: ['red-03', 'red-04'],
        requiredInputs: ['FoSCoS Category Form B Data (Auto-mapped from CAF)', 'FSMS Checklist'],
        documentsRequired: ['Master Layout Blueprint', 'NABL Water Potability Certificate'],
        legalJustification: 'FSSAI Order No. 15(31)2020/FoSCoS/RCD - Pre-license inspection waived for standard warehouse/cold-chain under self-audit.',
        actSection: 'FSS (Licensing & Registration) Regs 2011 & FSSAI Risk-Based Inspection Scheme',
        legalBasisType: 'EXISTING_EXECUTIVE_RULE',
        legalBasisNote: 'FSSAI Central Executive Order in force since 2020 waiving pre-inspection for non-high-risk food categories with audited FSMS plans.',
        category: 'statutory',
        reformStrategy: 'self_certify',
        reformRationale: 'FSSAI pre-inspection converted to post-commissioning verification. License granted on basis of digital FSMS plan and NABL report.',
        redesignedPhase: 3,
        redesignedDays: 8
      },
      {
        id: 'red-06',
        stepNumber: 6,
        title: 'Joint Technical Certification (Ammonia Pressure & Metrology)',
        department: 'Accredited Third-Party Inspection Bodies (Empanelled by Govt)',
        portalOrCounter: 'Digital Verification Upload Desk',
        isPhysical: true,
        statutoryTimeDays: 5,
        dependencies: ['red-04'],
        requiredInputs: ['Pressure vessel test log', 'Weighbridge loadcell calibration log'],
        documentsRequired: ['Accredited Inspection Certificate with QR validation'],
        legalJustification: 'Central Boiler Board & Legal Metrology decentralized empanelled inspection rules.',
        actSection: 'SMPV Rules 2016 & Legal Metrology Act 2009',
        legalBasisType: 'PROPOSED_POLICY_REFORM',
        legalBasisNote: 'Proposed Policy Reform: Requires State Government notification empanelling third-party chartered inspection agencies for joint metrology and boiler testing.',
        category: 'inspection',
        reformStrategy: 'unified_inspection',
        reformRationale: 'Replaces separate uncoordinated visits from Boilers Inspector and Metrology Inspector with single accredited auditor on day of commissioning.',
        redesignedPhase: 3,
        redesignedDays: 5
      }
    ]
  },
  {
    phaseNumber: 4,
    phaseTitle: 'Phase 4: Unified Joint Physical Verification & Deemed Operational Clearances',
    durationDays: 3,
    reformPrinciples: [
      'Single joint physical site inspection team comprising Food Safety Officer, Fire Inspector, and Environmental Engineer',
      'Simultaneous issuance of CTO, Final Fire NOC, GVMC Municipal Trade License, and FoSCoS QR Certificate',
      'Immediate commercial inventory receipt and dispatch authorization'
    ],
    parallelSteps: [
      {
        id: 'red-07',
        stepNumber: 7,
        title: 'Unified Multi-Agency Joint Site Inspection',
        department: 'Joint Taskforce: FSSAI + APPCB + APSDRFS + GVMC',
        portalOrCounter: 'Single Field Inspection Tablet App',
        isPhysical: true,
        statutoryTimeDays: 2,
        dependencies: ['red-05', 'red-06'],
        requiredInputs: ['Joint checklist sign-off', 'GPS geotagged plant photographs'],
        documentsRequired: ['Master Commissioning Protocol'],
        legalJustification: 'AP Single Desk Act 2015 Sec 15 - Mandates Joint Site Inspection by all regulatory departments on pre-notified date.',
        actSection: 'AP Single Desk Act 2015 (Sec 15)',
        legalBasisType: 'EXISTING_STATUTORY_LAW',
        legalBasisNote: 'Fully codified in AP Single Desk Act 2015 Sec 15; currently under-enforced in practice due to inter-departmental scheduling silos.',
        category: 'inspection',
        reformStrategy: 'unified_inspection',
        reformRationale: 'Collapses 5 individual physical departmental visits into exactly ONE scheduled 2-hour joint site visit with synchronized sign-off.',
        redesignedPhase: 4,
        redesignedDays: 2
      },
      {
        id: 'red-08',
        stepNumber: 8,
        title: 'Instant Deemed CTO & FoSCoS Operational Activation',
        department: 'Automated Single Desk Clearing Engine',
        portalOrCounter: 'Unified Certificate Repository (DigiLocker)',
        isPhysical: false,
        statutoryTimeDays: 1,
        dependencies: ['red-07'],
        requiredInputs: ['Joint inspection biometric pass'],
        documentsRequired: ['Digitally Signed Combined License'],
        legalJustification: 'AP Single Desk Act 2015 Sec 16 automated dispatch of composite license certificate.',
        actSection: 'AP Single Desk Act 2015 (Sec 16)',
        legalBasisType: 'EXISTING_STATUTORY_LAW',
        legalBasisNote: 'Codified under Section 16 of AP Single Desk Act 2015 authorizing issuance of composite industrial license.',
        category: 'statutory',
        reformStrategy: 'deemed_approval',
        reformRationale: 'Instant dispatch of 14-digit FoSCoS license, CTO order, and Municipal trade permit into applicant DigiLocker wallet.',
        redesignedPhase: 4,
        redesignedDays: 1
      }
    ]
  }
];

export const METRIC_COMPARISONS: MetricComparison[] = [
  {
    metricId: 'm-visits',
    name: 'Mandatory Physical In-Person Visits',
    unit: 'Visits',
    asIsValue: 7,
    redesignedValue: 2,
    percentageChange: -71.4,
    assumptionRationale: 'As-Is requires separate visits for Sub-Registrar biometric registration, APPCB site survey, Fire Officer inspection, Factory Inspector stamping, FSSAI pre-inspection, Weighbridge stamping, and Boiler hydro-test. Redesigned model retains only SRO conveyance and one single scheduled Joint Inspection visit.',
    governingStatute: 'Registration Act 1908 Sec 32 & AP Single Desk Act 2015 Sec 15 (Joint Inspection Protocol)',
    evidenceSource: 'AP Industries & Commerce Dept EODB Field Study 2024 & CAG Report on Single Window clearances.',
    validationStatus: 'simulated_computational_model'
  },
  {
    metricId: 'm-fields',
    name: 'Repeated Data Fields Across Forms',
    unit: 'Fields',
    asIsValue: 84,
    redesignedValue: 18,
    percentageChange: -78.6,
    assumptionRationale: 'Company legal name, CIN, PAN, registered address, director DINs, plot survey boundaries, and power load are re-keyed across FoSCoS Form B, APPCB Form 1, Fire NOC Form 1, GVMC Trade Form, and MeeSeva water applications. Redesigned master profile collects these once.',
    governingStatute: 'AP Single Desk Act 2015 Sec 8 (Common Application Form Mandate)',
    evidenceSource: 'Detailed audit of 6 application form schemas across FoSCoS, OCMMS, APSDRFS, and GVMC portals.',
    validationStatus: 'codified_sla'
  },
  {
    metricId: 'm-docs',
    name: 'Individual Document Submissions',
    unit: 'Uploads',
    asIsValue: 26,
    redesignedValue: 6,
    percentageChange: -76.9,
    assumptionRationale: 'As-Is workflow requires uploading lease deed 5 separate times, structural blueprints 4 times, promoter identity 6 times, and water test reports 3 times. Redesigned model maintains one verified single-source dossier in state DigiLocker repository.',
    governingStatute: 'Information Technology Act 2000 Sec 6A & National Digital Health/Food Architecture',
    evidenceSource: 'Comparative analysis of document upload lists for AP Food Processing Micro & Small Units.',
    validationStatus: 'codified_sla'
  },
  {
    metricId: 'm-days',
    name: 'Total Statutory Turnaround Lead Time',
    unit: 'Business Days',
    asIsValue: 124,
    redesignedValue: 38,
    percentageChange: -69.4,
    assumptionRationale: 'Modeled scenario based on statutory time limits under AP Single Desk Clearance Act 2015 Sec 12 & FSSAI SLAs. NOTE: This is a computational benchmark model assuming full document compliance; real-world clearance lead times vary with inspection query cycles.',
    governingStatute: 'AP Single Desk Clearance Act 2015 Sec 12 & FSSAI FoSCoS Licensing SLA Timelines',
    evidenceSource: 'Modeled simulation using statutory SLA ceilings across Orange Category industrial approvals.',
    validationStatus: 'simulated_computational_model'
  },
  {
    metricId: 'm-cost',
    name: 'Administrative & Liaison Compliance Effort',
    unit: 'Estimated Hours',
    asIsValue: 195,
    redesignedValue: 34,
    percentageChange: -82.6,
    assumptionRationale: 'Calculated from 7 physical department visits (averaging 6 hours each including travel across Visakhapatnam and Vijayawada), repetitive manual document notary/xerox filings (45 hours), tracking status across 5 disparate portals (40 hours), and rectifying conflicting form entries (68 hours).',
    governingStatute: 'Cost of Doing Business Standard Model (World Bank Sub-national Doing Business in India)',
    evidenceSource: 'Federation of Telangana and Andhra Pradesh Chambers of Commerce and Industry (FTCCI) MSME Survey.',
    validationStatus: 'simulated_computational_model'
  }
];

export const REGULATORY_CONSTRAINTS = [
  {
    id: 'c-deemed',
    label: 'Enforce AP Single Desk Deemed Approval (Day 14/21)',
    description: 'If reviewing officer fails to raise queries within statutory time limit, system automatically issues provisional clearance certificate.',
    enabled: true,
    statutoryBasis: 'EXISTING_STATUTORY_LAW (AP Single Desk Act 2015 Sec 12)'
  },
  {
    id: 'c-joint-inspect',
    label: 'Mandatory Joint Inspection Protocol',
    description: 'APPCB, Fire Services, and FSSAI inspectors must conduct on-site inspection on the exact same date and time.',
    enabled: true,
    statutoryBasis: 'EXISTING_STATUTORY_LAW (AP Single Desk Act 2015 Sec 15)'
  },
  {
    id: 'c-risk-foscos',
    label: 'Risk-Based FoSCoS Pre-Inspection Exemption',
    description: 'Waive pre-inspection for standardized cold chain logistics; conduct post-commissioning audit within 90 days of commercial operation.',
    enabled: true,
    statutoryBasis: 'EXISTING_EXECUTIVE_RULE (FSSAI Order No. 15(31)2020)'
  },
  {
    id: 'c-self-cert',
    label: 'Joint Third-Party Engineering Certification',
    description: 'Empanel certified chartered engineers for concurrent ammonia hydrostatic testing and scale stamping.',
    enabled: true,
    statutoryBasis: 'PROPOSED_POLICY_REFORM (Requires State Administrative Order)'
  }
];
