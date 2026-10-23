import React, { useState, useEffect } from 'react';
import { 
  FixationInput, 
  FixationResult, 
  EmployeeCategory, 
  MESTrade, 
  LocationCategory 
} from '../../types';
import { calculateSalaryFixation } from '../../utils/calculator';
import { findMatchingOldGrade, PAY_SCALE_2015, getOldScaleGrade } from '../../data/payScales';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  RefreshCw,
  Building,
  MapPin,
  Award,
  Users
} from 'lucide-react';

interface SalaryCalculatorViewProps {
  currentResult: FixationResult;
  onCalculationComplete: (result: FixationResult) => void;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const SalaryCalculatorView: React.FC<SalaryCalculatorViewProps> = ({
  currentResult,
  onCalculationComplete,
  setActiveTab,
  isBangla
}) => {
  // Input Form State
  const [previousBasic, setPreviousBasic] = useState<number>(currentResult.inputs.previousBasicSalary || 27430);
  const [grade, setGrade] = useState<number>(currentResult.inputs.grade || 10);
  const [employeeCategory, setEmployeeCategory] = useState<EmployeeCategory>(currentResult.inputs.employeeCategory || 'mes_technical');
  const [mesTrade, setMesTrade] = useState<MESTrade>(currentResult.inputs.mesTrade || 'SAE');
  const [employeeName, setEmployeeName] = useState<string>(currentResult.inputs.employeeName || 'মোঃ রফিকুল ইসলাম');
  const [employeeId, setEmployeeId] = useState<string>(currentResult.inputs.employeeId || 'MES-10492');
  const [designation, setDesignation] = useState<string>(currentResult.inputs.designation || 'উপ-সহকারী প্রকৌশলী (SAE B/R)');
  const [officeOrUnit, setOfficeOrUnit] = useState<string>(currentResult.inputs.officeOrUnit || 'জিই (আর্মি) সেন্ট্রাল, ঢাকা সেনানিবাস');
  const [location, setLocation] = useState<LocationCategory>(currentResult.inputs.location || 'dhaka_metro');
  const [referenceDate, setReferenceDate] = useState<string>(currentResult.inputs.referenceDate || '2025-07-01');
  const [serviceYears, setServiceYears] = useState<number>(currentResult.inputs.serviceYears || 14);
  const [hasPromotion, setHasPromotion] = useState<boolean>(currentResult.inputs.hasPromotionOrHigherGrade || false);
  const [higherGrade, setHigherGrade] = useState<number>(currentResult.inputs.higherGrade || 9);
  const [childrenCount, setChildrenCount] = useState<number>(currentResult.inputs.childrenCount ?? 2);
  const [gpfPercentage, setGpfPercentage] = useState<number>(currentResult.inputs.gpfPercentage || 12);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(currentResult.inputs.isSeniorCitizen || false);

  // Auto-detection indicator
  const [detectedGradeInfo, setDetectedGradeInfo] = useState<{ grade: number; exact: boolean; step: number } | null>(null);

  // Animation states
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculationStep, setCalculationStep] = useState<number>(0);
  const [calculationLog, setCalculationLog] = useState<{ step: number; title: string; detail: string }[]>([]);

  // When previous basic changes, detect the grade automatically
  useEffect(() => {
    if (previousBasic > 0) {
      const detected = findMatchingOldGrade(previousBasic);
      if (detected) {
        setDetectedGradeInfo({
          grade: detected.grade,
          exact: detected.exactMatch,
          step: detected.stepIndex
        });
      } else {
        setDetectedGradeInfo(null);
      }
    }
  }, [previousBasic]);

  const handleApplyDetectedGrade = () => {
    if (detectedGradeInfo) {
      setGrade(detectedGradeInfo.grade);
    }
  };

