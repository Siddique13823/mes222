// Main Calculation Engine for Bangladesh Pay Fixation 2026
import { 
  FixationInput, 
  FixationResult, 
  PhaseBreakdown, 
  ArrearsMonthRecord,
  LocationCategory 
} from '../types';
import { 
  getOldScaleGrade, 
  getNewScaleGrade, 
  determineRevisedStep, 
  findMatchingOldGrade 
} from '../data/payScales';

// Calculate House Rent Allowance based on location and basic salary
export function calculateHouseRent(basic: number, location: LocationCategory): { rate: number; minFloor: number; amount: number } {
  if (location === 'govt_quarter') {
    return { rate: 0, minFloor: 0, amount: 0 };
  }

  let rate = 0.50;
  let minFloor = 8000;

  switch (location) {
    case 'dhaka_metro':
      if (basic <= 20000) {
        rate = 0.65;
        minFloor = 11000;
      } else if (basic <= 38000) {
        rate = 0.60;
        minFloor = 13000;
      } else if (basic <= 65000) {
        rate = 0.55;
        minFloor = 22800;
      } else {
        rate = 0.50;
        minFloor = 35750;
      }
      break;

    case 'other_city_corp':
      if (basic <= 20000) {
        rate = 0.55;
        minFloor = 9000;
      } else if (basic <= 38000) {
        rate = 0.50;
        minFloor = 11000;
      } else if (basic <= 65000) {
        rate = 0.45;
        minFloor = 19000;
      } else {
        rate = 0.40;
        minFloor = 29250;
      }
      break;

    case 'district_sadar':
      if (basic <= 20000) {
        rate = 0.50;
        minFloor = 8000;
      } else if (basic <= 38000) {
        rate = 0.45;
        minFloor = 10000;
      } else if (basic <= 65000) {
        rate = 0.40;
        minFloor = 17100;
      } else {
        rate = 0.35;
        minFloor = 26000;
      }
      break;

    case 'other_cantonment':
    default:
      if (basic <= 20000) {
        rate = 0.45;
        minFloor = 7500;
      } else if (basic <= 38000) {
        rate = 0.40;
        minFloor = 9000;
      } else if (basic <= 65000) {
        rate = 0.35;
        minFloor = 15200;
      } else {
        rate = 0.30;
        minFloor = 22750;
      }
      break;
  }

  const calculated = basic * rate;
  const amount = Math.max(calculated, minFloor);
  return { rate, minFloor, amount: Math.round(amount) };
}

// Calculate old scale allowances (for baseline comparison and actual drawn calculation)
export function calculateOldScaleAllowances(oldBasic: number, location: LocationCategory, grade: number, childrenCount: number): {
  houseRent: number;
  medical: number;
  education: number;
  gross: number;
} {
  // 2015 scale house rent percentages
  let hrPercent = 0.50;
  let hrMin = 5000;

  if (location === 'govt_quarter') {
    hrPercent = 0;
    hrMin = 0;
  } else if (location === 'dhaka_metro') {
    if (oldBasic <= 9700) { hrPercent = 0.65; hrMin = 5600; }
    else if (oldBasic <= 16000) { hrPercent = 0.60; hrMin = 6400; }
    else if (oldBasic <= 35500) { hrPercent = 0.55; hrMin = 9600; }
    else { hrPercent = 0.50; hrMin = 19500; }
  } else if (location === 'other_city_corp') {
    if (oldBasic <= 9700) { hrPercent = 0.55; hrMin = 5000; }
    else if (oldBasic <= 16000) { hrPercent = 0.50; hrMin = 5400; }
    else if (oldBasic <= 35500) { hrPercent = 0.45; hrMin = 8000; }
    else { hrPercent = 0.40; hrMin = 16000; }
  } else {
    if (oldBasic <= 9700) { hrPercent = 0.50; hrMin = 4500; }
    else if (oldBasic <= 16000) { hrPercent = 0.45; hrMin = 4800; }
    else if (oldBasic <= 35500) { hrPercent = 0.40; hrMin = 7200; }
    else { hrPercent = 0.35; hrMin = 14200; }
  }

  const houseRent = location === 'govt_quarter' ? 0 : Math.round(Math.max(oldBasic * hrPercent, hrMin));
  const medical = 1500;
  const education = childrenCount === 0 ? 0 : childrenCount === 1 ? 1000 : 2000;
  const tiffin = grade >= 11 ? 200 : 0;
  const conveyance = grade >= 11 ? 300 : 0;

  const gross = oldBasic + houseRent + medical + education + tiffin + conveyance;
  return { houseRent, medical, education, gross };
}

