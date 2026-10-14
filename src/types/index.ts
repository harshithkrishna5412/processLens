export type WorkflowPhase = 'current' | 'redesigned';

export type ReformStrategy = 
  | 'parallelize' 
  | 'deemed_approval' 
  | 'self_certify' 
  | 'post_commissioning' 
  | 'unified_inspection';

export type LegalBasisType = 
  | 'EXISTING_STATUTORY_LAW' 
  | 'EXISTING_EXECUTIVE_RULE' 
  | 'PROPOSED_POLICY_REFORM';

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  department: string;
  portalOrCounter: string;
  isPhysical: boolean;
  statutoryTimeDays: number;
  dependencies: string[];
  requiredInputs: string[];
  documentsRequired: string[];
  legalJustification: string;
  actSection: string;
  legalBasisType: LegalBasisType;
  legalBasisNote: string;
  category: 'statutory' | 'operational' | 'inspection' | 'utility';
  physicalDetail?: string;
  reformStrategy?: ReformStrategy;
  reformRationale?: string;
  redesignedPhase?: number;
  redesignedDays?: number;
  operationalMilestoneAffected?: string;
}

export interface ApplicantProfile {
  companyName: string;
  tradeName: string;
  constitution: string;
  cin: string;
  pan: string;
  gstin: string;
  registeredOffice: {
    addressLine1: string;
    villageOrMandal: string;
    district: string;
    state: string;
    pinCode: string;
  };
  facilityLocation: {
    plotNo: string;
    industrialArea: string;
    surveyNo: string;
    mandal: string;
    district: string;
    pincode: string;
    totalLandAreaSqFt: number;
    builtUpAreaSqFt: number;
  };
  authorizedSignatory: {
    fullName: string;
    designation: string;
    dinOrPan: string;
    mobile: string;
    email: string;
    aadhaarToken: string;
  };
  coldStorageSpecs: {
    storageType: string;
    refrigerantType: string;
    totalCapacityMT: number;
    numberOfChambers: number;
    temperatureRangeC: string;
    primaryCommodities: string[];
  };
  utilityRequirements: {
    connectedPowerLoadKVA: number;
    dailyWaterRequirementKLD: number;
    waterSource: string;
    effluentDischargeKLD: number;
    effluentTreatmentMethod: string;
  };
  projectCapitalCostINR: number;
  projectCommissioningTarget: string;
}

export type FieldReuseStatus = 
  | 'APPROVED_REUSE' 
  | 'FORMAT_CONVERTED' 
  | 'INDEPENDENT_VERIFICATION_REQUIRED' 
  | 'LEGAL_RESTRICTION';

export interface FormFieldMapping {
  id: string;
  targetFormName: string;
  targetDepartment: string;
  targetFieldName: string;
  targetFieldCategory: string;
  sourceProfileKey: string;
  sourceValue: string | number;
  projectedValue: string | number;
  reuseStatus: FieldReuseStatus;
  statutoryRuleCitation: string;
  auditExplanation: string;
  riskIfReusedWithoutCheck?: string;
}

export interface SyntheticDocument {
  id: string;
  docCode: string;
  title: string;
  issuingAuthority: string;
  referenceNumber: string;
  dated: string;
  fileFormat: string;
  documentType: 'blueprint' | 'noc' | 'sanction' | 'deed' | 'spec_sheet';
  summary: string;
  extractedFields: Array<{
    fieldKey: string;
    fieldName: string;
    extractedValue: string;
    confidence: number;
    statutoryMandate: string;
  }>;
  rawTextContent: string;
}

export interface DocumentFinding {
  id: string;
  type: 'inconsistency' | 'missing_field' | 'statutory_hazard';
  severity: 'critical' | 'warning' | 'advisory';
  title: string;
  description: string;
  primaryDocCode: string;
  primaryDocTitle: string;
  conflictingDocCode?: string;
  conflictingDocTitle?: string;
  fieldInDocA: string;
  valueInDocA: string;
  fieldInDocB?: string;
  valueInDocB?: string;
  legalRiskStatement: string;
  governingActCitation: string;
  recommendedResolution: string;
}

export interface MetricComparison {
  metricId: string;
  name: string;
  unit: string;
  asIsValue: number;
  redesignedValue: number;
  percentageChange: number;
  assumptionRationale: string;
  governingStatute: string;
  evidenceSource: string;
  validationStatus: 'codified_sla' | 'simulated_computational_model';
}

