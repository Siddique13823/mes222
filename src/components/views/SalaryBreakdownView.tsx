import React from 'react';
import { FixationResult } from '../../types';
import { formatBDT, toBanglaNumber, numberInBanglaWords } from '../../utils/banglaNumbers';
import { 
  Building, 
  HeartPulse, 
  GraduationCap, 
  Wrench, 
  Coffee, 
  Bus, 
  Sparkles, 
  Receipt, 
  ArrowUpRight, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface SalaryBreakdownViewProps {
  currentResult: FixationResult;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const SalaryBreakdownView: React.FC<SalaryBreakdownViewProps> = ({
  currentResult,
  setActiveTab,
  isBangla
}) => {
  const p3 = currentResult.phases.phase3; // 100% full implementation
  const p1 = currentResult.phases.phase1; // Phase 1 (50%)

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              {isBangla ? 'বেতন ও ভাতাদির পূর্ণাঙ্গ বিশ্লেষণ বিবরণী' : 'Full Salary & Allowance Breakdown'}
            </h2>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              {isBangla ? '১০০% বাস্তবায়ন স্কেল' : '100% Scale'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {currentResult.inputs.employeeName} · {currentResult.inputs.designation} · {currentResult.inputs.officeOrUnit}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('phase_wise')}
            className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>{isBangla ? 'পর্যায়ভিত্তিক তুলনা দেখুন' : 'Compare Phases'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
          >
            {isBangla ? 'প্রিন্ট রিপোর্ট' : 'Print Statement'}
          </button>
        </div>
      </div>

      {/* Fixation Formula Mathematical Transparency Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              {isBangla ? 'সরকারি সূত্র ও গাণিতিক ধাপ যাচাইকরণ (Mathematical Fixation Steps)' : 'Mathematical Fixation Verification'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Rule 7(1) S.R.O. 184/2026</span>
        </div>

        {/* 4-Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          {/* Step 1: Old Scale Starting */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-1">
              {isBangla ? '১. পূর্বতন স্কেলের প্রারম্ভিক' : '1. Old Scale Starting Basic'}
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono-numbers">
              {formatBDT(currentResult.oldStartingSalary, isBangla)}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              {isBangla ? `২০১৫ স্কেলে গ্রেড ${toBanglaNumber(currentResult.oldGrade)}` : `Grade ${currentResult.oldGrade} in 2015`}
            </span>
          </div>

          {/* Step 2: Difference */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block mb-1">
              {isBangla ? '২. অভিজ্ঞতার অর্জিত ব্যবধান' : '2. Experience Difference'}
            </span>
            <div className="text-lg font-bold text-slate-900 font-mono-numbers">
              +{formatBDT(currentResult.oldSalaryDifference, isBangla)}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              {isBangla ? `আহরিত: ${formatBDT(currentResult.previousBasicSalary, isBangla)}` : `Drawn: ${formatBDT(currentResult.previousBasicSalary, false)}`}
            </span>
          </div>

          {/* Step 3: Revised Start + Diff */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200">
            <span className="text-emerald-800 font-medium block mb-1">
              {isBangla ? '৩. নতুন প্রারম্ভিক + ব্যবধান' : '3. Revised Start + Diff'}
            </span>
            <div className="text-lg font-bold text-emerald-950 font-mono-numbers">
              {formatBDT(currentResult.calculatedRawRevisedBasic, isBangla)}
            </div>
            <span className="text-[11px] text-emerald-700 block mt-1">
              {formatBDT(currentResult.revisedStartingSalary, isBangla)} + {formatBDT(currentResult.oldSalaryDifference, isBangla)}
            </span>
          </div>

          {/* Step 4: Final Assigned Step */}
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200">
            <span className="text-amber-800 font-medium block mb-1">
              {isBangla ? '৪. চূড়ান্ত নির্ধারিত ধাপ বেতন' : '4. Final Fixed Pay Step'}
            </span>
            <div className="text-lg font-bold text-amber-950 font-mono-numbers">
              {formatBDT(currentResult.finalRevisedBasic, isBangla)}
            </div>
            <span className="text-[11px] text-amber-700 font-medium block mt-1">
              {isBangla 
                ? `ধাপ ${toBanglaNumber(currentResult.revisedStepIndex)} (${currentResult.isNextHigherStepApplied ? 'পরবর্তী উচ্চতর ধাপ' : 'সঠিক ধাপ'})` 
                : `Step ${currentResult.revisedStepIndex}`}
            </span>
          </div>

        </div>

        <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-start gap-2 border border-slate-100">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-800">
              {isBangla ? 'বেতন সংরক্ষণ ও সিনিয়রিটির প্রতিফলন: ' : 'Pay Protection & Seniority Guarantee: '}
            </span>
            {isBangla 
              ? '১০, ২০ বা ৩০ বছরের অভিজ্ঞতাসম্পন্ন কোনো কর্মচারীর বেতন প্রারম্ভিক ধাপে নির্ধারিত হয় না। বিদ্যমান মূল বেতন ও প্রারম্ভিক বেতনের মধ্যকার ব্যবধান পূর্ণাঙ্গভাবে নতুন স্কেলে স্থানান্তরিত হয়।'
              : 'Senior employees with 10, 20, or 30+ years of active service do not start at the bottom step. Their exact cumulative increment progression is directly applied to the revised scale.'}
          </div>
        </div>
      </div>

      {/* Allowances & Deductions Full Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Monthly Allowances */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              {isBangla ? 'মাসিক ভাতাদির বিবরণ (Allowances)' : 'Monthly Allowances Breakdown'}
            </h3>
            <span className="text-xs text-emerald-800 font-semibold font-mono-numbers">
              {formatBDT(p3.totalAllowances, isBangla)}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* House Rent */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-blue-100 text-blue-800">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {isBangla ? 'বাড়ি ভাড়া ভাতা (House Rent Allowance)' : 'House Rent Allowance (HRA)'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {currentResult.inputs.location === 'dhaka_metro' && (isBangla ? 'ঢাকা মেট্রোপলিটন এলাকা (৬৫% - ৫০% স্ল্যাব)' : 'Dhaka Metro (65% - 50% slab)')}
                    {currentResult.inputs.location === 'other_city_corp' && (isBangla ? 'সিটি কর্পোরেশন এলাকা (৫৫% - ৪০% স্ল্যাব)' : 'City Corp (55% - 40% slab)')}
                    {currentResult.inputs.location === 'district_sadar' && (isBangla ? 'জেলা সদর এলাকা (৫০% - ৩৫% স্ল্যাব)' : 'District Sadar (50% - 35% slab)')}
                    {currentResult.inputs.location === 'other_cantonment' && (isBangla ? 'সেনানিবাস / উপজেলা এলাকা (৪৫% - ৩০% স্ল্যাব)' : 'Cantonment / Upazila (45% - 30% slab)')}
                    {currentResult.inputs.location === 'govt_quarter' && (isBangla ? 'সরকারি কোয়ার্টার বরাদ্দ (০%)' : 'Govt Allocated Quarter (0%)')}
                  </span>
                </div>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.houseRentAllowance, isBangla)}
              </span>
            </div>

            {/* Medical Allowance */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-rose-100 text-rose-800">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {isBangla ? 'চিকিৎসা ভাতা (Medical Allowance)' : 'Medical Allowance'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {currentResult.inputs.isSeniorCitizen 
                      ? (isBangla ? 'বয়স ৬৫+ বছর (সংশোধিত হার ৳৩,০০০)' : 'Age 65+ yrs (Revised ৳3,000)')
                      : (isBangla ? 'সাধারণ কর্মকর্তা-কর্মচারী (সংশোধিত হার ৳২,৫০০)' : 'Standard rate (Revised ৳2,500)')}
                  </span>
                </div>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.medicalAllowance, isBangla)}
              </span>
            </div>

            {/* Education Allowance */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-amber-100 text-amber-800">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">
                    {isBangla ? 'শিক্ষা সহায়ক ভাতা (Education Allowance)' : 'Education Allowance'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {currentResult.inputs.childrenCount === 0 && (isBangla ? 'প্রযোজ্য নয় (০ সন্তান)' : 'Not applicable (0 child)')}
                    {currentResult.inputs.childrenCount === 1 && (isBangla ? '১ সন্তান (সংশোধিত হার ৳১,৫০০)' : '1 child (Revised ৳1,500)')}
                    {currentResult.inputs.childrenCount >= 2 && (isBangla ? '২ বা ততোধিক সন্তান (সংশোধিত হার ৳৩,০০০)' : '2+ children (Revised ৳3,000)')}
                  </span>
                </div>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.educationAllowance, isBangla)}
              </span>
            </div>

            {/* MES Technical Allowance */}
            {p3.mesSpecialAllowance > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-emerald-100 text-emerald-800">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-950 block">
                      {isBangla ? 'এমইএস কারিগরি / বিশেষ ভাতা (MES Technical Allowance)' : 'MES Technical / Special Allowance'}
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      {isBangla ? 'ক্যান্টনমেন্ট ও ফিল্ড অবকাঠামো নির্মাণ দায়িত্ব' : 'Field & Cantonment infrastructure duties'}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-emerald-950 text-sm font-mono-numbers">
                  {formatBDT(p3.mesSpecialAllowance, isBangla)}
                </span>
              </div>
            )}

            {/* Tiffin Allowance */}
            {p3.tiffinAllowance > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-orange-100 text-orange-800">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {isBangla ? 'টিফিন ভাতা (Tiffin Allowance)' : 'Tiffin Allowance'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isBangla ? 'গ্রেড ১১ হতে ২০ পর্যন্ত কর্মকর্তা-কর্মচারীদের জন্য' : 'Eligible for Grades 11 - 20'}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                  {formatBDT(p3.tiffinAllowance, isBangla)}
                </span>
              </div>
            )}

            {/* Conveyance Allowance */}
            {p3.conveyanceAllowance > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-indigo-100 text-indigo-800">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {isBangla ? 'যাতায়াত ভাতা (Conveyance Allowance)' : 'Conveyance Allowance'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isBangla ? 'সরকারি পুল যানবাহন সুবিধাহীন গ্রেড ১১-২০' : 'Grades 11-20 without official transport'}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                  {formatBDT(p3.conveyanceAllowance, isBangla)}
                </span>
              </div>
            )}

            {/* Washing Allowance */}
            {p3.washingAllowance > 0 && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-md bg-teal-100 text-teal-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {isBangla ? 'ধোলাই ভাতা (Washing Allowance)' : 'Washing Allowance'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isBangla ? 'ইউনিফর্ম ও কারিগরি ট্রেড কর্মচারীদের জন্য' : 'For uniform / artisan staff'}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                  {formatBDT(p3.washingAllowance, isBangla)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Deductions & Net Payout */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">
              {isBangla ? 'আইনসম্মত কর্তনসমূহ (Deductions)' : 'Mandatory Deductions'}
            </h3>
            <span className="text-xs text-rose-800 font-semibold font-mono-numbers">
              -{formatBDT(p3.totalDeductions, isBangla)}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* GPF */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">
                  {isBangla ? 'সাধারণ ভবিষ্য তহবিল (GPF Contribution)' : 'General Provident Fund (GPF)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isBangla ? `মূল বেতনের ${toBanglaNumber(currentResult.inputs.gpfPercentage)}% হারে নিজস্ব সঞ্চয়` : `${currentResult.inputs.gpfPercentage}% of basic pay`}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.gpfDeduction, isBangla)}
              </span>
            </div>

            {/* Benevolent Fund */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">
                  {isBangla ? 'কল্যাণ তহবিল (Benevolent Fund)' : 'Benevolent Fund'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isBangla ? '১% (সর্বোচ্চ ২৫০ টাকা)' : '1% (Max ৳250)'}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.benevolentFundDeduction, isBangla)}
              </span>
            </div>

            {/* Group Insurance */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">
                  {isBangla ? 'যৌথ বীমা প্রিমিয়াম (Group Insurance)' : 'Group Insurance'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isBangla ? 'সরকারি নির্ধারিত মাসিক প্রিমিয়াম' : 'Official statutory premium'}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.groupInsuranceDeduction, isBangla)}
              </span>
            </div>

            {/* Income Tax TDS */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <span className="font-semibold text-slate-800 block">
                  {isBangla ? 'অগ্রিম আয়কর কর্তন (Income Tax TDS)' : 'Income Tax (TDS)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {p3.incomeTaxTds > 0 
                    ? (isBangla ? 'করযোগ্য আয়ের আনুমানিক মাসিক উৎস কর' : 'Estimated monthly tax deduction')
                    : (isBangla ? 'করমুক্ত সীমার মধ্যে' : 'Within tax exemption threshold')}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-sm font-mono-numbers">
                {formatBDT(p3.incomeTaxTds, isBangla)}
              </span>
            </div>
          </div>

          {/* Final Net Pay Highlight Card */}
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>{isBangla ? 'সর্বমোট মাসিক নিট প্রদেয় বেতন (Net Salary)' : 'Total Net Monthly Salary'}</span>
              <span className="text-amber-400 font-semibold">{isBangla ? 'হাতে প্রাপ্য' : 'In-hand Pay'}</span>
            </div>
            <div className="text-3xl font-bold font-mono-numbers text-white">
              {formatBDT(p3.netSalary, isBangla)}
            </div>
            <div className="text-[11px] text-slate-300 border-t border-slate-800 pt-2 flex items-center justify-between">
              <span>{isBangla ? 'কথায়:' : 'In Words:'}</span>
              <span className="text-amber-300 font-medium">{numberInBanglaWords(p3.netSalary)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
