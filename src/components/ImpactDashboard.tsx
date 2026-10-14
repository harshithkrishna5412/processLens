import React, { useState, useEffect } from 'react';
import { METRIC_COMPARISONS, AS_IS_STEPS } from '../data/regulatoryData';
import { MetricComparison, ProcessStep } from '../types';
import { 
  BarChart3, 
  TrendingDown, 
  Clock, 
  MapPin, 
  Copy, 
  FileCheck, 
  Briefcase, 
  Scale, 
  Coins, 
  Truck, 
  ThermometerSnowflake,
  ShieldCheck,
  CheckCircle2,
  Printer
} from 'lucide-react';

interface ImpactDashboardProps {
  onOpenAuditReport?: () => void;
}

const WORKFLOW_STORAGE_KEY = 'processlens_workflow_steps_v2';

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ onOpenAuditReport }) => {
  const [selectedMetricId, setSelectedMetricId] = useState<string>(METRIC_COMPARISONS[0].metricId);
  const [facilityScale, setFacilityScale] = useState<'standard' | 'mega' | 'micro'>('standard');
  
  // Read dynamically modified steps from localStorage
  const [currentSteps, setCurrentSteps] = useState<ProcessStep[]>(() => {
    try {
      const saved = localStorage.getItem(WORKFLOW_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load steps for dashboard', e);
    }
    return AS_IS_STEPS;
  });

  // Re-read storage on focus or mount
  useEffect(() => {
    const handleStorageUpdate = () => {
      try {
        const saved = localStorage.getItem(WORKFLOW_STORAGE_KEY);
        if (saved) setCurrentSteps(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  // Scale multipliers for scenarios
  const scaleMultiplier = facilityScale === 'mega' ? 1.8 : facilityScale === 'micro' ? 0.6 : 1.0;

  // Dynamic calculations from user modifications
  const dynamicTotalAsIsDays = currentSteps.reduce((acc, s) => acc + s.statutoryTimeDays, 0);
  const dynamicTotalAsIsVisits = currentSteps.filter(s => s.isPhysical).length;

  const dynamicMetrics: MetricComparison[] = METRIC_COMPARISONS.map(m => {
    if (m.metricId === 'm-days') {
      const redesigned = 38;
      const pct = Math.round(((redesigned - dynamicTotalAsIsDays) / dynamicTotalAsIsDays) * 1000) / 10;
      return {
        ...m,
        asIsValue: dynamicTotalAsIsDays,
        redesignedValue: redesigned,
        percentageChange: pct
      };
    }
    if (m.metricId === 'm-visits') {
      const redesigned = 2;
      const pct = Math.round(((redesigned - dynamicTotalAsIsVisits) / dynamicTotalAsIsVisits) * 1000) / 10;
      return {
        ...m,
        asIsValue: dynamicTotalAsIsVisits,
        redesignedValue: redesigned,
        percentageChange: pct
      };
    }
    return m;
  });

  const activeMetric = dynamicMetrics.find(m => m.metricId === selectedMetricId) || dynamicMetrics[0];

  // Supply chain financial computations
  const capitalInvestment = facilityScale === 'mega' ? 350000000 : facilityScale === 'micro' ? 45000000 : 145000000;
  const daysSaved = Math.max(0, Math.round((dynamicTotalAsIsDays - 38) * (facilityScale === 'mega' ? 1.2 : facilityScale === 'micro' ? 0.8 : 1.0)));
  const dailyCostOfCapital = (capitalInvestment * 0.085) / 365; // 8.5% debt interest
  const totalInterestSaved = Math.round(dailyCostOfCapital * daysSaved);

  return (
    <div className="space-y-6">
      {/* Top Banner with Scenario Selector */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Empirical Evaluation Engine
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Live Computational Scenario</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mt-1">
              Measurable Regulatory Improvement &amp; Evidence Dashboard
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical quantitative comparison of As-Is vs. Redesigned AP Food Processing workflow, grounded in statutory SLAs and administrative evidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Scenario Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md shrink-0">
              <button
                onClick={() => setFacilityScale('micro')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  facilityScale === 'micro'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Micro (&lt;500 MT)
              </button>
              <button
                onClick={() => setFacilityScale('standard')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  facilityScale === 'standard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard (2,500 MT)
              </button>
              <button
                onClick={() => setFacilityScale('mega')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  facilityScale === 'mega'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mega Hub (10,000 MT)
              </button>
            </div>

            {onOpenAuditReport && (
              <button
                onClick={onOpenAuditReport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors whitespace-nowrap shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Audit Report</span>
              </button>
            )}
          </div>
        </div>

        {/* Validation & Empirical Baselines Disclosure */}
        <div className="mt-3 p-3 bg-blue-50/50 border border-blue-200 rounded text-[11px] text-slate-700 flex items-start gap-2.5">
          <Scale className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-blue-900">Empirical Baseline &amp; Modeling Disclosure:</span>
            <p className="text-slate-600 leading-relaxed">
              Baselines are derived from field audits of 6 application schemas across FoSCoS, OCMMS, and AP Single Desk. Turnaround reduction ({dynamicTotalAsIsDays}d → 38d) represents a <em>computational statutory benchmark</em> assuming complete document filings under Section 12 deemed approval rules. Real-world results are subject to localized departmental inspections and query remediations.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Primary Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dynamicMetrics.map(metric => {
          const isSelected = selectedMetricId === metric.metricId;
          const adjustedAsIs = Math.round(metric.asIsValue * (metric.metricId === 'm-cost' ? scaleMultiplier : 1));
          const adjustedRedesigned = Math.round(metric.redesignedValue * (metric.metricId === 'm-cost' ? scaleMultiplier : 1));

          return (
            <div
              key={metric.metricId}
              onClick={() => setSelectedMetricId(metric.metricId)}
              className={`p-4 bg-white border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-600 ring-1 ring-blue-600/10 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
                <span className="truncate">{metric.name}</span>
                <span className="font-mono text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  {metric.percentageChange}%
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {adjustedRedesigned}
                </span>
                <span className="text-xs text-slate-500">{metric.unit}</span>
                <span className="text-xs text-slate-400 line-through font-mono ml-auto tabular-nums">
                  {adjustedAsIs}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 mt-2 truncate">
                Click to inspect legal assumptions
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Metric Evidence Inspector */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">
              Metric Evidence &amp; Statutory Methodology
            </div>
            <h3 className="text-base font-semibold text-slate-900 mt-1">
              {activeMetric.name} ({activeMetric.asIsValue} {activeMetric.unit} As-Is → {activeMetric.redesignedValue} {activeMetric.unit} Redesigned)
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
            Net Delta: {activeMetric.percentageChange}% Reduction
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Assumption Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              Empirical Assumptions
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeMetric.assumptionRationale}
            </p>
          </div>

          {/* Governing Statute Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              Statutory Basis
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeMetric.governingStatute}
            </p>
          </div>

          {/* Field Evidence Source Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              Audit Evidence Source
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeMetric.evidenceSource}
            </p>
          </div>
        </div>
      </div>

      {/* Supply Chain & Perishable Inventory Logistics Impact Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Truck className="w-4 h-4 text-blue-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            Supply Chain Logistics &amp; Perishable Food Inventory Value Unlocked
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Capital Carrying Cost Savings */}
          <div className="p-4 border border-blue-200 bg-blue-50/40 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-blue-700" />
                Capital Lock-In Interest Saved
              </span>
              <span className="text-[10px] font-mono text-blue-700">8.5% p.a. Cost of Debt</span>
            </div>
            <div className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
              ₹{(totalInterestSaved / 100000).toFixed(2)} Lakhs
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              By saving <span className="font-semibold font-mono text-slate-800">{daysSaved} calendar days</span> of idle plant delay on a ₹{(capitalInvestment / 10000000).toFixed(1)} Cr facility, promoter debt servicing costs during pre-commissioning are directly preserved.
            </p>
          </div>

          {/* Seasonal Harvest Perishability Capture */}
          <div className="p-4 border border-emerald-200 bg-emerald-50/40 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-emerald-700" />
                Harvest Window Capture
              </span>
              <span className="text-[10px] font-mono text-emerald-700">Andhra Agro Calendar</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-950 tabular-nums">
              100% Window Captured
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {dynamicTotalAsIsDays}-day sequential approvals cause units to completely miss the 45-day summer mango pulp and peak marine Vannamei shrimp seasons. 38-day turnaround guarantees operational activation prior to harvest onset.
            </p>
          </div>

          {/* Cold Chain Quality Invariant */}
          <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                Cold Integrity Assurance
              </span>
              <span className="text-[10px] font-mono text-slate-600">IS:661 &amp; FSMS Validated</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              Zero Unmonitored Storage
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Third-party concurrent testing replaces arbitrary paper inspections with calibrated IoT temperature logging, reducing cold room hot spots and food spoilage claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