// Operational Readiness & Supply-Chain Milestones
export interface ReadinessMilestone {
  id: string;
  title: string;
  description: string;
  asIsCompletionDay: number;
  redesignedCompletionDay: number;
  regulatoryPrerequisite: string;
  operationalImpactOnPerishables: string;
  riskCategory: 'civil' | 'refrigeration' | 'power' | 'compliance' | 'harvest';
}

// ColdChain Inventory & Temperature Excursion Types
export interface ChamberInventory {
  chamberId: string;
  name: string;
  type: 'deep_freeze' | 'chill_room' | 'ca_atmosphere';
  capacityMT: number;
  occupiedMT: number;
  targetTempC: number;
  currentTempC: number;
  status: 'optimal' | 'warning' | 'critical_excursion';
  sensorId: string;
  humidityPercent: number;
}

export interface InventoryBatch {
  batchId: string;
  commodity: string;
  chamberId: string;
  quantityMT: number;
  estimatedValueINR: number;
  arrivalDate: string;
  expiryDate: string;
  shelfLifeDaysTotal: number;
  remainingDays: number;
  fefoPriority: number; // 1 = highest priority dispatch
  riskScore: 'nominal' | 'approaching_expiry' | 'at_risk';
  temperatureTrend: number[];
  excursionMinutes: number;
  qualityGrade: string;
}

export interface TemperatureExcursionAlert {
  id: string;
  chamberId: string;
  chamberName: string;
  batchId: string;
  commodity: string;
  severity: 'critical' | 'warning';
  timestamp: string;
  durationMinutes: number;
  tempRecordedC: number;
  thresholdC: number;
  recommendedAction: string;
  inventoryValueAtRiskINR: number;
}

// ==========================================
// Citizen Services, Navigators & Personas
// ==========================================

export type TargetAudience = 
  | 'all' 
  | 'citizens' 
  | 'students' 
  | 'families' 
  | 'entrepreneurs' 
  | 'seniors';

export interface CitizenServiceDocument {
  name: string;
  purpose: string;
  digiLockerAvailable: boolean;
  commonMistake: string;
  sampleFormat: string;
}

export interface CitizenServiceStep {
  stepNumber: number;
  title: string;
  officeOrCounter: string;
  isPhysicalVisit: boolean;
  days: number;
  frictionOrNote: string;
}

export interface RejectionTrap {
  trapTitle: string;
  description: string;
  preventionCheck: string;
}

export interface CitizenAdministrativeReform {
  statutoryProvision: string;
  reformProposal: string;
  impactMetric: string;
  governingAct: string;
}

export interface CitizenService {
  id: string;
  title: string;
  targetGroup: TargetAudience;
  targetGroupLabel: string;
  department: string;
  portalName: string;
  portalUrl: string;
  officialFee: string;
  statutorySlaDays: number;
  serviceCategory: 'identity' | 'education' | 'social_security' | 'business' | 'property' | 'certificates';
  plainDescription: string;
  easyExplainSummary: string;
  teluguSummary: string;
  hindiSummary: string;
  eligibilityCriteria: string[];
  documentsRequired: CitizenServiceDocument[];
  currentAsIsSteps: CitizenServiceStep[];
  streamlinedCitizenSteps: CitizenServiceStep[];
  asIsTotalDays: number;
  streamlinedTotalDays: number;
  asIsPhysicalVisits: number;
  streamlinedPhysicalVisits: number;
  rejectionTraps: RejectionTrap[];
  administrativeReform: CitizenAdministrativeReform;
}

// ==========================================
// Citizen Personal Profile & Form Autofill
// ==========================================

export interface CitizenProfile {
  fullName: string;
  fatherOrSpouseName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  aadhaarToken: string; // Tokenized/Masked: XXXX-XXXX-4819
  pan: string;
  communityCategory: 'OC / General' | 'BC-A' | 'BC-B' | 'BC-D' | 'SC' | 'ST' | 'EWS';
  annualFamilyIncomeINR: number;
  educationLevel: string;
  studentRollNo: string;
  institutionName: string;
  rationCardNo: string;
  residence: {
    doorNo: string;
    street: string;
    villageOrWard: string;
    mandal: string;
    district: string;
    state: string;
    pincode: string;
  };
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
  };
  mobile: string;
  email: string;
}

export interface CitizenFormFieldMapping {
  id: string;
  targetFormName: string;
  targetDepartment: string;
  targetFieldName: string;
  targetFieldCategory: string;
  sourceProfileKey: string;
  sourceValue: string | number;
  projectedValue: string | number;
  reuseStatus: FieldReuseStatus;
  statutoryRuleCitation: string;
  auditExplanation: string;
  riskIfReusedWithoutCheck?: string;
}
