import React, { useState } from 'react';
import { PAY_SCALE_2015, PAY_SCALE_2026 } from '../../data/payScales';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { Table2, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PayScalesViewProps {
  onSelectGrade: (grade: number) => void;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const PayScalesView: React.FC<PayScalesViewProps> = ({
  onSelectGrade,
  setActiveTab,
  isBangla
}) => {
  const [activeGrade, setActiveGrade] = useState<number>(10);
  const [searchSalary, setSearchSalary] = useState<string>('');

  const currentOldScale = PAY_SCALE_2015.find(g => g.grade === activeGrade);
  const currentNewScale = PAY_SCALE_2026.find(g => g.grade === activeGrade);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'জাতীয় বেতন স্কেল ২০১৫ বনাম ২০২৬ তুলনামূলক বিবরণী' : 'National Pay Scales Comparison (2015 vs 2026)'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'অর্থ মন্ত্রণালয়ের অনুমোদিত ২০টি গ্রেডের প্রারম্ভিক, সর্বোচ্চ এবং বিস্তারিত ধাপ তালিকা।' 
              : 'Official 20-grade comparative tables with all statutory steps and increment slabs.'}
          </p>
        </div>
      </div>

      {/* 20 Grades Selector Ribbon */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {PAY_SCALE_2015.map((g) => {
            const isSelected = activeGrade === g.grade;
            return (
              <button
                key={g.grade}
                onClick={() => setActiveGrade(g.grade)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isBangla ? g.gradeBn : `Grade ${g.grade}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Grade Side-by-Side Detailed Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2015 Old Scale Steps */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {isBangla ? 'পূর্বতন স্কেল' : 'Old Pay Scale'}
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {isBangla ? `জাতীয় বেতন স্কেল ২০১৫ (গ্রেড ${toBanglaNumber(activeGrade)})` : `National Pay Scale 2015 (Grade ${activeGrade})`}
              </h3>
            </div>
            <span className="text-xs font-mono-numbers text-slate-600 font-semibold">
              {formatBDT(currentOldScale?.minSalary, isBangla)} – {formatBDT(currentOldScale?.maxSalary, isBangla)}
            </span>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto no-scrollbar">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 px-2">ধাপ #</th>
                  <th className="py-2 px-2 text-right">মূল বেতন (টাকা)</th>
                  <th className="py-2 px-2 text-right">ইনক্রিমেন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOldScale?.steps.map((step, idx) => {
                  const prevStep = idx > 0 ? currentOldScale.steps[idx - 1] : step;
                  const inc = step - prevStep;
                  return (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-2 font-mono-numbers text-slate-500">
                        {isBangla ? `ধাপ ${toBanglaNumber(idx + 1)}` : `Step ${idx + 1}`}
                      </td>
                      <td className="py-2 px-2 text-right font-mono-numbers font-semibold text-slate-900">
                        {formatBDT(step, isBangla)}
                      </td>
                      <td className="py-2 px-2 text-right font-mono-numbers text-slate-400">
                        {idx > 0 ? `+${formatBDT(inc, isBangla)}` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2026 Revised Scale Steps */}
        <div className="bg-white rounded-xl border border-emerald-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {isBangla ? 'সংশোধিত স্কেল' : 'Revised Pay Scale'}
              </span>
              <h3 className="text-sm font-bold text-emerald-950">
                {isBangla ? `সংশোধিত বেতন আদেশ ২০২৬ (গ্রেড ${toBanglaNumber(activeGrade)})` : `Revised Pay Scale 2026 (Grade ${activeGrade})`}
              </h3>
            </div>
            <span className="text-xs font-mono-numbers text-emerald-900 font-bold">
              {formatBDT(currentNewScale?.minSalary, isBangla)} – {formatBDT(currentNewScale?.maxSalary, isBangla)}
            </span>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto no-scrollbar">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-emerald-100 text-emerald-800">
                  <th className="py-2 px-2">ধাপ #</th>
                  <th className="py-2 px-2 text-right">সংশোধিত মূল বেতন (টাকা)</th>
                  <th className="py-2 px-2 text-right">ইনক্রিমেন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentNewScale?.steps.map((step, idx) => {
                  const prevStep = idx > 0 ? currentNewScale.steps[idx - 1] : step;
                  const inc = step - prevStep;
                  return (
                    <tr key={idx} className="hover:bg-emerald-50/50">
                      <td className="py-2 px-2 font-mono-numbers text-emerald-800 font-medium">
                        {isBangla ? `ধাপ ${toBanglaNumber(idx + 1)}` : `Step ${idx + 1}`}
                      </td>
                      <td className="py-2 px-2 text-right font-mono-numbers font-bold text-slate-900">
                        {formatBDT(step, isBangla)}
                      </td>
                      <td className="py-2 px-2 text-right font-mono-numbers text-emerald-700">
                        {idx > 0 ? `+${formatBDT(inc, isBangla)}` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* All 20 Grades Complete Master Summary Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {isBangla ? 'সকল ২০টি গ্রেডের পূর্ণাঙ্গ স্কেল চার্ট' : 'All 20 Grades Master Reference Table'}
          </h3>
          <span className="text-xs text-slate-500">
            {isBangla ? 'গ্রেডে ক্লিক করে ধাপসমূহ বিস্তারিত দেখুন' : 'Click row to inspect steps'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100/60 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">গ্রেড</th>
                <th className="py-2.5 px-3 text-right">২০১৫ প্রারম্ভিক</th>
                <th className="py-2.5 px-3 text-right">২০১৫ সর্বোচ্চ</th>
                <th className="py-2.5 px-3 text-right">২০২৬ প্রারম্ভিক</th>
                <th className="py-2.5 px-3 text-right">২০২৬ সর্বোচ্চ</th>
                <th className="py-2.5 px-3 text-right">প্রারম্ভিক বৃদ্ধি</th>
                <th className="py-2.5 px-3 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PAY_SCALE_2015.map((oldG) => {
                const newG = PAY_SCALE_2026.find(x => x.grade === oldG.grade);
                const diff = (newG?.minSalary || 0) - oldG.minSalary;
                const isSelected = activeGrade === oldG.grade;
                return (
                  <tr 
                    key={oldG.grade}
                    onClick={() => setActiveGrade(oldG.grade)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-slate-900">
                      {isBangla ? oldG.gradeBn : `Grade ${oldG.grade}`}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers text-slate-600">
                      {formatBDT(oldG.minSalary, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers text-slate-600">
                      {formatBDT(oldG.maxSalary, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers font-bold text-emerald-950">
                      {formatBDT(newG?.minSalary, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers font-bold text-emerald-950">
                      {formatBDT(newG?.maxSalary, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers text-emerald-700 font-bold">
                      +{formatBDT(diff, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectGrade(oldG.grade);
                          setActiveTab('calculator');
                        }}
                        className="px-2 py-0.5 text-[11px] font-medium text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded"
                      >
                        {isBangla ? 'বাছাই' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
