import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileCheck, ShieldAlert, Scale, Building2, Truck, FileText } from 'lucide-react';
import { AS_IS_STEPS, REDESIGNED_PHASES, METRIC_COMPARISONS } from '../data/regulatoryData';
import { DEMO_PROFILE } from '../data/profileData';
import { DOCUMENT_FINDINGS } from '../data/documentsData';
import { READINESS_MILESTONES, COLD_CHAMBERS } from '../data/inventoryData';

interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const el = document.getElementById('audit-report-document');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    const el = document.getElementById('audit-report-document');
    if (!el) return;
    const text = el.innerText;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProcessLens-Audit-Report-${DEMO_PROFILE.cin || 'AP'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = {
      reportReference: 'AP/EODB/2026/FCS-AUDIT-0991',
      date: '2026-10-14',
      entity: DEMO_PROFILE,
      resequencedPhases: REDESIGNED_PHASES,
      asIsSteps: AS_IS_STEPS,
      findings: DOCUMENT_FINDINGS,
      projectedMetrics: METRIC_COMPARISONS
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProcessLens-Audit-Dossier-${DEMO_PROFILE.cin || 'AP'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 bg-slate-50 rounded-t-xl print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-semibold text-slate-900">
              Regulatory Audit Report &amp; Operational Readiness Document
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              <span>Download (.md)</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              <span>Dossier (.json)</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Structured PDF Document Body */}
        <div 
          id="audit-report-document" 
          className="p-8 sm:p-10 overflow-y-auto space-y-6 text-slate-800 text-xs leading-relaxed font-sans bg-white"
        >
          {/* Document Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                Government of Andhra Pradesh · Single Desk Secretariat
              </div>
              <h1 className="text-lg font-bold text-slate-900 mt-1 uppercase tracking-tight">
                Statutory Regulatory Re-Engineering & Cold Chain Audit Report
              </h1>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Evaluation of Multi-Agency Approvals, Downstream Commissioning, and Perishable Logistics
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-slate-500 shrink-0">
              <div>Ref: <strong className="text-slate-900">AP/EODB/2026/FCS-AUDIT-0991</strong></div>
              <div>Date: <strong className="text-slate-900">14-October-2026</strong></div>
              <div>Classification: <strong className="text-blue-800">Official Advisory</strong></div>
            </div>
          </div>

          {/* Statutory Legal Disclaimer & Methodology Disclosure */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded text-amber-950 text-[11px] leading-relaxed space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-amber-900">
              <Scale className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Statutory Validation & Methodological Disclosure (Modeled Benchmark)
            </div>
            <p>
              <strong>Notice:</strong> The projected reduction from <strong>124 to 38 business days</strong> is a <em>computational simulation model</em> grounded in statutory time limits codified under Section 12 (Deemed Approvals) and Section 15 (Joint Multi-Agency Inspections) of the <em>Andhra Pradesh Single Desk Clearance Act, 2015</em>, alongside FSSAI Executive Order No. 15(31)2020. Modeled turnaround times assume zero deficiencies in applicant filings. 
              <strong>AI systems cannot unilaterally grant statutory licenses or waive mandatory physical inspections without valid legislative authority.</strong>
            </p>
          </div>

          {/* Section 1: Pilot Facility Dossier */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              1. Commercial Food Logistics Case Study Profile
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2 font-mono text-[11px]">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">Entity Legal Name</span>
                <strong className="text-slate-900 text-xs font-sans">{DEMO_PROFILE.companyName}</strong>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">Location</span>
                <strong className="text-slate-900 text-xs font-sans">APIIC Food Park, Visakhapatnam</strong>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">Cold Storage Capacity</span>
                <strong className="text-slate-900 text-xs">2,500 MT (4 Chambers)</strong>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-sans">Refrigerant Substance</span>
                <strong className="text-slate-900 text-xs font-sans">Anhydrous Ammonia (R-717)</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Re-Sequenced Workflow Matrix & Legal Categorization */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              2. Workflow Re-Engineering & Statutory Provision Taxonomy
            </h2>
            <p className="text-[11px] text-slate-600 mt-1 mb-2">
              Distinguishing Existing Codified State Acts from Proposed Administrative Policy Reforms:
            </p>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="p-2">Phase</th>
                    <th className="p-2">Optimized Stream</th>
                    <th className="p-2">Responsible Body</th>
                    <th className="p-2">Legal Basis Type</th>
                    <th className="p-2">Governing Act Section</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REDESIGNED_PHASES.flatMap(phase => 
                    phase.parallelSteps.map(step => (
                      <tr key={step.id} className="hover:bg-slate-50/50">
                        <td className="p-2 font-mono font-medium text-slate-600">Phase {phase.phaseNumber}</td>
                        <td className="p-2 font-medium text-slate-900">{step.title}</td>
                        <td className="p-2 text-slate-600">{step.department.split('(')[0]}</td>
                        <td className="p-2">
                          <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                            step.legalBasisType === 'EXISTING_STATUTORY_LAW'
                              ? 'bg-blue-100 text-blue-900'
                              : step.legalBasisType === 'EXISTING_EXECUTIVE_RULE'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-purple-100 text-purple-900'
                          }`}>
                            {step.legalBasisType.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="p-2 font-mono text-[10px] text-slate-600">{step.actSection}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Document Intelligence Cross-Audit Findings */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              3. Pre-Submission Document Intelligence & Risk Discrepancies
            </h2>
            <div className="space-y-2 mt-2">
              {DOCUMENT_FINDINGS.slice(0, 3).map(finding => (
                <div key={finding.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{finding.title}</span>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                      {finding.severity}
                    </span>
                  </div>
                  <div className="text-slate-600 text-[10px]">
                    <strong>Statutory Violation:</strong> {finding.legalRiskStatement}
                  </div>
                  <div className="text-emerald-800 text-[10px]">
                    <strong>Remediation:</strong> {finding.recommendedResolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Operational Readiness & Downstream Supply Chain Impact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              4. Operational Readiness Cascade & Perishable Logistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-[11px]">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-[10px] text-slate-400 block font-mono">Earliest Commercial Intake</span>
                <strong className="text-emerald-700 font-mono text-sm">Day 38 (vs Day 124 As-Is)</strong>
                <p className="text-[10px] text-slate-600 leading-normal">
                  Saves 86 calendar days of idle plant depreciation and captures summer marine Vannamei shrimp harvest.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-[10px] text-slate-400 block font-mono">Electricity Availability Link</span>
                <strong className="text-blue-700 font-mono text-sm">HT Grid at Day 26</strong>
                <p className="text-[10px] text-slate-600 leading-normal">
                  Eliminates ₹27+ Lakhs in diesel generator fuel required to maintain chamber sub-zero pull-down prior to grid energization.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="text-[10px] text-slate-400 block font-mono">Inventory Spoilage Mitigation</span>
                <strong className="text-slate-900 font-mono text-sm">₹4.25 Cr Protected</strong>
                <p className="text-[10px] text-slate-600 leading-normal">
                  FEFO priority allocation and IoT excursion alerts prevent shelf-life decay of shrimp and dairy stocks.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Quantified Measured Benefits Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              5. Projected Efficiency Gains & Empirical Baselines
            </h2>
            <table className="w-full text-left border border-slate-200 rounded text-[11px] mt-2">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2">Metric</th>
                  <th className="p-2 text-right">As-Is Baseline</th>
                  <th className="p-2 text-right">Redesigned Target</th>
                  <th className="p-2 text-right">Delta (%)</th>
                  <th className="p-2">Validation Methodology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {METRIC_COMPARISONS.map(m => (
                  <tr key={m.metricId}>
                    <td className="p-2 font-sans font-medium text-slate-900">{m.name}</td>
                    <td className="p-2 text-right text-slate-500 tabular-nums">{m.asIsValue} {m.unit}</td>
                    <td className="p-2 text-right text-slate-900 font-bold tabular-nums">{m.redesignedValue} {m.unit}</td>
                    <td className="p-2 text-right text-emerald-700 font-bold tabular-nums">{m.percentageChange}%</td>
                    <td className="p-2 font-sans text-[10px] text-slate-500">{m.validationStatus.replace(/_/g, ' ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 6: Official Sign-Off Block */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-500">
            <div>
              <div className="font-semibold text-slate-800">Dr. K. S. Prabhakar, IAS</div>
              <div>Principal Secretary to Government (Industries & Commerce)</div>
              <div>Government of Andhra Pradesh</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-emerald-700 font-semibold">[DIGITALLY AUDITED & APPROVED]</div>
              <div>AP Single Desk State Facilitation Board</div>
              <div className="font-mono text-[9px] text-slate-400">Cert Hash: SHA256-AP9921-EODB-FCS-2026</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-xl print:hidden">
          <span className="text-[11px] text-slate-500">
            Rendered in compliance with AP Ease of Doing Business (EODB) Framework 2026.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
