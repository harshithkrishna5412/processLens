import React, { useState, useEffect } from 'react';
import { DEMO_PROFILE, FORM_MAPPINGS } from '../data/profileData';
import { DEMO_CITIZEN_PROFILE, CITIZEN_FORM_MAPPINGS } from '../data/citizenProfileData';
import { 
  ApplicantProfile, 
  CitizenProfile,
  FormFieldMapping, 
  CitizenFormFieldMapping,
  FieldReuseStatus 
} from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Building2, 
  ShieldAlert, 
  Edit3, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Thermometer, 
  Zap, 
  Layers, 
  X,
  Check,
  User,
  GraduationCap,
  CreditCard,
  MapPin,
  Lock,
  FileCheck2,
  Phone,
  Mail
} from 'lucide-react';

const STORAGE_KEY_ENTERPRISE = 'processlens_applicant_profile';
const STORAGE_KEY_CITIZEN = 'processlens_citizen_profile';

export const ProfileMapper: React.FC = () => {
  // Mode: Citizen vs Enterprise
  const [profileType, setProfileType] = useState<'citizen' | 'enterprise'>('citizen');

  // Load Citizen Profile
  const [citizenProfile, setCitizenProfile] = useState<CitizenProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CITIZEN);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load citizen profile from storage', e);
    }
    return DEMO_CITIZEN_PROFILE;
  });

  // Load Enterprise Profile
  const [enterpriseProfile, setEnterpriseProfile] = useState<ApplicantProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENTERPRISE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load enterprise profile from storage', e);
    }
    return DEMO_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editCitizenForm, setEditCitizenForm] = useState<CitizenProfile>(citizenProfile);
  const [editEnterpriseForm, setEditEnterpriseForm] = useState<ApplicantProfile>(enterpriseProfile);
  const [saveToast, setSaveToast] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeFieldId, setActiveFieldId] = useState<string>('cfm-01');

  // Dynamic Citizen Mappings
  const dynamicCitizenMappings: CitizenFormFieldMapping[] = CITIZEN_FORM_MAPPINGS.map(m => {
    let sourceVal: string | number = '';
    let projectedVal: string | number = '';

    if (m.sourceProfileKey === 'fullName') {
      sourceVal = citizenProfile.fullName;
      projectedVal = citizenProfile.fullName;
    } else if (m.sourceProfileKey === 'fatherOrSpouseName') {
      sourceVal = citizenProfile.fatherOrSpouseName;
      projectedVal = citizenProfile.fatherOrSpouseName;
    } else if (m.sourceProfileKey === 'communityCategory') {
      sourceVal = citizenProfile.communityCategory;
      projectedVal = `Backward Class (${citizenProfile.communityCategory} - Agnikula Kshatriya)`;
    } else if (m.sourceProfileKey === 'annualFamilyIncomeINR') {
      sourceVal = `₹${citizenProfile.annualFamilyIncomeINR.toLocaleString()} / year`;
      projectedVal = `₹${citizenProfile.annualFamilyIncomeINR.toLocaleString()} (Current FY Declaration)`;
    } else if (m.sourceProfileKey === 'rationCardNo') {
      sourceVal = citizenProfile.rationCardNo;
      projectedVal = citizenProfile.rationCardNo;
    } else if (m.sourceProfileKey === 'studentRollNo') {
      sourceVal = citizenProfile.studentRollNo;
      projectedVal = `${citizenProfile.institutionName.split(' ')[0]}-${citizenProfile.studentRollNo}`;
    } else if (m.sourceProfileKey === 'dateOfBirth') {
      sourceVal = citizenProfile.dateOfBirth;
      const [y, mth, d] = citizenProfile.dateOfBirth.split('-');
      projectedVal = `${d}/${mth}/${y} (Age: 22 yrs)`;
    } else if (m.sourceProfileKey === 'residence.pincode') {
      sourceVal = citizenProfile.residence.pincode;
      projectedVal = `RTO AP-39 (Visakhapatnam Jurisdiction for ${citizenProfile.residence.pincode})`;
    } else if (m.sourceProfileKey === 'pan') {
      sourceVal = citizenProfile.pan;
      projectedVal = `${citizenProfile.pan} (Verified CBDT Match)`;
    } else {
      sourceVal = m.sourceValue;
      projectedVal = m.projectedValue;
    }

    return {
      ...m,
      sourceValue: sourceVal,
      projectedValue: projectedVal
    };
  });

  // Dynamic Enterprise Mappings
  const dynamicEnterpriseMappings: FormFieldMapping[] = FORM_MAPPINGS.map(m => {
    let sourceVal: string | number = '';
    let projectedVal: string | number = '';

    if (m.sourceProfileKey === 'companyName') {
      sourceVal = enterpriseProfile.companyName;
      projectedVal = enterpriseProfile.companyName;
    } else if (m.sourceProfileKey === 'tradeName') {
      sourceVal = enterpriseProfile.tradeName;
      projectedVal = enterpriseProfile.tradeName;
    } else if (m.sourceProfileKey === 'cin') {
      sourceVal = enterpriseProfile.cin;
      projectedVal = enterpriseProfile.cin;
    } else if (m.sourceProfileKey === 'coldStorageSpecs.totalCapacityMT') {
      sourceVal = `${enterpriseProfile.coldStorageSpecs.totalCapacityMT} MT`;
      const blastFreezing = Math.round(enterpriseProfile.coldStorageSpecs.totalCapacityMT * 0.006);
      projectedVal = `${enterpriseProfile.coldStorageSpecs.totalCapacityMT} MT (Storage) / ${blastFreezing} MT/day (Blast)`;
    } else if (m.sourceProfileKey === 'facilityLocation.builtUpAreaSqFt') {
      sourceVal = `${enterpriseProfile.facilityLocation.builtUpAreaSqFt.toLocaleString()} Sq. Ft`;
      projectedVal = `${(enterpriseProfile.facilityLocation.builtUpAreaSqFt * 0.092903).toFixed(1)} Sq. Metres`;
    } else if (m.sourceProfileKey === 'utilityRequirements.connectedPowerLoadKVA') {
      sourceVal = `${enterpriseProfile.utilityRequirements.connectedPowerLoadKVA} kVA`;
      const hp = (enterpriseProfile.utilityRequirements.connectedPowerLoadKVA * 0.8 / 0.746).toFixed(1);
      projectedVal = `${hp} HP (kVA to Mechanical HP)`;
    } else if (m.sourceProfileKey === 'facilityLocation.plotNo') {
      sourceVal = `${enterpriseProfile.facilityLocation.plotNo}, ${enterpriseProfile.facilityLocation.industrialArea}`;
      projectedVal = `SRO Registered Reference Required for ${enterpriseProfile.facilityLocation.plotNo}`;
    } else if (m.sourceProfileKey === 'authorizedSignatory.fullName') {
      sourceVal = enterpriseProfile.authorizedSignatory.fullName;
      projectedVal = 'REJECTED: Dedicated FoSTaC Supervisor Required';
    } else {
      sourceVal = m.sourceValue;
      projectedVal = m.projectedValue;
    }

    return {
      ...m,
      sourceValue: sourceVal,
      projectedValue: projectedVal
    };
  });

  const activeMappings = profileType === 'citizen' ? dynamicCitizenMappings : dynamicEnterpriseMappings;

  // Filter mappings
  const filteredMappings = activeMappings.filter(m => {
    const matchesForm = selectedForm === 'ALL' || m.targetFormName === selectedForm;
    const matchesStatus = statusFilter === 'ALL' || m.reuseStatus === statusFilter;
    return matchesForm && matchesStatus;
  });

  const activeField = activeMappings.find(m => m.id === activeFieldId) || activeMappings[0];

  // Forms available
  const availableForms = Array.from(new Set(activeMappings.map(m => m.targetFormName)));

  // Reuse statistics
  const totalFields = activeMappings.length;
  const approvedCount = activeMappings.filter(m => m.reuseStatus === 'APPROVED_REUSE').length;
  const convertedCount = activeMappings.filter(m => m.reuseStatus === 'FORMAT_CONVERTED').length;
  const verificationCount = activeMappings.filter(m => m.reuseStatus === 'INDEPENDENT_VERIFICATION_REQUIRED').length;
  const restrictedCount = activeMappings.filter(m => m.reuseStatus === 'LEGAL_RESTRICTION').length;

  const autoFulfillablePct = Math.round(((approvedCount + convertedCount) / totalFields) * 100);

  // Save changes
  const handleSaveProfile = () => {
    if (profileType === 'citizen') {
      setCitizenProfile(editCitizenForm);
      localStorage.setItem(STORAGE_KEY_CITIZEN, JSON.stringify(editCitizenForm));
    } else {
      setEnterpriseProfile(editEnterpriseForm);
      localStorage.setItem(STORAGE_KEY_ENTERPRISE, JSON.stringify(editEnterpriseForm));
    }
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleResetToDemo = () => {
    if (profileType === 'citizen') {
      setCitizenProfile(DEMO_CITIZEN_PROFILE);
      setEditCitizenForm(DEMO_CITIZEN_PROFILE);
      localStorage.removeItem(STORAGE_KEY_CITIZEN);
    } else {
      setEnterpriseProfile(DEMO_PROFILE);
      setEditEnterpriseForm(DEMO_PROFILE);
      localStorage.removeItem(STORAGE_KEY_ENTERPRISE);
    }
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportJSON = () => {
    const dataToExport = profileType === 'citizen' ? citizenProfile : enterpriseProfile;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = profileType === 'citizen' ? 'citizen_profile_civiclens.json' : 'enterprise_profile_processlens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (profileType === 'citizen') {
          setCitizenProfile(parsed);
          setEditCitizenForm(parsed);
          localStorage.setItem(STORAGE_KEY_CITIZEN, JSON.stringify(parsed));
        } else {
          setEnterpriseProfile(parsed);
          setEditEnterpriseForm(parsed);
          localStorage.setItem(STORAGE_KEY_ENTERPRISE, JSON.stringify(parsed));
        }
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 2500);
      } catch (err) {
        alert('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
  };

  const getStatusBadge = (status: FieldReuseStatus) => {
    switch (status) {
      case 'APPROVED_REUSE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Approved Reuse (100% Match)
          </span>
        );
      case 'FORMAT_CONVERTED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <ArrowRight className="w-3 h-3 text-blue-600" />
            Format Converted
          </span>
        );
      case 'INDEPENDENT_VERIFICATION_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Independent Verification Needed
          </span>
        );
      case 'LEGAL_RESTRICTION':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Statutory Reuse Forbidden
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          Profile data synchronized and stored locally!
        </div>
      )}

      {/* Profile Domain Switcher (Citizen vs Enterprise) */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profile Vault:</span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
            <button
              onClick={() => { setProfileType('citizen'); setActiveFieldId('cfm-01'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                profileType === 'citizen'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Citizen &amp; Student Profile</span>
            </button>
            <button
              onClick={() => { setProfileType('enterprise'); setActiveFieldId(FORM_MAPPINGS[0].id); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                profileType === 'enterprise'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Enterprise &amp; Cold Chain Profile</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile Fields'}</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1"
            title="Download profile as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium flex items-center gap-1 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
          <button
            onClick={handleResetToDemo}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded"
            title="Reset to synthetic demonstration default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Header & Summary */}
      {profileType === 'citizen' ? (
        <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold mb-1">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Universal Citizen &amp; Student Identity Profile
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {citizenProfile.fullName}
              </h2>
              <p className="text-xs text-slate-300">
                Father: {citizenProfile.fatherOrSpouseName} · DOB: {citizenProfile.dateOfBirth} · Category: <span className="font-semibold text-emerald-300">{citizenProfile.communityCategory}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-right">
                <div className="text-[10px] text-slate-400 font-mono">DigiLocker Aadhaar Token</div>
                <div className="font-mono text-xs font-bold text-blue-300 flex items-center justify-end gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  {citizenProfile.aadhaarToken}
                </div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-right">
                <div className="text-[10px] text-slate-400 font-mono">Form Auto-Fill Rate</div>
                <div className="font-mono text-sm font-bold text-emerald-400">
                  {autoFulfillablePct}% Reusable
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px]">Academic Institution:</span>
              <span className="font-semibold text-slate-200 truncate block">{citizenProfile.institutionName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Roll &amp; Course:</span>
              <span className="font-semibold text-slate-200">{citizenProfile.studentRollNo} ({citizenProfile.educationLevel.split(' ')[0]})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Annual Household Income:</span>
              <span className="font-semibold text-emerald-300">₹{citizenProfile.annualFamilyIncomeINR.toLocaleString()} / year</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Bank DBT Seeding:</span>
              <span className="font-semibold text-blue-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Active (SBI {citizenProfile.bankDetails.ifscCode})
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold mb-1">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                Enterprise Master Regulatory Profile (Agro Logistics)
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {enterpriseProfile.companyName}
              </h2>
              <p className="text-xs text-slate-300">
                Trade: {enterpriseProfile.tradeName} · CIN: <span className="font-mono text-slate-200">{enterpriseProfile.cin}</span> · GSTIN: <span className="font-mono text-slate-200">{enterpriseProfile.gstin}</span>
              </p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-right shrink-0">
              <div className="text-[10px] text-slate-400 font-mono">Statutory Field Reuse</div>
              <div className="font-mono text-sm font-bold text-emerald-400">
                {autoFulfillablePct}% Auto-Fulfillable
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px]">Facility Location:</span>
              <span className="font-semibold text-slate-200">{enterpriseProfile.facilityLocation.plotNo}, {enterpriseProfile.facilityLocation.industrialArea}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Cold Chamber Capacity:</span>
              <span className="font-semibold text-slate-200">{enterpriseProfile.coldStorageSpecs.totalCapacityMT} MT ({enterpriseProfile.coldStorageSpecs.refrigerantType})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Contract Power Load:</span>
              <span className="font-semibold text-amber-300">{enterpriseProfile.utilityRequirements.connectedPowerLoadKVA} kVA (Demand)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Authorized Signatory:</span>
              <span className="font-semibold text-slate-200">{enterpriseProfile.authorizedSignatory.fullName}</span>
            </div>
          </div>
        </div>
      )}

      {/* In-Place Profile Editor Drawer */}
      {isEditing && (
        <div className="bg-white rounded-xl border border-blue-300 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Edit3 className="w-4 h-4 text-blue-600" />
              Edit {profileType === 'citizen' ? 'Citizen & Student Information' : 'Enterprise Details'}
            </h3>
            <span className="text-xs text-slate-500">Changes will reflect across all mapped government application forms</span>
          </div>

          {profileType === 'citizen' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={editCitizenForm.fullName}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, fullName: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Father’s / Lineage Name</label>
                <input
                  type="text"
                  value={editCitizenForm.fatherOrSpouseName}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, fatherOrSpouseName: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={editCitizenForm.dateOfBirth}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, dateOfBirth: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Annual Family Income (INR)</label>
                <input
                  type="number"
                  value={editCitizenForm.annualFamilyIncomeINR}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, annualFamilyIncomeINR: Number(e.target.value) })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Social Community Category</label>
                <select
                  value={editCitizenForm.communityCategory}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, communityCategory: e.target.value as any })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                >
                  <option value="BC-A">BC-A (Agnikula Kshatriya / Vadabalija)</option>
                  <option value="BC-B">BC-B</option>
                  <option value="BC-D">BC-D</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="EWS">EWS (Economically Weaker Section)</option>
                  <option value="OC / General">OC / General</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Ration / Rice Card Number</label>
                <input
                  type="text"
                  value={editCitizenForm.rationCardNo}
                  onChange={(e) => setEditCitizenForm({ ...editCitizenForm, rationCardNo: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={editEnterpriseForm.companyName}
                  onChange={(e) => setEditEnterpriseForm({ ...editEnterpriseForm, companyName: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cold Storage Capacity (MT)</label>
                <input
                  type="number"
                  value={editEnterpriseForm.coldStorageSpecs.totalCapacityMT}
                  onChange={(e) => setEditEnterpriseForm({
                    ...editEnterpriseForm,
                    coldStorageSpecs: { ...editEnterpriseForm.coldStorageSpecs, totalCapacityMT: Number(e.target.value) }
                  })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Connected Load (kVA)</label>
                <input
                  type="number"
                  value={editEnterpriseForm.utilityRequirements.connectedPowerLoadKVA}
                  onChange={(e) => setEditEnterpriseForm({
                    ...editEnterpriseForm,
                    utilityRequirements: { ...editEnterpriseForm.utilityRequirements, connectedPowerLoadKVA: Number(e.target.value) }
                  })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Re-calculate Mappings</span>
            </button>
          </div>
        </div>
      )}

      {/* Field Reusability Overview Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setStatusFilter(statusFilter === 'APPROVED_REUSE' ? 'ALL' : 'APPROVED_REUSE')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'APPROVED_REUSE' ? 'bg-emerald-100 border-emerald-500 ring-1 ring-emerald-500' : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span>Direct Reusable</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-950">{approvedCount}</div>
          <div className="text-[10px] text-emerald-800 font-medium">100% legal reuse across forms</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'FORMAT_CONVERTED' ? 'ALL' : 'FORMAT_CONVERTED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'FORMAT_CONVERTED' ? 'bg-blue-100 border-blue-500 ring-1 ring-blue-500' : 'bg-blue-50/70 border-blue-200 hover:bg-blue-100/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
            <span>Format Converted</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold font-mono text-blue-950">{convertedCount}</div>
          <div className="text-[10px] text-blue-800 font-medium">Auto-transformed format/units</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'INDEPENDENT_VERIFICATION_REQUIRED' ? 'ALL' : 'INDEPENDENT_VERIFICATION_REQUIRED')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'INDEPENDENT_VERIFICATION_REQUIRED' ? 'bg-amber-100 border-amber-500 ring-1 ring-amber-500' : 'bg-amber-50/70 border-amber-200 hover:bg-amber-100/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
            <span>Fresh Verification</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-950">{verificationCount}</div>
          <div className="text-[10px] text-amber-800 font-medium">Requires annual proof / test</div>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'LEGAL_RESTRICTION' ? 'ALL' : 'LEGAL_RESTRICTION')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            statusFilter === 'LEGAL_RESTRICTION' ? 'bg-rose-100 border-rose-500 ring-1 ring-rose-500' : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1">
            <span>Legally Restricted</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl font-bold font-mono text-rose-950">{restrictedCount}</div>
          <div className="text-[10px] text-rose-800 font-medium">Biometric / raw hash protected</div>
        </div>
      </div>

      {/* Filter and Mapping Explorer */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">Target Application Form:</span>
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
              className="border border-slate-300 rounded px-2.5 py-1 text-slate-800 bg-white focus:outline-none"
            >
              <option value="ALL">All Mapped Forms ({availableForms.length})</option>
              {availableForms.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {statusFilter !== 'ALL' && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">Filtered by: <strong>{statusFilter}</strong></span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className="text-blue-600 hover:underline text-xs"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Master-Detail Split Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Mapped Fields List (7 Cols) */}
          <div className="lg:col-span-7 max-h-[580px] overflow-y-auto divide-y divide-slate-100">
            {filteredMappings.map((mapping: any) => {
              const isSelected = activeField.id === mapping.id;
              return (
                <div
                  key={mapping.id}
                  onClick={() => setActiveFieldId(mapping.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {mapping.targetDepartment}
                    </span>
                    {getStatusBadge(mapping.reuseStatus)}
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                    {mapping.targetFieldName}
                  </h4>
                  <div className="text-[11px] text-slate-500 mb-2">
                    Form: <span className="font-medium text-slate-700">{mapping.targetFormName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 rounded p-2 border border-slate-200/60 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Master Value:</span>
                      <span className="text-slate-800 truncate block">{String(mapping.sourceValue)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Form Autofill Value:</span>
                      <span className="text-blue-900 font-semibold truncate block">{String(mapping.projectedValue)}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMappings.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No fields match the selected filter criteria.
              </div>
            )}
          </div>

          {/* Legal Rationale & Audit Inspector (5 Cols) */}
          <div className="lg:col-span-5 p-5 bg-slate-50/50 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              Statutory Reuse &amp; Audit Inspector
            </div>

            <div className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Inspected Form Field</span>
              <h5 className="font-bold text-slate-900 text-sm">{activeField.targetFieldName}</h5>
              <div className="text-slate-500 text-[11px] font-medium">{activeField.targetFormName}</div>
              <div className="pt-1">{getStatusBadge(activeField.reuseStatus)}</div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Statutory Act &amp; Rule Citation</span>
              <div className="font-semibold text-slate-800 leading-tight">
                {activeField.statutoryRuleCitation}
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Regulatory Audit Justification</span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {activeField.auditExplanation}
              </p>
            </div>

            {activeField.riskIfReusedWithoutCheck && (
              <div className="border border-rose-200 rounded-lg p-3.5 bg-rose-50 space-y-1.5 text-xs text-rose-950">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">Compliance Hazard If Blindly Reused</span>
                <p className="text-rose-900 text-[11px] leading-relaxed">
                  {activeField.riskIfReusedWithoutCheck}
                </p>
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-950">
              <div className="font-bold mb-1">Single-Source-of-Truth Principle</div>
              <p className="text-[11px] text-blue-900 leading-relaxed">
                By entering demographic data once into your profile, standard fields are automatically populated across every department form, while legally restricted inputs (e.g. raw biometric vectors) are strictly blocked from unauthorized cross-form persistence.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
