import React, { useState, useMemo } from 'react';
import { 
  USER_PERSONAS, 
  CITIZEN_SERVICES 
} from '../data/citizenServicesData';
import { 
  CitizenService, 
  TargetAudience 
} from '../types';
import { queryCitizenAssistant, CitizenAssistantResult } from '../services/apiService';
import { 
  Search, 
  User, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Layers, 
  ArrowRight, 
  Volume2, 
  SlidersHorizontal, 
  Scale, 
  Info, 
  HelpCircle,
  Building,
  ChevronRight,
  Eye,
  Send,
  RotateCcw
} from 'lucide-react';

interface CitizenNavigatorProps {
  onNavigateToColdChain: () => void;
  onNavigateToProfile: () => void;
  onNavigateToDocuments: () => void;
}

export const CitizenNavigator: React.FC<CitizenNavigatorProps> = ({
  onNavigateToColdChain,
  onNavigateToProfile,
  onNavigateToDocuments
}) => {
  // Search & Filters
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<CitizenService>(CITIZEN_SERVICES[0]);
  const [activeDetailTab, setActiveDetailTab] = useState<'steps' | 'documents' | 'traps' | 'reform'>('steps');

  // Accessibility & Language Mode
  const [isEasyExplain, setIsEasyExplain] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'te' | 'hi'>('en');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Document checklist tick-off state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // AI Citizen Assistant State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<CitizenAssistantResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filtered services
  const filteredServices = useMemo(() => {
    return CITIZEN_SERVICES.filter(service => {
      const matchesAudience = selectedAudience === 'all' || service.targetGroup === selectedAudience;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesAudience;

      const matchesSearch = 
        service.title.toLowerCase().includes(q) ||
        service.department.toLowerCase().includes(q) ||
        service.plainDescription.toLowerCase().includes(q) ||
        service.targetGroupLabel.toLowerCase().includes(q) ||
        service.serviceCategory.toLowerCase().includes(q);

      return matchesAudience && matchesSearch;
    });
  }, [selectedAudience, searchQuery]);

  const toggleDocCheck = (docName: string) => {
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRunAiAssistant = async (customPrompt?: string) => {
    const q = customPrompt || userQuery;
    if (!q.trim()) return;

    setAiLoading(true);
    setIsAiModalOpen(true);
    try {
      const activePersonaLabel = USER_PERSONAS.find(p => p.id === selectedAudience)?.label || 'Everyday Citizen';
      const langLabel = selectedLang === 'te' ? 'Telugu & English' : selectedLang === 'hi' ? 'Hindi & English' : 'English (Plain Language)';
      const res = await queryCitizenAssistant(q, activePersonaLabel, selectedService.title, langLabel);
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSimulateReadAloud = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      alert('Text-to-speech is not supported on this browser.');
    }
  };

  // Helper icons for personas
  const getPersonaIcon = (id: TargetAudience) => {
    switch (id) {
      case 'citizens': return <User className="w-4 h-4" />;
      case 'students': return <GraduationCap className="w-4 h-4" />;
      case 'families': return <Users className="w-4 h-4" />;
      case 'seniors': return <HeartHandshake className="w-4 h-4" />;
      case 'entrepreneurs': return <Briefcase className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className={`space-y-6 ${isHighContrast ? 'contrast-125' : ''} ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
      
      {/* Platform Hero & Mission Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Public Service Navigation &amp; Administrative Simplification
            </span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              Citizen Charters · DigiLocker Integration · Zero Illegal Middlemen
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Government Services, Explained in Plain Language.
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-3xl">
            Navigate certificates, student scholarships, family civil records, senior welfare pensions, and small business registrations without preventable office trips, repetitive paperwork, or costly broker fees.
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleRunAiAssistant("How do I get my caste and income certificate without visiting the MRO office multiple times?")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              Ask AI Service Navigator
            </button>

            <button
              onClick={onNavigateToProfile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs sm:text-sm font-medium rounded-lg transition-colors"
            >
              <User className="w-4 h-4 text-slate-300" />
              Reusable Citizen Profile
            </button>

            <button
              onClick={onNavigateToColdChain}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs sm:text-sm font-medium rounded-lg transition-colors"
            >
              <Building className="w-4 h-4 text-blue-400" />
              Cold Chain Regulatory Case Study
            </button>
          </div>
        </div>
      </section>

      {/* Accessibility & Plain-Language Guidance Toolbar */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 sm:px-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            Accessibility &amp; Reading Aids:
          </span>

          {/* Easy Explain Mode Toggle */}
          <button
            onClick={() => setIsEasyExplain(!isEasyExplain)}
            className={`px-3 py-1 rounded-full font-medium transition-colors flex items-center gap-1.5 ${
              isEasyExplain 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Translates dense legal terminology into simple everyday sentences suitable for 5th-grade reading"
          >
            <span>{isEasyExplain ? '✓ Easy Explain ON' : 'Easy Explain (Senior / Simple)'}</span>
          </button>

          {/* Language Toggle */}
          <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
            <button
              onClick={() => setSelectedLang('en')}
              className={`px-2 py-1 text-[11px] font-semibold ${selectedLang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLang('te')}
              className={`px-2 py-1 text-[11px] font-semibold ${selectedLang === 'te' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              తెలుగు (Telugu)
            </button>
            <button
              onClick={() => setSelectedLang('hi')}
              className={`px-2 py-1 text-[11px] font-semibold ${selectedLang === 'hi' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Text Size Toggle */}
          <div className="flex items-center border border-slate-200 rounded-md overflow-hidden text-[11px]">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 font-medium ${fontSize === 'normal' ? 'bg-slate-200 font-bold' : 'bg-white text-slate-600'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 font-bold text-sm ${fontSize === 'large' ? 'bg-slate-200 text-slate-900' : 'bg-white text-slate-600'}`}
            >
              A+
            </button>
          </div>

          {/* High Contrast */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border ${
              isHighContrast ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {isHighContrast ? 'High Contrast ON' : 'High Contrast'}
          </button>
        </div>
      </div>

      {/* Target Audience Selector (Personas) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-600" />
            Select Your Circumstance / Audience Group
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {filteredServices.length} public services available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {/* All */}
          <button
            onClick={() => setSelectedAudience('all')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              selectedAudience === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold">All Services</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className={`text-[11px] ${selectedAudience === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
              Full citizen catalog
            </span>
          </button>

          {USER_PERSONAS.map(persona => {
            const isSelected = selectedAudience === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setSelectedAudience(persona.id)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold leading-tight line-clamp-1">{persona.label}</span>
                  {getPersonaIcon(persona.id)}
                </div>
                <span className={`text-[11px] line-clamp-1 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                  {persona.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Fast Filters */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service, e.g. 'caste', 'income', 'scholarship', 'pension', 'driving', 'birth', 'food'..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-500 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="font-medium text-slate-400 whitespace-nowrap">Suggestions:</span>
          {['Caste', 'Scholarship', 'Income', 'Pension', 'FSSAI', 'Driving'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px] font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Layout: Services List & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Service Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Select a service to view step-by-step guidance</span>
            <span>{filteredServices.length} found</span>
          </div>

          <div className="space-y-2.5 max-h-[820px] overflow-y-auto pr-1">
            {filteredServices.map(service => {
              const isSelected = selectedService.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/60 border-blue-500 ring-1 ring-blue-500 shadow-xs'
                      : 'bg-white hover:bg-slate-50/90 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                      {service.targetGroupLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      SLA: {service.statutorySlaDays} Days
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {isEasyExplain ? service.easyExplainSummary : service.plainDescription}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Visits: {service.asIsPhysicalVisits} → {service.streamlinedPhysicalVisits}
                      </span>
                      <span className="text-slate-500 font-mono">
                        Fee: {service.officialFee}
                      </span>
                    </div>

                    <span className="text-blue-600 font-medium flex items-center gap-0.5 text-[11px]">
                      View Steps <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredServices.length === 0 && (
              <div className="bg-white rounded-lg p-8 text-center border border-slate-200 space-y-3">
                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-sm font-semibold text-slate-800">No matching services found</div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Try adjusting your search terms or clearing the audience filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedAudience('all'); }}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: In-Depth Service Navigator & Comparison Inspector (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {selectedService.department}
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[11px]">
                Statutory SLA: {selectedService.statutorySlaDays} Days
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {selectedService.title}
              </h2>

              <button
                onClick={() => handleSimulateReadAloud(isEasyExplain ? selectedService.easyExplainSummary : selectedService.plainDescription)}
                className={`p-2 rounded-lg transition-colors shrink-0 ${
                  isSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title="Read summary aloud (Accessibility Voice)"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Language Summary Display */}
            <div className="bg-slate-800/80 rounded-lg p-3 text-xs leading-relaxed border border-slate-700">
              {selectedLang === 'te' ? (
                <p className="text-blue-100 font-sans">
                  <span className="font-semibold text-amber-300">తెలుగు వివరణ: </span>
                  {selectedService.teluguSummary}
                </p>
              ) : selectedLang === 'hi' ? (
                <p className="text-blue-100 font-sans">
                  <span className="font-semibold text-amber-300">हिन्दी विवरण: </span>
                  {selectedService.hindiSummary}
                </p>
              ) : (
                <p className="text-slate-200">
                  <span className="font-semibold text-emerald-300">
                    {isEasyExplain ? 'Simple Explanation: ' : 'Plain English Summary: '}
                  </span>
                  {isEasyExplain ? selectedService.easyExplainSummary : selectedService.plainDescription}
                </p>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
              <div className="bg-slate-800 p-2 rounded">
                <div className="text-[10px] text-slate-400">Official Portal</div>
                <div className="font-semibold text-white truncate" title={selectedService.portalName}>
                  {selectedService.portalName.split('/')[0]}
                </div>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <div className="text-[10px] text-slate-400">Statutory Fee</div>
                <div className="font-semibold text-emerald-400">{selectedService.officialFee}</div>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <div className="text-[10px] text-slate-400">Office Trips</div>
                <div className="font-semibold text-blue-300 font-mono">
                  {selectedService.asIsPhysicalVisits} → {selectedService.streamlinedPhysicalVisits} (Saved {selectedService.asIsPhysicalVisits - selectedService.streamlinedPhysicalVisits})
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-4 gap-4 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveDetailTab('steps')}
              className={`py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeDetailTab === 'steps'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Process Steps (As-Is vs Streamlined)</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('documents')}
              className={`py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeDetailTab === 'documents'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Document Checklist &amp; DigiLocker</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('traps')}
              className={`py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeDetailTab === 'traps'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Avoidable Rejection Traps ({selectedService.rejectionTraps.length})</span>
            </button>

            <button
              onClick={() => setActiveDetailTab('reform')}
              className={`py-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeDetailTab === 'reform'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Administrative Reform Proposal</span>
            </button>
          </div>

          {/* Tab 1: Steps Comparison (As-Is vs Streamlined) */}
          {activeDetailTab === 'steps' && (
            <div className="p-5 sm:p-6 space-y-6">
              
              {/* Timeline Metrics Callout */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-emerald-950">Procedural Efficiency Gain: </span>
                  <span className="text-emerald-800">
                    Lead time reduced from <strong>{selectedService.asIsTotalDays} days</strong> to <strong>{selectedService.streamlinedTotalDays} days</strong> (-{Math.round(((selectedService.asIsTotalDays - selectedService.streamlinedTotalDays) / selectedService.asIsTotalDays) * 100)}%).
                  </span>
                </div>
                <div className="font-mono text-emerald-900 font-bold bg-emerald-100/70 px-2.5 py-1 rounded shrink-0">
                  Physical Trips: {selectedService.asIsPhysicalVisits} → {selectedService.streamlinedPhysicalVisits}
                </div>
              </div>

              {/* Side-by-Side or Sequential Comparison */}
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span className="text-rose-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rose-600" />
                      Current Friction-Heavy Process (As-Is Journey)
                    </span>
                    <span className="text-slate-500 font-mono">Requires {selectedService.asIsPhysicalVisits} in-person visits</span>
                  </div>

                  <div className="p-3 divide-y divide-slate-100 space-y-2">
                    {selectedService.currentAsIsSteps.map(step => (
                      <div key={step.stepNumber} className="pt-2 first:pt-0 flex items-start gap-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {step.stepNumber}
                        </span>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-900">{step.title}</span>
                            {step.isPhysicalVisit ? (
                              <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-100 text-rose-800 rounded">
                                Physical Visit Required
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400 font-mono">Desk Review</span>
                            )}
                          </div>
                          <p className="text-slate-500 text-[11px]">{step.frictionOrNote}</p>
                          <div className="text-[10px] text-slate-400 font-mono">Location: {step.officeOrCounter} · Est: {step.days} days</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-emerald-300 rounded-lg overflow-hidden bg-emerald-50/20">
                  <div className="bg-emerald-100/70 px-4 py-2 border-b border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Streamlined Citizen Experience (Proposed Digital Reform)
                    </span>
                    <span className="text-emerald-700 font-mono">100% Online &amp; Pre-Verified</span>
                  </div>

                  <div className="p-3 divide-y divide-emerald-100 space-y-2">
                    {selectedService.streamlinedCitizenSteps.map(step => (
                      <div key={step.stepNumber} className="pt-2 first:pt-0 flex items-start gap-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {step.stepNumber}
                        </span>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-900">{step.title}</span>
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                              {step.digitalChannel}
                            </span>
                          </div>
                          <p className="text-emerald-900 text-[11px]">{step.simplificationNote}</p>
                          <div className="text-[10px] text-emerald-700 font-mono">Turnaround: {step.days} day(s)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portal Access Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Official Gateway: <span className="font-semibold text-slate-800">{selectedService.portalUrl}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(selectedService.portalUrl)}
                    className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded text-xs font-medium text-slate-700 flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied Link' : 'Copy URL'}</span>
                  </button>

                  <a
                    href={selectedService.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-xs"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Document Checklist & DigiLocker */}
          {activeDetailTab === 'documents' && (
            <div className="p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">Mandatory Application Dossier</h4>
                  <p className="text-slate-500 text-[11px]">Tick off each item as you prepare them to verify full readiness.</p>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {Object.values(checkedDocs).filter(Boolean).length} of {selectedService.documentsRequired.length} Ready
                </span>
              </div>

              <div className="space-y-3">
                {selectedService.documentsRequired.map((doc, idx) => {
                  const isChecked = !!checkedDocs[doc.name];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleDocCheck(doc.name)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                        isChecked 
                          ? 'bg-emerald-50/50 border-emerald-300' 
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="mt-1 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                            {doc.digiLockerAvailable ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                Available on DigiLocker (No scan needed)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                                Manual Upload / Affidavit
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-600">{doc.purpose}</p>

                          <div className="bg-amber-50 rounded p-2 text-[11px] text-amber-900 border border-amber-200/60 mt-1.5 flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold">Watch Out: </span>
                              {doc.commonMistake}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                <span className="text-slate-500">
                  Tip: Documents retrieved through DigiLocker have equal legal standing to original paper certificates under Rule 9A of the IT Rules 2016.
                </span>
                <button
                  onClick={() => handleRunAiAssistant(`Check my document packet readiness for ${selectedService.title}`)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  Audit My Documents
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Rejection Traps & Red Tape Prevention */}
          {activeDetailTab === 'traps' && (
            <div className="p-5 sm:p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Why Do 35% of Citizen Applications Face Rejection or Delays?</h4>
                  <p className="text-amber-900 text-[11px]">
                    Clerical rejections are almost always due to minor typographical mismatches or unneeded notarization demands by local touts. Follow these pre-emptive checks before hitting submit.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedService.rejectionTraps.map((trap, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-[11px]">
                        !
                      </span>
                      <h5 className="text-xs font-bold text-slate-900">{trap.trapTitle}</h5>
                    </div>

                    <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                      {trap.description}
                    </p>

                    <div className="ml-7 bg-emerald-50 border border-emerald-200 rounded p-2.5 text-xs text-emerald-950">
                      <span className="font-bold text-emerald-900">Preventive Rule: </span>
                      {trap.preventionCheck}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Administrative Reform Proposal */}
          {activeDetailTab === 'reform' && (
            <div className="p-5 sm:p-6 space-y-5">
              <div className="bg-slate-900 text-white rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  Policy &amp; Administrative Re-Engineering Memo
                </div>
                <h4 className="text-sm font-bold text-white">
                  How the Government Department Can Lawfully Eliminate Friction
                </h4>
                <p className="text-xs text-slate-300">
                  Administrative simplification does not require weakening safety or legal standards. It utilizes existing statutory frameworks like the Right to Public Services Act and IT Act to eliminate redundant clerk gatekeeping.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="border border-slate-200 rounded-lg p-3.5 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Governing Statute</div>
                  <div className="font-semibold text-slate-900">{selectedService.administrativeReform.statutoryProvision}</div>
                </div>

                <div className="border border-slate-200 rounded-lg p-3.5 space-y-1 bg-blue-50/30">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Proposed Administrative Reform</div>
                  <p className="text-slate-800 leading-relaxed font-medium">{selectedService.administrativeReform.reformProposal}</p>
                </div>

                <div className="border border-slate-200 rounded-lg p-3.5 space-y-1 bg-emerald-50/50 border-emerald-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Projected Systemic Impact</div>
                  <p className="text-emerald-950 font-bold">{selectedService.administrativeReform.impactMetric}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Cross-Link Card to Advanced Enterprise Case Study */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-xl p-5 sm:p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30">
              Advanced Industrial Case Study
            </span>
            <span className="text-xs text-slate-400 font-mono">FSSAI FoSCoS + AP Single Desk</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Looking for Complex Multi-Departmental Industrial Clearances?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explore our deep-dive analysis on Sri Krishna Cold Chain (2,500 MT facility) featuring 14-step As-Is vs Redesigned statutory sequencing, live Gemini AI reform architect, 6-document synthetic audit, and operational readiness impact.
          </p>
        </div>

        <button
          onClick={onNavigateToColdChain}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
        >
          <span>Launch Industrial Regulatory Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* AI Citizen Service Assistant Modal / Dialog */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">CivicLens AI Service Navigator</h3>
                  <p className="text-[11px] text-slate-400">Plain-language guidance, document verification &amp; broker warnings</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Query Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ask your specific situation or obstacle:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="e.g. 'My father is a farmer and does not have an ITR. How do I get income certificate for college?'"
                    className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleRunAiAssistant(); }}
                  />
                  <button
                    onClick={() => handleRunAiAssistant()}
                    disabled={aiLoading}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0"
                  >
                    {aiLoading ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-medium">Quick Prompts:</span>
                {[
                  "How to get caste certificate without visiting MRO?",
                  "Why is scholarship DBT bouncing even with Aadhaar linked?",
                  "Can I run a home cloud kitchen on ₹100 FSSAI registration?",
                  "How to register birth after 21 days without a lawyer?"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setUserQuery(prompt);
                      handleRunAiAssistant(prompt);
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Loading State */}
              {aiLoading && (
                <div className="p-8 text-center space-y-3">
                  <RotateCcw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <div className="text-xs font-semibold text-slate-700">Analyzing statutory guidelines and procedural shortcuts...</div>
                  <p className="text-[11px] text-slate-400">Cross-referencing DigiLocker rules, MeeSeva SLAs, and Citizen Charter standards.</p>
                </div>
              )}

              {/* Result Area */}
              {aiResult && !aiLoading && (
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px]">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      AI Analysis &amp; Action Plan
                    </span>
                    <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {aiResult.engineUsed === 'gemini-live' ? '⚡ Live Gemini 3.8 Flash' : '📚 Codified Statutory Rules Engine'}
                    </span>
                  </div>

                  <div className="prose prose-sm max-w-none text-xs text-slate-800 space-y-2 whitespace-pre-line leading-relaxed">
                    {aiResult.answer}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Grounded in AP Public Services Guarantee Act &amp; DigiLocker Rule 9A</span>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded text-xs"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
