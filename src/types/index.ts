// Type definitions for Pay Fixation 2026 application

export type EmployeeCategory = 
  | 'mes_technical'      // Military Engineer Services - Technical Staff
  | 'mes_admin'          // Military Engineer Services - Administrative/Store
  | 'defence_civilian'    // Defence Civilian (AHQ, NHQ, Air HQ)
  | 'civil_general'       // General Civil Administration
  | 'education_cadre'     // Education Cadre / Teachers
  | 'health_services'     // Health & Medical Services
  | 'autonomous_body';    // Autonomous / Semi-Government

export type MESTrade = 
  | 'BR'                  // Building & Roads (বি/আর)
  | 'EM'                  // Electrical & Mechanical (ই/এম)
  | 'FS'                  // Furniture & Stores (এফ/এস)
  | 'Surveyor'            // Surveyor (সার্ভেয়ার)
  | 'Draftsman'           // Draftsman (ড্রাফটসম্যান)
  | 'SAE'                 // Sub-Assistant Engineer (উপ-সহকারী প্রকৌশলী - গ্রেড ১০)
  | 'AE'                  // Assistant Engineer (সহকারী প্রকৌশলী - গ্রেড ৯)
  | 'ExecutiveEngineer'   // Executive Engineer (নির্বাহী প্রকৌশলী - গ্রেড ৬)
  | 'StaffOfficer'        // Staff Officer / Admin (স্টাফ অফিসার / প্রশাসন)
  | 'ClericalStore'       // UDC/LDC/Storekeeper (উচ্চমান সহকারী/দপ্তরী/স্টোরকিপার)
  | 'ArtisanTradesman';   // Fitter, Electrician, Plumber, Mason (কারিগরি ট্রেডসম্যান)

export type LocationCategory = 
  | 'dhaka_metro'         // Dhaka Metropolitan Area (ঢাকা মেট্রোপলিটন)
  | 'other_city_corp'     // Chattogram, Rajshahi, Khulna, etc. (অন্যান্য সিটি কর্পোরেশন)
  | 'district_sadar'      // District Headquarters (জেলা সদর)
  | 'other_cantonment'    // Upazila / Cantonment Rural / Other (উপজেলা / সেনানিবাস / অন্যান্য)
  | 'govt_quarter';       // Government Allocated Quarter (সরকারি বাসা বরাদ্দ প্রাপ্ত)

export interface PayScaleGrade {
  grade: number;
  gradeBn: string;
  minSalary: number;
  maxSalary: number;
  steps: number[];
}

export interface PhaseBreakdown {
  phaseKey: 'phase1' | 'phase2' | 'phase3';
  phaseName: string;
  phaseNameBn: string;
  percentageText: string;
  effectiveDate: string;
  description: string;
  descriptionBn: string;
  payableBasic: number;
  basicDifference: number; // payableBasic - previousBasic
  houseRentAllowance: number;
  medicalAllowance: number;
  educationAllowance: number;
  mesSpecialAllowance: number;
  tiffinAllowance: number;
  conveyanceAllowance: number;
  washingAllowance: number;
  totalAllowances: number;
  grossSalary: number;
  gpfDeduction: number;
  benevolentFundDeduction: number;
  groupInsuranceDeduction: number;
  incomeTaxTds: number;
  totalDeductions: number;
  netSalary: number;
  monthlyDifference: number; // Gross - Previous Gross
  estimatedMonthlyArrears: number; // Difference per month for this phase
}

export interface ArrearsMonthRecord {
  id: string;
  monthName: string;
  monthNameBn: string;
  year: number;
  phaseLabel: string;
  phaseKey: 'phase1' | 'phase2' | 'phase3';
  revisedGrossPayable: number;
  revisedBasicPayable: number;
  revisedAllowancesPayable: number;
  salaryActuallyDrawn: number;
  isCustomDrawn: boolean;
  grossDifference: number;
  deductionsPayable: number;
  netPayableDifference: number;
  previouslyPaidArrears: number;
  netArrearsDue: number;
  status: 'estimated' | 'drawn' | 'adjusted';
}

export interface FixationInput {
  previousBasicSalary: number;
  grade: number;
  employeeCategory: EmployeeCategory;
  mesTrade?: MESTrade;
  employeeName: string;
  employeeId: string;
  designation: string;
  officeOrUnit: string;
  location: LocationCategory;
  referenceDate: string;
  serviceYears: number;
  hasPromotionOrHigherGrade: boolean;
  higherGrade?: number;
  childrenCount: number; // 0, 1, or 2+
  gpfPercentage: number; // Default 10%
  isSeniorCitizen: boolean; // 65 years or above
  overrides?: {
    customActualDrawn?: Record<string, number>;
  };
}

export interface FixationResult {
  inputs: FixationInput;
  timestamp: string;
  
  // Old Scale Info
  oldGrade: number;
  oldStartingSalary: number;
  oldMaxSalary: number;
  previousBasicSalary: number;
  oldSalaryDifference: number; // previousBasic - oldStartingSalary
  oldStepIndex: number;
  
  // Revised Scale Info
  revisedGrade: number;
  revisedStartingSalary: number;
  revisedMaxSalary: number;
  calculatedRawRevisedBasic: number; // revisedStarting + oldSalaryDifference
  finalRevisedBasic: number; // after pay-step rule (next higher step if between stages)
  revisedStepIndex: number;
  totalStepsInGrade: number;
  isNextHigherStepApplied: boolean;
  
  // Full Scale Summary
  fullSalaryIncrease: number; // finalRevisedBasic - previousBasicSalary
  fullPercentageIncrease: number;
  
  // Phased Implementations
  phases: {
    phase1: PhaseBreakdown; // 50% basic difference or initial implementation
    phase2: PhaseBreakdown; // 75% implementation / allowance consolidation
    phase3: PhaseBreakdown; // 100% full implementation
  };
  
  // Current Active Selected Phase
  activePhase: 'phase1' | 'phase2' | 'phase3';
  
  // Detailed Month-by-Month Arrears
  arrearsList: ArrearsMonthRecord[];
  totalEstimatedArrears: number;
  phase1ArrearsSubtotal: number;
  phase2ArrearsSubtotal: number;
  phase3ArrearsSubtotal: number;
  
  // Official references
  officialRuleCitations: {
    ruleTitle: string;
    orderReference: string;
    gazetteClause: string;
    effectiveDate: string;
    verificationStatus: 'verified' | 'provisional';
    explanation: string;
    explanationBn: string;
  }[];
}

export interface SavedEmployeeRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  employeeName: string;
  employeeId: string;
  designation: string;
  grade: number;
  officeOrUnit: string;
  employeeCategory: EmployeeCategory;
  mesTrade?: MESTrade;
  previousBasicSalary: number;
  finalRevisedBasic: number;
  totalArrears: number;
  inputs: FixationInput;
  resultSummary: {
    fullRevisedBasic: number;
    phase1Basic: number;
    phase3Gross: number;
    phase3Net: number;
  };
  notes?: string;
}
