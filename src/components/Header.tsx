import React, { useState } from 'react';
import { GitCompare, UserCheck, FileSearch, BarChart3, ThermometerSnowflake, FileCheck, SlidersHorizontal, Settings } from 'lucide-react';
import { SettingsModal } from './SettingsModal';

export type NavTabType = 'workflow' | 'profile' | 'documents' | 'coldchain' | 'dashboard';

interface HeaderProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  onOpenAuditReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAuditReport }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-16">
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
                PL
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight text-slate-900 whitespace-nowrap">
                    ProcessLens ColdOps
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded">
                    AP Pilot
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  Regulatory Simplification &amp; Cold-Chain Operations
                </span>
              </div>
            </div>

            {/* Zone 2: Navigation tabs with single-line labels */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Global">
              <button
                onClick={() => setActiveTab('workflow')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'workflow'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Workflow Explorer</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Reusable Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'documents'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileSearch className="w-3.5 h-3.5" />
                <span>AI Document Assistant</span>
              </button>

              <button
                onClick={() => setActiveTab('coldchain')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'coldchain'
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <ThermometerSnowflake className="w-3.5 h-3.5 text-blue-500" />
                <span>Operational Readiness &amp; ColdOps</span>
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Impact Dashboard</span>
              </button>
            </nav>

            {/* Zone 3: Actions (Settings & Download Report) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors flex items-center gap-1 text-xs"
                title="System Architecture & Legal Grounding"
              >
                <Settings className="w-4 h-4 text-slate-600" />
                <span className="hidden xl:inline text-slate-600 font-medium">Architecture</span>
              </button>

              <button
                onClick={onOpenAuditReport}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Download Audit Report</span>
              </button>
            </div>
          </div>

          {/* Medium and Mobile Navigation bar */}
          <div className="flex lg:hidden items-center border-t border-slate-100 py-2 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                activeTab === 'workflow' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Workflow
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                activeTab === 'documents' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('coldchain')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                activeTab === 'coldchain' ? 'bg-blue-800 text-white' : 'text-blue-700 bg-blue-50'
              }`}
            >
              ColdOps
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Impact
            </button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
