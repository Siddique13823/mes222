import React, { useState } from 'react';
import { FixationResult, PhaseBreakdown } from '../../types';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { 
  Layers, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  Building, 
  HeartPulse,
  Info
} from 'lucide-react';

interface PhaseWiseSalaryViewProps {
  currentResult: FixationResult;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const PhaseWiseSalaryView: React.FC<PhaseWiseSalaryViewProps> = ({
  currentResult,
  setActiveTab,
  isBangla
}) => {
  const [selectedPhase, setSelectedPhase] = useState<'phase1' | 'phase2' | 'phase3'>('phase3');

  const phases = [
    { key: 'phase1' as const, data: currentResult.phases.phase1, color: 'amber' },
    { key: 'phase2' as const, data: currentResult.phases.phase2, color: 'blue' },
    { key: 'phase3' as const, data: currentResult.phases.phase3, color: 'emerald' },
  ];

  const activePhaseData: PhaseBreakdown = currentResult.phases[selectedPhase];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              {isBangla ? 'ধাপভিত্তিক বেতন বাস্তবায়ন (Phase-wise Salary Breakdown)' : 'Phase-wise Salary Breakdown'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'সরকারি গেজেট অনুযায়ী প্রতিটি বাস্তবায়ন ধাপ (৫০%, ৭৫% ও ১০০%), কার্যকর তারিখ ও প্রদেয় বেতনের পূর্ণাঙ্গ বিবরণ।' 
              : 'Detailed breakdown of all official stages (50%, 75% and 100%), effective dates, and payable salaries.'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('arrears')}
          className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>{isBangla ? 'বকেয়া হিসাব দেখুন' : 'View Arrears Schedule'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Critical Rule Notice Banner */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">
            {isBangla ? 'সরকারি ধাপ বাস্তবায়নের বিধান: ' : 'Official Implementation Principle: '}
          </span>
          {isBangla 
            ? 'সরকারি আদেশে ৫০%, ৭৫% বা ১০০% বলতে পুরো মূল বেতনের ৫০% বা ৭৫% বুঝায় না; বরং এটি পূর্বতন মূল বেতন ও নতুন স্কেলের মধ্যকার ব্যবধান (Salary Difference Benefit) বা ভাতাদির সমন্বিত স্তরের উপর প্রযুক্ত হয়। ফলে কর্মচারীর বিদ্যমান মূল বেতন সর্বদা সংরক্ষিত থাকে।'
            : 'In official pay orders, 50% or 75% does not reduce an employee\'s salary below their current basic. It applies to the salary difference benefit or allowance integration slabs, guaranteeing full salary protection throughout all stages.'}
        </div>
      </div>

      {/* Phase Cards Selector Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map(({ key, data, color }) => {
          const isSelected = selectedPhase === key;
          return (
            <div
              key={key}
              onClick={() => setSelectedPhase(key)}
              className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-slate-700">
                  {key === 'phase1' && (isBangla ? '১ম পর্যায়' : 'Phase 1')}
                  {key === 'phase2' && (isBangla ? '২য় পর্যায়' : 'Phase 2')}
                  {key === 'phase3' && (isBangla ? '৩য় পর্যায় (পূর্ণাঙ্গ)' : 'Phase 3 (Full)')}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  key === 'phase1' ? 'bg-amber-100 text-amber-800' :
                  key === 'phase2' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {data.percentageText}
                </span>
              </div>

              <div className="text-xl font-bold text-slate-900 font-mono-numbers mb-1">
                {formatBDT(data.payableBasic, isBangla)}
              </div>
              <span className="text-xs text-slate-500 block mb-3">
                {isBangla ? 'প্রদেয় মূল বেতন' : 'Payable Basic'}
              </span>

              <div className="text-xs space-y-1 pt-3 border-t border-slate-100 text-slate-600">
                <div className="flex justify-between">
                  <span>{isBangla ? 'কার্যকর তারিখ:' : 'Effective:'}</span>
                  <span className="font-medium text-slate-800">{data.effectiveDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isBangla ? 'মাসিক গ্রস:' : 'Gross Monthly:'}</span>
                  <span className="font-bold text-emerald-900 font-mono-numbers">{formatBDT(data.grossSalary, isBangla)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isBangla ? 'মাসিক প্রবৃদ্ধি:' : 'Monthly Diff:'}</span>
                  <span className="font-bold text-amber-800 font-mono-numbers">+{formatBDT(data.monthlyDifference, isBangla)}</span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isBangla ? 'সক্রিয়ভাবে প্রদর্শিত' : 'Currently Inspected'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Phase Detailed Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              {isBangla ? 'বাস্তবায়ন পর্যায়ের পুঙ্খানুপুঙ্খ হিসাব' : 'Phase Implementation Audit'}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {isBangla ? activePhaseData.phaseNameBn : activePhaseData.phaseName}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {isBangla ? 'কার্যকর মেয়াদ: ' : 'Effective Period: '}
            <strong className="text-slate-800">{activePhaseData.effectiveDate}</strong>
          </span>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            {isBangla ? activePhaseData.descriptionBn : activePhaseData.description}
          </p>

          {/* Detailed Tabular Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2.5 px-3">{isBangla ? 'বেতন ও ভাতার বিবরণ' : 'Pay Component'}</th>
                  <th className="py-2.5 px-3 text-right">{isBangla ? 'পূর্বতন স্কেল' : 'Old Scale'}</th>
                  <th className="py-2.5 px-3 text-right">{isBangla ? 'নির্বাচিত পর্যায়ে প্রদেয়' : 'Payable This Phase'}</th>
                  <th className="py-2.5 px-3 text-right">{isBangla ? 'পার্থক্য / প্রবৃদ্ধি' : 'Net Difference'}</th>
                  <th className="py-2.5 px-3">{isBangla ? 'সরকারি বিধি / মন্তব্য' : 'Remarks'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                
                {/* Basic Pay */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isBangla ? 'মূল বেতন (Basic Salary)' : 'Basic Salary'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(currentResult.previousBasicSalary, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-emerald-900">
                    {formatBDT(activePhaseData.payableBasic, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-700 font-semibold">
                    +{formatBDT(activePhaseData.basicDifference, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? 'গেজেট ধাপ ও সিনিয়রিটির ব্যবধান সমন্বয়' : 'Seniority increments mapping'}
                  </td>
                </tr>

                {/* House Rent */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isBangla ? 'বাড়ি ভাড়া ভাতা (House Rent)' : 'House Rent Allowance'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(currentResult.phases.phase1.houseRentAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-slate-900">
                    {formatBDT(activePhaseData.houseRentAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(activePhaseData.houseRentAllowance - currentResult.phases.phase1.houseRentAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? 'এলাকাভিত্তিক প্রযোজ্য স্ল্যাব' : 'Location-based slab'}
                  </td>
                </tr>

                {/* Medical */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isBangla ? 'চিকিৎসা ভাতা (Medical)' : 'Medical Allowance'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(1500, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-slate-900">
                    {formatBDT(activePhaseData.medicalAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-700">
                    +{formatBDT(activePhaseData.medicalAllowance - 1500, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? 'সংশোধিত মাসিক সরকারি হার' : 'Revised monthly official rate'}
                  </td>
                </tr>

                {/* Education */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isBangla ? 'শিক্ষা ভাতা (Education)' : 'Education Allowance'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(currentResult.inputs.childrenCount === 0 ? 0 : currentResult.inputs.childrenCount === 1 ? 1000 : 2000, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-slate-900">
                    {formatBDT(activePhaseData.educationAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-700">
                    +{formatBDT(activePhaseData.educationAllowance - (currentResult.inputs.childrenCount === 0 ? 0 : currentResult.inputs.childrenCount === 1 ? 1000 : 2000), isBangla)}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? `${toBanglaNumber(currentResult.inputs.childrenCount)} সন্তান ভিত্তিক` : `${currentResult.inputs.childrenCount} children`}
                  </td>
                </tr>

                {/* Other allowances */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {isBangla ? 'অন্যান্য ভাতা (MES কারিগরি/টিফিন/যাতায়াত)' : 'MES Technical/Tiffin/Conveyance'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-600">
                    {formatBDT(500, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-slate-900">
                    {formatBDT(activePhaseData.mesSpecialAllowance + activePhaseData.tiffinAllowance + activePhaseData.conveyanceAllowance + activePhaseData.washingAllowance, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-700">
                    +{formatBDT((activePhaseData.mesSpecialAllowance + activePhaseData.tiffinAllowance + activePhaseData.conveyanceAllowance + activePhaseData.washingAllowance) - 500, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? 'পদ ও দায়িত্ব অনুযায়ী' : 'By rank and duty station'}
                  </td>
                </tr>

                {/* Total Gross */}
                <tr className="bg-emerald-50/50 font-bold">
                  <td className="py-3 px-3 text-emerald-950">
                    {isBangla ? 'সর্বমোট মাসিক বেতন (Gross Salary)' : 'Total Gross Monthly Salary'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-700">
                    {formatBDT(currentResult.previousBasicSalary + 1500, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-950 text-sm">
                    {formatBDT(activePhaseData.grossSalary, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-emerald-800 text-sm">
                    +{formatBDT(activePhaseData.monthlyDifference, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-emerald-900 font-semibold">
                    {isBangla ? 'মাসিক মোট প্রদেয়' : 'Gross payable per month'}
                  </td>
                </tr>

                {/* Deductions */}
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {isBangla ? 'মোট কর্তন (জিপিএফ, কল্যাণ তহবিল, ট্যাক্স)' : 'Total Deductions (GPF, Taxes)'}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-500">
                    -{formatBDT(Math.round(currentResult.previousBasicSalary * 0.1) + 200, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers font-bold text-rose-800">
                    -{formatBDT(activePhaseData.totalDeductions, isBangla)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono-numbers text-slate-500">
                    —
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {isBangla ? `জিপিএফ ${toBanglaNumber(currentResult.inputs.gpfPercentage)}%` : `GPF ${currentResult.inputs.gpfPercentage}%`}
                  </td>
                </tr>

                {/* Estimated Net */}
                <tr className="bg-slate-900 text-white font-bold">
                  <td className="py-3.5 px-3 text-white">
                    {isBangla ? 'আনুমানিক নিট মাসিক বেতন (Estimated Net Payout)' : 'Estimated Net Monthly Salary'}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono-numbers text-slate-300">
                    {formatBDT(currentResult.previousBasicSalary, isBangla)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono-numbers text-amber-300 text-base">
                    {formatBDT(activePhaseData.netSalary, isBangla)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono-numbers text-emerald-300">
                    +{formatBDT(activePhaseData.netSalary - currentResult.previousBasicSalary, isBangla)}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300 font-medium">
                    {isBangla ? 'ব্যাংক একাউন্টে জমাযোগ্য' : 'Bank credit amount'}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
};
