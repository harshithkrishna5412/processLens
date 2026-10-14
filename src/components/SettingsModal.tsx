import React from 'react';
import { X, ShieldCheck, Scale, Cpu, Sparkles, Building2, CheckCircle2, FileText, Globe } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Platform Architecture &amp; Regulatory Grounding
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Operating Engine Info */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <div className="text-[10px] uppercase font-mono text-slate-400">Execution Framework</div>
          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-blue-900">Google Gemini 3.8 Flash (Server-Side Proxy Architecture)</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Regulatory re-sequencing and document discrepancy detection are securely executed via server-side endpoints (<code className="bg-slate-200/70 px-1 py-0.5 rounded font-mono text-[10px]">/api/gemini-resequence</code> &amp; <code className="bg-slate-200/70 px-1 py-0.5 rounded font-mono text-[10px]">/api/gemini-doc-audit</code>). Zero client keys required.
          </p>
        </div>

        {/* Grounding & Statutory Acts */}
        <div className="space-y-2 pt-1">
          <div className="text-[10px] uppercase font-mono text-slate-400">Codified Statutory Authorities</div>
          <div className="space-y-1.5">
            <div className="p-2 border border-slate-200 rounded bg-white flex items-start gap-2">
              <Scale className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">AP Single Desk Clearance Act, 2015</div>
                <div className="text-[11px] text-slate-500">
                  Section 12 (Statutory Deemed Approval SLAs) &amp; Section 15 (Mandatory Single Multi-Agency Joint Inspection).
                </div>
              </div>
            </div>

            <div className="p-2 border border-slate-200 rounded bg-white flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">FSSAI FoSCoS Framework &amp; Central Order 2020</div>
                <div className="text-[11px] text-slate-500">
                  Risk-based food safety classification shifting pre-licensing physical checks to post-commissioning verification.
                </div>
              </div>
            </div>

            <div className="p-2 border border-slate-200 rounded bg-white flex items-start gap-2">
              <Building2 className="w-3.5 h-3.5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">AP Fire Service Act 1999 &amp; Electricity Act 2003</div>
                <div className="text-[11px] text-slate-500">
                  Section 13 (Built-up area fire verification) &amp; Section 126 (Contract demand compliance for 280 kVA compressors).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Readiness */}
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-950 text-[11px] leading-relaxed flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Public Free Hosting &amp; Production Ready:</span> The application runs as an Express + Vite full-stack service, complete with deterministic statutory fallbacks ensuring 100% functionality in both connected and air-gapped demo environments.
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
