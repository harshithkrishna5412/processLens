import React, { useState } from 'react';
import { 
  COLD_CHAMBERS, 
  INVENTORY_BATCHES, 
  EXCURSION_ALERTS, 
  READINESS_MILESTONES 
} from '../data/inventoryData';
import { 
  ThermometerSnowflake, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Sliders, 
  Package, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const ColdChainIntelligence: React.FC = () => {
  const [approvalDelayDays, setApprovalDelayDays] = useState<number>(0);
  const [selectedChamberId, setSelectedChamberId] = useState<string>('ALL');

  // Downstream ripple calculations
  const baselineRedesignedDays = 38;
  const simulatedOperatingDay = baselineRedesignedDays + approvalDelayDays;
  const dgSetFuelCostPerDay = 42000; // Diesel fuel to run 280 kVA compressor rack without grid power
  const totalDgFuelCost = approvalDelayDays * dgSetFuelCostPerDay;
  const perishableStrandedMT = Math.min(2500, Math.round(approvalDelayDays * 22.5)); // 22.5 MT/day harvest intake

  const filteredBatches = INVENTORY_BATCHES.filter(b => 
    selectedChamberId === 'ALL' || b.chamberId === selectedChamberId
  ).sort((a, b) => a.fefoPriority - b.fefoPriority);

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the Two-Layer Integration */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Layer 2: ColdChain & Operational Intelligence
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Connected to ProcessLens Regulatory Core</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mt-1">
              Operational Readiness Cascade & Perishable Inventory Intelligence
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Demonstrating the direct physical chain of consequence: How regulatory clearances govern electricity availability, commissioning date, and perishable inventory expiry.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Earliest Feasible Go-Live</div>
              <div className="text-sm font-bold font-mono text-emerald-700 tabular-nums">
                Day {simulatedOperatingDay}
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Live Excursion Alerts</div>
              <div className="text-sm font-bold font-mono text-rose-700 tabular-nums">
                {EXCURSION_ALERTS.length} Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Approval-Dependency & Operational Cascade Simulator */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-700" />
              Regulatory Approval Delay & Commissioning Cascade Simulator
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate an inter-departmental delay in APEPDCL HT Power Energization or APPCB CTE to observe downstream supply-chain disruptions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-slate-700">
              Regulatory Delay: <strong className="text-blue-700">+{approvalDelayDays} Days</strong>
            </span>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={approvalDelayDays}
              onChange={e => setApprovalDelayDays(Number(e.target.value))}
              className="w-36 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
            />
          </div>
        </div>

        {/* Cascade Ripple Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                Earliest Operating Date
              </span>
              <span className="font-mono text-[11px] text-slate-400">Baseline: Day 38</span>
            </div>
            <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
              Day {simulatedOperatingDay} <span className="text-xs font-normal text-slate-500">of project lifecycle</span>
            </div>
            <div className="text-[11px] text-slate-600">
              {approvalDelayDays === 0
                ? 'Optimal Green Channel: Full capture of summer Vannamei shrimp & mango harvest.'
                : `Pushes commercial warehouse go-live back by ${approvalDelayDays} days, compressing operational shelf-life.`}
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Generator Idling Fuel Cost
              </span>
              <span className="font-mono text-[11px] text-slate-400">₹42k/Day DG Run</span>
            </div>
            <div className="text-xl font-bold font-mono text-amber-700 tabular-nums">
              ₹{(totalDgFuelCost / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-[11px] text-slate-600">
              If APEPDCL grid energization is delayed, trial ammonia compressors must burn diesel to maintain chamber sub-zero integrity.
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-rose-600" />
                Stranded Perishable Intake
              </span>
              <span className="font-mono text-[11px] text-slate-400">Contract Risk</span>
            </div>
            <div className="text-xl font-bold font-mono text-rose-700 tabular-nums">
              {perishableStrandedMT} MT Cargo
            </div>
            <div className="text-[11px] text-slate-600">
              Estimated volume of scheduled coastal aquaculture batches unable to be received due to pending FoSCoS licensing.
            </div>
          </div>
        </div>

        {/* Milestone Progression Sequence */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-900 mb-2">
            Operational Readiness Milestones: As-Is (124d) vs Redesigned (38d + {approvalDelayDays}d)
          </div>
          <div className="space-y-2">
            {READINESS_MILESTONES.map(milestone => {
              const currentRedesignedTarget = milestone.redesignedCompletionDay + Math.round(approvalDelayDays * 0.8);
              return (
                <div key={milestone.id} className="p-3 border border-slate-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <span>{milestone.title}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        Requires: {milestone.regulatoryPrerequisite}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {milestone.operationalImpactOnPerishables}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <div className="text-slate-400 line-through">As-Is: Day {milestone.asIsCompletionDay}</div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    <div className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Go-Live: Day {currentRedesignedTarget}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Part 2: Active Chamber Telemetry & Temperature Excursion Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 4 Cold Chamber Enclosures */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Live Refrigeration Chamber Telemetry (2,500 MT Capacity)
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Ammonia R-717 Central Plant
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COLD_CHAMBERS.map(chamber => {
                const isSelected = selectedChamberId === chamber.chamberId;
                const isExcursion = chamber.status === 'critical_excursion';

                return (
                  <div
                    key={chamber.chamberId}
                    onClick={() => setSelectedChamberId(isSelected ? 'ALL' : chamber.chamberId)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 ring-1 ring-blue-600/10'
                        : isExcursion
                        ? 'border-rose-300 bg-rose-50/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          {chamber.name.split(':')[0]}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {chamber.name.split(':')[1]}
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                        isExcursion
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isExcursion ? 'Excursion Alert' : 'Optimal'}
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className={`text-2xl font-bold font-mono tabular-nums ${
                          isExcursion ? 'text-rose-700' : 'text-slate-900'
                        }`}>
                          {chamber.currentTempC > 0 ? `+${chamber.currentTempC}` : chamber.currentTempC}°C
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono ml-1.5">
                          (Target {chamber.targetTempC}°C)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {chamber.occupiedMT}/{chamber.capacityMT} MT
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isExcursion ? 'bg-rose-500' : 'bg-blue-600'}`}
                        style={{ width: `${(chamber.occupiedMT / chamber.capacityMT) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Excursion Alert Callout */}
          {EXCURSION_ALERTS.map(alert => (
            <div key={alert.id} className="p-4 bg-rose-50 border border-rose-200 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between text-rose-950 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-600" />
                  Temperature Excursion Detected: {alert.chamberName}
                </span>
                <span className="font-mono text-[10px] bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded">
                  {alert.timestamp} ({alert.durationMinutes} mins breached)
                </span>
              </div>
              <p className="text-[11px] text-rose-900 leading-relaxed">
                Chamber recorded <span className="font-mono font-bold text-rose-950">{alert.tempRecordedC}°C</span>, breaching the sub-zero threshold of <span className="font-mono font-bold">{alert.thresholdC}°C</span>. Total inventory value at risk: <span className="font-mono font-bold">₹{(alert.inventoryValueAtRiskINR / 10000000).toFixed(2)} Crores</span> ({alert.commodity}).
              </p>
              <div className="pt-1 text-[11px] text-slate-800">
                <span className="font-semibold text-rose-950">Recommended Operational Action:</span> {alert.recommendedAction}
              </div>
            </div>
          ))}
        </div>

        {/* Right: FEFO (First-Expired, First-Out) Dispatch Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-semibold text-slate-900">
                  FEFO Allocation & Expiry Intelligence
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Priority: Days to Expiry
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Automated First-Expired, First-Out queue ensures batches approaching critical shelf-life are designated for priority export container loading.
            </p>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredBatches.map(batch => (
                <div
                  key={batch.batchId}
                  className={`p-3 border rounded-lg text-xs space-y-1.5 transition-all ${
                    batch.riskScore === 'at_risk'
                      ? 'border-rose-300 bg-rose-50/20'
                      : batch.riskScore === 'approaching_expiry'
                      ? 'border-amber-300 bg-amber-50/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">
                        {batch.commodity}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {batch.batchId} · {batch.chamberId} · {batch.qualityGrade}
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      batch.fefoPriority === 1
                        ? 'bg-rose-100 text-rose-800'
                        : batch.fefoPriority === 2
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      FEFO #{batch.fefoPriority}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                    <div>
                      <div className="text-[10px] text-slate-400">Batch Qty</div>
                      <div className="font-bold text-slate-900 tabular-nums">{batch.quantityMT} MT</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Days to Expiry</div>
                      <div className={`font-bold tabular-nums ${
                        batch.remainingDays < 15 ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        {batch.remainingDays} Days
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Inventory Value</div>
                      <div className="font-bold text-slate-900 tabular-nums">
                        ₹{(batch.estimatedValueINR / 10000000).toFixed(2)} Cr
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
