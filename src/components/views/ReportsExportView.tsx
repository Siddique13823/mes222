import React from 'react';
import { FixationResult } from '../../types';
import { Emblem } from '../Emblem';
import { formatBDT, toBanglaNumber, numberInBanglaWords } from '../../utils/banglaNumbers';
import { exportFixationToExcel, exportArrearsToCSV } from '../../utils/excelExport';
import { MANDATORY_DISCLAIMER_BN } from '../../data/officialRules';
import { Printer, FileSpreadsheet, Download, ShieldCheck, Check } from 'lucide-react';

interface ReportsExportViewProps {
  currentResult: FixationResult;
  isBangla: boolean;
}

export const ReportsExportView: React.FC<ReportsExportViewProps> = ({
  currentResult,
  isBangla
}) => {
  const p3 = currentResult.phases.phase3;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Controls (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'অফিসিয়াল বেতন নির্ধারণ বিবরণী ও এক্সপোর্ট' : 'Official Pay Fixation Statement & Export'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'দাপ্তরিক স্বাক্ষর ও অডিটের জন্য প্রস্তুতকৃত পে-ফিক্সেশন বিবরণী। সরাসরি প্রিন্ট বা এক্সেলে ডাউনলোড করুন।' 
              : 'Audit-ready pay fixation statement. Download as Excel or print directly.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportArrearsToCSV(currentResult)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export</span>
          </button>
          
          <button
            onClick={() => exportFixationToExcel(currentResult)}
            className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>{isBangla ? 'এক্সেল ফাইল ডাউনলোড' : 'Download Excel (.xlsx)'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-emerald-300" />
            <span>{isBangla ? 'বিবরণী প্রিন্ট করুন' : 'Print Statement'}</span>
          </button>
        </div>
      </div>

      {/* Official Printable Fixation Sheet Document (Styled for Print & Screen) */}
      <div className="bg-white border border-slate-300 p-8 sm:p-12 rounded-xl shadow-xs max-w-4xl mx-auto print-shadow-none print:border-none print:p-0 print:m-0 space-y-6 text-slate-900">
        
        {/* Header with Dual Logos */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-4">
            <Emblem type="national" size="lg" />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-950 uppercase tracking-tight">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </h1>
              <h2 className="text-sm font-semibold text-slate-800">
                অর্থ মন্ত্রণালয় • অর্থ বিভাগ (বাস্তবায়ন অনুবিভাগ)
              </h2>
              <span className="text-xs text-slate-600 block mt-0.5">
                সরকারি কর্মচারী বেতন ও ভাতাদি আদেশ, ২০২৬
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                মিলিটারী ইঞ্জিনিয়ার সার্ভিসেস (MES)
              </h3>
              <span className="text-[11px] text-slate-600 block">
                ই-ইন-সি শাখা, সেনাসদর
              </span>
              <span className="text-[10px] font-mono text-slate-500 block">
                আইবাস++ ভেরিফাইড শিট
              </span>
            </div>
            <Emblem type="mes" size="lg" />
          </div>
        </div>

        {/* Title of Document */}
        <div className="text-center py-2 bg-slate-50 border border-slate-200 rounded">
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            বেতন নির্ধারণ ও বকেয়া হিসাব বিবরণী (PAY FIXATION STATEMENT)
          </h3>
          <span className="text-xs text-slate-600">
            বিধি ৭(১) ও সংশ্লিষ্ট গেজেট তফসিল অনুযায়ী প্রস্তুতকৃত
          </span>
        </div>

        {/* 1. Employee Particulars */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
            ১. কর্মকর্তা / কর্মচারীর পরিচিতি (Employee Particulars)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">নাম:</span>
              <strong className="text-slate-900">{currentResult.inputs.employeeName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">পদবী ও ট্রেড:</span>
              <strong className="text-slate-900">{currentResult.inputs.designation} ({currentResult.inputs.mesTrade})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">পরিচিতি নং / আর্মি নং:</span>
              <strong className="text-slate-900 font-mono-numbers">{currentResult.inputs.employeeId}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">দপ্তর / ইউনিট:</span>
              <strong className="text-slate-900">{currentResult.inputs.officeOrUnit}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">কর্মস্থলের এলাকা:</span>
              <strong className="text-slate-900">{currentResult.inputs.location}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">সেবাকাল ও ইনক্রিমেন্ট:</span>
              <strong className="text-slate-900">{toBanglaNumber(currentResult.inputs.serviceYears)} বছর</strong>
            </div>
          </div>
        </div>

        {/* 2. Old vs Revised Scale Comparative Matrix */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
            ২. বেতন নির্ধারণের গাণিতিক বিবরণ (Salary Fixation Formula Application)
          </h4>
          <table className="w-full text-xs border border-slate-300 divide-y divide-slate-300">
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2.5 bg-slate-50 font-medium w-1/2">
                  (ক) পূর্বতন ২০১৫ স্কেলের বিদ্যমান গ্রেড ও মূল বেতন:
                </td>
                <td className="p-2.5 font-mono-numbers font-semibold text-slate-900">
                  গ্রেড {toBanglaNumber(currentResult.oldGrade)} • মূল বেতন {formatBDT(currentResult.previousBasicSalary, isBangla)}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-medium">
                  (খ) পূর্বতন স্কেলের প্রারম্ভিক বেতন (Starting Basic of Old Scale):
                </td>
                <td className="p-2.5 font-mono-numbers text-slate-800">
                  {formatBDT(currentResult.oldStartingSalary, isBangla)}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-medium">
                  (গ) বিদ্যমান মূল বেতন ও প্রারম্ভিক বেতনের ব্যবধান (Difference = ক - খ):
                </td>
                <td className="p-2.5 font-mono-numbers font-bold text-slate-900">
                  +{formatBDT(currentResult.oldSalaryDifference, isBangla)}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-medium">
                  (ঘ) সংশোধিত ২০২৬ স্কেলের প্রারম্ভিক বেতন (Starting Basic of New Scale):
                </td>
                <td className="p-2.5 font-mono-numbers text-slate-800">
                  {formatBDT(currentResult.revisedStartingSalary, isBangla)}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-medium">
                  (ঙ) সংশোধিত স্কেলে ব্যবধান প্রয়োগের পর হিসাবকৃত বেতন (ঘ + গ):
                </td>
                <td className="p-2.5 font-mono-numbers font-bold text-slate-900">
                  {formatBDT(currentResult.calculatedRawRevisedBasic, isBangla)}
                </td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="p-2.5 font-bold text-emerald-950">
                  (চ) বিধি ৭(১) অনুযায়ী চূড়ান্ত নির্ধারিত মূল বেতন (পরবর্তী উচ্চতর ধাপ):
                </td>
                <td className="p-2.5 font-mono-numbers font-bold text-emerald-950 text-sm">
                  {formatBDT(currentResult.finalRevisedBasic, isBangla)}
                  <span className="text-xs font-normal text-emerald-800 ml-2">
                    (ধাপ {toBanglaNumber(currentResult.revisedStepIndex)}/{toBanglaNumber(currentResult.totalStepsInGrade)})
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. Allowances & Net Payout */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
            ৩. মাসিক ভাতাদি ও মোট প্রাপ্যতা (Monthly Allowances & Deductions)
          </h4>
          <table className="w-full text-xs border border-slate-300 divide-y divide-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold">
                <th className="p-2 text-left">ভাতা / কর্তন খাত</th>
                <th className="p-2 text-right">১ম পর্যায় (৫০%)</th>
                <th className="p-2 text-right">২য় পর্যায় (৭৫%)</th>
                <th className="p-2 text-right">৩য় পর্যায় (১০০% পূর্ণাঙ্গ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2 font-medium">প্রদেয় মূল বেতন (Basic Pay)</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase1.payableBasic, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase2.payableBasic, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers font-bold">{formatBDT(currentResult.phases.phase3.payableBasic, isBangla)}</td>
              </tr>
              <tr>
                <td className="p-2">বাড়ি ভাড়া ভাতা (HRA)</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase1.houseRentAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase2.houseRentAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers font-bold">{formatBDT(currentResult.phases.phase3.houseRentAllowance, isBangla)}</td>
              </tr>
              <tr>
                <td className="p-2">চিকিৎসা ভাতা (Medical)</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase1.medicalAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase2.medicalAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers font-bold">{formatBDT(currentResult.phases.phase3.medicalAllowance, isBangla)}</td>
              </tr>
              <tr>
                <td className="p-2">শিক্ষা ভাতা ও অন্যান্য (Education/MES)</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase1.educationAllowance + currentResult.phases.phase1.mesSpecialAllowance + currentResult.phases.phase1.tiffinAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase2.educationAllowance + currentResult.phases.phase2.mesSpecialAllowance + currentResult.phases.phase2.tiffinAllowance, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers font-bold">{formatBDT(currentResult.phases.phase3.educationAllowance + currentResult.phases.phase3.mesSpecialAllowance + currentResult.phases.phase3.tiffinAllowance, isBangla)}</td>
              </tr>
              <tr className="bg-slate-50 font-semibold">
                <td className="p-2 text-slate-900">মোট মাসিক বেতন (Gross Salary)</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase1.grossSalary, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers">{formatBDT(currentResult.phases.phase2.grossSalary, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers font-bold text-slate-950">{formatBDT(currentResult.phases.phase3.grossSalary, isBangla)}</td>
              </tr>
              <tr>
                <td className="p-2 text-rose-800">মোট কর্তন (GPF, কল্যাণ, কর)</td>
                <td className="p-2 text-right font-mono-numbers text-rose-800">-{formatBDT(currentResult.phases.phase1.totalDeductions, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers text-rose-800">-{formatBDT(currentResult.phases.phase2.totalDeductions, isBangla)}</td>
                <td className="p-2 text-right font-mono-numbers text-rose-800 font-bold">-{formatBDT(currentResult.phases.phase3.totalDeductions, isBangla)}</td>
              </tr>
              <tr className="bg-emerald-100/70 font-bold">
                <td className="p-2.5 text-emerald-950">নিট প্রদেয় বেতন (Net Monthly Pay)</td>
                <td className="p-2.5 text-right font-mono-numbers text-emerald-950">{formatBDT(currentResult.phases.phase1.netSalary, isBangla)}</td>
                <td className="p-2.5 text-right font-mono-numbers text-emerald-950">{formatBDT(currentResult.phases.phase2.netSalary, isBangla)}</td>
                <td className="p-2.5 text-right font-mono-numbers text-emerald-950 text-sm">{formatBDT(currentResult.phases.phase3.netSalary, isBangla)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] text-slate-500 italic mt-1">
            কথায় (নিট): {numberInBanglaWords(p3.netSalary)}
          </p>
        </div>

        {/* 4. Arrears Summary Line */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-blue-950 block">সর্বমোট আনুমানিক বকেয়া প্রদেয় (Estimated Arrears Due):</span>
            <span className="text-blue-700">জুলাই ২০২৫ হতে অক্টোবর ২০২৬ পর্যন্ত ১৬ মাসের পুঞ্জীভূত বকেয়া</span>
          </div>
          <span className="text-base font-bold font-mono-numbers text-blue-950">
            {formatBDT(currentResult.totalEstimatedArrears, isBangla)}
          </span>
        </div>

        {/* Disclaimer in Print */}
        <p className="text-[10px] text-slate-500 leading-normal border-t border-slate-200 pt-3">
          {MANDATORY_DISCLAIMER_BN}
        </p>

        {/* Official Signatures Strip */}
        <div className="pt-16 grid grid-cols-3 gap-6 text-center text-xs text-slate-800">
          <div className="border-t border-slate-400 pt-2">
            <span className="block font-semibold">কর্মচারীর স্বাক্ষর</span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">তারিখ: ....................</span>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <span className="block font-semibold">ডিডিও / যাচাইকারী কর্মকর্তা</span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">জিই / এজিই (এমইএস)</span>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <span className="block font-semibold">হিসাব রক্ষণ কর্মকর্তা / সিজিএ</span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">আইবাস++ অনুমোদন সিল</span>
          </div>
        </div>

      </div>

    </div>
  );
};