  // Run the animated step-by-step calculation
  const handleCalculate = () => {
    setIsCalculating(true);
    setCalculationStep(1);
    setCalculationLog([]);

    const inputData: FixationInput = {
      previousBasicSalary: previousBasic,
      grade,
      employeeCategory,
      mesTrade,
      employeeName,
      employeeId,
      designation,
      officeOrUnit,
      location,
      referenceDate,
      serviceYears,
      hasPromotionOrHigherGrade: hasPromotion,
      higherGrade: hasPromotion ? higherGrade : undefined,
      childrenCount,
      gpfPercentage,
      isSeniorCitizen
    };

    const finalResult = calculateSalaryFixation(inputData);

    const animationSteps = [
      {
        step: 1,
        title: isBangla ? '১. কর্মচারী তথ্য যাচাই সম্পন্ন' : '1. Employee Information Validated',
        detail: `${inputData.employeeName} (${inputData.designation}) · ${inputData.officeOrUnit}`
      },
      {
        step: 2,
        title: isBangla ? '২. প্রযোজ্য স্কেল ও গ্রেড সনাক্তকরণ' : '2. Applicable Grade Identified',
        detail: isBangla ? `জাতীয় বেতন স্কেল ২০১৫: গ্রেড ${toBanglaNumber(grade)}` : `National Pay Scale 2015: Grade ${grade}`
      },
      {
        step: 3,
        title: isBangla ? '৩. পূর্বতন স্কেলের প্রারম্ভিক বেতন যাচাই' : '3. Old Scale Starting Basic Verified',
        detail: isBangla ? `গ্রেড ${toBanglaNumber(grade)} এর প্রারম্ভিক ধাপ: ${formatBDT(finalResult.oldStartingSalary, true)}` : `Starting basic for Grade ${grade}: ${formatBDT(finalResult.oldStartingSalary, false)}`
      },
      {
        step: 4,
        title: isBangla ? '৪. বিদ্যমান মূল বেতন ও অভিজ্ঞতার ধাপ যাচাই' : '4. Existing Basic Salary Verified',
        detail: isBangla ? `বিদ্যমান মূল বেতন: ${formatBDT(previousBasic, true)} (${toBanglaNumber(serviceYears)} বছর চাকরি)` : `Existing basic: ${formatBDT(previousBasic, false)} (${serviceYears} yrs active service)`
      },
      {
        step: 5,
        title: isBangla ? '৫. বেতন ব্যবধান (Difference) নিরূপণ' : '5. Career Salary Difference Computed',
        detail: isBangla ? `ব্যবধান = ${formatBDT(previousBasic, true)} - ${formatBDT(finalResult.oldStartingSalary, true)} = ${formatBDT(finalResult.oldSalaryDifference, true)}` : `Difference = ${formatBDT(previousBasic, false)} - ${formatBDT(finalResult.oldStartingSalary, false)} = ${formatBDT(finalResult.oldSalaryDifference, false)}`
      },
      {
        step: 6,
        title: isBangla ? '৬. সংশোধিত স্কেলে ব্যবধান প্রয়োগ' : '6. Formula Applied to Revised Scale',
        detail: isBangla ? `নতুন শুরু (${formatBDT(finalResult.revisedStartingSalary, true)}) + ব্যবধান (${formatBDT(finalResult.oldSalaryDifference, true)}) = ${formatBDT(finalResult.calculatedRawRevisedBasic, true)}` : `Revised start (${formatBDT(finalResult.revisedStartingSalary, false)}) + diff = ${formatBDT(finalResult.calculatedRawRevisedBasic, false)}`
      },
      {
        step: 7,
        title: isBangla ? '৭. বিধি ৭(১) অনুযায়ী সংশোধিত ধাপ নির্ধারণ' : '7. Revised Step Assigned with Protection',
        detail: isBangla ? `চূড়ান্ত নতুন মূল বেতন: ${formatBDT(finalResult.finalRevisedBasic, true)} (ধাপ ${toBanglaNumber(finalResult.revisedStepIndex)})` : `Final revised basic: ${formatBDT(finalResult.finalRevisedBasic, false)} (Step ${finalResult.revisedStepIndex})`
      },
      {
        step: 8,
        title: isBangla ? '৮. ৫০%, ৭৫% ও ১০০% পর্যায়ক্রমিক হিসাব' : '8. Phased Implementation Computed',
        detail: isBangla ? `১ম পর্যায়: ${formatBDT(finalResult.phases.phase1.payableBasic, true)} · ৩য় পর্যায় (পূর্ণাঙ্গ): ${formatBDT(finalResult.phases.phase3.payableBasic, true)}` : `Phase 1: ${formatBDT(finalResult.phases.phase1.payableBasic, false)} · Phase 3 (100%): ${formatBDT(finalResult.phases.phase3.payableBasic, false)}`
      },
      {
        step: 9,
        title: isBangla ? '৯. বাড়িভাড়া ও ভাতাদি নিরূপণ' : '9. Location Allowances Computed',
        detail: isBangla ? `বাড়িভাড়া (${finalResult.inputs.location}): ${formatBDT(finalResult.phases.phase3.houseRentAllowance, true)} · মোট ভাতা: ${formatBDT(finalResult.phases.phase3.totalAllowances, true)}` : `HRA: ${formatBDT(finalResult.phases.phase3.houseRentAllowance, false)} · Total Allowances: ${formatBDT(finalResult.phases.phase3.totalAllowances, false)}`
      },
      {
        step: 10,
        title: isBangla ? '১০. জিপিএফ ও আইনসম্মত কর্তন হিসাব' : '10. Deductions & Net Salary Calculated',
        detail: isBangla ? `জিপিএফ ও কর্তন: ${formatBDT(finalResult.phases.phase3.totalDeductions, true)} · নিট প্রদেয়: ${formatBDT(finalResult.phases.phase3.netSalary, true)}` : `Deductions: ${formatBDT(finalResult.phases.phase3.totalDeductions, false)} · Net Monthly: ${formatBDT(finalResult.phases.phase3.netSalary, false)}`
      },
      {
        step: 11,
        title: isBangla ? '১১. ১৬ মাসের বকেয়া হিসাব সম্পন্ন' : '11. Arrears Schedule & Ledger Generated',
        detail: isBangla ? `মোট প্রদেয় বকেয়া: ${formatBDT(finalResult.totalEstimatedArrears, true)}` : `Total Estimated Arrears: ${formatBDT(finalResult.totalEstimatedArrears, false)}`
      },
      {
        step: 12,
        title: isBangla ? '১২. বেতন নির্ধারণ সফলভাবে সম্পন্ন ও সংরক্ষিত!' : '12. Pay Fixation Finalized Successfully!',
        detail: isBangla ? 'ফলাফল দেখতে নিচের বাটনে ক্লিক করুন অথবা রিপোর্ট ট্যাব দেখুন।' : 'Click below to inspect full salary breakdown or print official statement.'
      }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < animationSteps.length) {
        const item = animationSteps[currentIdx];
        setCalculationStep(item.step);
        setCalculationLog(prev => [...prev, item]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsCalculating(false);
        onCalculationComplete(finalResult);
      }
    }, 180); // Quick, snappy step progression
  };

  const handleQuickPreset = (presetGrade: number, presetSalary: number, presetDesig: string, presetTrade: MESTrade) => {
    setGrade(presetGrade);
    setPreviousBasic(presetSalary);
    setDesignation(presetDesig);
    setMesTrade(presetTrade);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'সরকারি কর্মচারী বেতন নির্ধারণ ফরম (Pay Fixation Engine)' : 'Official Pay Fixation Form'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isBangla 
              ? 'পূর্বতন স্কেলের বিদ্যমান মূল বেতন লিখুন। সিস্টেম স্বয়ংক্রিয়ভাবে গ্রেড ও ধাপ সমন্বয় করবে।' 
              : 'Enter previous basic pay under 2015 scale. System identifies grade and fixes revised pay.'}
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] mr-1">{isBangla ? 'নমুনা পদ:' : 'Presets:'}</span>
          <button
            type="button"
            onClick={() => handleQuickPreset(10, 27430, 'উপ-সহকারী প্রকৌশলী (SAE B/R)', 'SAE')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 rounded text-slate-700 transition-colors"
          >
            {isBangla ? 'SAE (গ্রেড ১০)' : 'SAE (Grade 10)'}
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(9, 37680, 'সহকারী প্রকৌশলী (AE E/M)', 'AE')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 rounded text-slate-700 transition-colors"
          >
            {isBangla ? 'AE (গ্রেড ৯)' : 'AE (Grade 9)'}
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(14, 17520, 'উচ্চমান সহকারী (UDC Store)', 'ClericalStore')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 rounded text-slate-700 transition-colors"
          >
            {isBangla ? 'UDC (গ্রেড ১৪)' : 'UDC (Grade 14)'}
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(18, 13710, 'কারিগরি ফিটার / ইলেকট্রিশিয়ান', 'ArtisanTradesman')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 rounded text-slate-700 transition-colors"
          >
            {isBangla ? 'ট্রেডসম্যান (গ্রেড ১৮)' : 'Tradesman (Gr 18)'}
          </button>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Section 1: THE MOST PROMINENT FIELD: Previous Basic Salary */}
        <div className="p-6 bg-gradient-to-b from-emerald-50/70 to-white border-b border-slate-200">
          <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
            {isBangla ? '১. পূর্ববর্তী স্কেলের মূল বেতন (Previous Basic Salary - ২০১৫ স্কেল) *' : '1. Previous Basic Salary (2015 Scale) *'}
          </label>

          <div className="relative max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-800 font-bold text-xl">
              ৳
            </span>
            <input
              type="number"
              value={previousBasic || ''}
              onChange={(e) => setPreviousBasic(Number(e.target.value))}
              placeholder="e.g. 27430"
              className="w-full pl-10 pr-4 py-3.5 text-2xl sm:text-3xl font-bold font-mono-numbers text-slate-900 bg-white border-2 border-emerald-600 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-700 outline-none transition-all shadow-xs"
            />
          </div>

          {/* Bengali In Words & Auto-Detection Feedback */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="text-slate-600 font-medium">
              <span>{isBangla ? 'অংকে:' : 'Formatted:'} </span>
              <span className="font-bold text-slate-900 font-mono-numbers">{formatBDT(previousBasic, isBangla)}</span>
            </div>

            {detectedGradeInfo && (
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {isBangla 
                    ? `২০১৫ স্কেলে গ্রেড ${toBanglaNumber(detectedGradeInfo.grade)} সনাক্তকৃত (${detectedGradeInfo.exact ? 'সঠিক ধাপ' : 'নিকটবর্তী ধাপ'})` 
                    : `Grade ${detectedGradeInfo.grade} detected (${detectedGradeInfo.exact ? 'Exact step' : 'Closest step'})`}
                </span>
                {grade !== detectedGradeInfo.grade && (
                  <button
                    type="button"
                    onClick={handleApplyDetectedGrade}
                    className="underline font-bold text-emerald-950 hover:text-black ml-1"
                  >
                    {isBangla ? 'গ্রেড প্রয়োগ করুন' : 'Apply Grade'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Core Categorization & Grade Fields */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Grade Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'পূর্ববর্তী গ্রেড (Old Scale Grade) *' : 'Old Scale Grade *'}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                {PAY_SCALE_2015.map((g) => (
                  <option key={g.grade} value={g.grade}>
                    {isBangla ? `${g.gradeBn} (প্রারম্ভিক: ৳${g.minSalary.toLocaleString()})` : `Grade ${g.grade} (Start: ৳${g.minSalary.toLocaleString()})`}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {isBangla ? '২০১৫ জাতীয় পে-স্কেলের গ্রেড' : '8th National Pay Scale Grade'}
              </span>
            </div>

            {/* Employee Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'কর্মচারী ক্যাটাগরি ও পে-অর্ডার *' : 'Employee Category & Pay Order *'}
              </label>
              <select
                value={employeeCategory}
                onChange={(e) => setEmployeeCategory(e.target.value as EmployeeCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="mes_technical">MES - টেকনিক্যাল / ইঞ্জিনিয়ারিং (Military Engineer Services)</option>
                <option value="mes_admin">MES - প্রশাসনিক / স্টোর / ক্লারিক্যাল</option>
                <option value="defence_civilian">প্রতিরক্ষা বেসামরিক (Defence Civilian - AHQ/NHQ/Air HQ)</option>
                <option value="civil_general">সাধারণ বেসামরিক প্রশাসন (General Civil Service)</option>
                <option value="education_cadre">শিক্ষা ক্যাডার / শিক্ষক</option>
                <option value="health_services">স্বাস্থ্য ও চিকিৎসা সেবা</option>
                <option value="autonomous_body">স্বায়ত্তশাসিত / রাষ্ট্রায়ত্ত সংস্থা</option>
              </select>
            </div>

            {/* MES Branch / Trade (Conditional for MES) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'এমইএস শাখা / ট্রেড (MES Branch / Trade)' : 'MES Branch / Trade'}
              </label>
              <select
                value={mesTrade}
                onChange={(e) => setMesTrade(e.target.value as MESTrade)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="SAE">উপ-সহকারী প্রকৌশলী (SAE - গ্রেড ১০)</option>
                <option value="AE">সহকারী প্রকৌশলী (AE - গ্রেড ৯)</option>
                <option value="BR">বিল্ডিং অ্যান্ড রোড (B/R শাখা)</option>
                <option value="EM">ইলেকট্রিক্যাল অ্যান্ড মেকানিক্যাল (E/M শাখা)</option>
                <option value="FS">ফার্নিচার অ্যান্ড স্টোর (F/S শাখা)</option>
                <option value="Surveyor">সার্ভেয়ার (Surveyor)</option>
                <option value="Draftsman">ড্রাফটসম্যান (Draftsman)</option>
                <option value="ExecutiveEngineer">নির্বাহী প্রকৌশলী (XEN - গ্রেড ৬)</option>
                <option value="ClericalStore">ইউডিসি / স্টোরকিপার / অফিস সহকারী</option>
                <option value="ArtisanTradesman">কারিগরি ফিটার / ইলেকট্রিশিয়ান / মেসন</option>
              </select>
            </div>

          </div>

          {/* Section 3: Personnel & Office Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            
            {/* Employee Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'কর্মকর্তা / কর্মচারীর নাম' : 'Employee Name'}
              </label>
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="e.g. মোঃ রফিকুল ইসলাম"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Employee ID / Army No */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'পরিচিতি নং / আর্মি নং / NID' : 'Employee ID / NID'}
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. MES-10492"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'পদবী (Designation)' : 'Designation'}
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. উপ-সহকারী প্রকৌশলী"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

          </div>

          {/* Section 4: Location, Service History & Allowances Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            
            {/* Work Location (for House Rent Allowance) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isBangla ? 'কর্মস্থল / বাসস্থান ধরন (বাড়িভাড়া নির্ধারণ) *' : 'Work Location (HRA Slab) *'}</span>
                </span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as LocationCategory)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="dhaka_metro">ঢাকা মেট্রোপলিটন এলাকা (৬৫% - ৫০%)</option>
                <option value="other_city_corp">অন্যান্য সিটি কর্পোরেশন (চট্টগ্রাম, খুলনা ইত্যাদি - ৫৫% - ৪০%)</option>
                <option value="district_sadar">জেলা সদর এলাকা (৫০% - ৩৫%)</option>
                <option value="other_cantonment">সেনানিবাস / উপজেলা / অন্যান্য (৪৫% - ৩০%)</option>
                <option value="govt_quarter">সরকারি বাসা বরাদ্দপ্রাপ্ত (বাড়িভাড়া ০%)</option>
              </select>
            </div>

            {/* Years of Service (Seniority increments) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'চাকরিতে সক্রিয় সেবাকাল (বছর)' : 'Years of Active Service'}
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={serviceYears}
                onChange={(e) => setServiceYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                {isBangla ? '১০, ২০, ৩০ বছরের অভিজ্ঞতায় অর্জিত ইনক্রিমেন্ট স্বয়ংক্রিয় গণনাকৃত' : 'Seniority increments automatically preserved'}
              </span>
            </div>

            {/* Reference Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'বেতন নির্ধারণ কার্যকর তারিখ' : 'Reference / Effective Date'}
              </label>
              <input
                type="date"
                value={referenceDate}
                onChange={(e) => setReferenceDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

          </div>

          {/* Section 5: Children, GPF & Promotions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            
            {/* Children count for Education allowance */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'অধ্যয়নরত সন্তান সংখ্যা (শিক্ষা ভাতা)' : 'Schooling Children Count'}
              </label>
              <select
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="0">{isBangla ? 'সন্তান নেই (৳০)' : '0 Children (৳0)'}</option>
                <option value="1">{isBangla ? '১ সন্তান (৳১,৫০০)' : '1 Child (৳1,500)'}</option>
                <option value="2">{isBangla ? '২ বা ততোধিক সন্তান (৳৩,০০০)' : '2+ Children (৳3,000)'}</option>
              </select>
            </div>

            {/* GPF Contribution % */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isBangla ? 'ভবিষ্য তহবিল (জিপিএফ) কর্তন %' : 'GPF Contribution %'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="5"
                  max="25"
                  value={gpfPercentage}
                  onChange={(e) => setGpfPercentage(Number(e.target.value))}
                  className="w-24 px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <span className="text-xs text-slate-500">
                  {isBangla ? 'ন্যূনতম ৫% হতে সর্বোচ্চ ২৫%' : 'Min 5% to Max 25%'}
                </span>
              </div>
            </div>

            {/* Higher Grade / Promotion Toggle */}
            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={hasPromotion}
                  onChange={(e) => setHasPromotion(e.target.checked)}
                  className="w-4 h-4 text-emerald-800 rounded border-slate-300 focus:ring-emerald-500"
                />
                <span>{isBangla ? 'টাইমস্কেল / উচ্চতর গ্রেড প্রাপ্ত' : 'Higher Grade / Time Scale Received'}</span>
              </label>

              {hasPromotion && (
                <div className="mt-2">
                  <select
                    value={higherGrade}
                    onChange={(e) => setHigherGrade(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-amber-50/50 border border-amber-300 rounded-lg text-amber-950 font-medium"
                  >
                    {[...Array(grade - 1)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {isBangla ? `উচ্চতর গ্রেড: গ্রেড ${toBanglaNumber(i + 1)}` : `Higher Grade: Grade ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

          </div>

          {/* Calculate Action Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>
                {isBangla 
                  ? 'অর্থ মন্ত্রণালয়ের বেতন বিধি ৭(১) ও বেতন সংরক্ষণ নীতি অনুযায়ী গণনা করা হবে।' 
                  : 'Computed under Ministry of Finance Rule 7(1) with salary protection.'}
              </span>
            </div>

            <button
              type="button"
              disabled={isCalculating || previousBasic <= 0}
              onClick={handleCalculate}
              className={`w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 ${
                isCalculating 
                  ? 'bg-emerald-950 cursor-wait' 
                  : 'bg-emerald-800 hover:bg-emerald-900 active:scale-98 hover:shadow-lg'
              }`}
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>{isBangla ? 'গণনা ও যাচাই চলছে...' : 'Validating & Computing...'}</span>
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>{isBangla ? 'নতুন বেতন নির্ধারণ করুন (Calculate New Salary)' : 'Calculate New Salary'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Animated Calculation Stepper Sequence */}
      {(isCalculating || calculationLog.length > 0) && (
        <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                {isBangla ? 'স্বয়ংক্রিয় বেতন নির্ধারণ যাচাইকরণ ধাপসমূহ' : 'Animated Pay Fixation Verification Sequence'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono-numbers">
              {calculationStep} / 12
            </span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-2 no-scrollbar">
            {calculationLog.map((log) => (
              <div 
                key={log.step}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">{log.title}</div>
                  <div className="text-slate-400 font-mono-numbers mt-0.5">{log.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {!isCalculating && calculationLog.length >= 12 && (
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isBangla ? 'সকল সরকারি বিধিমালার শর্ত পূরণ সাপেক্ষে বেতন সংরক্ষিত হয়েছে।' : 'All official gazette conditions verified successfully.'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('breakdown')}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>{isBangla ? 'বেতনের বিস্তারিত দেখুন' : 'View Salary Breakdown'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calculated Results Card (Hero Summary) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
              {isBangla ? 'সর্বশেষ হিসাব ফলাফল' : 'Latest Fixation Summary'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {currentResult.inputs.employeeName} · {currentResult.inputs.designation}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('phase_wise')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {isBangla ? 'ধাপভিত্তিক তালিকা' : 'Phase-wise'}
            </button>
            <button
              onClick={() => setActiveTab('arrears')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {isBangla ? 'বকেয়া হিসাব' : 'Arrears'}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              {isBangla ? 'অফিসিয়াল রিপোর্ট' : 'Official Report'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">{isBangla ? 'পূর্ববর্তী মূল বেতন' : 'Previous Basic Pay'}</span>
            <div className="text-xl font-bold text-slate-800 font-mono-numbers">
              {formatBDT(currentResult.previousBasicSalary, isBangla)}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {isBangla ? `গ্রেড ${toBanglaNumber(currentResult.oldGrade)}` : `Grade ${currentResult.oldGrade}`}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-800 font-semibold block mb-1">{isBangla ? 'সংশোধিত মূল বেতন (১০০%)' : 'Revised Full Basic'}</span>
            <div className="text-2xl font-bold text-emerald-950 font-mono-numbers">
              {formatBDT(currentResult.finalRevisedBasic, isBangla)}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              {isBangla ? `ধাপ ${toBanglaNumber(currentResult.revisedStepIndex)} (${currentResult.isNextHigherStepApplied ? 'পরবর্তী উচ্চতর ধাপ' : 'সঠিক ধাপ'})` : `Step ${currentResult.revisedStepIndex}`}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-xs text-amber-800 font-semibold block mb-1">{isBangla ? '১ম পর্যায় প্রদেয় মূল বেতন' : 'Phase 1 Payable Basic'}</span>
            <div className="text-xl font-bold text-amber-950 font-mono-numbers">
              {formatBDT(currentResult.phases.phase1.payableBasic, isBangla)}
            </div>
            <span className="text-[11px] text-amber-700 mt-1 block">
              {isBangla ? '৫০% সুবিধা (১ জুলাই ২০২৫)' : '50% stage benefit'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-xs text-blue-800 font-semibold block mb-1">{isBangla ? 'মাসিক বেতন বৃদ্ধি (গ্রস)' : 'Gross Monthly Increase'}</span>
            <div className="text-xl font-bold text-blue-950 font-mono-numbers">
              +{formatBDT(currentResult.phases.phase3.monthlyDifference, isBangla)}
            </div>
            <span className="text-[11px] text-blue-700 mt-1 block">
              {isBangla ? `প্রবৃদ্ধি: +${currentResult.fullPercentageIncrease}%` : `Growth: +${currentResult.fullPercentageIncrease}%`}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
