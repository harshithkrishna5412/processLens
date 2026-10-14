import { CitizenService, TargetAudience } from '../types';

export interface PersonaMeta {
  id: TargetAudience;
  label: string;
  tagline: string;
  iconName: string;
  description: string;
  primaryServices: string[];
  commonObstacles: string[];
}

export const USER_PERSONAS: PersonaMeta[] = [
  {
    id: 'citizens',
    label: 'Everyday Citizens',
    tagline: 'Personal identity, revenue certificates, land & address services',
    iconName: 'User',
    description: 'Individuals applying for caste, income, residence certificates, voter cards, driving licenses, or updating demographic information.',
    primaryServices: ['Integrated Caste & Residence Certificate', 'Annual Income Certificate', 'Aadhaar Demographic & Biometric Update', 'Learner Driving License'],
    commonObstacles: [
      'Name spelling variations between SSC certificate and Aadhaar',
      'Unclear whether physical Mandal Revenue Office (MRO) visit is mandatory',
      'Paying unauthorized intermediary fees at local cyber cafes'
    ]
  },
  {
    id: 'students',
    label: 'Students & Youth',
    tagline: 'Scholarships, fee concessions, education certificates & skill schemes',
    iconName: 'GraduationCap',
    description: 'Students navigating pre-matric/post-matric scholarships, Jagananna Vidya Deevena, college admissions, migration certificates, and apprenticeship schemes.',
    primaryServices: ['Post-Matric Scholarship (NSP & JVD)', 'Integrated Caste & Domicile', 'Annual Income for Fee Waiver', 'Migration & Bonafide Issuance'],
    commonObstacles: [
      'Strict annual financial year cutoff for father’s income certificate',
      'Aadhaar bank account seeding (NPCI DBT mapper) not active',
      'Missing institutional verification before portal submission deadline'
    ]
  },
  {
    id: 'families',
    label: 'Families & Households',
    tagline: 'Civil registrations, food security, social welfare & housing',
    iconName: 'Users',
    description: 'Households seeking birth/death certificates, marriage registrations, new rice cards, member additions, family pensions, and public housing allocations.',
    primaryServices: ['Birth & Death Certificate Issuance', 'Marriage Registration Certificate', 'New Rice Card & Member Addition', 'PM Awas Yojana (PMAY Housing)'],
    commonObstacles: [
      'Late registration penalty for birth/death events exceeding 21 days',
      'Address mismatch between husband and wife’s native documentation',
      'Confusion over Grama Sachivalayam / Ward Secretariat jurisdiction'
    ]
  },
  {
    id: 'seniors',
    label: 'Seniors & Accessibility',
    tagline: 'Social security pensions, health schemes & doorstep assisted services',
    iconName: 'HeartHandshake',
    description: 'Elderly citizens, widows, and persons with disabilities needing simplified guidance, high-contrast readable layouts, and doorstep delivery.',
    primaryServices: ['YSR Pension Kanuka (Old Age & Widow Social Security)', 'Senior Citizen Welfare Identity Card', 'Ayushman Bharat / Aarogyasri Health Scheme', 'Doorstep MeeSeva Delivery'],
    commonObstacles: [
      'Failed biometric fingerprint authentication due to age-related skin wear',
      'Dense technical portals impossible to navigate without tech-savvy family member',
      'Discontinued bank accounts where pension funds bounce repeatedly'
    ]
  },
  {
    id: 'entrepreneurs',
    label: 'Entrepreneurs & MSMEs',
    tagline: 'Business registrations, trade permissions, food safety & labor acts',
    iconName: 'Briefcase',
    description: 'Micro and small business owners starting bakeries, retail shops, manufacturing units, and service startups needing lawful clearances.',
    primaryServices: ['Udyam MSME Registration', 'FSSAI Food Business Operator Registration', 'Municipal Trade License', 'Commercial Power Connection', 'Cold Storage & Agro Processing (Case Study)'],
    commonObstacles: [
      'Navigating multiple independent departmental portals with conflicting data requirements',
      'Confusion between petty registration (turnover < ₹12L) vs state license',
      'Lengthy site inspections that could legally be handled post-commissioning'
    ]
  }
];

