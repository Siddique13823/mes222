import React, { useState } from 'react';
import { FixationResult, ArrearsMonthRecord } from '../../types';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { exportFixationToExcel, exportArrearsToCSV } from '../../utils/excelExport';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  RotateCcw, 
  Info, 
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface ArrearsCalculatorViewProps {
  currentResult: FixationResult;
  onUpdateResult: (updated: FixationResult) => void;
  isBangla: boolean;
}

export const ArrearsCalculatorView: React.FC<ArrearsCalculatorViewProps> = ({
  currentResult,
  onUpdateResult,
  isBangla
}) => {
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3'>('all');
  const [editingMonthId, setEditingMonthId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const arrearsList = currentResult.arrearsList;

  const filteredList = arrearsList.filter(item => {
    if (phaseFilter === 'all') return true;
    return item.phaseKey === phaseFilter;
  });

  const handleStartEdit = (record: ArrearsMonthRecord) => {
    setEditingMonthId(record.id);
    setEditValue(record.salaryActuallyDrawn.toString());
  };

  const handleSaveEdit = (recordId: string) => {
    const num = parseFloat(editValue);
    if (!isNaN(num) && num >= 0) {
      const updatedList = currentResult.arrearsList.map(r => {
        if (r.id === recordId) {
          const diff = r.revisedGrossPayable - num;
          const net = Math.max(0, diff - r.previouslyPaidArrears);
          return {
            ...r,
            salaryActuallyDrawn: num,
            isCustomDrawn: true,
            grossDifference: diff,
            netPayableDifference: diff,
            netArrearsDue: net
          };
        }
        return r;
      });

      // Recalculate subtotals
      let p1 = 0, p2 = 0, p3 = 0;
      updatedList.forEach(r => {
        if (r.phaseKey === 'phase1') p1 += r.netArrearsDue;
        else if (r.phaseKey === 'phase2') p2 += r.netArrearsDue;
        else if (r.phaseKey === 'phase3') p3 += r.netArrearsDue;
      });

      const updatedResult: FixationResult = {
        ...currentResult,
        arrearsList: updatedList,
        phase1ArrearsSubtotal: p1,
        phase2ArrearsSubtotal: p2,
        phase3ArrearsSubtotal: p3,
        totalEstimatedArrears: p1 + p2 + p3
      };

      onUpdateResult(updatedResult);
    }
    setEditingMonthId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'মাসভিত্তিক বকেয়া বেতন হিসাব (Month-by-Month Arrears Schedule)' : 'Month-by-Month Arrears Schedule'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'জুলাই ২০২৫ হতে অক্টোবর ২০২৬ (১৬ মাস) পর্যন্ত প্রতিটি বাস্তবায়ন পর্যায়ের প্রদেয় ও আহরিত বেতনের পার্থক্য।' 
              : 'Detailed breakdown from July 2025 through October 2026 across all implementation stages.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportArrearsToCSV(currentResult)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => exportFixationToExcel(currentResult)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
            <span>{isBangla ? 'এক্সেল লেজার ডাউনলোড' : 'Download Excel'}</span>
          </button>
        </div>
      </div>

      {/* Arrears Subtotals Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Grand Arrears */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white shadow-sm border border-emerald-900">
          <span className="text-xs text-emerald-300 font-semibold block mb-1">
            {isBangla ? 'সর্বমোট আনুমানিক বকেয়া (Grand Total)' : 'Total Estimated Arrears'}
          </span>
          <div className="text-2xl font-bold font-mono-numbers text-white">
            {formatBDT(currentResult.totalEstimatedArrears, isBangla)}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {isBangla ? '১৬ মাসের সম্পূর্ণ হিসাব' : 'Aggregated across 16 months'}
          </span>
        </div>

        {/* Phase 1 Subtotal */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isBangla ? '১ম পর্যায় বকেয়া' : 'Phase 1 Arrears'}</span>
            <span className="text-amber-800 font-semibold">{isBangla ? '৬ মাস' : '6 Mo.'}</span>
          </div>
          <div className="text-xl font-bold font-mono-numbers text-slate-900">
            {formatBDT(currentResult.phase1ArrearsSubtotal, isBangla)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {isBangla ? 'জুলাই ২০২৫ – ডিসে ২০২৫' : 'July 2025 - Dec 2025'}
          </span>
        </div>

        {/* Phase 2 Subtotal */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isBangla ? '২য় পর্যায় বকেয়া' : 'Phase 2 Arrears'}</span>
            <span className="text-blue-800 font-semibold">{isBangla ? '৬ মাস' : '6 Mo.'}</span>
          </div>
          <div className="text-xl font-bold font-mono-numbers text-slate-900">
            {formatBDT(currentResult.phase2ArrearsSubtotal, isBangla)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {isBangla ? 'জানু ২০২৬ – জুন ২০২৬' : 'Jan 2026 - June 2026'}
          </span>
        </div>

        {/* Phase 3 Subtotal */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{isBangla ? '৩য় পর্যায় বকেয়া' : 'Phase 3 Arrears'}</span>
            <span className="text-emerald-800 font-semibold">{isBangla ? '৪ মাস' : '4 Mo.'}</span>
          </div>
          <div className="text-xl font-bold font-mono-numbers text-slate-900">
            {formatBDT(currentResult.phase3ArrearsSubtotal, isBangla)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {isBangla ? 'জুলাই ২০২৬ – অক্টো ২০২৬' : 'July 2026 - Oct 2026'}
          </span>
        </div>

      </div>

      {/* Critical Verification Notice */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">
            {isBangla ? 'বকেয়া হিসাব ও সমন্বয় বিধি: ' : 'Arrears Reconciliation Rules: '}
          </span>
          {isBangla 
            ? 'এই বকেয়া হিসাব সম্পূর্ণ আনুমানিক এবং সরকারি আদেশ অনুযায়ী প্রদেয় বেতনের সাথে অতীতে উত্তোলিত বেতনের পার্থক্যের ওপর ভিত্তি করে প্রস্তুত। যদি সংশ্লিষ্ট কোনো মাসে আপনি অন্তর্বর্তীকালীন মহার্ঘ্য ভাতা বা বিশেষ সুবিধা উত্তোলন করে থাকেন, তবে টেবিলের সংশ্লিষ্ট সারিতে "প্রকৃত আহরিত" ঘরে ক্লিক করে সঠিক পরিমাণটি সম্পাদনা করতে পারেন।'
            : 'Arrears figures are estimated based on official order entitlements versus recorded salary drawn. If interim allowances or personal pay were drawn in any month, click the "Actually Drawn" amount to adjust that specific month.'}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">{isBangla ? 'ফিল্টার:' : 'Filter:'}</span>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setPhaseFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              phaseFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBangla ? 'সকল মাস (১৬)' : 'All Months (16)'}
          </button>
          <button
            onClick={() => setPhaseFilter('phase1')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              phaseFilter === 'phase1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBangla ? '১ম পর্যায় (৬)' : 'Phase 1 (6)'}
          </button>
          <button
            onClick={() => setPhaseFilter('phase2')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              phaseFilter === 'phase2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBangla ? '২য় পর্যায় (৬)' : 'Phase 2 (6)'}
          </button>
          <button
            onClick={() => setPhaseFilter('phase3')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              phaseFilter === 'phase3' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isBangla ? '৩য় পর্যায় (৪)' : 'Phase 3 (4)'}
          </button>
        </div>
      </div>

      {/* Month-by-Month Arrears Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">{isBangla ? 'মাস ও বছর' : 'Month & Year'}</th>
                <th className="py-3 px-3">{isBangla ? 'পর্যায়' : 'Phase'}</th>
                <th className="py-3 px-3 text-right">{isBangla ? 'প্রদেয় মূল বেতন' : 'Payable Basic'}</th>
                <th className="py-3 px-3 text-right">{isBangla ? 'প্রদেয় ভাতাদি' : 'Allowances'}</th>
                <th className="py-3 px-3 text-right">{isBangla ? 'সংশোধিত মোট (Gross)' : 'Gross Payable'}</th>
                <th className="py-3 px-3 text-right">{isBangla ? 'প্রকৃত আহরিত বেতন' : 'Actually Drawn'}</th>
                <th className="py-3 px-3 text-right">{isBangla ? 'মাসিক ব্যবধান' : 'Difference'}</th>
                <th className="py-3 px-4 text-right">{isBangla ? 'প্রদেয় বকেয়া (Due)' : 'Net Arrears'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((m) => {
                const isEditing = editingMonthId === m.id;
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{isBangla ? `${m.monthNameBn} ${toBanglaNumber(m.year)}` : `${m.monthName} ${m.year}`}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <span className="text-[11px]">{m.phaseLabel}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono-numbers text-slate-700">
                      {formatBDT(m.revisedBasicPayable, isBangla)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono-numbers text-slate-700">
                      {formatBDT(m.revisedAllowancesPayable, isBangla)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono-numbers font-semibold text-slate-900">
                      {formatBDT(m.revisedGrossPayable, isBangla)}
                    </td>
                    
                    {/* Actually Drawn - with inline edit */}
                    <td className="py-3 px-3 text-right font-mono-numbers">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <input
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-24 px-1.5 py-0.5 text-xs text-right border border-emerald-500 rounded bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(m.id)}
                            className="px-1.5 py-0.5 bg-emerald-800 text-white rounded text-[10px]"
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(m)}
                          title={isBangla ? 'সম্পাদনা করতে ক্লিক করুন' : 'Click to adjust drawn salary'}
                          className="hover:underline text-slate-600 hover:text-emerald-800 cursor-pointer"
                        >
                          {formatBDT(m.salaryActuallyDrawn, isBangla)}
                          {m.isCustomDrawn && <span className="text-[10px] text-amber-600 ml-1">★</span>}
                        </button>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-numbers text-emerald-700 font-semibold">
                      +{formatBDT(m.grossDifference, isBangla)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-numbers font-bold text-slate-900 text-sm">
                      {formatBDT(m.netArrearsDue, isBangla)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-bold">
                <td colSpan={6} className="py-3.5 px-4 text-left">
                  {isBangla ? 'প্রদর্শিত মাসসমূহের সর্বমোট বকেয়া (Subtotal / Total)' : 'Total Arrears for Filtered Schedule'}
                </td>
                <td className="py-3.5 px-3 text-right font-mono-numbers text-emerald-400">
                  —
                </td>
                <td className="py-3.5 px-4 text-right font-mono-numbers text-amber-300 text-base">
                  {formatBDT(
                    filteredList.reduce((acc, cur) => acc + cur.netArrearsDue, 0),
                    isBangla
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
