import { SyntheticDocument, DocumentFinding } from '../types';

export const SYNTHETIC_DOCUMENTS: SyntheticDocument[] = [
  {
    id: 'doc-01',
    docCode: 'DOC-01',
    title: 'FSSAI FoSCoS Plant Layout & Production Blueprint',
    issuingAuthority: 'Food Safety and Standards Authority of India (FSSAI)',
    referenceNumber: 'FSSAI/AP/VIZAG/2026/BLU-9021',
    dated: '12-Feb-2026',
    fileFormat: 'Architectural Blueprint CAD (Dimensioned)',
    documentType: 'blueprint',
    summary: 'Detailed architectural layout blueprint submitted under FoSCoS Form B showing processing hall, 4 multi-commodity cold chambers, blast freezing tunnel, and dispatch bay.',
    extractedFields: [
      {
        fieldKey: 'coveredPlinthArea',
        fieldName: 'Total Covered Built-Up Plinth Area',
        extractedValue: '18,500 Sq. Ft (1,718.7 Sq. M)',
        confidence: 0.99,
        statutoryMandate: 'FSSAI Licensing Regulations 2011, Schedule 4'
      },
      {
        fieldKey: 'coldStorageCapacity',
        fieldName: 'Total Cold Storage Holding Capacity',
        extractedValue: '2,500 Metric Tonnes (4 Chambers)',
        confidence: 0.97,
        statutoryMandate: 'FSSAI KoB Code 01/08 Definition'
      },
      {
        fieldKey: 'waterEffluentClaim',
        fieldName: 'Effluent Management Architecture',
        extractedValue: 'Zero Liquid Discharge (ZLD) Closed-Loop Recycling',
        confidence: 0.94,
        statutoryMandate: 'FSSAI General Sanitary and Hygienic Requirements'
      },
      {
        fieldKey: 'applicantName',
        fieldName: 'Applicant Legal Name',
        extractedValue: 'Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.',
        confidence: 1.0,
        statutoryMandate: 'FSS Act 2006, Sec 31'
      }
    ],
    rawTextContent: `GOVERNMENT OF INDIA - FOOD SAFETY AND STANDARDS AUTHORITY OF INDIA
STATE LICENSING AUTHORITY: VISAKHAPATNAM DISTRICT, ANDHRA PRADESH
FoSCoS Application Blueprint Reference: FSSAI/AP/VIZAG/2026/BLU-9021
Date of Submission: 12-Feb-2026

PROJECT: Sri Krishna Mega Cold Storage & Processing Unit
APPLICANT: Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.
LOCATION: Plot No. 42-B & 43-A, APIIC Food Park, Gambheeram, Anandapuram Mandal, Visakhapatnam - 530052

1. SITE & STRUCTURAL DIMENSIONS:
- Total Factory Plot Area: 43,560 Sq. Ft (1.00 Acre)
- Total Covered Built-up Plinth Area: 18,500 Sq. Ft
  * Cold Chamber 1 (Deep Freeze -25C): 4,200 Sq. Ft
  * Cold Chamber 2 (Deep Freeze -25C): 4,200 Sq. Ft
  * Cold Chamber 3 (Chill Room +2C): 3,500 Sq. Ft
  * Cold Chamber 4 (Controlled Atmosphere 0C): 3,500 Sq. Ft
  * Pre-processing & Washing Area: 2,100 Sq. Ft
  * Machine Room & Administrative Annex: 1,000 Sq. Ft

2. DECLARED STORAGE TONNAGE:
- Total Cold Storage Holding Capacity: 2,500 Metric Tonnes
- Daily Blast Freezing Throughput: 15 Metric Tonnes / 24 Hours

3. UTILITIES & SANITARY PROTOCOLS:
- Water Management: Internal recycling plant, declaring Zero Liquid Discharge (ZLD) for washdown streams.
- Pest Proofing: Double air-curtain at loading dock, UV insectocutors at all entry doors.
- Flooring: Seamless food-grade polyurethane (PU) floor screed with cove radius 50mm.

Certified by: K. Suryanarayana, Licensed Structural Architect (Reg No: COA/2012/AP-4182)`
  },
  {
    id: 'doc-02',
    docCode: 'DOC-02',
    title: 'AP State Disaster Response & Fire Services Provisional NOC',
    issuingAuthority: 'AP State Disaster Response & Fire Services Department (APSDRFS)',
    referenceNumber: 'APSDRFS/DFO/VZM/NOC-4412/2026',
    dated: '28-Feb-2026',
    fileFormat: 'Official Statutory Clear Order (Form II)',
    documentType: 'noc',
    summary: 'Provisional fire clearance certificate issued after preliminary review of site egress, external driveways, static tank sizing, and perimeter hydrants.',
    extractedFields: [
      {
        fieldKey: 'coveredPlinthArea',
        fieldName: 'Inspected Covered Plinth Area',
        extractedValue: '16,200 Sq. Ft',
        confidence: 0.98,
        statutoryMandate: 'AP Fire Service Act 1999, Sec 13'
      },
      {
        fieldKey: 'hazardClassification',
        fieldName: 'Occupancy Fire Hazard Category',
        extractedValue: 'Group G - Industrial (Moderate Hazard Warehouse)',
        confidence: 0.95,
        statutoryMandate: 'National Building Code 2016 Part 4'
      },
      {
        fieldKey: 'staticTankCapacity',
        fieldName: 'Static Underground Fire Water Tank',
        extractedValue: '50,000 Litres Dedicated Fire Reserve',
        confidence: 0.99,
        statutoryMandate: 'NBC 2016 Table 7'
      },
      {
        fieldKey: 'refrigerantHazardReview',
        fieldName: 'Toxic Gas Scrubber & Safety Review',
        extractedValue: 'NOT SPECIFIED (Standard warehouse protocol applied)',
        confidence: 0.91,
        statutoryMandate: 'SMPV Rules 2016 & MSIHC Rules 1989'
      }
    ],
    rawTextContent: `GOVERNMENT OF ANDHRA PRADESH
STATE DISASTER RESPONSE & FIRE SERVICES DEPARTMENT
Office of the District Fire Officer, Visakhapatnam

Rc. No. APSDRFS/DFO/VZM/NOC-4412/2026                                   Dated: 28-Feb-2026

PROVISIONAL FIRE NO OBJECTION CERTIFICATE (NOC)

Sub: Fire Services Dept - Construction of Commercial Warehouse for M/s Sri Krishna Cold Chain & Food Logistics Pvt. Ltd., Plot 42-B & 43-A, Gambheeram, Visakhapatnam - Issue of Provisional NOC - Regarding.
Ref: 1. Application No. APSDRFS-2026-9912, dated 18-01-2026.
     2. Inspection report of Station Fire Officer, Anandapuram dated 20-02-2026.

ORDER:
The site inspection has been carried out for the proposed building. Provisional NOC is hereby accorded subject to strict compliance with National Building Code 2016:

1. BUILDING METRICS EVALUATED:
- Plot Area: 43,560 Sq. Ft (4,046.8 Sq. M)
- Sanctioned Built-Up Plinth Area: 16,200 Sq. Ft (Height: 8.5 Metres)
- Occupancy Group: Group G (Industrial Moderate Hazard Warehouse)

2. MANDATORY FIRE FIGHTING INSTALLATIONS:
- One static underground water storage reservoir of 50,000 Litres exclusively for firefighting.
- Fire pump delivering 1,620 Litres/Minute at 3.5 bar pressure head.
- Yard hydrant ring main around perimeter with 4 internal wet risers.
- All exit doors shall open outwards with panic hardware.

NOTE: This provisional clearance is valid solely for 16,200 Sq. Ft. Any deviation in plinth area without revised NOC is punishable under Section 31 of AP Fire Service Act 1999.

Sd/- District Fire Officer, Visakhapatnam`
  },
  {
    id: 'doc-03',
    docCode: 'DOC-03',
    title: 'APPCB Consent to Establish (CTE) Sanction Order',
    issuingAuthority: 'Andhra Pradesh Pollution Control Board (APPCB)',
    referenceNumber: 'APPCB/RO-VSP/CTE-ORANGE/2026-781',
    dated: '08-Mar-2026',
    fileFormat: 'Statutory Consent Order (OCMMS)',
    documentType: 'sanction',
    summary: 'Statutory Consent to Establish under Water Act 1974 and Air Act 1981 classifying the unit under Orange Category (Cold Storage with Food Pre-processing).',
    extractedFields: [
      {
        fieldKey: 'connectedPowerLoad',
        fieldName: 'Permitted Total Connected Load',
        extractedValue: '280 kVA (300 HP)',
        confidence: 0.99,
        statutoryMandate: 'APPCB Fee Slab Calculation Rules'
      },
      {
        fieldKey: 'waterEffluentVolume',
        fieldName: 'Trade Effluent Permitted Discharge',
        extractedValue: '4.5 KLD (Treated in 20 KLD ETP)',
        confidence: 0.96,
        statutoryMandate: 'Water (P&CP) Act 1974, Sec 25'
      },
      {
        fieldKey: 'refrigerantType',
        fieldName: 'Cooling Agent / Refrigerant Gas',
        extractedValue: 'Anhydrous Ammonia (NH3) / R-717',
        confidence: 0.98,
        statutoryMandate: 'Air (P&CP) Act 1981, Sec 21'
      }
    ],
    rawTextContent: `ANDHRA PRADESH POLLUTION CONTROL BOARD
Regional Office: Visakhapatnam, D.No. 39-33-82/4/1, Madhavadhara, VSP
Order No. APPCB/RO-VSP/CTE-ORANGE/2026-781                              Dated: 08-Mar-2026

CONSENT TO ESTABLISH (CTE) ORDER - ORANGE CATEGORY

CONSENT is hereby granted under Section 25 of Water (Prevention & Control of Pollution) Act 1974 and Section 21 of Air (Prevention & Control of Pollution) Act 1981 to:
M/s Sri Krishna Cold Chain & Food Logistics Pvt. Ltd., Plot 42-B & 43-A, APIIC Gambheeram, Visakhapatnam.

PROJECT PARAMETERS & LIMITATIONS:
1. Capital Investment: ₹14.50 Crores
2. Total Connected Load: 280 kVA (Equivalent to 300 HP)
3. Industrial Water Consumption: 12.5 KLD
4. Trade Effluent Generation: 4.5 KLD (Derived from seafood wash & chamber defrosting)

SPECIAL POLLUTION CONTROL CONDITIONS:
- The industry shall install a 20 KLD Effluent Treatment Plant (ETP) comprising primary sedimentation, extended aeration, and carbon filter. Treated water BOD shall not exceed 30 mg/L.
- The applicant shall install ammonia leak sensors with automated audio-visual alarms at compressor heads.
- Any discharge of untreated effluent outside factory boundary constitutes violation under Section 44 of Water Act 1974.

Sd/- Environmental Engineer, APPCB Regional Office, Visakhapatnam`
  },
  {
    id: 'doc-04',
    docCode: 'DOC-04',
    title: 'APEPDCL Industrial HT Power Feasibility Sanction Letter',
    issuingAuthority: 'Eastern Power Distribution Company of AP Ltd. (APEPDCL)',
    referenceNumber: 'APEPDCL/SE/COMM/VIZAG/HT-0891/2026',
    dated: '19-Jan-2026',
    fileFormat: 'Grid Feasibility Technical Memo',
    documentType: 'sanction',
    summary: 'Technical feasibility letter from electricity distribution utility indicating maximum permissible power draw from Anandapuram 33/11kV substation.',
    extractedFields: [
      {
        fieldKey: 'sanctionedPowerLoad',
        fieldName: 'Feasible Sanctioned Contract Demand',
        extractedValue: '150 kVA (Maximum Feasible HT Capacity)',
        confidence: 0.99,
        statutoryMandate: 'APERC General Terms & Conditions of Supply'
      },
      {
        fieldKey: 'substationFeeder',
        fieldName: 'Supply Substation & Voltage',
        extractedValue: '11 kV Dedicated Industrial Feeder, Gambheeram Substation',
        confidence: 0.97,
        statutoryMandate: 'Electricity Act 2003, Sec 43'
      },
      {
        fieldKey: 'developmentChargesChallan',
        fieldName: 'Development Charge Remittance Amount',
        extractedValue: '₹3,75,000 (Calculated on 150 kVA)',
        confidence: 0.98,
        statutoryMandate: 'APERC Tariff Order 2025-26'
      }
    ],
    rawTextContent: `EASTERN POWER DISTRIBUTION COMPANY OF A.P. LTD. (APEPDCL)
Office of the Superintending Engineer / Operation / Visakhapatnam Circle

Lr. No. APEPDCL/SE/COMM/VIZAG/HT-0891/2026                              Dated: 19-Jan-2026

To:
M/s Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.,
Plot No. 42-B & 43-A, Gambheeram Food Processing Park.

Sir,
Sub: Electricity - Feasibility for release of HT Industrial Supply - Reg.
Ref: Your online application registration No. HT-2026-00412.

With reference to your application, technical inspection was conducted at 33/11 kV Gambheeram Substation.
It is intimated that HT Supply is technically FEASIBLE up to a maximum Contract Maximum Demand (CMD) of 150 kVA at 11 kV voltage level.

CONDITIONS OF FEASIBILITY:
1. Sanctioned Load: 150 kVA.
2. The consumer must construct a dedicated HT Metering Kiosk as per CEIG specifications.
3. Drawal of electrical load exceeding 150 kVA will cause severe voltage drop on the local agricultural feeder and is strictly prohibited without 33 kV substation line augmentation.

Sd/- Superintending Engineer, Operation, APEPDCL, Visakhapatnam`
  },
  {
    id: 'doc-05',
    docCode: 'DOC-05',
    title: 'APIIC Industrial Park Registered Lease Agreement',
    issuingAuthority: 'Andhra Pradesh Industrial Infrastructure Corporation (APIIC)',
    referenceNumber: 'APIIC/ZM/VSP/ALMT-42B/DEED-2026',
    dated: '05-Jan-2026',
    fileFormat: 'Registered Conveyance Deed (SRO Gajuwaka)',
    documentType: 'deed',
    summary: '99-year industrial lease agreement executed between APIIC and applicant for Plots 42-B & 43-A in Food Processing Park.',
    extractedFields: [
      {
        fieldKey: 'totalPlotArea',
        fieldName: 'Total Demised Plot Area',
        extractedValue: '43,560 Sq. Ft (1.00 Acre / 4,046.8 Sq. M)',
        confidence: 1.0,
        statutoryMandate: 'Registration Act 1908, Sec 17'
      },
      {
        fieldKey: 'maxPermissiblePlinth',
        fieldName: 'Maximum Permissible Ground Coverage',
        extractedValue: '17,500 Sq. Ft (40.1% Zoning Limit)',
        confidence: 0.96,
        statutoryMandate: 'APIIC Industrial Park Zoning Regulations 2020'
      },
      {
        fieldKey: 'permittedIndustrialUse',
        fieldName: 'Permitted Industrial Activity',
        extractedValue: 'Food Processing, Cold Storage & Agro Logistics',
        confidence: 0.99,
        statutoryMandate: 'AP Industrial Policy'
      }
    ],
    rawTextContent: `REGISTRATION & STAMPS DEPARTMENT - GOVERNMENT OF ANDHRA PRADESH
Sub-Registrar Office, Gajuwaka, Visakhapatnam District
Book 1, Document No. 104/2026                                            Registered: 05-Jan-2026

LEASE DEED FOR INDUSTRIAL LAND

LESSOR: Andhra Pradesh Industrial Infrastructure Corporation Limited (APIIC)
LESSEE: M/s Sri Krishna Cold Chain & Food Logistics Pvt. Ltd., represented by Sri Venkat Ramana Murthy Raju, MD.

SCHEDULE OF PROPERTY:
- Demised Premises: Plot No. 42-B & 43-A, APIIC Agro & Food Processing Park, Gambheeram Village.
- Total Demised Extent: 4,046.85 Sq. Metres (43,560 Sq. Feet / 1.00 Acre).
- Boundaries: North: 18m Wide Road, South: Plot 44-A, East: Plot 42-C, West: 24m Main Access Corridor.

ZONING AND BUILDING RESTRICTIONS:
- Ground Coverage: The Lessee shall not exceed maximum ground plinth coverage of 17,500 Sq. Feet (40.17% of plot area) to preserve mandatory setbacks of 6m front and 4.5m all around.
- Any unauthorized construction beyond 17,500 Sq. Feet shall incur cancellation of lease and forfeiture of allotment deposit under Clause 18 of APIIC Allotment Regulations.

Registered and Sealed at SRO Gajuwaka.`
  },
  {
    id: 'doc-06',
    docCode: 'DOC-06',
    title: 'Cold Room Equipment & Ammonia Compressor Engineering Spec Sheet',
    issuingAuthority: 'Frick India Refrigeration Engineering Division',
    referenceNumber: 'FRICK-INDIA/TECH-SPEC/SK-2026/REV-03',
    dated: '22-Jan-2026',
    fileFormat: 'OEM Mechanical Engineering Specification',
    documentType: 'spec_sheet',
    summary: 'Original Equipment Manufacturer (OEM) detailed technical spec sheet for 4-chamber refrigeration rack, evaporative condensers, and ammonia liquid receiver.',
    extractedFields: [
      {
        fieldKey: 'equipmentColdStorageCapacity',
        fieldName: 'OEM Certified Cold Room Capacity',
        extractedValue: '1,800 Metric Tonnes (4 Chambers x 450 MT)',
        confidence: 0.98,
        statutoryMandate: 'BIS IS:661-2000 Code of Practice for Thermal Insulation'
      },
      {
        fieldKey: 'totalMotorConnectedLoad',
        fieldName: 'Total Compressor & Motor Power Demand',
        extractedValue: '280 kVA (224 kW Mechanical Motor Load)',
        confidence: 0.99,
        statutoryMandate: 'Electricity Act 2003'
      },
      {
        fieldKey: 'refrigerantType',
        fieldName: 'Refrigerant Charge & Substance',
        extractedValue: 'Anhydrous Ammonia (R-717) - 1,200 kg Initial System Charge',
        confidence: 0.99,
        statutoryMandate: 'ASHRAE Standard 15 & SMPV Rules 2016'
      }
    ],
    rawTextContent: `FRICK INDIA LIMITED - INDUSTRIAL REFRIGERATION SPECIALISTS
TECHNICAL SPECIFICATION & CAPACITY CERTIFICATE
Customer: M/s Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.
Project Code: FRICK-AP-2026-904                                        Date: 22-Jan-2026

SYSTEM ARCHITECTURE SPECIFICATION:
1. COMPRESSOR PACKAGE:
- 2 x Two-Stage Ammonia Screw Compressors (Model: SGC-2831)
- Connected Motor Drive: 2 x 110 kW = 220 kW
- Auxiliary Pumps & Condenser Fan Motors: 18 kW
- Total Electrical Connected Demand: 238 kW (~280 kVA at 0.85 PF).

2. VOLUMETRIC TONNAGE & STORAGE CAPABILITY:
- Chambers: 4 Distinct Temperature Enclosures
- Max Design Holding Tonnage: 1,800 Metric Tonnes (Calculated at 450 MT per chamber based on standard 1.2m x 1.0m pallet racks at 4 tiers).
- Note: Any operational loading exceeding 1,800 MT will exceed evaporator coil CFM air circulation capacity and result in hot spots.

3. CHEMICAL HAZARD CLASSIFICATION:
- Refrigerant: Anhydrous Ammonia (NH3) / R-717.
- Initial Fluid Charge: 1,200 Kilograms.
- Toxicity: Class B2L / Toxic and Corrosive Gas. Mandatory requirement for emergency water spray scrubber and automated exhaust ventilation linked to gas detectors.

Issued by: Head of Project Engineering, Frick India Ltd.`
  }
];

