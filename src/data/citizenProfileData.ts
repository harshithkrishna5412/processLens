import { CitizenProfile, CitizenFormFieldMapping } from '../types';

export const DEMO_CITIZEN_PROFILE: CitizenProfile = {
  fullName: 'Kandula Ravi Kumar',
  fatherOrSpouseName: 'Kandula Satyanarayana',
  dateOfBirth: '2004-08-15',
  gender: 'Male',
  aadhaarToken: 'XXXX-XXXX-4819',
  pan: 'ABCDE1234F',
  communityCategory: 'BC-A',
  annualFamilyIncomeINR: 85000,
  educationLevel: 'B.Tech Mechanical Engineering (3rd Year)',
  studentRollNo: '22A51A0342',
  institutionName: 'Andhra University College of Engineering, Visakhapatnam',
  rationCardNo: 'WAP02190348192',
  residence: {
    doorNo: '4-82/B',
    street: 'Old Post Office Street, Near Grama Sachivalayam',
    villageOrWard: 'Gambheeram',
    mandal: 'Anandapuram',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    pincode: '530052'
  },
  bankDetails: {
    accountHolderName: 'Kandula Ravi Kumar',
    bankName: 'State Bank of India',
    accountNumber: '39281048192',
    ifscCode: 'SBIN0001928',
    branch: 'Anandapuram Branch'
  },
  mobile: '+91 98480 23419',
  email: 'ravi.kandula04@gmail.com'
};

