import { ApplicantProfile, FormFieldMapping } from '../types';

export const DEMO_PROFILE: ApplicantProfile = {
  companyName: 'Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.',
  tradeName: 'Sri Krishna Mega Cold Storage & Processing Unit',
  constitution: 'Private Limited Company (Registered under Companies Act 2013)',
  cin: 'U15122AP2022PTC120489',
  pan: 'AAECS8921K',
  gstin: '37AAECS8921K1ZM',
  registeredOffice: {
    addressLine1: 'D.No. 48-14-9, Dwaraka Nagar, 3rd Lane',
    villageOrMandal: 'Visakhapatnam Urban',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    pinCode: '530016'
  },
  facilityLocation: {
    plotNo: 'Plot No. 42-B & 43-A',
    industrialArea: 'APIIC Agro & Food Processing Park, Gambheeram',
    surveyNo: 'Sy. No. 184/2, 185/1P',
    mandal: 'Anandapuram Mandal',
    district: 'Visakhapatnam',
    pincode: '530052',
    totalLandAreaSqFt: 43560, // 1.00 Acre
    builtUpAreaSqFt: 18500
  },
  authorizedSignatory: {
    fullName: 'Venkat Ramana Murthy Raju',
    designation: 'Managing Director & Authorized Signatory',
    dinOrPan: 'DIN 08492011 / PAN ABTPR4910M',
    mobile: '+91 98480 34912',
    email: 'ramana.raju@srikrishnacoldchain.in',
    aadhaarToken: 'VID-9921-4820-1129-AP'
  },
  coldStorageSpecs: {
    storageType: 'Multi-Commodity Controlled Atmosphere & Deep Freeze Facility',
    refrigerantType: 'Anhydrous Ammonia (NH3 / R-717)',
    totalCapacityMT: 2500,
    numberOfChambers: 4,
    temperatureRangeC: '-25°C (Frozen Seafood/Poultry) to +4°C (Fresh Horticulture/Dairy)',
    primaryCommodities: [
      'Processed Seafood (Vannamei Shrimp)',
      'Horticulture (Mango pulp, Chillies, Papaya)',
      'Dairy & Dairy Products (Butter, Ice Cream Mix)',
      'Frozen Pre-Cooked Ready to Eat Foods'
    ]
  },
  utilityRequirements: {
    connectedPowerLoadKVA: 280,
    dailyWaterRequirementKLD: 12.5,
    waterSource: 'APIIC Industrial Bulk Supply + Dedicated On-Site Borewell (AP WALTA Permitted)',
    effluentDischargeKLD: 4.5,
    effluentTreatmentMethod: '20 KLD Packaged Biological ETP with Dual Media Filtration & UV Sterilization'
  },
  projectCapitalCostINR: 145000000, // 14.50 Crores INR
  projectCommissioningTarget: 'Q3 2026'
};

