import React from 'react';
import { Emblem } from '../Emblem';
import { exportRecordsAsJSON, importRecordsFromJSON } from '../../utils/storage';
import { MANDATORY_DISCLAIMER_BN, MANDATORY_DISCLAIMER_EN } from '../../data/officialRules';
import { Globe, Download, Upload, RotateCcw, ShieldCheck, Info } from 'lucide-react';

interface SettingsViewProps {
  isBangla: boolean;
  setIsBangla: (val: boolean) => void;
  onResetDefaults: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isBangla,
  setIsBangla,
  onResetDefaults
}) => {
  const handleExport = () => {
    const jsonStr = exportRecordsAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MES_Pay_Fixation_Settings_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const success = importRecordsFromJSON(text);
        if (success) {
          alert(isBangla ? 'ডেটা সফলভাবে রিস্টোর হয়েছে!' : 'Data restored successfully!');
          window.location.reload();
        } else {
          alert(isBangla ? 'রিস্টোর ব্যর্থ হয়েছে।' : 'Import failed.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">
          {isBangla ? 'সেটিংস ও ডেটা ব্যবস্থাপনা' : 'Settings & Data Management'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {isBangla 
            ? 'ভাষা পরিবর্তন, স্থানীয় স্টোরেজ ব্যাকআপ ও সিস্টেম কনফিগারেশন।' 
            : 'Language preference, database backups, and system preferences.'}
        </p>
      </div>

      {/* Language Preference */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-4 h-4 text-emerald-800" />
          <h3 className="text-sm font-bold text-slate-900">
            {isBangla ? 'ভাষা নির্বাচন (Language Preference)' : 'Language Selection'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBangla(true)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isBangla 
                ? 'bg-emerald-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            বাংলা (Bengali - First)
          </button>
          <button
            onClick={() => setIsBangla(false)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              !isBangla 
                ? 'bg-emerald-900 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Backup & Restore */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <h3 className="text-sm font-bold text-slate-900">
            {isBangla ? 'ডেটা ব্যাকআপ ও রিস্টোর (Local Storage Management)' : 'Local Storage Backup & Restore'}
          </h3>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {isBangla
            ? 'সকল হিসাব ও সংরক্ষিত কর্মচারী রেকর্ড আপনার ব্রাউজারের সুরক্ষিত লোকাল স্টোরেজে সংরক্ষিত থাকে। অন্য ডিভাইসে স্থানান্তরের জন্য JSON ব্যাকআপ ফাইলটি সংরক্ষণ করুন।'
            : 'All employee calculations are securely preserved in your local browser storage. Download a JSON backup to transfer data across workstations.'}
        </p>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{isBangla ? 'সম্পূর্ণ ডেটা ডাউনলোড (JSON Backup)' : 'Download Backup JSON'}</span>
          </button>

          <label className="px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4 text-slate-600" />
            <span>{isBangla ? 'ব্যাকআপ ফাইল রিস্টোর করুন' : 'Restore from JSON'}</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (confirm(isBangla ? 'আপনি কি নিশ্চিত যে সমস্ত ডেটা রিসেট করতে চান?' : 'Are you sure you want to reset all records to official defaults?')) {
                onResetDefaults();
              }
            }}
            className="px-4 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2 ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isBangla ? 'ডিফল্ট ডেটায় রিসেট করুন' : 'Reset to Official Defaults'}</span>
          </button>
        </div>
      </div>

      {/* About Application Card */}
      <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <Emblem type="mes" size="md" />
          <div>
            <h3 className="text-sm font-bold text-white">
              Military Engineer Services (MES) • Bangladesh
            </h3>
            <span className="text-xs text-amber-400">
              {isBangla ? 'বেতন নির্ধারণ ও বকেয়া হিসাব অ্যাপ্লিকেশন ২০২৬' : 'Pay Fixation & Arrears Engine 2026'}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isBangla ? MANDATORY_DISCLAIMER_BN : MANDATORY_DISCLAIMER_EN}
        </p>

        <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-3 flex items-center justify-between">
          <span>{isBangla ? 'নিয়মাবলি সংস্করণ: অম/অবি/বাস্ত-১/২০২৬' : 'Statutory Reference: MoF Gazette Order 2026'}</span>
          <span className="font-mono">v1.2.0 • Production Build</span>
        </div>
      </div>

    </div>
  );
};