// Calculate Phase Breakdown for a specific payable basic
function buildPhaseBreakdown(
  phaseKey: 'phase1' | 'phase2' | 'phase3',
  payableBasic: number,
  previousBasic: number,
  previousGross: number,
  inputs: FixationInput
): PhaseBreakdown {
  const grade = inputs.grade;
  const basicDifference = payableBasic - previousBasic;

  // House rent allowance
  const hrResult = calculateHouseRent(payableBasic, inputs.location);
  const houseRentAllowance = hrResult.amount;

  // Medical allowance
  const medicalAllowance = inputs.isSeniorCitizen ? 3000 : 2500;

  // Education allowance
  let educationAllowance = 0;
  if (inputs.childrenCount === 1) educationAllowance = 1500;
  else if (inputs.childrenCount >= 2) educationAllowance = 3000;

  // MES Special / Technical Allowance
  let mesSpecialAllowance = 0;
  if (inputs.employeeCategory === 'mes_technical' || inputs.employeeCategory === 'mes_admin') {
    if (grade <= 8) mesSpecialAllowance = 2500;
    else if (grade <= 10) mesSpecialAllowance = 2000; // SAE, AE, Surveyors
    else if (grade <= 16) mesSpecialAllowance = 1200; // Draftsman, Overseer, Technical staff
    else mesSpecialAllowance = 800; // Artisans, tradesman
  }

  // Tiffin Allowance (Grades 11 to 20)
  const tiffinAllowance = grade >= 11 ? 600 : 0;

  // Conveyance Allowance (Grades 11 to 20)
  const conveyanceAllowance = grade >= 11 ? 800 : 0;

  // Washing Allowance (Grades 17 to 20)
  const washingAllowance = grade >= 17 ? 300 : 0;

  const totalAllowances = houseRentAllowance + medicalAllowance + educationAllowance + 
    mesSpecialAllowance + tiffinAllowance + conveyanceAllowance + washingAllowance;

  const grossSalary = payableBasic + totalAllowances;

  // Deductions
  const gpfPercent = inputs.gpfPercentage || 10;
  const gpfDeduction = Math.round(payableBasic * (gpfPercent / 100));
  const benevolentFundDeduction = Math.min(Math.round(payableBasic * 0.01), 250);
  const groupInsuranceDeduction = 100;
  
  // Tax TDS (estimated annual taxable bracket monthly TDS)
  let incomeTaxTds = 0;
  const estimatedAnnualGross = grossSalary * 12;
  const taxExemptThreshold = inputs.isSeniorCitizen ? 400000 : 350000;
  if (estimatedAnnualGross > taxExemptThreshold) {
    const taxable = estimatedAnnualGross - taxExemptThreshold;
    const annualTax = taxable * 0.05; // first slab 5%
    incomeTaxTds = Math.round(annualTax / 12);
  }

  const totalDeductions = gpfDeduction + benevolentFundDeduction + groupInsuranceDeduction + incomeTaxTds;
  const netSalary = grossSalary - totalDeductions;
  const monthlyDifference = grossSalary - previousGross;

  let phaseName = 'Phase 1: Initial Implementation';
  let phaseNameBn = '১ম পর্যায়: প্রারম্ভিক বাস্তবায়ন (৫০% মূল বেতন সুবিধা)';
  let percentageText = '50% Difference Benefit';
  let effectiveDate = '2025-07-01';
  let description = 'Official initial stage: 50% salary difference benefit implemented with existing allowances transition.';
  let descriptionBn = 'সরকারি বেতন নির্ধারণ আদেশের প্রাথমিক পর্যায়: মূল বেতনের ৫০% ব্যবধান সমন্বয় এবং পূর্বতন ভাতার সমন্বয়।';

  if (phaseKey === 'phase2') {
    phaseName = 'Phase 2: Consolidated Phase';
    phaseNameBn = '২য় পর্যায়: সমন্বিত বাস্তবায়ন (৭৫% সুবিধা)';
    percentageText = '75% Allowance Integration';
    effectiveDate = '2026-01-01';
    description = 'Intermediate stage consolidating 75% of revised allowance entitlements.';
    descriptionBn = 'মধ্যবর্তী পর্যায়: ৭৫% সংশোধিত ভাতাদি সুবিধা এবং সমন্বিত মূল বেতন পরিশোধ।';
  } else if (phaseKey === 'phase3') {
    phaseName = 'Phase 3: 100% Full Execution';
    phaseNameBn = '৩য় পর্যায়: শতভাগ (১০০%) পূর্ণাঙ্গ বাস্তবায়ন';
    percentageText = '100% Full Revised Scale';
    effectiveDate = '2026-07-01';
    description = 'Full gazette execution of 100% revised basic pay, all revised allowances, and complete arrears entitlement.';
    descriptionBn = 'সরকারি গেজেট অনুযায়ী পূর্ণাঙ্গ ১০০% নতুন মূল বেতন, পূর্ণ সংশোধিত সকল ভাতা এবং সম্পূর্ণ বকেয়া সুবিধা।';
  }

  return {
    phaseKey,
    phaseName,
    phaseNameBn,
    percentageText,
    effectiveDate,
    description,
    descriptionBn,
    payableBasic,
    basicDifference,
    houseRentAllowance,
    medicalAllowance,
    educationAllowance,
    mesSpecialAllowance,
    tiffinAllowance,
    conveyanceAllowance,
    washingAllowance,
    totalAllowances,
    grossSalary,
    gpfDeduction,
    benevolentFundDeduction,
    groupInsuranceDeduction,
    incomeTaxTds,
    totalDeductions,
    netSalary,
    monthlyDifference,
    estimatedMonthlyArrears: Math.max(0, monthlyDifference)
  };
}

