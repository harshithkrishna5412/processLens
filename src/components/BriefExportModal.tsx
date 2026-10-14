import React, { useState } from 'react';
import { X, Printer, Check, Copy, FileText, Download, FileCode } from 'lucide-react';
import { DEMO_PROFILE } from '../data/profileData';
import { METRIC_COMPARISONS } from '../data/regulatoryData';

interface BriefExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BriefExportModal: React.FC<BriefExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = document.getElementById('brief-content')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const text = document.getElementById('brief-content')?.innerText || '';
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProcessLens-Executive-Brief-${DEMO_PROFILE.cin || 'AP'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = {
      title: 'Executive Policy Brief: Regulatory Redesign for AP Food Processing & Cold Chain',
      date: '2026-10-14',
      jurisdiction: 'Government of Andhra Pradesh - Single Desk Framework',
      entity: DEMO_PROFILE,
      metrics: METRIC_COMPARISONS
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProcessLens-Executive-Brief-${DEMO_PROFILE.cin || 'AP'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Executive Policy Brief: Regulatory Redesign for AP Food Processing &amp; Cold Chain
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Printable Content */}
        <div id="brief-content" className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="border-b border-slate-200 pb-3">
            <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              Government of Andhra Pradesh · Industries &amp; Commerce Department
            </div>
            <div className="text-base font-bold text-slate-900 mt-1">
              Statutory Process Optimization Memo: Food Processing &amp; Cold Chain Logistics
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Subject: Collapsing 14-Step Regulatory Silo into 4-Phase Concurrent Fast-Track under AP Single Desk Act 2015
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 text-xs mb-1">1. Problem Statement &amp; Baseline Burden</h4>
            <p>
              Establishing a food processing and cold storage facility in Andhra Pradesh currently mandates sequential clearance across 6 disparate portals (FSSAI FoSCoS, AP Single Desk, APPCB OCMMS, APSDRFS, Directorate of Factories, and APEPDCL). In-depth audit reveals <strong>124 business days</strong> turnaround time, <strong>7 mandatory in-person physical inspections</strong>, <strong>84 duplicate data inputs</strong>, and <strong>26 individual document uploads</strong>, causing substantial capital lock-in (~₹29 Lakhs per facility) and missing seasonal harvest windows for seafood and horticulture.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 text-xs mb-1">2. Core Statutory Reforms Implemented</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li>
                <strong>Single Joint Inspection Protocol:</strong> Enforces Section 15 of AP Single Desk Act 2015, merging separate site visits by APPCB, Fire Services, and FSSAI into exactly ONE 2-hour synchronized multi-agency inspection.
              </li>
              <li>
                <strong>Single-Source Business Profile:</strong> Collects enterprise KYC, plot cadastral coordinates, and cold chain capacity once, preventing re-keying across 4 distinct government forms while enforcing strict legal guardrails against unverified reuse of water and ammonia safety logs.
              </li>
              <li>
                <strong>Pre-Commissioning FoSCoS Decoupling:</strong> Leverages FSSAI Risk-Based Inspection Scheme to grant provisional operating credentials on digital FSMS verification, shifting physical food audits to post-commissioning review.
              </li>
              <li>
                <strong>AI Pre-Submission Document Intelligence:</strong> Automatically extracts and cross-validates structural blueprints, lease deeds, fire NOCs, and electrical load sanctions to catch discrepancies (such as the 18,500 sq.ft plinth vs 16,200 sq.ft Fire NOC conflict) prior to formal departmental filing.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 text-xs mb-1">3. Quantitative Outcomes Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-500 text-[10px]">Turnaround Days</div>
                <div className="font-bold text-slate-900">124 → 38 (-69%)</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-500 text-[10px]">Physical Visits</div>
                <div className="font-bold text-slate-900">7 → 2 (-71%)</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-500 text-[10px]">Data Redundancy</div>
                <div className="font-bold text-slate-900">84 → 18 (-79%)</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-slate-500 text-[10px]">Document Submissions</div>
                <div className="font-bold text-slate-900">26 → 6 (-77%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500">
            Certified for Government of Andhra Pradesh Industrial Policy 2023-27
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