export const CITIZEN_FORM_MAPPINGS: CitizenFormFieldMapping[] = [
  // 1. MeeSeva Caste & Domicile Form
  {
    id: 'cfm-01',
    targetFormName: 'MeeSeva Integrated Caste & Domicile Form (Form-II)',
    targetDepartment: 'Revenue & Disaster Management Dept',
    targetFieldName: 'Applicant Legal Full Name',
    targetFieldCategory: 'Demographic Identity',
    sourceProfileKey: 'fullName',
    sourceValue: 'Kandula Ravi Kumar',
    projectedValue: 'Kandula Ravi Kumar',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'AP SC, ST & BC Community Certificates Rules 1997, Rule 4',
    auditExplanation: 'Exact demographic match verified against Class 10 Board Memo and DigiLocker UIDAI vault token.'
  },
  {
    id: 'cfm-02',
    targetFormName: 'MeeSeva Integrated Caste & Domicile Form (Form-II)',
    targetDepartment: 'Revenue & Disaster Management Dept',
    targetFieldName: 'Paternal Genealogical Lineage Name',
    targetFieldCategory: 'Lineage Proof',
    sourceProfileKey: 'fatherOrSpouseName',
    sourceValue: 'Kandula Satyanarayana',
    projectedValue: 'Kandula Satyanarayana',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Section 4, AP Act 16 of 1993',
    auditExplanation: 'Father’s legal name cross-referenced with parent’s 2018 barcoded MeeSeva certificate.'
  },
  {
    id: 'cfm-03',
    targetFormName: 'MeeSeva Integrated Caste & Domicile Form (Form-II)',
    targetDepartment: 'Revenue & Disaster Management Dept',
    targetFieldName: 'Sub-Caste / Community Classification',
    targetFieldCategory: 'Social Status',
    sourceProfileKey: 'communityCategory',
    sourceValue: 'BC-A',
    projectedValue: 'Backward Class - Group A (Sl. No. 1: Agnikula Kshatriya / Vadabalija)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'G.O.Ms.No. 179 Social Welfare (P2) Dept',
    auditExplanation: 'Profile shorthand "BC-A" mapped automatically to official gazetted schedule nomenclature with sub-caste serial index.'
  },
  {
    id: 'cfm-04',
    targetFormName: 'MeeSeva Integrated Caste & Domicile Form (Form-II)',
    targetDepartment: 'Revenue & Disaster Management Dept',
    targetFieldName: 'Raw Biometric Sensor Fingerprint',
    targetFieldCategory: 'Biometric Security',
    sourceProfileKey: 'aadhaarToken',
    sourceValue: 'XXXX-XXXX-4819 (Token)',
    projectedValue: 'FORBIDDEN_PERSISTENCE (Requires Live OTP / FaceRD)',
    reuseStatus: 'LEGAL_RESTRICTION',
    statutoryRuleCitation: 'Section 29(1), Aadhaar (Targeted Delivery) Act 2016',
    auditExplanation: 'Biometric core samples cannot legally be stored, shared, or reused across government forms. A fresh one-time OTP or Iris authentication is strictly required.'
  },

  // 2. MeeSeva Annual Income Certificate Form
  {
    id: 'cfm-05',
    targetFormName: 'MeeSeva Annual Income Certificate Application',
    targetDepartment: 'Revenue Department (Tahsildar Office)',
    targetFieldName: 'Gross Annual Household Income',
    targetFieldCategory: 'Financial Assessment',
    sourceProfileKey: 'annualFamilyIncomeINR',
    sourceValue: 85000,
    projectedValue: '₹85,000 / annum (Self-Declared)',
    reuseStatus: 'INDEPENDENT_VERIFICATION_REQUIRED',
    statutoryRuleCitation: 'AP Citizen Charter Service Code REV-03',
    auditExplanation: 'Income is dynamic and valid only for the current fiscal year. Historical profile income cannot be blindly reused without an annual self-declaration and DISCOM power bill check.'
  },
  {
    id: 'cfm-06',
    targetFormName: 'MeeSeva Annual Income Certificate Application',
    targetDepartment: 'Revenue Department (Tahsildar Office)',
    targetFieldName: 'Ration / Rice Card Household Unit Number',
    targetFieldCategory: 'Welfare Linking',
    sourceProfileKey: 'rationCardNo',
    sourceValue: 'WAP02190348192',
    projectedValue: 'WAP02190348192',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Civil Supplies NFSA Database Protocol',
    auditExplanation: 'White card unit identity persists in the state database and directly establishes household economic grouping.'
  },

  // 3. National Scholarship Portal (NSP / JVD)
  {
    id: 'cfm-07',
    targetFormName: 'National Scholarship Portal (NSP) Post-Matric Form',
    targetDepartment: 'Ministry of Electronics & IT / Social Welfare',
    targetFieldName: 'Bank IFSC Code & Account Number',
    targetFieldCategory: 'DBT Disbursement',
    sourceProfileKey: 'bankDetails.accountNumber',
    sourceValue: 'SBIN0001928 / 39281048192',
    projectedValue: 'SBIN0001928 / 39281048192 (NPCI-Seeded Active)',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Direct Benefit Transfer (DBT) Mission Guidelines, Cabinet Secretariat',
    auditExplanation: 'Account validated via NPCI mapper ping; certified active for direct government subsidy remittance.'
  },
  {
    id: 'cfm-08',
    targetFormName: 'National Scholarship Portal (NSP) Post-Matric Form',
    targetDepartment: 'Ministry of Electronics & IT / Social Welfare',
    targetFieldName: 'Institutional Enrollment / Roll Number',
    targetFieldCategory: 'Academic Standing',
    sourceProfileKey: 'studentRollNo',
    sourceValue: '22A51A0342',
    projectedValue: 'AUCE-MECH-22A51A0342',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Academic Bank of Credits (ABC) / DigiLocker NAD API',
    auditExplanation: 'Pre-verified against Andhra University College of Engineering university roll register.'
  },

  // 4. Parivahan Sarathi Driving License Form
  {
    id: 'cfm-09',
    targetFormName: 'Parivahan Sarathi Learner License Form-2',
    targetDepartment: 'Ministry of Road Transport & Highways',
    targetFieldName: 'Date of Birth (Eligibility Verification)',
    targetFieldCategory: 'Statutory Age Ceiling',
    sourceProfileKey: 'dateOfBirth',
    sourceValue: '2004-08-15',
    projectedValue: '15/08/2004 (Age: 22 yrs - LMV Eligible)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'Section 4 & 7, Motor Vehicles Act 1988',
    auditExplanation: 'ISO date converted to Sarathi DD/MM/YYYY format; age validated as > 18 years for Light Motor Vehicle with Gear.'
  },
  {
    id: 'cfm-10',
    targetFormName: 'Parivahan Sarathi Learner License Form-2',
    targetDepartment: 'Ministry of Road Transport & Highways',
    targetFieldName: 'Jurisdiction RTO Code',
    targetFieldCategory: 'Administrative Jurisdiction',
    sourceProfileKey: 'residence.pincode',
    sourceValue: '530052',
    projectedValue: 'AP-39 (Regional Transport Office, Gajuwaka / Visakhapatnam)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'AP Motor Vehicles Rules, Schedule II',
    auditExplanation: 'Postal PIN 530052 automatically maps to RTO Office code AP-39, preventing incorrect district track selection.'
  },

  // 5. Udyam MSME Registration
  {
    id: 'cfm-11',
    targetFormName: 'Ministry of MSME Udyam Registration Portal',
    targetDepartment: 'Ministry of Micro, Small & Medium Enterprises',
    targetFieldName: 'Enterprise Social Category',
    targetFieldCategory: 'Affirmative Procurement',
    sourceProfileKey: 'communityCategory',
    sourceValue: 'BC-A',
    projectedValue: 'OBC (Other Backward Classes - Central List)',
    reuseStatus: 'FORMAT_CONVERTED',
    statutoryRuleCitation: 'Public Procurement Policy for MSEs Order, 2012',
    auditExplanation: 'State classification "BC-A" dynamically reconciled to Central Government single "OBC" category.'
  },
  {
    id: 'cfm-12',
    targetFormName: 'Ministry of MSME Udyam Registration Portal',
    targetDepartment: 'Ministry of Micro, Small & Medium Enterprises',
    targetFieldName: 'PAN & GSTIN Identity Handshake',
    targetFieldCategory: 'Tax Compliance',
    sourceProfileKey: 'pan',
    sourceValue: 'ABCDE1234F',
    projectedValue: 'ABCDE1234F (Individual Proprietor PAN)',
    reuseStatus: 'APPROVED_REUSE',
    statutoryRuleCitation: 'Notification S.O. 2119(E), Ministry of MSME',
    auditExplanation: 'Direct CBDT API handshake validates PAN active status and confirms turnover exemption for micro units.'
  }
];
