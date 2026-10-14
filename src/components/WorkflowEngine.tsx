import React, { useState, useEffect } from 'react';
import { 
  AS_IS_STEPS, 
  REDESIGNED_PHASES, 
  REGULATORY_CONSTRAINTS 
} from '../data/regulatoryData';
import { ProcessStep, LegalBasisType } from '../types';
import { resequenceWorkflow, ResequenceResult } from '../services/apiService';
import { 
  Building2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  ChevronRight, 
  Sliders, 
  RefreshCw,
  X,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Save,
  Check
} from 'lucide-react';

const WORKFLOW_STORAGE_KEY = 'processlens_workflow_steps_v2';

export const WorkflowEngine: React.FC = () => {
  // Modifiable workflow steps
  const [steps, setSteps] = useState<ProcessStep[]>(() => {
    try {
      const saved = localStorage.getItem(WORKFLOW_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load steps from storage', e);
    }
    return AS_IS_STEPS;
  });

  const [viewMode, setViewMode] = useState<'comparison' | 'as_is' | 'redesigned'>('comparison');
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(steps[0] || null);
  const [constraints, setConstraints] = useState(REGULATORY_CONSTRAINTS);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiOutput, setAiOutput] = useState<ResequenceResult | null>(null);

  // Step editing modal state
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [isCreatingStep, setIsCreatingStep] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Save steps to localStorage
  const saveSteps = (newSteps: ProcessStep[]) => {
    setSteps(newSteps);
    localStorage.setItem(WORKFLOW_STORAGE_KEY, JSON.stringify(newSteps));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleResetWorkflow = () => {
    if (window.confirm('Reset all process steps to the verified government baseline?')) {
      setSteps(AS_IS_STEPS);
      setSelectedStep(AS_IS_STEPS[0]);
      localStorage.removeItem(WORKFLOW_STORAGE_KEY);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  const handleDeleteStep = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Remove this step from the workflow model?')) {
      const updated = steps.filter(s => s.id !== id).map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
      saveSteps(updated);
      if (selectedStep?.id === id) {
        setSelectedStep(updated[0] || null);
      }
    }
  };

  const handleSaveStepModal = () => {
    if (!editingStep) return;

    if (isCreatingStep) {
      const newStep: ProcessStep = {
        ...editingStep,
        id: `custom-step-${Date.now()}`,
        stepNumber: steps.length + 1
      };
      const updated = [...steps, newStep];
      saveSteps(updated);
      setSelectedStep(newStep);
    } else {
      const updated = steps.map(s => s.id === editingStep.id ? editingStep : s);
      saveSteps(updated);
      setSelectedStep(editingStep);
    }

    setEditingStep(null);
    setIsCreatingStep(false);
  };

  const toggleConstraint = (id: string) => {
    setConstraints(prev =>
      prev.map(c => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleRunAiResequencer = async () => {
    setIsLoadingAi(true);
    try {
      const result = await resequenceWorkflow(
        customPrompt,
        constraints,
        steps
      );
      setAiOutput(result);
    } catch (err) {
      console.error('Failed to trigger AI re-sequencer', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Dynamic calculations for As-Is based on user edits
  const totalAsIsDays = steps.reduce((acc, s) => acc + s.statutoryTimeDays, 0);
  const totalAsIsVisits = steps.filter(s => s.isPhysical).length;

  return (
    <div className="space-y-6">
      {/* Viewport Control Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Interactive Workflow Modeler
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">Editable Steps &amp; Policy Constraints</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mt-1">
            Regulatory Workflow Explorer: Baseline vs. Redesigned AP Food Logistics Model
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify stages, inspect governing acts, and test re-sequencing concurrency under Andhra Pradesh Single Desk Act 2015.
          </p>
        </div>

        {/* View Mode & Step Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md shrink-0">
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'comparison'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('as_is')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'as_is'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current ({steps.length} Steps)
            </button>
            <button
              onClick={() => setViewMode('redesigned')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'redesigned'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Redesigned (4 Phases)
            </button>
          </div>

          <button
            onClick={() => {
              setIsCreatingStep(true);
              setEditingStep({
                id: '',
                stepNumber: steps.length + 1,
                title: 'New Commercial Clearance Step',
                department: 'Department of Industries',
                portalOrCounter: 'Online Single Window Counter',
                isPhysical: false,
                statutoryTimeDays: 7,
                dependencies: [],
                requiredInputs: ['General Application Form'],
                documentsRequired: ['Identity Proof'],
                legalJustification: 'Statutory prerequisite under state regulations.',
                actSection: 'State Regulatory Code 2026',
                legalBasisType: 'EXISTING_STATUTORY_LAW',
                legalBasisNote: 'Verified statutory requirement.',
                category: 'statutory'
              });
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>

          <button
            onClick={handleResetWorkflow}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            title="Reset to default government baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {saveToast && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Workflow updated. Real-time baseline recalculation: <strong>{totalAsIsDays} Days</strong> across <strong>{totalAsIsVisits} Physical Visits</strong>.</span>
        </div>
      )}

      {/* Legal & Policy Notice */}
      <div className="p-3 bg-amber-50/70 border border-amber-300 rounded-lg text-[11px] text-amber-950 flex items-start gap-2.5">
        <Scale className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-amber-900">Legal Classification Notice:</span>
          <p className="text-amber-800 leading-relaxed">
            Steps labeled <span className="font-mono font-bold bg-blue-100 text-blue-900 px-1 py-0.2 rounded">EXISTING STATUTORY LAW</span> represent codified Acts of Parliament or State Assembly (e.g. <em>AP Single Desk Act 2015</em>, <em>Water Act 1974</em>) and cannot be modified without legislation. Steps marked <span className="font-mono font-bold bg-purple-100 text-purple-900 px-1 py-0.2 rounded">PROPOSED POLICY REFORM</span> are illustrative optimization recommendations requiring executive circulars.
          </p>
        </div>
      </div>

      {/* AI & Policy Re-sequencer Engine Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Statutory Re-sequencing &amp; Legal Concurrency Engine
            </h3>
          </div>
          <button
            onClick={handleRunAiResequencer}
            disabled={isLoadingAi}
            className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 rounded transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAi ? 'animate-spin' : ''}`} />
            <span>{isLoadingAi ? 'Synthesizing Legal Path...' : 'Run Re-sequencer Engine'}</span>
          </button>
        </div>

        {/* Reform Policy Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {constraints.map(constraint => (
            <div
              key={constraint.id}
              onClick={() => toggleConstraint(constraint.id)}
              className={`p-3 border rounded-md cursor-pointer transition-all ${
                constraint.enabled
                  ? 'border-blue-300 bg-blue-50/50 text-slate-900'
                  : 'border-slate-200 bg-slate-50/40 text-slate-500'
              }`}
            >
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={constraint.enabled}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="text-xs font-medium leading-tight">{constraint.label}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-normal">
                    {constraint.description}
                  </div>
                  <div className="text-[9px] font-mono text-blue-700 mt-1">
                    {constraint.statutoryBasis}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Custom Instructions Input */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-1">
          <input
            type="text"
            value={customPrompt}
            onChange={e => setCustomPrompt(e.target.value)}
            placeholder="Add regulatory policy conditions (e.g. 'Allow deemed approval for Orange Category after 14 days without queries')..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-blue-500 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Live / Deterministic AI Output Card */}
        {aiOutput && (
          <div className="mt-4 p-4 border border-blue-200 bg-blue-50/30 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <span>Reform Evaluation</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  aiOutput.engineUsed === 'gemini-live'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {aiOutput.engineUsed === 'gemini-live' ? 'Live Gemini 3.8 Flash' : 'Deterministic Statutory Engine'}
                </span>
              </span>
              <button
                onClick={() => setAiOutput(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {aiOutput.executiveSummary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-blue-100">
              {aiOutput.keyLegalInnovations?.map((item: string, idx: number) => (
                <div key={idx} className="p-2.5 bg-white border border-blue-100 rounded text-[11px] text-slate-700">
                  <span className="font-semibold text-blue-800 mr-1.5">0{idx + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Workflow View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Workflow Cards */}
        <div className={`${selectedStep ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
          {/* As-Is View */}
          {(viewMode === 'comparison' || viewMode === 'as_is') && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Current Process: Fragmented Sequential Pipeline ({steps.length} Stages)
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {steps.length} Linear Stages · {totalAsIsVisits} Physical Visits · {totalAsIsDays} Total Days
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                    Total: {totalAsIsDays} Days
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {steps.map((step) => {
                  const isSelected = selectedStep?.id === step.id;
                  return (
                    <div
                      key={step.id}
                      onClick={() => setSelectedStep(step)}
                      className={`p-3.5 border rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium flex items-center justify-center shrink-0">
                            {step.stepNumber}
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                              <span>{step.title}</span>
                              {step.legalBasisType && (
                                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                                  step.legalBasisType === 'EXISTING_STATUTORY_LAW'
                                    ? 'bg-blue-100 text-blue-900'
                                    : step.legalBasisType === 'EXISTING_EXECUTIVE_RULE'
                                    ? 'bg-emerald-100 text-emerald-900'
                                    : 'bg-purple-100 text-purple-900'
                                }`}>
                                  {step.legalBasisType === 'EXISTING_STATUTORY_LAW' ? 'Statutory' : step.legalBasisType === 'EXISTING_EXECUTIVE_RULE' ? 'Executive' : 'Proposed'}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="text-slate-700">{step.department}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums text-slate-600">{step.statutoryTimeDays} days</span>
                              {step.isPhysical && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-rose-600 font-medium">Physical Visit Required</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCreatingStep(false);
                              setEditingStep(step);
                            }}
                            className="p-1 text-slate-400 hover:text-blue-700 hover:bg-slate-100 rounded"
                            title="Edit this step"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteStep(step.id, e)}
                            className="p-1 text-slate-400 hover:text-rose-700 hover:bg-slate-100 rounded"
                            title="Remove step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Redesigned To-Be View */}
          {(viewMode === 'comparison' || viewMode === 'redesigned') && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Redesigned To-Be: 4-Phase Synchronized Green Channel
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    4 Parallelized Tracks · 1 Master Dossier · 2 Physical Visits · 38 Business Days
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Modeled: 38 Days
                </span>
              </div>

              <div className="space-y-4">
                {REDESIGNED_PHASES.map((phase) => (
                  <div key={phase.phaseNumber} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                      <div className="text-xs font-semibold text-slate-900">
                        {phase.phaseTitle}
                      </div>
                      <span className="text-[11px] font-mono font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Phase Window: {phase.durationDays} Days
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Reform Principles */}
                      <div className="space-y-1">
                        {phase.reformPrinciples.map((principle, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{principle}</span>
                          </div>
                        ))}
                      </div>

                      {/* Concurrent Steps Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                        {phase.parallelSteps.map((pStep) => {
                          const isSelected = selectedStep?.id === pStep.id;
                          return (
                            <div
                              key={pStep.id}
                              onClick={() => setSelectedStep(pStep)}
                              className={`p-3 border rounded-md cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="text-xs font-semibold text-slate-900">
                                {pStep.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1">
                                {pStep.department}
                              </div>
                              <div className="mt-2 flex items-center justify-between text-[11px]">
                                <span className="font-mono text-slate-700">{pStep.statutoryTimeDays} days</span>
                                <span className="text-blue-700 font-medium">
                                  {pStep.reformStrategy === 'parallelize'
                                    ? 'Parallel Track'
                                    : pStep.reformStrategy === 'unified_inspection'
                                    ? 'Joint Multi-Agency'
                                    : pStep.reformStrategy === 'self_certify'
                                    ? 'Risk-Based FoSCoS'
                                    : 'Deemed Approval'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Selected Step Deep Inspector Drawer */}
        {selectedStep && (
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 sticky top-20 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                  Step {selectedStep.stepNumber} Specification
                </span>
                <h4 className="text-sm font-semibold text-slate-900 mt-0.5">
                  {selectedStep.title}
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-mono font-medium bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                  {selectedStep.statutoryTimeDays} Days
                </span>
                <button
                  onClick={() => {
                    setIsCreatingStep(false);
                    setEditingStep(selectedStep);
                  }}
                  className="p-1 text-slate-400 hover:text-blue-700 hover:bg-slate-100 rounded"
                  title="Edit this step"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Department & Channel */}
            <div className="space-y-1.5 text-xs">
              <div className="text-slate-500 font-medium">Responsible Authority:</div>
              <div className="text-slate-900 font-medium bg-slate-50 p-2 rounded border border-slate-100">
                {selectedStep.department}
              </div>
              <div className="text-[11px] text-slate-600">
                Channel: <span className="font-medium text-slate-800">{selectedStep.portalOrCounter}</span>
              </div>
            </div>

            {/* Physical Interaction Assessment */}
            <div className="space-y-1.5 text-xs">
              <div className="text-slate-500 font-medium">Physical Interaction Requirement:</div>
              <div className={`p-2.5 rounded border text-xs ${
                selectedStep.isPhysical
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {selectedStep.isPhysical ? 'Mandatory In-Person Presence' : '100% Digital Execution'}
                </div>
                {selectedStep.physicalDetail && (
                  <p className="mt-1 text-[11px] text-slate-700 leading-normal">
                    {selectedStep.physicalDetail}
                  </p>
                )}
              </div>
            </div>

            {/* Statutory Law & Act Section */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Legal Justification &amp; Act Citation:</span>
                {selectedStep.legalBasisType && (
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                    selectedStep.legalBasisType === 'EXISTING_STATUTORY_LAW'
                      ? 'bg-blue-100 text-blue-900'
                      : selectedStep.legalBasisType === 'EXISTING_EXECUTIVE_RULE'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-purple-100 text-purple-900'
                  }`}>
                    {selectedStep.legalBasisType.replace(/_/g, ' ')}
                  </span>
                )}
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  {selectedStep.actSection}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedStep.legalJustification}
                </p>
                {selectedStep.legalBasisNote && (
                  <div className="pt-1.5 border-t border-slate-200 text-[10px] text-slate-500 font-mono">
                    Statutory Context: {selectedStep.legalBasisNote}
                  </div>
                )}
              </div>
            </div>

            {/* Required Data Inputs */}
            <div className="space-y-1.5 text-xs">
              <div className="text-slate-500 font-medium">Required Information &amp; Schemas:</div>
              <ul className="space-y-1 text-[11px] text-slate-700">
                {selectedStep.requiredInputs.map((input, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">·</span>
                    <span>{input}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reform Rationale if available */}
            {selectedStep.reformRationale && (
              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded text-xs space-y-1">
                <div className="font-semibold text-blue-900">Optimization Rationale:</div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {selectedStep.reformRationale}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit / Add Step Modal */}
      {editingStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl my-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                {isCreatingStep ? 'Add Process Step' : `Edit Step ${editingStep.stepNumber}: ${editingStep.title}`}
              </h3>
              <button onClick={() => setEditingStep(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Step Title</label>
                <input
                  type="text"
                  value={editingStep.title}
                  onChange={e => setEditingStep({ ...editingStep, title: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Responsible Authority</label>
                  <input
                    type="text"
                    value={editingStep.department}
                    onChange={e => setEditingStep({ ...editingStep, department: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Statutory Days</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={editingStep.statutoryTimeDays}
                    onChange={e => setEditingStep({ ...editingStep, statutoryTimeDays: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Legal Basis Classification</label>
                <select
                  value={editingStep.legalBasisType}
                  onChange={e => setEditingStep({ ...editingStep, legalBasisType: e.target.value as LegalBasisType })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-slate-900"
                >
                  <option value="EXISTING_STATUTORY_LAW">EXISTING STATUTORY LAW (Codified Act)</option>
                  <option value="EXISTING_EXECUTIVE_RULE">EXISTING EXECUTIVE RULE (Departmental Order)</option>
                  <option value="PROPOSED_POLICY_REFORM">PROPOSED POLICY REFORM (Policy Recommendation)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Governing Act &amp; Section</label>
                <input
                  type="text"
                  value={editingStep.actSection}
                  onChange={e => setEditingStep({ ...editingStep, actSection: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded bg-slate-50 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="physical-toggle"
                  checked={editingStep.isPhysical}
                  onChange={e => setEditingStep({ ...editingStep, isPhysical: e.target.checked })}
                  className="rounded text-blue-600"
                />
                <label htmlFor="physical-toggle" className="text-slate-700 font-medium">
                  Requires In-Person Mandatory Physical Visit
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditingStep(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStepModal}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Step Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