export const DOCUMENT_FINDINGS: DocumentFinding[] = [
  {
    id: 'find-01',
    type: 'inconsistency',
    severity: 'critical',
    title: 'Covered Built-Up Area Mismatch Across 3 Statutory Authorities',
    description: 'The applicant submitted conflicting structural dimensions to three separate government bodies: FSSAI FoSCoS shows 18,500 sq.ft, Fire Provisional NOC only evaluated 16,200 sq.ft, while the APIIC Lease Deed legally restricts maximum ground plinth coverage to 17,500 sq.ft.',
    primaryDocCode: 'DOC-01',
    primaryDocTitle: 'FSSAI FoSCoS Blueprint Layout',
    conflictingDocCode: 'DOC-02',
    conflictingDocTitle: 'AP State Fire Provisional NOC',
    fieldInDocA: 'Total Covered Built-Up Plinth Area = 18,500 Sq. Ft',
    valueInDocA: '18,500 Sq. Ft',
    fieldInDocB: 'Sanctioned Built-Up Plinth Area = 16,200 Sq. Ft (and APIIC Deed max 17,500 Sq. Ft)',
    valueInDocB: '16,200 Sq. Ft',
    legalRiskStatement: 'Severe Statutory Breach: Operating 18,500 sq.ft under a 16,200 sq.ft Fire NOC leaves 2,300 sq.ft uninspected and uncovered by sprinklers/hydrants, in direct violation of AP Fire Service Act 1999 Sec 13. Furthermore, constructing 18,500 sq.ft on a plot restricted to 17,500 sq.ft violates APIIC Lease Deed Clause 18, rendering the unit liable to lease cancellation and building demolition.',
    governingActCitation: 'AP Fire Service Act 1999 (Sec 13 & 31) & APIIC Industrial Park Zoning Regulations 2020',
    recommendedResolution: 'Revise architectural CAD drawings to conform to the 17,500 sq.ft statutory zoning cap, and file an amended building submission to APSDRFS to obtain an updated Fire NOC before FSSAI application submission.'
  },
  {
    id: 'find-02',
    type: 'inconsistency',
    severity: 'critical',
    title: 'Severe Electricity Contract Load Mismatch (150 kVA Feasibility vs. 280 kVA Demand)',
    description: 'APEPDCL granted grid feasibility for up to 150 kVA, but APPCB CTE and Frick India Equipment Specs establish that the ammonia compressors and blast chillers demand 280 kVA (300 HP).',
    primaryDocCode: 'DOC-04',
    primaryDocTitle: 'APEPDCL Power Feasibility Letter',
    conflictingDocCode: 'DOC-03',
    conflictingDocTitle: 'APPCB CTE Sanction Order',
    fieldInDocA: 'Sanctioned Contract Demand = 150 kVA',
    valueInDocA: '150 kVA',
    fieldInDocB: 'Plant Total Connected Load = 280 kVA (Equipment Spec: 280 kVA / 238 kW)',
    valueInDocB: '280 kVA',
    legalRiskStatement: 'Unauthorized Electrical Load & Fire Hazard: Operating a 280 kVA cold storage on a 150 kVA line constitutes unauthorized abstraction and overloading under Electricity Act 2003 Sec 126, triggering immediate power disconnection and 200% penal tariff. Overloading also risks catastrophic transformer blowout.',
    governingActCitation: 'Electricity Act 2003 (Sec 126 & 135) & APERC Distribution Code',
    recommendedResolution: 'Immediately petition APEPDCL under the AP Single Desk Fast-Track for a 33 kV dedicated line extension or 280 kVA transformer upgrade, updating the deposit challan before electrical inspection.'
  },
  {
    id: 'find-03',
    type: 'inconsistency',
    severity: 'warning',
    title: 'Cold Storage Capacity Overstatement (2,500 MT Declared vs. 1,800 MT OEM Limit)',
    description: 'The applicant declared 2,500 MT storage tonnage on the FSSAI FoSCoS portal, but the Frick India OEM engineering spec sheet confirms the system has physical pallet rack capacity for only 1,800 MT (450 MT x 4 chambers).',
    primaryDocCode: 'DOC-01',
    primaryDocTitle: 'FSSAI FoSCoS Blueprint Layout',
    conflictingDocCode: 'DOC-06',
    conflictingDocTitle: 'Frick India Equipment Spec Sheet',
    fieldInDocA: 'Total Cold Storage Holding Capacity = 2,500 Metric Tonnes',
    valueInDocA: '2,500 MT',
    fieldInDocB: 'Max Design Holding Tonnage = 1,800 Metric Tonnes (450 MT x 4)',
    valueInDocB: '1,800 MT',
    legalRiskStatement: 'Falsification of Licensing Capacity: Overstating storage capacity on FoSCoS triggers license suspension under FSSAI Licensing Regulations 2011 Reg 2.1.8. In real operations, overloading beyond 1,800 MT degrades air circulation, spoiling perishable foods and violating cold chain temperature stability standards.',
    governingActCitation: 'Food Safety and Standards (Licensing and Registration) Regs 2011, Reg 2.1.8',
    recommendedResolution: 'Align FoSCoS Form B capacity to 1,800 MT or provide OEM verification for supplemental racking installations before food inspector audit.'
  },
  {
    id: 'find-04',
    type: 'inconsistency',
    severity: 'warning',
    title: 'Contradictory Industrial Wastewater Effluent Disclosures',
    description: 'FSSAI blueprint attachments claim Zero Liquid Discharge (ZLD) internal closed-loop recycling, whereas APPCB CTE order mandates discharge of 4.5 KLD trade effluent through a 20 KLD Effluent Treatment Plant (ETP).',
    primaryDocCode: 'DOC-01',
    primaryDocTitle: 'FSSAI FoSCoS Blueprint Layout',
    conflictingDocCode: 'DOC-03',
    conflictingDocTitle: 'APPCB CTE Sanction Order',
    fieldInDocA: 'Effluent Management = Zero Liquid Discharge (ZLD)',
    valueInDocA: 'ZLD (Closed Loop)',
    fieldInDocB: 'Permitted Trade Effluent = 4.5 KLD treated via 20 KLD ETP',
    valueInDocB: '4.5 KLD',
    legalRiskStatement: 'Conflicting Environmental Declarations: Inconsistent claims between FSSAI FSMS and APPCB consent orders will result in rejection during the joint state inspection under AP Single Desk Act 2015.',
    governingActCitation: 'Water (Prevention & Control of Pollution) Act 1974, Sec 25 & FSS Act 2006',
    recommendedResolution: 'Harmonize FSSAI water balance documentation with the approved APPCB 4.5 KLD ETP specification.'
  },
  {
    id: 'find-05',
    type: 'statutory_hazard',
    severity: 'critical',
    title: 'Omission of Ammonia Gas Absorption Safety Protocol in Fire NOC',
    description: 'Equipment Spec Sheet confirms 1,200 kg of Anhydrous Ammonia (R-717, a toxic, corrosive gas), but the Provisional Fire NOC evaluated the facility as a standard moderate-hazard warehouse without requiring emergency gas scrubbers or toxic windsock alarms.',
    primaryDocCode: 'DOC-06',
    primaryDocTitle: 'Frick India Equipment Spec Sheet',
    conflictingDocCode: 'DOC-02',
    conflictingDocTitle: 'AP State Fire Provisional NOC',
    fieldInDocA: 'Refrigerant = 1,200 kg Anhydrous Ammonia (NH3 / R-717 toxic gas)',
    valueInDocA: '1,200 kg Ammonia R-717',
    fieldInDocB: 'Occupancy = Group G (Moderate Hazard Warehouse, Toxic Scrubber: None)',
    valueInDocB: 'Standard NBC Group G',
    legalRiskStatement: 'Catastrophic Public Safety Risk: Under MSIHC Rules 1989 and National Building Code Part 4, ammonia refrigeration systems exceeding 1,000 kg require automated water-curtain scrubbers, wind direction indicators, and community evacuation alarms. Omitting this exposes surrounding APIIC food units to lethal toxicity in case of SRV discharge.',
    governingActCitation: 'Manufacture, Storage & Import of Hazardous Chemical (MSIHC) Rules 1989 & NBC 2016 Part 4',
    recommendedResolution: 'Submit an addendum to the District Fire Officer containing the ammonia emergency disaster mitigation plan and get the scrubbers endorsed on the final Fire Occupancy Certificate.'
  }
];

