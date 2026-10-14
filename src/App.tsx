/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, NavTabType } from './components/Header';
import { WorkflowEngine } from './components/WorkflowEngine';
import { ProfileMapper } from './components/ProfileMapper';
import { DocumentIntelligence } from './components/DocumentIntelligence';
import { ColdChainIntelligence } from './components/ColdChainIntelligence';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AuditReportModal } from './components/AuditReportModal';
import { 
  Building, 
  MapPin, 
  ThermometerSnowflake, 
  Layers, 
  FileCheck2, 
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Scale
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('workflow');
  const [isAuditReportOpen, setIsAuditReportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Universal 3-Zone Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuditReport={() => setIsAuditReportOpen(true)}
      />

      {/* Case Study Context Kicker Bar */}
      <div className="bg-slate-900 text-slate-100 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              Pilot Infrastructure Case Study:
            </span>
            <span className="text-slate-200">Sri Krishna Cold Chain &amp; Food Logistics Pvt. Ltd.</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">APIIC Agro Park, Visakhapatnam, AP</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-blue-300 tabular-nums">2,500 MT Ammonia R-717 Cold Storage</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-300 shrink-0">
            <span className="font-mono text-emerald-400 font-semibold tabular-nums">
              Modeled Lead Time: 124d → 38d (-69%)
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-blue-300 tabular-nums">
              Physical Visits: 7 → 2 (-71%)
            </span>
          </div>
        </div>
      </div>

      {/* Two-Layer Architecture Indicator Bar */}
      <div className="bg-white border-b border-slate-200 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-500">Active Architecture View:</span>
            {activeTab === 'coldchain' ? (
              <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                <ThermometerSnowflake className="w-3 h-3 text-blue-600" />
                Layer 2: ColdChain Intelligence (Commissioning Readiness, Excursion Alerts &amp; FEFO)
              </span>
            ) : activeTab === 'dashboard' ? (
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Synthesis &amp; Empirical Measurement Dashboard
              </span>
            ) : (
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-600" />
                Layer 1: ProcessLens (Statutory Re-sequencing, Profile Reuse &amp; Document Intelligence)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Scale className="w-3.5 h-3.5 text-slate-400" />
            <span>Grounded in AP Single Desk Act 2015 &amp; FoSCoS SLAs</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'workflow' && <WorkflowEngine />}
        {activeTab === 'profile' && <ProfileMapper />}
        {activeTab === 'documents' && <DocumentIntelligence />}
        {activeTab === 'coldchain' && <ColdChainIntelligence />}
        {activeTab === 'dashboard' && <ImpactDashboard onOpenAuditReport={() => setIsAuditReportOpen(true)} />}
      </main>

      {/* Quiet Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            ProcessLens ColdOps — AI-Powered Government Process Simplification &amp; Cold-Chain Platform · AP Single Desk Clearance Act 2015 &amp; FoSCoS Framework
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FSSAI FoSCoS Gateway</span>
            <span aria-hidden="true">·</span>
            <span>APPCB OCMMS</span>
            <span aria-hidden="true">·</span>
            <span>APSDRFS Fire NOC</span>
            <span aria-hidden="true">·</span>
            <span>APEPDCL HT Power</span>
          </div>
        </div>
      </footer>

      {/* Download Audit Report PDF Modal */}
      <AuditReportModal
        isOpen={isAuditReportOpen}
        onClose={() => setIsAuditReportOpen(false)}
      />
    </div>
  );
}