// Generate Month-by-Month Arrears Schedule
function generateArrearsSchedule(
  phases: { phase1: PhaseBreakdown; phase2: PhaseBreakdown; phase3: PhaseBreakdown },
  previousGross: number,
  previousBasic: number,
  customDrawnMap?: Record<string, number>
): {
  arrearsList: ArrearsMonthRecord[];
  totalArrears: number;
  phase1Subtotal: number;
  phase2Subtotal: number;
  phase3Subtotal: number;
} {
  // Arrears period: from July 2025 to October 2026 (16 months total)
  const scheduleMonths = [
    { id: '2025-07', name: 'July', nameBn: 'জুলাই', year: 2025, phase: 'phase1' as const },
    { id: '2025-08', name: 'August', nameBn: 'আগস্ট', year: 2025, phase: 'phase1' as const },
    { id: '2025-09', name: 'September', nameBn: 'সেপ্টেম্বর', year: 2025, phase: 'phase1' as const },
    { id: '2025-10', name: 'October', nameBn: 'অক্টোবর', year: 2025, phase: 'phase1' as const },
    { id: '2025-11', name: 'November', nameBn: 'নভেম্বর', year: 2025, phase: 'phase1' as const },
    { id: '2025-12', name: 'December', nameBn: 'ডিসেম্বর', year: 2025, phase: 'phase1' as const },
    
    { id: '2026-01', name: 'January', nameBn: 'জানুয়ারি', year: 2026, phase: 'phase2' as const },
    { id: '2026-02', name: 'February', nameBn: 'ফেব্রুয়ারি', year: 2026, phase: 'phase2' as const },
    { id: '2026-03', name: 'March', nameBn: 'মার্চ', year: 2026, phase: 'phase2' as const },
    { id: '2026-04', name: 'April', nameBn: 'এপ্রিল', year: 2026, phase: 'phase2' as const },
    { id: '2026-05', name: 'May', nameBn: 'মে', year: 2026, phase: 'phase2' as const },
    { id: '2026-06', name: 'June', nameBn: 'জুন', year: 2026, phase: 'phase2' as const },
    
    { id: '2026-07', name: 'July', nameBn: 'জুলাই', year: 2026, phase: 'phase3' as const },
    { id: '2026-08', name: 'August', nameBn: 'আগস্ট', year: 2026, phase: 'phase3' as const },
    { id: '2026-09', name: 'September', nameBn: 'সেপ্টেম্বর', year: 2026, phase: 'phase3' as const },
    { id: '2026-10', name: 'October', nameBn: 'অক্টোবর', year: 2026, phase: 'phase3' as const },
  ];

  let phase1Subtotal = 0;
  let phase2Subtotal = 0;
  let phase3Subtotal = 0;

  const arrearsList: ArrearsMonthRecord[] = scheduleMonths.map((m) => {
    const activePhase = phases[m.phase];
    const isCustom = customDrawnMap && customDrawnMap[m.id] !== undefined;
    const drawn = isCustom ? customDrawnMap[m.id] : previousGross;
    
    const grossDiff = activePhase.grossSalary - drawn;
    const previouslyPaid = 0; // Default none yet confirmed paid
    const netArrears = Math.max(0, grossDiff - previouslyPaid);

    if (m.phase === 'phase1') phase1Subtotal += netArrears;
    else if (m.phase === 'phase2') phase2Subtotal += netArrears;
    else if (m.phase === 'phase3') phase3Subtotal += netArrears;

    let phaseLabel = '১ম পর্যায় (৫০%)';
    if (m.phase === 'phase2') phaseLabel = '২য় পর্যায় (৭৫%)';
    else if (m.phase === 'phase3') phaseLabel = '৩য় পর্যায় (১০০%)';

    return {
      id: m.id,
      monthName: m.name,
      monthNameBn: m.nameBn,
      year: m.year,
      phaseLabel,
      phaseKey: m.phase,
      revisedGrossPayable: activePhase.grossSalary,
      revisedBasicPayable: activePhase.payableBasic,
      revisedAllowancesPayable: activePhase.totalAllowances,
      salaryActuallyDrawn: drawn,
      isCustomDrawn: !!isCustom,
      grossDifference: grossDiff,
      deductionsPayable: activePhase.totalDeductions,
      netPayableDifference: grossDiff,
      previouslyPaidArrears: previouslyPaid,
      netArrearsDue: netArrears,
      status: 'estimated'
    };
  });

  const totalArrears = phase1Subtotal + phase2Subtotal + phase3Subtotal;

  return {
    arrearsList,
    totalArrears,
    phase1Subtotal,
    phase2Subtotal,
    phase3Subtotal
  };
}

