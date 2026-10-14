import { 
  ChamberInventory, 
  InventoryBatch, 
  TemperatureExcursionAlert, 
  ReadinessMilestone 
} from '../types';

export const COLD_CHAMBERS: ChamberInventory[] = [
  {
    chamberId: 'CH-01',
    name: 'Chamber 1: Deep Freeze (Marine Logistics)',
    type: 'deep_freeze',
    capacityMT: 650,
    occupiedMT: 540,
    targetTempC: -25.0,
    currentTempC: -24.6,
    status: 'optimal',
    sensorId: 'IOT-TEMP-CH1-088',
    humidityPercent: 88
  },
  {
    chamberId: 'CH-02',
    name: 'Chamber 2: Frozen Storage (Quick Freezing)',
    type: 'deep_freeze',
    capacityMT: 650,
    occupiedMT: 480,
    targetTempC: -25.0,
    currentTempC: -18.2, // Excursion active!
    status: 'critical_excursion',
    sensorId: 'IOT-TEMP-CH2-094',
    humidityPercent: 92
  },
  {
    chamberId: 'CH-03',
    name: 'Chamber 3: Chilled Agro Enclosure',
    type: 'chill_room',
    capacityMT: 600,
    occupiedMT: 420,
    targetTempC: 3.0,
    currentTempC: 3.2,
    status: 'optimal',
    sensorId: 'IOT-TEMP-CH3-102',
    humidityPercent: 84
  },
  {
    chamberId: 'CH-04',
    name: 'Chamber 4: Controlled Atmosphere (Horticulture)',
    type: 'ca_atmosphere',
    capacityMT: 600,
    occupiedMT: 390,
    targetTempC: 0.5,
    currentTempC: 0.7,
    status: 'optimal',
    sensorId: 'IOT-TEMP-CH4-119',
    humidityPercent: 90
  }
];

export const INVENTORY_BATCHES: InventoryBatch[] = [
  {
    batchId: 'BATCH-VN-044',
    commodity: 'Frozen Raw Headless Vannamei Shrimp (Export PDI)',
    chamberId: 'CH-02',
    quantityMT: 85,
    estimatedValueINR: 42500000, // ₹4.25 Cr
    arrivalDate: '15-Mar-2026',
    expiryDate: '24-Apr-2026',
    shelfLifeDaysTotal: 40,
    remainingDays: 9,
    fefoPriority: 1, // Highest dispatch priority!
    riskScore: 'at_risk',
    temperatureTrend: [-24.1, -23.5, -21.8, -19.4, -18.2],
    excursionMinutes: 68,
    qualityGrade: 'Grade AA (USFDA Spec)'
  },
  {
    batchId: 'BATCH-DB-029',
    commodity: 'Pasteurised Salted Table Butter (Bulk Blocks)',
    chamberId: 'CH-03',
    quantityMT: 95,
    estimatedValueINR: 38000000, // ₹3.80 Cr
    arrivalDate: '22-Mar-2026',
    expiryDate: '06-May-2026',
    shelfLifeDaysTotal: 45,
    remainingDays: 21,
    fefoPriority: 2,
    riskScore: 'approaching_expiry',
    temperatureTrend: [2.9, 3.0, 3.1, 3.2, 3.2],
    excursionMinutes: 0,
    qualityGrade: 'Food Grade BIS'
  },
  {
    batchId: 'BATCH-FF-077',
    commodity: 'Pre-Cooked Frozen Ready-to-Eat Seafood Packs',
    chamberId: 'CH-01',
    quantityMT: 60,
    estimatedValueINR: 24000000, // ₹2.40 Cr
    arrivalDate: '01-Apr-2026',
    expiryDate: '15-May-2026',
    shelfLifeDaysTotal: 45,
    remainingDays: 30,
    fefoPriority: 3,
    riskScore: 'nominal',
    temperatureTrend: [-25.0, -24.8, -24.6, -24.6, -24.6],
    excursionMinutes: 0,
    qualityGrade: 'Export Retail Pack'
  },
  {
    batchId: 'BATCH-VN-081',
    commodity: 'IQF Peeled & Deveined Tiger Prawns',
    chamberId: 'CH-01',
    quantityMT: 140,
    estimatedValueINR: 84000000, // ₹8.40 Cr
    arrivalDate: '05-Apr-2026',
    expiryDate: '27-May-2026',
    shelfLifeDaysTotal: 52,
    remainingDays: 42,
    fefoPriority: 4,
    riskScore: 'nominal',
    temperatureTrend: [-24.9, -24.8, -24.7, -24.6, -24.6],
    excursionMinutes: 0,
    qualityGrade: 'EU Traceability Standard'
  },
  {
    batchId: 'BATCH-MP-112',
    commodity: 'Aseptic Totapuri Mango Pulp (Food Processing Stock)',
    chamberId: 'CH-04',
    quantityMT: 310,
    estimatedValueINR: 31000000, // ₹3.10 Cr
    arrivalDate: '10-Apr-2026',
    expiryDate: '10-Oct-2026',
    shelfLifeDaysTotal: 180,
    remainingDays: 178,
    fefoPriority: 5,
    riskScore: 'nominal',
    temperatureTrend: [0.6, 0.6, 0.7, 0.7, 0.7],
    excursionMinutes: 0,
    qualityGrade: 'Aseptic Processing Grade'
  }
];