// ==========================================
// Citizen & Student Document Dossier
// ==========================================

export const CITIZEN_SYNTHETIC_DOCUMENTS: SyntheticDocument[] = [
  {
    id: 'cit-doc-01',
    docCode: 'CIT-01',
    title: 'UIDAI Aadhaar Electronic Verification Slip',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
    referenceNumber: 'UIDAI/E-AADHAAR/2026/8912',
    dated: '10-Jan-2026',
    fileFormat: 'Digitally Signed e-Aadhaar PDF',
    documentType: 'noc',
    summary: 'Electronic identity record showing demographic details, parent reference, masked token, and mobile link status.',
    extractedFields: [
      {
        fieldKey: 'citizenName',
        fieldName: 'Cardholder Registered Name',
        extractedValue: 'K. Ravi Kumar (Initial Form)',
        confidence: 0.99,
        statutoryMandate: 'Aadhaar Act 2016, Sec 4'
      },
      {
        fieldKey: 'dob',
        fieldName: 'Verified Date of Birth',
        extractedValue: '15/08/2004',
        confidence: 1.0,
        statutoryMandate: 'UIDAI Verification Guidelines'
      },
      {
        fieldKey: 'residentialAddress',
        fieldName: 'Permanent Residential Address',
        extractedValue: 'D.No 4-82/B, Near Sachivalayam, Gambheeram, Anandapuram, Visakhapatnam - 530052',
        confidence: 0.98,
        statutoryMandate: 'Registration of Electors / Domicile Rules'
      }
    ],
    rawTextContent: `UNIQUE IDENTIFICATION AUTHORITY OF INDIA
GOVERNMENT OF INDIA - ENROLMENT / UPDATE ACKNOWLEDGEMENT
Aadhaar Reference Token: XXXX-XXXX-4819
Generated Date: 10/01/2026

Name: K. Ravi Kumar
Father: Kandula Satyanarayana
Date of Birth: 15/08/2004
Gender: Male
Mobile Linked: +91 98480 23419 (Active OTP)
Address: D.No 4-82/B, Near Grama Sachivalayam, Gambheeram Village, Anandapuram Mandal, Visakhapatnam, Andhra Pradesh - 530052

NOTE: Under Section 4(3) of the Aadhaar Act, 2016, this document constitutes conclusive proof of identity.`
  },
  {
    id: 'cit-doc-02',
    docCode: 'CIT-02',
    title: 'Board of Secondary Education SSC Marks Memo',
    issuingAuthority: 'Directorate of Government Examinations, Andhra Pradesh',
    referenceNumber: 'BSEAP/SSC/MAR-2020/ROLL-2018491',
    dated: '22-Jun-2020',
    fileFormat: 'Secondary School Certificate Marks Memo',
    documentType: 'spec_sheet',
    summary: 'Class 10 statutory marks certificate certifying secondary school completion, mother tongue, and exact date of birth.',
    extractedFields: [
      {
        fieldKey: 'studentName',
        fieldName: 'Candidate Full Name (Expanded)',
        extractedValue: 'Kandula Ravi Kumar',
        confidence: 1.0,
        statutoryMandate: 'AP Educational Rules & Board Charter'
      },
      {
        fieldKey: 'fatherName',
        fieldName: 'Father / Guardian Name',
        extractedValue: 'Kandula Satyanarayana',
        confidence: 1.0,
        statutoryMandate: 'Matriculation Board Records'
      },
      {
        fieldKey: 'dob',
        fieldName: 'Date of Birth in Words & Figures',
        extractedValue: '15/08/2004 (Fifteenth August Two Thousand Four)',
        confidence: 1.0,
        statutoryMandate: 'Registration of Births & Deaths Reference'
      }
    ],
    rawTextContent: `BOARD OF SECONDARY EDUCATION - ANDHRA PRADESH
SECONDARY SCHOOL CERTIFICATE (SSC) PUBLIC EXAMINATIONS - MARCH 2020
Roll Number: 2018491028 | School Code: 14092

Candidate Name: KANDULA RAVI KUMAR
Father Name: KANDULA SATYANARAYANA
Mother Name: KANDULA LAKSHMI
Date of Birth: 15/08/2004 (FIFTEENTH AUGUST TWO THOUSAND FOUR)
GPA: 9.8 / 10.0 (First Class with Distinction)
Medium of Instruction: English

This certificate is the primary statutory document for date of birth verification across all universities and government departments in Andhra Pradesh.`
  },
  {
    id: 'cit-doc-03',
    docCode: 'CIT-03',
    title: 'MeeSeva Annual Family Income Certificate (Expired Fiscal Year)',
    issuingAuthority: 'Tahsildar Office, Anandapuram Mandal, Visakhapatnam',
    referenceNumber: 'MVS012409812491',
    dated: '14-Jul-2024',
    fileFormat: 'Barcoded Revenue Certificate',
    documentType: 'sanction',
    summary: 'Revenue certificate declaring family income of ₹85,000 for financial year 2024-25. Note: Expired for current admissions.',
    extractedFields: [
      {
        fieldKey: 'annualIncome',
        fieldName: 'Certified Household Annual Gross Income',
        extractedValue: '₹85,000 (Rupees Eighty Five Thousand Only)',
        confidence: 0.99,
        statutoryMandate: 'Revenue Dept Citizen Charter SLA'
      },
      {
        fieldKey: 'validityYear',
        fieldName: 'Statutory Validity Period',
        extractedValue: 'Financial Year 2024-2025 (Expired 31-Mar-2025)',
        confidence: 1.0,
        statutoryMandate: 'G.O.Ms.No 186 Revenue Dept'
      }
    ],
    rawTextContent: `GOVERNMENT OF ANDHRA PRADESH - REVENUE DEPARTMENT
OFFICE OF THE TAHSILDAR, ANANDAPURAM MANDAL
MeeSeva Application No: MVS012409812491
Date of Issue: 14-Jul-2024

INCOME CERTIFICATE
This is to certify that Sri KANDULA SATYANARAYANA father of KANDULA RAVI KUMAR residing at Gambheeram Village has a total gross annual family income of ₹85,000 (Rupees Eighty Five Thousand Only) from agricultural tenancy and labor.

VALIDITY: This certificate is valid for the Financial Year 2024-2025 only (ending 31st March 2025).`
  }
];

