import React from 'react';
import { FixationResult, SavedEmployeeRecord } from '../../types';
import { Emblem } from '../Emblem';
import { ASSETS } from '../../data/assets';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { MANDATORY_DISCLAIMER_BN, MANDATORY_DISCLAIMER_EN } from '../../data/officialRules';
import { 
  Calculator, 
  TrendingUp, 
  FileSpreadsheet, 
  ArrowRight, 
  History, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  currentResult: FixationResult;
  savedRecords: SavedEmployeeRecord[];
  onSelectRecord: (record: SavedEmployeeRecord) => void;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
  onExportExcel: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentResult,
  savedRecords,
  onSelectRecord,
  setActiveTab,
  isBangla,
  onExportExcel
}) => {
  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white shadow-sm border border-emerald-900/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
          <img 
            src={ASSETS.mesBuilding} 
            alt="MES Headquarters"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="relative p-6 sm:p-8 max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <Emblem type="mes" size="sm" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              {isBangla ? 'মিলিটারী ইঞ্জিনিয়ার সার্ভিসেস (MES) • বাংলাদেশ' : 'Military Engineer Services (MES) • Bangladesh'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 text-balance">
            {isBangla 
              ? 'সরকারি কর্মচারী বেতন নির্ধারণ ও ভাতা সমন্বয় ২০২৬' 
              : 'Government Employees Pay Fixation & Allowance Order 2026'}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {isBangla
              ? 'অর্থ মন্ত্রণালয়ের সরকারি গেজেট ও আইবাস++ (iBAS++) বেতন নির্ধারণ নীতিমালা অনুযায়ী বিদ্যমান কর্মকর্তা-কর্মচারীদের সংশোধিত মূল বেতন, ৫০%-৭৫%-১০০% ধাপভিত্তিক বেতন, ভাতা ও বকেয়ার নিখুঁত স্বয়ংক্রিয় হিসাব।'
              : 'Automatic calculation of revised basic salary, 50%-75%-100% implementation phases, location-based allowances, and month-by-month arrears based on Ministry of Finance Gazette rules.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{isBangla ? 'বেতন হিসাব শুরু করুন' : 'Open Salary Calculator'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExportExcel}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>{isBangla ? 'এক্সেল বিবরণী ডাউনলোড' : 'Download Excel Sheet'}</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className="px-3 py-2.5 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBangla ? 'গেজেট বিধিমালা' : 'Official Rules'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Calculation Basic Pay */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{isBangla ? 'বর্তমান হিসাবকৃত মূল বেতন' : 'Calculated Revised Basic'}</span>
            <span className="text-emerald-700 font-semibold">{isBangla ? '১০০% বাস্তবায়ন' : '100% Scale'}</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono-numbers">
            {formatBDT(currentResult.finalRevisedBasic, isBangla)}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="text-emerald-700 font-medium">+{currentResult.fullPercentageIncrease}%</span>
            <span>{isBangla ? 'পূর্বের মূল বেতনের চেয়ে প্রবৃদ্ধি' : 'increase over old basic'}</span>
          </div>
        </div>

        {/* Phase 1 Initial Basic */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{isBangla ? '১ম পর্যায় প্রদেয় মূল বেতন' : 'Phase 1 Payable Basic'}</span>
            <span className="text-amber-700 font-semibold">{isBangla ? '৫০% সুবিধা' : '50% Stage'}</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono-numbers">
            {formatBDT(currentResult.phases.phase1.payableBasic, isBangla)}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {isBangla ? 'কার্যকর তারিখ: ১ জুলাই ২০২৫' : 'Effective: 01 July 2025'}
          </div>
        </div>

        {/* Full Gross Salary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{isBangla ? 'মোট মাসিক বেতন (গ্রস)' : 'Full Gross Monthly'}</span>
            <span className="text-slate-600 font-medium">{isBangla ? 'ভাতাদিসহ' : 'With Allowances'}</span>
          </div>
          <div className="text-2xl font-bold text-emerald-900 font-mono-numbers">
            {formatBDT(currentResult.phases.phase3.grossSalary, isBangla)}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {isBangla ? 'নিট প্রদেয়:' : 'Net Salary:'} <span className="font-semibold text-slate-800">{formatBDT(currentResult.phases.phase3.netSalary, isBangla)}</span>
          </div>
        </div>

        {/* Estimated Arrears */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{isBangla ? 'সর্বমোট আনুমানিক বকেয়া' : 'Total Estimated Arrears'}</span>
            <span className="text-blue-700 font-semibold">{isBangla ? '১৬ মাস' : '16 Months'}</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 font-mono-numbers">
            {formatBDT(currentResult.totalEstimatedArrears, isBangla)}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            <button 
              onClick={() => setActiveTab('arrears')}
              className="text-blue-700 hover:text-blue-800 font-medium inline-flex items-center gap-1"
            >
              <span>{isBangla ? 'মাসের হিসাব দেখুন' : 'View month ledger'}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Content 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Quick Calculator Summary & Service Information */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Employee Calculation Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {isBangla ? 'চলতি সক্রিয় বেতন নির্ধারণ বিবরণী' : 'Current Active Pay Fixation'}
                </h2>
                <p className="text-xs text-slate-500">
                  {currentResult.inputs.employeeName} · {currentResult.inputs.designation} · {isBangla ? 'গ্রেড ' + toBanglaNumber(currentResult.revisedGrade) : 'Grade ' + currentResult.revisedGrade}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('breakdown')}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5"
              >
                <span>{isBangla ? 'বিস্তারিত বিবরণ' : 'Full Breakdown'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block mb-1">{isBangla ? 'পূর্ববর্তী মূল বেতন' : 'Previous Basic'}</span>
                <span className="text-base font-bold text-slate-800 font-mono-numbers">{formatBDT(currentResult.previousBasicSalary, isBangla)}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block mb-1">{isBangla ? 'অভিজ্ঞতার ধাপ ব্যবধান' : 'Old Scale Diff'}</span>
                <span className="text-base font-bold text-slate-800 font-mono-numbers">+{formatBDT(currentResult.oldSalaryDifference, isBangla)}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <span className="text-emerald-800 block mb-1 font-medium">{isBangla ? 'সংশোধিত ধাপ বেতন' : 'Revised Step Pay'}</span>
                <span className="text-base font-bold text-emerald-900 font-mono-numbers">{formatBDT(currentResult.finalRevisedBasic, isBangla)}</span>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
                <span className="text-amber-800 block mb-1 font-medium">{isBangla ? 'নির্ধারিত ধাপ' : 'Pay Step'}</span>
                <span className="text-base font-bold text-amber-900">
                  {isBangla ? `ধাপ ${toBanglaNumber(currentResult.revisedStepIndex)}/${toBanglaNumber(currentResult.totalStepsInGrade)}` : `Step ${currentResult.revisedStepIndex}/${currentResult.totalStepsInGrade}`}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{isBangla ? 'বিধি ৭(১) অনুযায়ী পরবর্তী উচ্চতর ধাপ সংরক্ষণ প্রযুক্ত' : 'Clause 7(1) next-step guarantee applied'}</span>
              </div>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-emerald-800 hover:text-emerald-900 font-semibold inline-flex items-center gap-1"
              >
                <span>{isBangla ? 'অফিসিয়াল পে-ফিক্সেশন বিবরণী প্রিন্ট করুন' : 'Print Official Fixation Sheet'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('calculator')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-emerald-300 group shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{isBangla ? 'বেতন ক্যালকুলেটর' : 'Salary Calculator'}</h3>
              <p className="text-xs text-slate-500 leading-normal">{isBangla ? 'পূর্ববর্তী মূল বেতন প্রবেশ করিয়ে নতুন স্কেল নির্ধারণ করুন।' : 'Enter previous basic pay and calculate new scale automatically.'}</p>
            </button>

            <button
              onClick={() => setActiveTab('phase_wise')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-amber-300 group shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{isBangla ? 'ধাপভিত্তিক বাস্তবায়ন' : 'Phase-wise Stages'}</h3>
              <p className="text-xs text-slate-500 leading-normal">{isBangla ? '৫০%, ৭৫% ও ১০০% বাস্তবায়ন পর্যায়ের বেতন ও তারিখ দেখুন।' : 'Inspect 50%, 75% and 100% implementation stages.'}</p>
            </button>

            <button
              onClick={() => setActiveTab('arrears')}
              className="p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-all hover:border-blue-300 group shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <History className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{isBangla ? 'বকেয়া লেজার' : 'Arrears Schedule'}</h3>
              <p className="text-xs text-slate-500 leading-normal">{isBangla ? 'জুলাই ২০২৫ হতে অক্টোবর ২০২৬ পর্যন্ত মাসভিত্তিক বকেয়া।' : 'Month-by-month difference from July 2025 to Oct 2026.'}</p>
            </button>
          </div>

        </div>

        {/* Right Col: Saved Employees & Official Gazette Bulletin */}
        <div className="space-y-6">
          
          {/* Saved Employee Records Quick List */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <h3 className="text-sm font-semibold text-slate-900">
                {isBangla ? 'সংরক্ষিত কর্মচারী প্রোফাইল' : 'Saved Employee Profiles'}
              </h3>
              <button
                onClick={() => setActiveTab('records')}
                className="text-xs text-emerald-800 hover:text-emerald-900 font-medium"
              >
                {isBangla ? 'সব দেখুন' : 'View all'}
              </button>
            </div>

            <div className="space-y-2">
              {savedRecords.slice(0, 4).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectRecord(rec)}
                  className="p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                      {rec.employeeName}
                    </span>
                    <span className="text-[11px] font-mono-numbers text-emerald-800 font-bold">
                      {formatBDT(rec.finalRevisedBasic, isBangla)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>{rec.designation}</span>
                    <span>{isBangla ? `গ্রেড ${toBanglaNumber(rec.grade)}` : `Grade ${rec.grade}`}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('records')}
              className="mt-3 w-full py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-center"
            >
              {isBangla ? 'নতুন কর্মচারী সংরক্ষণ ও পরিচালনা' : 'Manage & Save New Records'}
            </button>
          </div>

          {/* MES Bangladesh Reference Box */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Emblem type="mes" size="sm" />
              <div>
                <h3 className="text-sm font-bold text-white">MES তথ্য বাতায়ন</h3>
                <span className="text-[10px] text-slate-400">Military Engineer Services</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {isBangla
                ? 'এমইএস সদর দপ্তর ও ফিল্ড অফিস সমূহের কর্মকর্তা ও কর্মচারীদের জন্য কারিগরি ভাতা, ফিল্ড এলাউন্স ও সার্ভিস হিস্ট্রি অনুযায়ী স্বয়ংক্রিয় পে-ফিক্সেশন অন্তর্ভুক্ত।'
                : 'Includes technical allowance, cantonment field allowances, and trade-specific increment mappings for MES civilian engineers and staff.'}
            </p>
            <div className="text-xs space-y-1.5 text-slate-300 border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between">
                <span>{isBangla ? 'আইবাস++ পোর্টাল:' : 'iBAS++ Portal:'}</span>
                <a 
                  href="https://ibas.finance.gov.bd/login?returnurl=%2Ffixation" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>ibas.finance.gov.bd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>{isBangla ? 'অর্থ মন্ত্রণালয় গেজেট:' : 'MoF Gazette:'}</span>
                <a 
                  href="https://mof.gov.bd/pages/notification-circulars" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>mof.gov.bd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Mandatory Official Disclaimer */}
      <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
        <span className="font-semibold">{isBangla ? 'সতর্কবার্তা ও ঘোষণা: ' : 'Official Notice & Disclaimer: '}</span>
        {isBangla ? MANDATORY_DISCLAIMER_BN : MANDATORY_DISCLAIMER_EN}
      </div>

    </div>
  );
};