export const CITIZEN_SERVICES: CitizenService[] = [
  {
    id: 'srv-caste-domicile',
    title: 'Integrated Community, Nativity & Date of Birth Certificate',
    targetGroup: 'citizens',
    targetGroupLabel: 'Everyday Citizens & Students',
    department: 'Revenue & Disaster Management Department (MeeSeva)',
    portalName: 'Andhra Pradesh MeeSeva 2.0 / Grama Ward Sachivalayam',
    portalUrl: 'https://meeseva.ap.gov.in',
    officialFee: '₹45 (Statutory Service Charge)',
    statutorySlaDays: 15,
    serviceCategory: 'certificates',
    plainDescription: 'Official certificate verifying your social community (SC/ST/BC/OC), permanent nativity/domicile in Andhra Pradesh, and legal date of birth for academic admissions, government jobs, and welfare eligibility.',
    easyExplainSummary: 'This is the government paper that proves your caste and where you live. You need it for school admission and government benefits. If your father or brother already has one, you can get it in 3 days without meeting any officer in person.',
    teluguSummary: 'మీ కులం మరియు నివాసం రుజువు చేసే సమగ్ర ధృవీకరణ పత్రం. విద్యా ప్రవేశాలు, ఉపకారవేతనాలు మరియు సంక్షేమ పథకాలకు ఇది తప్పనిసరి.',
    hindiSummary: 'जाति, निवास और जन्म तिथि का एकीकृत प्रमाण पत्र। शैक्षणिक प्रवेश और सरकारी योजनाओं के लिए आवश्यक।',
    eligibilityCriteria: [
      'Applicant or parents must be continuous residents of the State of Andhra Pradesh',
      'Valid identity verification matching parents’ demographic history',
      'No previous conflicting caste claim registered in revenue records'
    ],
    documentsRequired: [
      {
        name: 'Aadhaar Card (Applicant & Parent)',
        purpose: 'Identity & residential address proof',
        digiLockerAvailable: true,
        commonMistake: 'Submitting old address Aadhaar when applying from a new permanent mandal',
        sampleFormat: 'DigiLocker PDF or self-attested photocopy'
      },
      {
        name: '10th Class SSC Marks Memo or School Study Certificate',
        purpose: 'Date of birth and continuous institutional study proof',
        digiLockerAvailable: true,
        commonMistake: 'Marks memo name having initials expanded differently from Aadhaar',
        sampleFormat: 'Board of Secondary Education verified memo'
      },
      {
        name: 'Family Member’s Existing Caste Certificate',
        purpose: 'Genealogical statutory precedent (Father, Mother, Paternal Sibling)',
        digiLockerAvailable: true,
        commonMistake: 'Submitting mother’s paternal caste certificate when applying under father’s lineage',
        sampleFormat: 'Barcoded MeeSeva certificate issued post-2014'
      },
      {
        name: 'Self-Declaration Form on Plain Paper',
        purpose: 'Statutory undertaking under Section 4 of AP SC/ST/BC Regulation of Issue of Community Certificates Act 1993',
        digiLockerAvailable: false,
        commonMistake: 'Paying an agent for non-judicial stamp paper; plain paper self-attestation is legally valid',
        sampleFormat: 'Standard Form-II Appendix from MeeSeva portal'
      }
    ],
    currentAsIsSteps: [
      [
        {
          stepNumber: 1,
          title: 'Manual Application filing at MeeSeva / CSC Kiosk',
          officeOrCounter: 'MeeSeva Franchise / Cyber Cafe',
          isPhysicalVisit: true,
          days: 1,
          frictionOrNote: 'Citizen pays ₹100-150 instead of official ₹45 due to scanning & typing fees.'
        },
        {
          stepNumber: 2,
          title: 'Village Revenue Officer (VRO) Physical Field Enquiry',
          officeOrCounter: 'Local Village / Ward Sachivalayam',
          isPhysicalVisit: true,
          days: 5,
          frictionOrNote: 'VRO calls applicant to village office to inspect original land documents or grandfather lineage.'
        },
        {
          stepNumber: 3,
          title: 'Revenue Inspector (RI) Verification & Endorsement',
          officeOrCounter: 'Mandal Revenue Office (MRO)',
          isPhysicalVisit: false,
          days: 4,
          frictionOrNote: 'Internal file movement dependent on desk clearance.'
        },
        {
          stepNumber: 4,
          title: 'Tahsildar Digital Signature Approval & Printout Collection',
          officeOrCounter: 'MeeSeva Centre',
          isPhysicalVisit: true,
          days: 5,
          frictionOrNote: 'Applicant returns physically to collect printed hologram paper.'
        }
      ]
    ][0],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Single-Sign-On Application with DigiLocker Document Fetch',
        digitalChannel: 'CivicLens / Sachivalayam Portal',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Auto-fetches SSC memo and father’s barcoded certificate directly from repository. Zero scanning.'
      },
      {
        stepNumber: 2,
        title: 'Algorithmic Lineage Validation (Precedent Match)',
        digitalChannel: 'Automated Revenue Engine',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'If father’s digitally signed certificate exists in MeeSeva database, physical field enquiry is waived.'
      },
      {
        stepNumber: 3,
        title: 'Digital Delivery to WhatsApp / DigiLocker Vault',
        digitalChannel: 'Digital Locker & SMS Gateway',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Cryptographically signed QR-verifiable certificate delivered without visiting any kiosk.'
      }
    ],
    asIsTotalDays: 15,
    streamlinedTotalDays: 3,
    asIsPhysicalVisits: 2,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'Father’s Surname Spelling Inconsistency',
        description: 'If applicant spells surname as "Challa" on Aadhaar but father’s revenue record says "Chella", scrutiny clerks flag it as an unresolved lineage discrepancy.',
        preventionCheck: 'Ensure the self-declaration explicitly mentions "Also Known As" aliases matching the Aadhaar demographic string before submitting.'
      },
      {
        trapTitle: 'Using Expired Caste Affidavits',
        description: 'Submitting a manual paper certificate issued by an RDO prior to the 2014 MeeSeva computerized database forces an automatic physical enquiry.',
        preventionCheck: 'Quote the barcoded MeeSeva Application Number of any direct paternal relative issued after 2014 to enable instant database validation.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'AP SC, ST & BC Regulation of Issue of Community Certificates Act, 1993 (Act No. 16 of 1993)',
      reformProposal: 'Enact rule amendment enabling "Genealogical Inherited Deemed Approval" — if both parents possess verified digital certificates, child certificate issues automatically within 24 hours without field enquiry.',
      impactMetric: 'Eliminates 3.2 million physical VRO enquiries annually across Andhra Pradesh.',
      governingAct: 'Section 4, AP Act 16 of 1993 & Citizen Services Guarantee Act 2017'
    }
  },
  {
    id: 'srv-income-certificate',
    title: 'Annual Family Income Certificate (Fee Waiver & Welfare Schemes)',
    targetGroup: 'students',
    targetGroupLabel: 'Students & Families',
    department: 'Revenue Department (Tahsildar Office)',
    portalName: 'MeeSeva Portal / Village Ward Secretariat',
    portalUrl: 'https://meeseva.ap.gov.in',
    officialFee: '₹45',
    statutorySlaDays: 7,
    serviceCategory: 'certificates',
    plainDescription: 'Essential revenue document certifying the total gross annual income of the applicant’s entire household from agriculture, salaries, business, and labor. Required for college fee reimbursement, scholarships, and subsidized healthcare.',
    easyExplainSummary: 'This paper proves how much money your family earns in a year. College scholarships and hospital cards use this to give you free fees. It is valid for 1 year (from April 1 to March 31).',
    teluguSummary: 'కుటుంబ వార్షిక ఆదాయ ధృవీకరణ పత్రం. కళాశాల ఫీజు రీయింబర్స్‌మెంట్, విద్యార్థి వేతనాలు మరియు ఆరోగ్యశ్రీ కొరకు తప్పనిసరి.',
    hindiSummary: 'वार्षिक पारिवारिक आय प्रमाण पत्र। कॉलेज फीस माफी और छात्रवृत्ति के लिए अनिवार्य।',
    eligibilityCriteria: [
      'Household total income must be comprehensively declared across all earning members',
      'Agricultural land holding (wet/dry acres) must be disclosed',
      'Valid for 1 financial year (expires March 31 of each fiscal year)'
    ],
    documentsRequired: [
      {
        name: 'Salary Slip / Form 16 OR Agricultural Adangal / 1B Record',
        purpose: 'Income proof verification',
        digiLockerAvailable: true,
        commonMistake: 'Omitting agricultural income when applying for non-salaried category',
        sampleFormat: 'Employer authenticated slip or Meebhoomi 1B record'
      },
      {
        name: 'Household Ration Card / Rice Card',
        purpose: 'Household member definition & low-income categorization',
        digiLockerAvailable: true,
        commonMistake: 'Applying with a ration card where deceased family members are still listed',
        sampleFormat: 'Civil Supplies digital rice card'
      },
      {
        name: 'Electricity Consumption Bill (Recent 6 Months)',
        purpose: 'Economic proxy verification (residential power consumption < 300 units/mo)',
        digiLockerAvailable: true,
        commonMistake: 'Failing to explain high summer billing spike exceeding the welfare threshold',
        sampleFormat: 'APEPDCL / APCPDCL consumer bill'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'MeeSeva Kiosk Submission',
        officeOrCounter: 'MeeSeva / Village Sachivalayam',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Physical queue during college admission peak season (June-August).'
      },
      {
        stepNumber: 2,
        title: 'VRO Neighborhood Economic Enquiry',
        officeOrCounter: 'Village / Ward Level',
        isPhysicalVisit: true,
        days: 3,
        frictionOrNote: 'VRO visits residence or requests applicant to present neighbor testimonials.'
      },
      {
        stepNumber: 3,
        title: 'Tahsildar Scrutiny and Issuance',
        officeOrCounter: 'Mandal Office',
        isPhysicalVisit: false,
        days: 3,
        frictionOrNote: 'Delays when Tahsildar is on law-and-order or protocol duty.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Income Tax Return (ITR) / DISCOM Power Consumption API Cross-Check',
        digitalChannel: 'Integrated State Data Platform',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'System automatically confirms family power usage < 300 units/month and non-filing of high-bracket ITR.'
      },
      {
        stepNumber: 2,
        title: 'Self-Attested Income Undertaking with DigiLocker Proof',
        digitalChannel: 'Online Portal',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Citizen accepts electronic legal undertaking under penalty of Section 177 IPC.'
      },
      {
        stepNumber: 3,
        title: 'Instant Barcoded Income Certificate Generation',
        digitalChannel: 'Automated Issuance Gateway',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Issued within 48 hours without any physical office interaction.'
      }
    ],
    asIsTotalDays: 7,
    streamlinedTotalDays: 2,
    asIsPhysicalVisits: 2,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'Electricity Bill Exceeding Slab Threshold',
        description: 'AP welfare rules disqualify households consuming over 300 units/month for 6 consecutive months. A single tenant bill in the landlord’s name can trigger immediate rejection.',
        preventionCheck: 'Attach rental agreement proving you are a tenant and do not own the multi-phase meter installed by the building owner.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Right to Public Services Act & Citizen Charter Manual',
      reformProposal: 'Extend Income Certificate validity to 3 years for low-income Rice Card holders whose primary income source is unorganized labor or marginal farming.',
      impactMetric: 'Eliminates 4.5 million repetitive annual income re-applications for continuing college students.',
      governingAct: 'AP Public Services Delivery Guarantee Rules'
    }
  },
  {
    id: 'srv-post-matric-scholarship',
    title: 'Post-Matric Scholarship & Fee Reimbursement (Jagananna Vidya Deevena & NSP)',
    targetGroup: 'students',
    targetGroupLabel: 'Students & Young Adults',
    department: 'Social Welfare & Higher Education Department',
    portalName: 'National Scholarship Portal (NSP) & JVD Portal',
    portalUrl: 'https://scholarships.gov.in',
    officialFee: 'Free (Zero Application Fee)',
    statutorySlaDays: 30,
    serviceCategory: 'education',
    plainDescription: 'Full tuition fee reimbursement and quarterly boarding/hostel maintenance allowance (Vasathi Deevena) for ITI, Polytechnic, Degree, Engineering, Medicine, and Post-Graduate students belonging to SC, ST, BC, EBC, Minority, and Kapu categories.',
    easyExplainSummary: 'Government pays your full college tuition fees directly to the college, plus money for your hostel food and books. You must have 75% attendance in college and an active bank account linked to your Aadhaar.',
    teluguSummary: 'పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ మరియు పూర్తి ఫీజు రీయింబర్స్‌మెంట్ పథకం. కళాశాల ఫీజులు మరియు హాస్టల్ ఖర్చుల కొరకు.',
    hindiSummary: 'पोस्ट-मैट्रिक छात्रवृत्ति और पूर्ण शिक्षण शुल्क प्रतिपूर्ति योजना।',
    eligibilityCriteria: [
      'Enrolled in recognized Polytechnic, Degree, Engineering, Pharmacy, MCA, MBA, or PG institution',
      'Annual parental income must be less than ₹2,500,000 (₹2.5 Lakhs)',
      'Minimum 75% student attendance verified through biometric/facial attendance app',
      'Total family land holding must be below 10 acres wetland or 25 acres dryland'
    ],
    documentsRequired: [
      {
        name: 'College Admission Allotment Order & Fee Receipt',
        purpose: 'Proof of merit/convenor quota admission in recognized institution',
        digiLockerAvailable: true,
        commonMistake: 'Management quota seats are ineligible; must be convenor quota (EAPCET/ICET/ECET)',
        sampleFormat: 'APSCHE Convenor allotment letter'
      },
      {
        name: 'Integrated Caste & Valid Income Certificate',
        purpose: 'Category reservation and financial income ceiling verification',
        digiLockerAvailable: true,
        commonMistake: 'Using an income certificate that expired prior to the academic year start',
        sampleFormat: 'Digitally signed MeeSeva certificate'
      },
      {
        name: 'Aadhaar-Seeded Bank Passbook (NPCI DBT Active)',
        purpose: 'Direct Benefit Transfer (DBT) disbursement into student’s account',
        digiLockerAvailable: true,
        commonMistake: 'Account being Aadhaar-linked (KYC) but not NPCI DBT-mapped at the bank branch',
        sampleFormat: 'Nationalized bank passbook with active NPCI status'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Online Application Filing on Student Portal',
        officeOrCounter: 'Online Student Portal',
        isPhysicalVisit: false,
        days: 2,
        frictionOrNote: 'Manual entry of over 45 academic, residential, and caste data fields.'
      },
      {
        stepNumber: 2,
        title: 'Physical Document Submission to College Principal/Nodal Officer',
        officeOrCounter: 'College Administration Office',
        isPhysicalVisit: true,
        days: 5,
        frictionOrNote: 'Submitting 3 physical sets of photocopies with manual college stamping.'
      },
      {
        stepNumber: 3,
        title: 'Bank Branch Visit for NPCI Aadhaar Mapping Confirmation',
        officeOrCounter: 'Bank Branch',
        isPhysicalVisit: true,
        days: 3,
        frictionOrNote: 'Students queue at branches to submit NPCI mandate forms because online DBT status is unclear.'
      },
      {
        stepNumber: 4,
        title: 'District Social Welfare Officer (DSWO) Final Scrutiny & Sanction',
        officeOrCounter: 'Collectorate / Welfare Office',
        isPhysicalVisit: false,
        days: 15,
        frictionOrNote: 'Delayed releases due to batch processing.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'One-Click Profile Auto-Fill via Academic Bank of Credits (ABC) & MeeSeva',
        digitalChannel: 'CivicLens Student Hub',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Zero typing. Pulls admission allotment, marks, caste, and income automatically.'
      },
      {
        stepNumber: 2,
        title: 'Real-time NPCI DBT Gateway Validation',
        digitalChannel: 'Integrated Banking API',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Instantly pings NPCI server to verify active DBT mapping, preventing bank branch visits.'
      },
      {
        stepNumber: 3,
        title: 'Automated Principal E-Endorsement',
        digitalChannel: 'College Enterprise System',
        isPhysicalVisit: false,
        days: 2,
        simplificationNote: 'Attendance verified directly through State Facial Recognition Attendance System.'
      }
    ],
    asIsTotalDays: 25,
    streamlinedTotalDays: 4,
    asIsPhysicalVisits: 2,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'The "Aadhaar Linked" vs "NPCI Mapped" Illusion',
        description: 'Over 28% of scholarship disbursements bounce because a student’s bank account is KYC-linked to Aadhaar, but the NPCI mapper points to a dormant childhood PMJDY or postal account.',
        preventionCheck: 'Use the UIDAI "Check Aadhaar Bank Seeding Status" tool before portal submission; confirm the active bank is your current student account.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'AP Educational Institutions (Regulation of Admissions & Prohibition of Capitation Fee) Act 1983',
      reformProposal: 'Seamless "Direct Institution Offset" — automatically credit tuition fee from State Treasury to collegiate ledger at admission, removing student anxiety over reimbursement delays.',
      impactMetric: 'Eliminates payment friction for 1.1 million collegiate students every semester.',
      governingAct: 'Jagananna Vidya Deevena Operational Guidelines'
    }
  },
  {
    id: 'srv-birth-death-cert',
    title: 'Birth & Death Certificate Issuance & Legal Name Correction',
    targetGroup: 'families',
    targetGroupLabel: 'Families & Individuals',
    department: 'Municipal Administration & Urban Development / Panchayat Raj',
    portalName: 'Civil Registration System (CRS) & MeeSeva',
    portalUrl: 'https://crsorgi.gov.in',
    officialFee: 'Free within 21 days; ₹30-50 search fee thereafter',
    statutorySlaDays: 7,
    serviceCategory: 'certificates',
    plainDescription: 'Official statutory record of birth or demise under the Registration of Births and Deaths Act 1969. Fundamental document for passport, school entry, property inheritance, insurance claims, and legal heir succession.',
    easyExplainSummary: 'The legal paper proving when and where a child was born or a person passed away. If reported by the hospital within 21 days, it is completely free and quick. After 21 days, you need special permission.',
    teluguSummary: 'జనన మరియు మరణ ధృవీకరణ పత్రాల జారీ మరియు సవరణ. పాస్‌పోర్ట్, పాఠశాల ప్రవేశం మరియు వారసత్వ హక్కుల కొరకు చట్టబద్ధమైన పత్రం.',
    hindiSummary: 'जन्म और मृत्यु प्रमाण पत्र जारी करना। पासपोर्ट, स्कूल प्रवेश और उत्तराधिकार के लिए अनिवार्य।',
    eligibilityCriteria: [
      'Event occurred within the territorial jurisdiction of the designated Municipality or Gram Panchayat',
      'Timely reporting within 21 days by the institution (Hospital) or family head',
      'Magisterial / RDO order required if event occurred over 1 year ago (delayed registration)'
    ],
    documentsRequired: [
      {
        name: 'Hospital Discharge Summary / Form-1 Birth Report',
        purpose: 'Official medical verification of birth/death date, time, and sex',
        digiLockerAvailable: true,
        commonMistake: 'Mothers’ surname in hospital book differing from Aadhaar card',
        sampleFormat: 'Signed Form-1 from hospital registrar'
      },
      {
        name: 'Parents’ Aadhaar Cards',
        purpose: 'Demographic identification of biological parents',
        digiLockerAvailable: true,
        commonMistake: 'Incomplete Aadhaar numbers recorded on hospital slip',
        sampleFormat: 'DigiLocker verified PDF'
      },
      {
        name: 'Name Inclusion Request Form (for Births)',
        purpose: 'Adding child’s legal name if hospital reported birth without formal child name',
        digiLockerAvailable: false,
        commonMistake: 'Spelling the child’s name differently than planned for school admission records',
        sampleFormat: 'Standard MeeSeva Form-I'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Hospital reporting to Municipal Health Officer',
        officeOrCounter: 'Hospital Admin Desk',
        isPhysicalVisit: false,
        days: 3,
        frictionOrNote: 'Hospitals often submit monthly physical batches causing data backlog.'
      },
      {
        stepNumber: 2,
        title: 'Physical visit to Municipal / Panchayat Office for Name Inclusion',
        officeOrCounter: 'Municipal Citizen Service Centre',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Parents must appear in person to submit the name inclusion affidavit.'
      },
      {
        stepNumber: 3,
        title: 'Verification by Sanitary Inspector / Health Assistant',
        officeOrCounter: 'Ward Health Office',
        isPhysicalVisit: false,
        days: 3,
        frictionOrNote: 'Manual register checking against hospital dispatch books.'
      },
      {
        stepNumber: 4,
        title: 'Collection of Digitally Signed Certificate',
        officeOrCounter: 'Municipal Office Counter',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Physical queue to collect embossed printout.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Direct Digital Birth Notification at Hospital Discharge',
        digitalChannel: 'CRS Institutional Integration',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Hospital generates tentative digital record with parents’ Aadhaar OTP consent immediately.'
      },
      {
        stepNumber: 2,
        title: 'Online Name Entry via Mobile App with DigiLocker Link',
        digitalChannel: 'Citizen Self-Service App',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Parents enter child’s chosen name from home without notary affidavit within 1 year.'
      },
      {
        stepNumber: 3,
        title: 'Instant QR-Coded Certificate Pushed to DigiLocker',
        digitalChannel: 'National CRS Repository',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Zero office visits. Downloadable anytime with QR code validation.'
      }
    ],
    asIsTotalDays: 8,
    streamlinedTotalDays: 2,
    asIsPhysicalVisits: 2,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'The 21-Day Clock & Delayed Registration Penalties',
        description: 'Reporting a birth after 21 days but within 30 days requires Late Fee. After 30 days up to 1 year requires Municipal Health Officer permission. After 1 year requires a lengthy Sub-Divisional Magistrate / RDO court order.',
        preventionCheck: 'Always verify before leaving the maternity hospital that the hospital clerk entered Form-1 into the state portal; note down the registration number.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Registration of Births and Deaths (Amendment) Act 2023',
      reformProposal: 'Implement automatic issuance at hospital discharge by mandating digital birth reporting before final bill generation, making the child’s birth certificate ready before leaving the ward.',
      impactMetric: 'Eliminates 100% of preventable delayed birth registrations across public hospitals.',
      governingAct: 'RBD Amendment Act 2023 (Act No. 20 of 2023)'
    }
  },
  {
    id: 'srv-pension-kanuka',
    title: 'Social Security Pension (Old Age, Widow & Disabled Welfare)',
    targetGroup: 'seniors',
    targetGroupLabel: 'Senior Citizens & Vulnerable Individuals',
    department: 'Department of Rural Development & Social Welfare',
    portalName: 'YSR Pension Kanuka / NSAP Portal',
    portalUrl: 'https://sspensions.ap.gov.in',
    officialFee: 'Completely Free (Zero Charges)',
    statutorySlaDays: 21,
    serviceCategory: 'social_security',
    plainDescription: 'Direct monthly financial pension (₹3,000/month for Old Age & Widows, ₹6,000 - ₹15,000/month for Persons with Disabilities) credited on the 1st of every month to eligible senior citizens aged 60+ living below poverty line.',
    easyExplainSummary: 'Monthly financial assistance from the government for elders aged 60 and older, widows, and specially-abled citizens. A village volunteer or ward secretariat staff comes directly to your home so you do not have to travel.',
    teluguSummary: 'వృద్ధాప్య, వితంతు మరియు వికలాంగుల సామాజిక భద్రతా పింఛను. నెలకు ₹3,000 నుండి ₹6,000 వరకు నేరుగా నగదు లేదా బ్యాంక్ ఖాతాకు.',
    hindiSummary: 'वृद्धावस्था, विधवा और दिव्यांग सामाजिक सुरक्षा पेंशन। मासिक ₹3,000 से ₹6,000 की वित्तीय सहायता।',
    eligibilityCriteria: [
      'Age criteria: 60+ years for Old Age Pension (OAP); No age bar for Widows and PwD (40%+ disability)',
      'Total family monthly income must not exceed ₹10,000 in rural areas or ₹12,000 in urban areas',
      'Family must not own a four-wheeler (except auto/tractor) and electricity consumption under 300 units/month',
      'No family member should be a Government employee or income tax payee'
    ],
    documentsRequired: [
      {
        name: 'Aadhaar Card of Applicant & Spouse',
        purpose: 'Age proof and unique demographic identity check',
        digiLockerAvailable: true,
        commonMistake: 'Aadhaar showing only Year of Birth (e.g. 1964) without full DD/MM, creating dispute on exact 60th birthday',
        sampleFormat: 'UIDAI Aadhaar card'
      },
      {
        name: 'White Ration Card / Rice Card',
        purpose: 'Below Poverty Line (BPL) economic validation',
        digiLockerAvailable: true,
        commonMistake: 'Applicant’s name removed from son’s card without being issued a separate unit card',
        sampleFormat: 'Civil supplies database record'
      },
      {
        name: 'SADAREM Disability Certificate (for PwD Pension only)',
        purpose: 'Medical board certified disability percentage (minimum 40%)',
        digiLockerAvailable: true,
        commonMistake: 'Temporary 3-year certificate expiring before renewal audit',
        sampleFormat: 'Digitally verified SADAREM online certificate'
      },
      {
        name: 'Death Certificate of Husband (for Widow Pension only)',
        purpose: 'Statutory proof of widowhood',
        digiLockerAvailable: true,
        commonMistake: 'Manual village elder certificate without official Municipal/Panchayat CRS stamp',
        sampleFormat: 'Form-6 Death Certificate from registrar'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Application Submission at Village/Ward Secretariat',
        officeOrCounter: 'Grama / Ward Sachivalayam',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Senior citizens travel physically to the secretariat to submit papers.'
      },
      {
        stepNumber: 2,
        title: 'Welfare and Education Assistant (WEA) Field Verification',
        officeOrCounter: 'Applicant Home',
        isPhysicalVisit: false,
        days: 5,
        frictionOrNote: 'Physical inspection of house assets, electricity meter, and vehicle ownership.'
      },
      {
        stepNumber: 3,
        title: 'Mandal Parishad Development Officer (MPDO) Approval',
        officeOrCounter: 'Mandal Office',
        isPhysicalVisit: false,
        days: 7,
        frictionOrNote: 'Batch scrutiny against six-step economic validation filters.'
      },
      {
        stepNumber: 4,
        title: 'Biometric Iris / Facial Scan for Monthly Disbursement',
        officeOrCounter: 'Home / Counter',
        isPhysicalVisit: false,
        days: 1,
        frictionOrNote: 'Fingerprint scanner failure due to aging skin requires multiple retries.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Doorstep Assisted Application via Ward Mobile Tablet',
        digitalChannel: 'Sachivalayam Doorstep Service',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Secretariat staff visits elder’s home with tablet; zero travel required for senior.'
      },
      {
        stepNumber: 2,
        title: 'Automated 6-Step Economic Filter Validation',
        digitalChannel: 'State Welfare Database Engine',
        isPhysicalVisit: false,
        days: 2,
        simplificationNote: 'Auto-checks land, power bill, and vehicle registries in real-time.'
      },
      {
        stepNumber: 3,
        title: 'Facial Recognition / Iris Fallback Authorization',
        digitalChannel: 'AI Face-RD App',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'AI-assisted smartphone face match resolves worn-fingerprint biometric failure instantly.'
      }
    ],
    asIsTotalDays: 18,
    streamlinedTotalDays: 4,
    asIsPhysicalVisits: 1,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'The "Worn Fingerprint" Authentication Barrier',
        description: 'Over 12% of senior citizens aged 65+ fail fingerprint sensor matching during monthly pension delivery due to epidermal degradation from decades of manual labor.',
        preventionCheck: 'Ensure the Sachivalayam assistant switches the terminal to "Aadhaar Face Authentication" (FaceRD) or "Iris Scan Mode" rather than repeatedly rejecting the transaction.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      reformProposal: 'Enact "Proactive Age-Based Pension Enrollment" — when a Rice Card holder turns 60 in the state population database, the system automatically prepares their pension file without requiring them to file an application.',
      impactMetric: 'Ensures zero delay and eliminates application paperwork for 350,000 seniors turning 60 each year.',
      governingAct: 'National Social Assistance Programme (NSAP) Guidelines'
    }
  },
  {
    id: 'srv-udyam-msme',
    title: 'Udyam MSME Registration for Micro & Small Enterprises',
    targetGroup: 'entrepreneurs',
    targetGroupLabel: 'Entrepreneurs & Small Businesses',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    portalName: 'National Udyam Registration Portal',
    portalUrl: 'https://udyamregistration.gov.in',
    officialFee: 'Completely Free (Zero Government Fee)',
    statutorySlaDays: 3,
    serviceCategory: 'business',
    plainDescription: 'Official Central Government certificate granting legal MSME enterprise status to proprietorships, partnerships, and companies. Provides access to priority sector bank loans, 45-day payment protection under MSMED Act, and government tender fee exemptions.',
    easyExplainSummary: 'The national business certificate for any small shop, manufacturing unit, or service business. It is 100% free online. It protects you if customers or big companies delay paying your invoices beyond 45 days.',
    teluguSummary: 'సూక్ష్మ, చిన్న మరియు మధ్యతరహా పరిశ్రమల (MSME) జాతీయ రిజిస్ట్రేషన్. బ్యాంక్ రుణాలు, సబ్సిడీలు మరియు ప్రభుత్వ పథకాల కొరకు.',
    hindiSummary: 'सूक्ष्म, लघु और मध्यम उद्यम (MSME) उद्यम पंजीकरण प्रमाण पत्र। 100% निःशुल्क और ऑनलाइन।',
    eligibilityCriteria: [
      'Micro Enterprise: Investment in plant & machinery ≤ ₹1 Crore and turnover ≤ ₹5 Crore',
      'Small Enterprise: Investment ≤ ₹10 Crore and turnover ≤ ₹50 Crore',
      'Aadhaar number of proprietor, managing partner, or authorized director'
    ],
    documentsRequired: [
      {
        name: 'Proprietor / Partner Aadhaar Number',
        purpose: 'Identity and OTP verification',
        digiLockerAvailable: true,
        commonMistake: 'Mobile number not linked to Aadhaar for OTP verification',
        sampleFormat: 'UIDAI Aadhaar'
      },
      {
        name: 'PAN Card (Business or Personal for Proprietorship)',
        purpose: 'Direct Income Tax and GST database linking',
        digiLockerAvailable: true,
        commonMistake: 'Name spelling on PAN not matching Aadhaar exactly',
        sampleFormat: 'Income Tax Department PAN'
      },
      {
        name: 'Business Bank Account Details (IFSC & Account No)',
        purpose: 'Enterprise account details for subsidies and direct credit',
        digiLockerAvailable: true,
        commonMistake: 'Submitting joint personal account instead of dedicated business account',
        sampleFormat: 'Bank statement or cancelled cheque'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Navigating Cyber Cafe / Fraudulent Duplicate Portals',
        officeOrCounter: 'Third-Party Web / Agent Kiosk',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Citizens get tricked by fake ".org" or ".in" portals charging ₹1,500-3,000 for a free service.'
      },
      {
        stepNumber: 2,
        title: 'PAN & GSTIN Integration Check',
        officeOrCounter: 'Udyam National Portal',
        isPhysicalVisit: false,
        days: 1,
        frictionOrNote: 'Data mismatch errors between GST and CBDT databases.'
      },
      {
        stepNumber: 3,
        title: 'Certificate Generation & Download',
        officeOrCounter: 'Online Download',
        isPhysicalVisit: false,
        days: 2,
        frictionOrNote: 'Requires tracking acknowledgment number.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Direct Official Portal Routing & Fake Site Warning',
        digitalChannel: 'CivicLens Business Portal',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Direct secure handshake to official udyamregistration.gov.in with zero fees.'
      },
      {
        stepNumber: 2,
        title: 'Single-Form Business Profile Auto-Fill',
        digitalChannel: 'CivicLens Business Profile Engine',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Auto-maps NIC industry code, plant investment, and bank IFSC in 4 minutes.'
      },
      {
        stepNumber: 3,
        title: 'Instant Udyam Registration Number (URN) with QR Code',
        digitalChannel: 'Instant Gateway',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Permanent life-long certificate issued directly without any physical inspector intervention.'
      }
    ],
    asIsTotalDays: 4,
    streamlinedTotalDays: 1,
    asIsPhysicalVisits: 1,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'The Fake Paid Portal Trap',
        description: 'Over 40% of first-time entrepreneurs fall victim to private commercial websites masquerading as the official Udyam portal that charge up to ₹2,500 for "processing" a service the Government provides completely free.',
        preventionCheck: 'Verify the browser address bar ends strictly with ".gov.in" (https://udyamregistration.gov.in). Never pay any application fee for Udyam registration.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Micro, Small and Medium Enterprises Development Act, 2006 (MSMED Act)',
      reformProposal: 'Automatic Unified Udyam-GST registration — whenever a GSTIN is granted to a micro/small business, automatically generate the Udyam number through backend webhook.',
      impactMetric: 'Saves 2.4 million manual registrations annually across India.',
      governingAct: 'Section 7 & 8, MSMED Act 2006'
    }
  },
  {
    id: 'srv-fssai-petty-reg',
    title: 'FSSAI Food Business Operator (FBO) Registration (Petty Food Makers & Cloud Kitchens)',
    targetGroup: 'entrepreneurs',
    targetGroupLabel: 'Entrepreneurs & Food Businesses',
    department: 'Food Safety and Standards Authority of India (FSSAI)',
    portalName: 'Food Safety Compliance System (FoSCoS)',
    portalUrl: 'https://foscos.fssai.gov.in',
    officialFee: '₹100 per year (Statutory Registration Fee)',
    statutorySlaDays: 7,
    serviceCategory: 'business',
    plainDescription: 'Mandatory statutory food registration under Section 31 of the Food Safety and Standards Act 2006 for small food businesses, home bakeries, tiffin centers, street food vendors, and cloud kitchens with annual turnover up to ₹12 Lakhs.',
    easyExplainSummary: 'The legal food safety paper you need if you sell food, snacks, home bakery cakes, or run a small hotel. If your yearly sales are under ₹12 Lakhs, you only need this simple ₹100 registration, not the expensive factory license.',
    teluguSummary: 'చిన్న ఆహార వ్యాపారులు, హోటళ్ళు మరియు బేకరీల కొరకు FSSAI ఆహార భద్రతా రిజిస్ట్రేషన్. వార్షిక టర్నోవర్ ₹12 లక్షల లోపు ఉన్నవారికి ₹100 మాత్రమే.',
    hindiSummary: 'छोटे खाद्य विक्रेताओं, होम बेकरी और ढाबों के लिए FSSAI खाद्य सुरक्षा पंजीकरण। ₹12 लाख तक के टर्नओवर के लिए ₹100 प्रति वर्ष।',
    eligibilityCriteria: [
      'Food business operator with annual turnover below ₹12 Lakhs',
      'Food production capacity up to 100 kg/liters per day',
      'Temporary / mobile stall or fixed retail outlet'
    ],
    documentsRequired: [
      {
        name: 'Passport Photo of Food Business Operator',
        purpose: 'Identity verification for food safety certificate',
        digiLockerAvailable: true,
        commonMistake: 'Casual selfie with dark background; must be clear headshot',
        sampleFormat: 'JPEG photo under 500 KB'
      },
      {
        name: 'Government Photo ID Proof (Aadhaar / Voter ID)',
        purpose: 'Identity and residential verification',
        digiLockerAvailable: true,
        commonMistake: 'Address on ID not matching physical place of food preparation',
        sampleFormat: 'DigiLocker PDF'
      },
      {
        name: 'Proof of Business Premises (Electricity Bill / Rental Deed)',
        purpose: 'Sanitary inspection jurisdiction and premises lawful possession',
        digiLockerAvailable: true,
        commonMistake: 'Expired rental agreement without owner’s NOC for food business',
        sampleFormat: 'Recent power bill or signed rent deed'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Filing Application Form-A on FoSCoS Portal',
        officeOrCounter: 'FoSCoS Online',
        isPhysicalVisit: false,
        days: 1,
        frictionOrNote: 'Confusing category selection between Retailer, Manufacturer, and Food Service.'
      },
      {
        stepNumber: 2,
        title: 'Local Food Safety Officer (FSO) Premises Inspection',
        officeOrCounter: 'Food Safety District Office',
        isPhysicalVisit: true,
        days: 5,
        frictionOrNote: 'FSO visits small kitchen or requests applicant to visit district food office with water reports.'
      },
      {
        stepNumber: 3,
        title: 'Registration Certificate Issuance',
        officeOrCounter: 'FoSCoS Download',
        isPhysicalVisit: false,
        days: 3,
        frictionOrNote: 'Delayed beyond statutory 7-day limit if FSO does not submit inspection report.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Smart Category Finder & Food Safety Undertaking',
        digitalChannel: 'CivicLens FSSAI Assistant',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Guides home bakeries and cloud kitchens directly to Form-A with self-attested sanitary checklist.'
      },
      {
        stepNumber: 2,
        title: 'Deemed Approval Trigger under Section 31(3)',
        digitalChannel: 'Automated Regulatory Clock',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'If no objection raised within 7 statutory days, registration certificate auto-issues automatically.'
      },
      {
        stepNumber: 3,
        title: 'Instant QR-Code Display Plate Ready for Printing',
        digitalChannel: 'Digital Locker & PDF',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Includes mandatory 14-digit FSSAI number and hygiene rating QR code.'
      }
    ],
    asIsTotalDays: 9,
    streamlinedTotalDays: 2,
    asIsPhysicalVisits: 1,
    streamlinedPhysicalVisits: 0,
    rejectionTraps: [
      {
        trapTitle: 'The "State License vs Petty Registration" Pitfall',
        description: 'New food entrepreneurs mistakenly apply for a State License (₹2,000/year fee requiring water test reports, blueprinted CAD layouts, and pre-inspection) when their turnover is under ₹12 Lakhs and only legally requires a simple ₹100 registration.',
        preventionCheck: 'Confirm your daily output is below 100 kg/liters and annual sales are under ₹12 Lakhs; select strictly "Petty Food Business" on Form-A.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Food Safety and Standards (Licensing and Registration of Food Businesses) Regulations, 2011',
      reformProposal: 'Shift from pre-registration physical inspection to 100% digital self-certification for all petty food vendors, reserving physical inspections for random post-market sampling.',
      impactMetric: 'Eliminates 1.8 million inspector visits for small tea stalls, home kitchens, and snack vendors.',
      governingAct: 'Regulation 2.1, FSS Regulations 2011'
    }
  },
  {
    id: 'srv-driving-license',
    title: 'Learner’s License & Driving License (Parivahan Sarathi)',
    targetGroup: 'students',
    targetGroupLabel: 'Young Adults & Everyday Citizens',
    department: 'Transport Department (RTA Andhra Pradesh)',
    portalName: 'Parivahan Sarathi Portal (MoRTH)',
    portalUrl: 'https://sarathi.parivahan.gov.in',
    officialFee: '₹150 (LLR Test) + ₹200 (Permanent License) + ₹200 (Smart Card)',
    statutorySlaDays: 7,
    serviceCategory: 'identity',
    plainDescription: 'Official license authorizing the holder to drive two-wheelers, light motor vehicles (cars), and transport vehicles across India under the Motor Vehicles Act 1988.',
    easyExplainSummary: 'The legal card that permits you to drive a scooter or car. You can take the Computer Learner’s Test (LLR) directly from your home on your computer with Aadhaar without visiting the RTO office.',
    teluguSummary: 'డ్రైవింగ్ లైసెన్స్ మరియు లెర్నర్స్ లైసెన్స్ (LLR). ఇంట్లోనే ఆధార్ ఆధారిత ఆన్‌లైన్ పరీక్ష ద్వారా LLR పొందవచ్చు.',
    hindiSummary: 'ड्राइविंग लाइसेंस और लर्नर्स लाइसेंस (LLR)। आधार आधारित ऑनलाइन परीक्षा के माध्यम से घर बैठे LLR प्राप्त करें।',
    eligibilityCriteria: [
      'Age: 16+ for gearless two-wheeler up to 50cc; 18+ for Light Motor Vehicle (car/bike with gear); 20+ for transport',
      'Pass computer-based traffic rules knowledge test',
      'Self-declaration of physical fitness (Form 1) or Medical Certificate (Form 1A for age 40+)'
    ],
    documentsRequired: [
      {
        name: 'Aadhaar Card (with active mobile linkage)',
        purpose: 'Identity, date of birth, and contactless e-KYC test authorization',
        digiLockerAvailable: true,
        commonMistake: 'Webcam not connected or face mismatch during online AI-proctored test',
        sampleFormat: 'DigiLocker verified Aadhaar'
      },
      {
        name: 'Blood Group Test Report / Medical Record',
        purpose: 'Mandatory emergency blood group printing on license card',
        digiLockerAvailable: false,
        commonMistake: 'Guessing blood group; incorrect data can endanger life during trauma transfusion',
        sampleFormat: 'Diagnostic lab report or hospital card'
      },
      {
        name: 'Address Proof (if different from Aadhaar)',
        purpose: 'Jurisdiction allotment to nearest RTO testing track',
        digiLockerAvailable: true,
        commonMistake: 'Submitting unnotarized rent agreement',
        sampleFormat: 'Passport / Voter ID / Electricity bill'
      }
    ],
    currentAsIsSteps: [
      {
        stepNumber: 1,
        title: 'Application through Private Driving School / Broker',
        officeOrCounter: 'Local Broker / Driving School',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Citizens pay ₹3,000 to ₹5,000 to driving schools for a ₹550 official fee.'
      },
      {
        stepNumber: 2,
        title: 'RTO Office Visit for Photo, Biometrics & LLR Computer Test',
        officeOrCounter: 'Regional Transport Office (RTO)',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Half-day leave from work or college to wait in physical testing queues.'
      },
      {
        stepNumber: 3,
        title: 'Physical Driving Track Test (after 30 days mandatory wait)',
        officeOrCounter: 'Automated Driving Test Track',
        isPhysicalVisit: true,
        days: 1,
        frictionOrNote: 'Simulated 8-track or H-track driving evaluation with transport inspector.'
      }
    ],
    streamlinedCitizenSteps: [
      {
        stepNumber: 1,
        title: 'Contactless Aadhaar e-KYC & Online Home LLR Test',
        digitalChannel: 'Parivahan Sarathi AI Proctor',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Take the 15-question traffic rules test from home via laptop webcam; instant LLR PDF download.'
      },
      {
        stepNumber: 2,
        title: 'Automated Track Driving Test Slot Booking',
        digitalChannel: 'Online Calendar Selection',
        isPhysicalVisit: false,
        days: 1,
        simplificationNote: 'Select exact 30-minute test slot without brokers or paper tokens.'
      },
      {
        stepNumber: 3,
        title: 'Single Physical Visit: Automated Track Driving Evaluation',
        digitalChannel: 'Sensor-Equipped Track',
        isPhysicalVisit: true,
        days: 1,
        simplificationNote: 'Computerized sensor scoring removes human inspector discretion; digital license pushed to DigiLocker within 24h.'
      }
    ],
    asIsTotalDays: 35,
    streamlinedTotalDays: 31,
    asIsPhysicalVisits: 3,
    streamlinedPhysicalVisits: 1,
    rejectionTraps: [
      {
        trapTitle: 'The Broker "Offline LLR" Myth',
        description: 'Driving school touts falsely convince students that "you cannot take the LLR test online without their physical proxy system", charging ₹1,500 extra for what is already a 100% free contactless home service under MoRTH rules.',
        preventionCheck: 'Select "Application using Aadhaar Authentication" on Sarathi; the portal unlocks the home test module immediately without any RTO visit.'
      }
    ],
    administrativeReform: {
      statutoryProvision: 'Motor Vehicles (Driving) Regulations, 2017 & CMV Rules 1989',
      reformProposal: 'Accredit recognized university campus simulators for preliminary driving evaluation, allowing college students to complete certifications without booking separate RTO track appointments.',
      impactMetric: 'Eliminates 800,000 unnecessary RTO visits annually.',
      governingAct: 'Section 9, Motor Vehicles Act 1988'
    }
  }
];