export const EXCURSION_ALERTS: TemperatureExcursionAlert[] = [
  {
    id: 'EXC-2026-001',
    chamberId: 'CH-02',
    chamberName: 'Chamber 2: Frozen Storage',
    batchId: 'BATCH-VN-044',
    commodity: 'Frozen Raw Headless Vannamei Shrimp',
    severity: 'critical',
    timestamp: 'Today at 08:42 IST',
    durationMinutes: 68,
    tempRecordedC: -18.2,
    thresholdC: -20.0,
    recommendedAction: 'Execute urgent FEFO outbound dispatch within 18 hours or transfer batch to Chamber 1 to prevent ice crystal recrystallization and spoilage.',
    inventoryValueAtRiskINR: 42500000
  }
];

export const READINESS_MILESTONES: ReadinessMilestone[] = [
  {
    id: 'mile-01',
    title: 'Site Possession & Civil Groundwork Commencement',
    description: 'Execution of lease conveyance and perimeter security grading.',
    asIsCompletionDay: 15,
    redesignedCompletionDay: 5,
    regulatoryPrerequisite: 'APIIC Allotment & Registered Lease Deed',
    operationalImpactOnPerishables: 'Initial foundation timeline determines when insulated cold rooms can be fabricated.',
    riskCategory: 'civil'
  },
  {
    id: 'mile-02',
    title: 'PUF Panel Erection & Refrigeration Compressor Installation',
    description: 'Mounting insulated polyurethane panels and Frick India ammonia screw compressors.',
    asIsCompletionDay: 58,
    redesignedCompletionDay: 18,
    regulatoryPrerequisite: 'Provisional Fire NOC & Factory Blueprint Approval',
    operationalImpactOnPerishables: 'Any delay prevents pressure testing and stalls pre-booking of marine cold storage slots.',
    riskCategory: 'refrigeration'
  },
  {
    id: 'mile-03',
    title: 'HT Power Grid Energization & Feeder Synchronization',
    description: '11kV substation line commissioning and transformer cubicle live charge.',
    asIsCompletionDay: 88,
    redesignedCompletionDay: 26,
    regulatoryPrerequisite: 'APEPDCL Grid Sanction & CEIG Electrical Safety Clearance',
    operationalImpactOnPerishables: 'CRITICAL BOTTLENECK: Without grid power, plant must burn ₹42,000/day in diesel fuel to power trial compressors, or postpone inventory intake.',
    riskCategory: 'power'
  },
  {
    id: 'mile-04',
    title: 'Chamber Pre-cooling & Temperature Pull-Down Stabilization',
    description: 'Pulling chamber temperature down from ambient 35°C to -25°C over 96 continuous hours.',
    asIsCompletionDay: 104,
    redesignedCompletionDay: 32,
    regulatoryPrerequisite: 'Boilers Hydro-Test Clearance & Meter Energization',
    operationalImpactOnPerishables: 'Stabilized internal climate is mandatory before admitting first commercial pallet of marine produce.',
    riskCategory: 'refrigeration'
  },
  {
    id: 'mile-05',
    title: 'Earliest Feasible Commercial Intake & FoSCoS Activation',
    description: 'Formal regulatory licensing and receipt of first scheduled perishable cargo batches.',
    asIsCompletionDay: 124,
    redesignedCompletionDay: 38,
    regulatoryPrerequisite: 'Joint Site Inspection Pass & FoSCoS 14-Digit License QR Code',
    operationalImpactOnPerishables: 'Day 38 allows full capture of early summer marine harvest; Day 124 causes complete cancellation of export forward contracts.',
    riskCategory: 'harvest'
  }
];