export const CITIZEN_DOCUMENT_FINDINGS: DocumentFinding[] = [
  {
    id: 'find-cit-01',
    type: 'inconsistency',
    severity: 'warning',
    title: 'Name Spelling Discrepancy (Aadhaar Initial vs SSC Expanded Surname)',
    description: 'Aadhaar record (CIT-01) displays name as "K. Ravi Kumar", whereas the Secondary School Certificate (CIT-02) registers "Kandula Ravi Kumar".',
    primaryDocCode: 'CIT-01',
    primaryDocTitle: 'UIDAI Aadhaar Verification Slip',
    conflictingDocCode: 'CIT-02',
    conflictingDocTitle: 'SSC Board Marks Memo',
    fieldInDocA: 'Name = K. Ravi Kumar',
    valueInDocA: 'K. Ravi Kumar',
    fieldInDocB: 'Name = Kandula Ravi Kumar',
    valueInDocB: 'Kandula Ravi Kumar',
    legalRiskStatement: 'Clerical Portal Rejection Risk: Scholarship scrutiny software on NSP and JVD matches name strings strictly; an unresolved initial discrepancy triggers a manual objection flag, requiring an in-person college appearance.',
    governingActCitation: 'NSP Operating Guidelines & State Scholarship Manual 2024',
    recommendedResolution: 'Submit an online Aadhaar demographic name update with Class 10 marks memo as documentary proof, or upload a self-attested alias undertaking ("K. Ravi Kumar alias Kandula Ravi Kumar") on the application form.'
  },
  {
    id: 'find-cit-02',
    type: 'statutory_hazard',
    severity: 'critical',
    title: 'Submission of Outdated Fiscal Year Income Certificate (FY 2024-25)',
    description: 'The attached Income Certificate (CIT-03) was issued in July 2024 and expired on March 31, 2025. Applying for the current academic session with an expired income certificate guarantees immediate rejection.',
    primaryDocCode: 'CIT-03',
    primaryDocTitle: 'MeeSeva Income Certificate',
    fieldInDocA: 'Validity = FY 2024-2025 (Expired 31-Mar-2025)',
    valueInDocA: 'Expired FY 2024-25',
    legalRiskStatement: 'Statutory Ineligibility: Under Revenue Dept G.O.Ms.No 186, income certificates are valid for one financial year only. Submitting an expired certificate disqualifies the applicant from fee reimbursement at the district welfare scrutiny desk.',
    governingActCitation: 'G.O.Ms.No 186 Revenue (Ser.II) Dept & Citizen Charter',
    recommendedResolution: 'Apply immediately for an updated 2026-27 Income Certificate through the Village Ward Secretariat; quote existing rice card number for 48-hour automated dispatch.'
  }
];
