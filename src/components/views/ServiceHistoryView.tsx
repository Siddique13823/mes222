import React, { useState } from 'react';
import { FixationResult } from '../../types';
import { getOldScaleGrade, getNewScaleGrade } from '../../data/payScales';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { calculateSalaryFixation } from '../../utils/calculator';
import { History, Award, CheckCircle2, ArrowRight, TrendingUp, Info } from 'lucide-react';

interface ServiceHistoryViewProps {
  currentResult: FixationResult;
  onApplySimulation: (newBasic: number, grade: number) => void;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const ServiceHistoryView: React.FC<ServiceHistoryViewProps> = ({
  currentResult,
  onApplySimulation,
  setActiveTab,
  isBangla
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(currentResult.oldGrade);
  const oldGradeData = getOldScaleGrade(selectedGrade);
  const newGradeData = getNewScaleGrade(selectedGrade);

  // Generate 1 to 20 increment years simulation
  const steps = oldGradeData?.steps || [];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'চাকরির ইতিবৃত্ত ও ইনক্রিমেন্ট ধাপ সিমুলেশন' : 'Service History & Increment Progression'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? '১০, ২০, ৩০ বছরের অভিজ্ঞতায় অর্জিত প্রতিটি বাৎসরিক ইনক্রিমেন্ট কীভাবে নতুন স্কেলে নির্ধারিত হবে তা পরীক্ষা করুন।' 
              : 'Inspect how cumulative career increments (1 to 30 years) map directly into the revised scale.'}
          </p>
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">{isBangla ? 'গ্রেড নির্বাচন:' : 'Select Grade:'}</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(Number(e.target.value))}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold"
          >
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {isBangla ? `গ্রেড ${toBanglaNumber(i + 1)}` : `Grade ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seniority Principle Guarantee Banner */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">
            {isBangla ? 'অভিজ্ঞ কর্মচারীদের স্বার্থ সংরক্ষণ নীতি: ' : 'Seniority Protection Guarantee: '}
          </span>
          {isBangla 
            ? 'সরকারি বেতন নির্ধারণ বিধিমালা ২০১৫ এবং ২০২৬ উভয় আদেশে স্পষ্ট নির্দেশ রয়েছে—কোনো অভিজ্ঞ কর্মচারীর বেতন নতুন স্কেলের শুরুর ধাপে (নবাগত কর্মচারীর ন্যায়) নির্ধারিত হইবে না। বিদ্যমান বেসিকের সম্পূর্ণ ইনক্রিমেন্ট ব্যবধান যোগ করে তবেই পরবর্তী উচ্চতর ধাপ নির্ধারণ করা হয়।'
            : 'Both 2015 and 2026 Pay Orders strictly forbid treating experienced civil servants as fresh recruits. The employee\'s full accumulated increment difference is carried forward into the revised scale.'}
        </div>
      </div>

      {/* Increment Steps Table Simulation */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            {isBangla 
              ? `গ্রেড ${toBanglaNumber(selectedGrade)}: সেবাকাল ও বাৎসরিক ইনক্রিমেন্ট ম্যাপিং তালিকা` 
              : `Grade ${selectedGrade}: Career Progression & Increment Matrix`}
          </span>
          <span className="text-xs text-slate-500">
            {isBangla ? `মোট ধাপ: ${toBanglaNumber(steps.length)}টি` : `Total Steps: ${steps.length}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">{isBangla ? 'সেবাকাল (বছর)' : 'Service Tenure'}</th>
                <th className="py-2.5 px-3 text-right">{isBangla ? '২০১৫ স্কেল মূল বেতন' : '2015 Basic'}</th>
                <th className="py-2.5 px-3 text-right">{isBangla ? 'অর্জিত ব্যবধান' : 'Diff from Min'}</th>
                <th className="py-2.5 px-3 text-right">{isBangla ? '২০২৬ সংশোধিত মূল বেতন' : '2026 Fixed Basic'}</th>
                <th className="py-2.5 px-3">{isBangla ? 'নির্ধারিত ধাপ' : 'Assigned Step'}</th>
                <th className="py-2.5 px-3 text-center">{isBangla ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {steps.map((oldSalary, idx) => {
                const diff = oldSalary - (oldGradeData?.minSalary || 0);
                const simResult = calculateSalaryFixation({
                  ...currentResult.inputs,
                  grade: selectedGrade,
                  previousBasicSalary: oldSalary,
                  serviceYears: idx + 1
                });

                const isCurrentActive = oldSalary === currentResult.previousBasicSalary && selectedGrade === currentResult.oldGrade;

                return (
                  <tr 
                    key={idx}
                    className={`transition-colors ${
                      isCurrentActive ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono-numbers text-slate-500">
                      {toBanglaNumber(idx + 1)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {isBangla ? `${toBanglaNumber(idx + 1)} বছর বা তদূর্ধ্ব` : `${idx + 1} Years`}
                      {idx === 0 && <span className="ml-1 text-[10px] text-amber-700 font-bold">({isBangla ? 'প্রারম্ভিক' : 'Entry'})</span>}
                      {idx === 9 && <span className="ml-1 text-[10px] text-blue-700 font-bold">(১০ বছর)</span>}
                      {idx === 19 && <span className="ml-1 text-[10px] text-purple-700 font-bold">(২০ বছর)</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers text-slate-900 font-medium">
                      {formatBDT(oldSalary, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers text-slate-500">
                      +{formatBDT(diff, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers font-bold text-emerald-950">
                      {formatBDT(simResult.finalRevisedBasic, isBangla)}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {isBangla ? `ধাপ ${toBanglaNumber(simResult.revisedStepIndex)}` : `Step ${simResult.revisedStepIndex}`}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => {
                          onApplySimulation(oldSalary, selectedGrade);
                          setActiveTab('calculator');
                        }}
                        className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded transition-colors"
                      >
                        {isBangla ? 'ক্যালকুলেটরে নিন' : 'Use This'}
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