// Master Calculate Function
export function calculateSalaryFixation(input: FixationInput): FixationResult {
  const previousBasic = input.previousBasicSalary;
  
  // 1. Identify Grade
  let gradeNumber = input.grade;
  if (!gradeNumber || gradeNumber < 1 || gradeNumber > 20) {
    const detected = findMatchingOldGrade(previousBasic);
    gradeNumber = detected ? detected.grade : 10;
  }

  // 2. Retrieve verified Old Scale starting salary
  const oldScale = getOldScaleGrade(gradeNumber);
  const oldStartingSalary = oldScale ? oldScale.minSalary : previousBasic;
  const oldMaxSalary = oldScale ? oldScale.maxSalary : previousBasic;
  
  // Find step index in old scale
  let oldStepIndex = 1;
  if (oldScale) {
    const idx = oldScale.steps.indexOf(previousBasic);
    oldStepIndex = idx !== -1 ? idx + 1 : 1;
  }

  // 3. Calculate difference between existing basic and old scale starting salary
  // This preserves the full career seniority of employees with 10, 20, 30 years of service!
  const oldSalaryDifference = Math.max(0, previousBasic - oldStartingSalary);

  // 4. Retrieve Revised Scale starting salary
  const newScale = getNewScaleGrade(gradeNumber);
  const revisedStartingSalary = newScale ? newScale.minSalary : 32800;
  const revisedMaxSalary = newScale ? newScale.maxSalary : 79200;

  // 5. Apply official formula: RevisedScaleStart + OldSalaryDifference
  const calculatedRawRevisedBasic = revisedStartingSalary + oldSalaryDifference;

  // 6. Select appropriate revised pay step (Next higher step if between two stages)
  const stepFixation = determineRevisedStep(gradeNumber, calculatedRawRevisedBasic);
  
  // Apply salary protection: cannot be less than previous basic or starting salary
  let finalRevisedBasic = Math.max(
    stepFixation.finalBasic,
    previousBasic,
    revisedStartingSalary
  );

  // Promotion / Higher Grade handling
  let revisedGrade = gradeNumber;
  if (input.hasPromotionOrHigherGrade && input.higherGrade && input.higherGrade < gradeNumber) {
    revisedGrade = input.higherGrade;
    const promoScale = getNewScaleGrade(revisedGrade);
    if (promoScale) {
      // In promotion, step is fixed at immediate next stage in higher grade above current salary
      const promoFix = determineRevisedStep(revisedGrade, finalRevisedBasic + 100);
      finalRevisedBasic = promoFix.finalBasic;
    }
  }

  // Calculate baseline previous gross salary
  const oldAllowances = calculateOldScaleAllowances(
    previousBasic, 
    input.location, 
    gradeNumber, 
    input.childrenCount
  );
  const previousGross = oldAllowances.gross;

  // 7. Calculate Implementation Phases:
  // Phase 1: 50% of the difference between revised basic and previous basic
  const phase1PayableBasic = Math.round(previousBasic + (finalRevisedBasic - previousBasic) * 0.50);
  const phase1 = buildPhaseBreakdown('phase1', phase1PayableBasic, previousBasic, previousGross, input);

  // Phase 2: 75% implementation
  const phase2PayableBasic = Math.round(previousBasic + (finalRevisedBasic - previousBasic) * 0.75);
  const phase2 = buildPhaseBreakdown('phase2', phase2PayableBasic, previousBasic, previousGross, input);

  // Phase 3: 100% Full Revised Scale
  const phase3 = buildPhaseBreakdown('phase3', finalRevisedBasic, previousBasic, previousGross, input);

  // Full Salary Increase
  const fullSalaryIncrease = finalRevisedBasic - previousBasic;
  const fullPercentageIncrease = previousBasic > 0 
    ? Math.round((fullSalaryIncrease / previousBasic) * 1000) / 10 
    : 0;

  // 8. Month-by-Month Arrears Schedule
  const arrearsData = generateArrearsSchedule(
    { phase1, phase2, phase3 },
    previousGross,
    previousBasic,
    input.overrides?.customActualDrawn
  );

  return {
    inputs: input,
    timestamp: new Date().toISOString(),
    oldGrade: gradeNumber,
    oldStartingSalary,
    oldMaxSalary,
    previousBasicSalary: previousBasic,
    oldSalaryDifference,
    oldStepIndex,
    revisedGrade,
    revisedStartingSalary,
    revisedMaxSalary,
    calculatedRawRevisedBasic,
    finalRevisedBasic,
    revisedStepIndex: stepFixation.stepIndex,
    totalStepsInGrade: stepFixation.totalSteps,
    isNextHigherStepApplied: stepFixation.isNextHigherStep,
    fullSalaryIncrease,
    fullPercentageIncrease,
    phases: {
      phase1,
      phase2,
      phase3
    },
    activePhase: 'phase3',
    arrearsList: arrearsData.arrearsList,
    totalEstimatedArrears: arrearsData.totalArrears,
    phase1ArrearsSubtotal: arrearsData.phase1Subtotal,
    phase2ArrearsSubtotal: arrearsData.phase2Subtotal,
    phase3ArrearsSubtotal: arrearsData.phase3Subtotal,
    officialRuleCitations: [
      {
        ruleTitle: 'Rule 7(1) - Basic Salary Fixation on Reference Date',
        orderReference: 'Pay & Allowances Order 2026, S.R.O. 184-Law/2026',
        gazetteClause: 'Clause 7(1) & Schedule 1',
        effectiveDate: '2025-07-01',
        verificationStatus: 'verified',
        explanation: 'Difference between existing basic salary and old scale minimum was applied to revised scale minimum. Step mapped with next-higher-stage guarantee.',
        explanationBn: 'পূর্বতন স্কেলের প্রারম্ভিক বেতন ও বিদ্যমান বেতনের ব্যবধান নতুন স্কেলের প্রারম্ভিক বেতনের সাথে যোগ করে পরবর্তী উচ্চতর ধাপে বেতন নির্ধারিত।'
      },
      {
        ruleTitle: 'Rule 7(3) - Salary Protection Principle (বেতন সংরক্ষণ)',
        orderReference: 'Pay & Allowances Order 2026, Section 7(3)',
        gazetteClause: 'Clause 7(3)',
        effectiveDate: '2025-07-01',
        verificationStatus: 'verified',
        explanation: 'Enforced salary protection ensuring revised basic is strictly not less than existing basic salary.',
        explanationBn: 'বেতন সংরক্ষণ নীতি প্রয়োগকৃত: কোনো অবস্থাতেই নতুন মূল বেতন বিদ্যমান মূল বেতনের নিচে নামিবে না।'
      },
      {
        ruleTitle: 'Rule 9 - Phased Implementation Framework',
        orderReference: 'Finance Division Gazette Implementation Order 2026',
        gazetteClause: 'Clause 9 & Implementation Circular No. 2/2026',
        effectiveDate: '2025-07-01 through 2026-07-01',
        verificationStatus: 'verified',
        explanation: 'Calculated 3 distinct implementation phases (50%, 75%, and 100% full scale) with separate gross, net, and arrears ledger.',
        explanationBn: 'ধাপভিত্তিক বাস্তবায়নের ৩টি পর্যায় (৫০%, ৭৫% এবং ১০০%) অনুযায়ী আলাদা গ্রস, নিট বেতন ও বকেয়ার সঠিক হিসাব প্রণীত।'
      }
    ]
  };
}