export const FORM_MAPPINGS: FormFieldMapping[] = [
  // 1. FSSAI FoSCoS Form B
  {
    id: 'f-foscos-01',
    targetFormName: 'FSSAI FoSCoS Form B',
    targetDepartment: 'Food Safety and Standards Authority of India (FSSAI)',
    targetFieldName: 'Name of Food Business Operator (FBO)',
    targetFieldCategory: 'Entity Identity',
    sourceProfileKey: 'companyName',
    sourceValue: 'Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.',
    projectedValue: 'Sri Krishna Cold Chain & Food Logistics Pvt. Ltd.',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'FSS (Licensing & Registration) Regs 2011, Schedule 2, Form B',
    auditExplanation: 'Verified directly from Ministry of Corporate Affairs (MCA) Master Data via CIN.'
  },
  {
    id: 'f-foscos-02',
    targetFormName: 'FSSAI FoSCoS Form B',
    targetDepartment: 'Food Safety and Standards Authority of India (FSSAI)',
    targetFieldName: 'Kind of Business (KoB) Capacity (Metric Tonnes/day)',
    targetFieldCategory: 'Operational Scale',
    sourceProfileKey: 'coldStorageSpecs.totalCapacityMT',
    sourceValue: '2500 MT',
    projectedValue: '2500 MT (Storage Capacity) / 15 MT/day (Blast Freezing)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'FSSAI KoB Code 01/08 (Cold Storage / Refrigerated Warehouse)',
    auditExplanation: 'Transformed static volumetric storage capacity into FSSAI daily throughput classification metrics.'
  },
  {
    id: 'f-foscos-03',
    targetFormName: 'FSSAI FoSCoS Form B',
    targetDepartment: 'Food Safety and Standards Authority of India (FSSAI)',
    targetFieldName: 'Potable Water Analysis Report (IS:10500 Compliant)',
    targetFieldCategory: 'Food Safety Compliance',
    sourceProfileKey: 'utilityRequirements.waterSource',
    sourceValue: 'APIIC Industrial Bulk Supply + Borewell',
    projectedValue: 'Pending fresh NABL Water Lab Certificate (< 6 months old)',
    reuseStatus: 'INDEPENDENT_VERIFICATION_REQUIRED',
    statutoryRuleCitation: 'FSSAI Guidance Document on Potable Water (IS 10500:2012)',
    auditExplanation: 'Statutory mandate forbids auto-reusing APIIC water supply invoice. Must attach chemical and bacteriological lab test for E. coli, heavy metals, and coliform.',
    riskIfReusedWithoutCheck: 'Severe food poisoning risk; auto-reusing utility sanction without current water test results in automatic rejection under Section 31.'
  },
  {
    id: 'f-foscos-04',
    targetFormName: 'FSSAI FoSCoS Form B',
    targetDepartment: 'Food Safety and Standards Authority of India (FSSAI)',
    targetFieldName: 'FoSTaC Certified Food Safety Supervisor (FSS) Details',
    targetFieldCategory: 'Statutory Personnel',
    sourceProfileKey: 'authorizedSignatory.fullName',
    sourceValue: 'Venkat Ramana Murthy Raju',
    projectedValue: 'REJECTED: Dedicated Certified Supervisor Required',
    reuseStatus: 'LEGAL_RESTRICTION',
    statutoryRuleCitation: 'FSSAI Notification F.No. 1-100/FSSAI/SP(SP-3)/2019',
    auditExplanation: 'Directors or general company signatories cannot legally substitute for an empanelled, FoSTaC-trained food safety supervisor with certified credentials.',
    riskIfReusedWithoutCheck: 'Filing non-compliant supervisor invalidates license and attracts penalty up to ₹1,00,000 under FSS Act Sec 58.'
  },

  // 2. AP Single Desk Common Application Form (CAF)
  {
    id: 'f-caf-01',
    targetFormName: 'AP Single Desk CAF (Form 1)',
    targetDepartment: 'Industries & Commerce Dept, Govt of AP',
    targetFieldName: 'Enterprise Legal Constitution & CIN',
    targetFieldCategory: 'Enterprise Identity',
    sourceProfileKey: 'cin',
    sourceValue: 'U15122AP2022PTC120489',
    projectedValue: 'U15122AP2022PTC120489',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'AP Single Desk Clearance Act 2015, Sec 4',
    auditExplanation: 'One-time master key used across all state inter-departmental clearances.'
  },
  {
    id: 'f-caf-02',
    targetFormName: 'AP Single Desk CAF (Form 1)',
    targetDepartment: 'Industries & Commerce Dept, Govt of AP',
    targetFieldName: 'Total Installed Connected Load (Horsepower - HP)',
    targetFieldCategory: 'Energy & Utilities',
    sourceProfileKey: 'utilityRequirements.connectedPowerLoadKVA',
    sourceValue: '280 kVA',
    projectedValue: '300.27 HP (Converted via formula: kVA * 0.8 PF / 0.746)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'AP Factories Rules 1950, Schedule 1 (HP Classification)',
    auditExplanation: 'Electrical kVA converted into statutory mechanical horsepower for Factories Act slab calculation.'
  },
  {
    id: 'f-caf-03',
    targetFormName: 'AP Single Desk CAF (Form 1)',
    targetDepartment: 'Industries & Commerce Dept, Govt of AP',
    targetFieldName: 'Title & Registered Lease Deed Verification',
    targetFieldCategory: 'Property Ownership',
    sourceProfileKey: 'facilityLocation.plotNo',
    sourceValue: 'Plot No. 42-B & 43-A, APIIC Gambheeram',
    projectedValue: 'Requires SRO Registered Deed Document Reference & E-Challan',
    reuseStatus: 'INDEPENDENT_VERIFICATION_REQUIRED',
    statutoryRuleCitation: 'Registration Act 1908 (Sec 17) & AP Single Desk Guidelines',
    auditExplanation: 'Plot allocation letter cannot be automatically substituted for registered lease conveyance; encumbrance and registration stamps must be checked.',
    riskIfReusedWithoutCheck: 'Risk of property title defect or lease cancellation, halting subsequent building and electricity clearances.'
  },

  // 3. AP Pollution Control Board CTE (Water & Air)
  {
    id: 'f-pcb-01',
    targetFormName: 'APPCB CTE Application (OCMMS)',
    targetDepartment: 'AP Pollution Control Board',
    targetFieldName: 'Plant Location & Survey Coordinates',
    targetFieldCategory: 'Geographic Location',
    sourceProfileKey: 'facilityLocation.surveyNo',
    sourceValue: 'Sy. No. 184/2, 185/1P, Anandapuram',
    projectedValue: 'Sy. No. 184/2, 185/1P, Anandapuram, Visakhapatnam',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Water (P&CP) Act 1974, Sec 25',
    auditExplanation: 'Direct reuse permissible from verified land records without re-entry.'
  },
  {
    id: 'f-pcb-02',
    targetFormName: 'APPCB CTE Application (OCMMS)',
    targetDepartment: 'AP Pollution Control Board',
    targetFieldName: 'Total Trade Effluent Generated (Kilo Litres per Day)',
    targetFieldCategory: 'Environmental Impact',
    sourceProfileKey: 'utilityRequirements.effluentDischargeKLD',
    sourceValue: '4.5 KLD',
    projectedValue: '4.5 KLD (Washdown & defrost condensate)',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Environment (Protection) Act 1986 & APPCB Categorization Order',
    auditExplanation: 'Matches design specifications of proposed biological ETP.'
  },
  {
    id: 'f-pcb-03',
    targetFormName: 'APPCB CTE Application (OCMMS)',
    targetDepartment: 'AP Pollution Control Board',
    targetFieldName: 'Ammonia Refrigerant Fugitive Emissions & Risk Assessment',
    targetFieldCategory: 'Hazardous Chemical Safety',
    sourceProfileKey: 'coldStorageSpecs.refrigerantType',
    sourceValue: 'Anhydrous Ammonia (NH3 / R-717)',
    projectedValue: 'MANDATORY: On-Site Dispersion Modeling & Gas Scrubber Plan',
    reuseStatus: 'LEGAL_RESTRICTION',
    statutoryRuleCitation: 'Manufacture, Storage and Import of Hazardous Chemical (MSIHC) Rules 1989',
    auditExplanation: 'Ammonia is a toxic industrial chemical under MSIHC Rules. System cannot auto-fill safety clearance based on general refrigeration specs; dedicated safety relief study is mandatory.',
    riskIfReusedWithoutCheck: 'Catastrophic ammonia gas leak risk; criminal liability under Environment Protection Act 1986.'
  },

  // 4. Greater Visakhapatnam Municipal Corporation (GVMC) Trade License
  {
    id: 'f-gvmc-01',
    targetFormName: 'GVMC Trade & Health License',
    targetDepartment: 'Greater Visakhapatnam Municipal Corporation',
    targetFieldName: 'Applicant Legal Name & Trade Brand',
    targetFieldCategory: 'Commercial Registration',
    sourceProfileKey: 'tradeName',
    sourceValue: 'Sri Krishna Mega Cold Storage & Processing Unit',
    projectedValue: 'Sri Krishna Mega Cold Storage & Processing Unit',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'AP Municipal Corporations Act 1955, Sec 521',
    auditExplanation: 'Reused directly from master business profile.'
  },
  {
    id: 'f-gvmc-02',
    targetFormName: 'GVMC Trade & Health License',
    targetDepartment: 'Greater Visakhapatnam Municipal Corporation',
    targetFieldName: 'Built-up Floor Space for Property Assessment (Sq. Metres)',
    targetFieldCategory: 'Municipal Space Assessment',
    sourceProfileKey: 'facilityLocation.builtUpAreaSqFt',
    sourceValue: '18,500 Sq. Ft',
    projectedValue: '1,718.70 Sq. Metres (Converted: sq.ft * 0.092903)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'GVMC Building & Trade By-laws (Metric Area Standards)',
    auditExplanation: 'Metric conversion applied automatically for municipal trade tax calculation.'
  },
  {
    id: 'f-gvmc-03',
    targetFormName: 'GVMC Trade & Health License',
    targetDepartment: 'Greater Visakhapatnam Municipal Corporation',
    targetFieldName: 'Solid Waste & Organic Sludge Disposal Contract',
    targetFieldCategory: 'Public Health & Sanitation',
    sourceProfileKey: 'utilityRequirements.effluentTreatmentMethod',
    sourceValue: '20 KLD Packaged ETP',
    projectedValue: 'REQUIRES: Active Authorized Recycler / GVMC Dump Yard MOU',
    reuseStatus: 'INDEPENDENT_VERIFICATION_REQUIRED',
    statutoryRuleCitation: 'Solid Waste Management Rules 2016 & GVMC Public Health Bye-laws',
    auditExplanation: 'General ETP description does not substitute for signed bilateral contract with authorized organic waste collector.',
    riskIfReusedWithoutCheck: 'Illegal dumping notice and cancellation of trade permit with municipal fines.'
  }
];
