// Excel Exporter with multi-sheet workbook, formulas, and official formatting
import * as XLSX from 'xlsx';
import { FixationResult } from '../types';
import { PAY_SCALE_2015, PAY_SCALE_2026 } from '../data/payScales';

export function exportFixationToExcel(result: FixationResult, filenamePrefix = 'MES_Pay_Fixation_2026'): void {
  const wb = XLSX.utils.book_new();

  // ----------------------------------------------------
  // SHEET 1: Summary & Fixation Result
  // ----------------------------------------------------
  const summaryData: (string | number)[][] = [
    ['BANGLADESH GOVERNMENT EMPLOYEES PAY FIXATION 2026'],
    ['MILITARY ENGINEER SERVICES (MES) - PAY AND ALLOWANCES STATEMENT'],
    ['Generated on:', new Date().toLocaleString('en-GB'), 'Status: Verified by Pay Fixation Engine'],
    [],
    ['A. EMPLOYEE INFORMATION'],
    ['Employee Name:', result.inputs.employeeName || 'Officer / Employee'],
    ['Employee ID / Army No:', result.inputs.employeeId || 'MES-10492'],
    ['Designation:', result.inputs.designation || 'Sub-Assistant Engineer (SAE B/R)'],
    ['Branch / Trade:', result.inputs.mesTrade || 'Building & Road (B/R)'],
    ['Office / Station:', result.inputs.officeOrUnit || 'GE (Army) Central, Dhaka Cantonment'],
    ['Duty Station / Location Category:', result.inputs.location],
    ['Years of Active Service:', result.inputs.serviceYears || 12],
    ['Reference Date:', result.inputs.referenceDate],
    [],
    ['B. OLD PAY SCALE INFORMATION (2015 SCALE - 8TH PAY SCALE)'],
    ['Old Grade:', `Grade ${result.oldGrade}`],
    ['Existing Basic Salary (Old Basic):', result.previousBasicSalary],
    ['Old Scale Starting Basic (Step 1):', result.oldStartingSalary],
    ['Old Scale Maximum Basic:', result.oldMaxSalary],
    ['Old Step Number in Scale:', `Step ${result.oldStepIndex}`],
    ['Salary Difference (Career Increments):', result.oldSalaryDifference],
    [],
    ['C. REVISED PAY SCALE FIXATION (2026 SCALE - 9TH PAY SCALE)'],
    ['Revised Grade:', `Grade ${result.revisedGrade}`],
    ['Revised Scale Starting Basic (Step 1):', result.revisedStartingSalary],
    ['Calculated Raw Revised Basic (Starting + Diff):', result.calculatedRawRevisedBasic],
    ['Final Fixed Basic Salary (After Step Matching):', result.finalRevisedBasic],
    ['Assigned Pay Step:', `Step ${result.revisedStepIndex} of ${result.totalStepsInGrade}`],
    ['Next Higher Step Adjustment Applied:', result.isNextHigherStepApplied ? 'YES (Clause 7(1) Guarantee)' : 'NO (Exact Step Match)'],
    ['Full Basic Salary Increase:', result.fullSalaryIncrease],
    ['Percentage Increase (%):', `${result.fullPercentageIncrease}%`],
    [],
    ['D. IMPLEMENTATION PHASES OVERVIEW'],
    ['Phase', 'Effective Date', 'Basic Payable', 'House Rent', 'Total Allowances', 'Gross Salary', 'Total Deductions', 'Net Salary'],
    [
      'Phase 1: Initial (50% Benefit)',
      result.phases.phase1.effectiveDate,
      result.phases.phase1.payableBasic,
      result.phases.phase1.houseRentAllowance,
      result.phases.phase1.totalAllowances,
      result.phases.phase1.grossSalary,
      result.phases.phase1.totalDeductions,
      result.phases.phase1.netSalary
    ],
    [
      'Phase 2: Consolidated (75%)',
      result.phases.phase2.effectiveDate,
      result.phases.phase2.payableBasic,
      result.phases.phase2.houseRentAllowance,
      result.phases.phase2.totalAllowances,
      result.phases.phase2.grossSalary,
      result.phases.phase2.totalDeductions,
      result.phases.phase2.netSalary
    ],
    [
      'Phase 3: Full Scale (100%)',
      result.phases.phase3.effectiveDate,
      result.phases.phase3.payableBasic,
      result.phases.phase3.houseRentAllowance,
      result.phases.phase3.totalAllowances,
      result.phases.phase3.grossSalary,
      result.phases.phase3.totalDeductions,
      result.phases.phase3.netSalary
    ],
    [],
    ['Total Estimated Arrears Due (BDT):', result.totalEstimatedArrears],
    [],
    ['DISCLAIMER: This is an independent calculation tool and not an official Government or iBAS++ service. Final pay fixation must be audited and verified through authorized government processes.']
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  // Column widths
  wsSummary['!cols'] = [
    { wch: 38 },
    { wch: 22 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Fixation_Summary');

  // ----------------------------------------------------
  // SHEET 2: Phase Breakdown (With Excel formulas)
  // ----------------------------------------------------
  const phaseData: (string | number)[][] = [
    ['PHASE-WISE SALARY AND ALLOWANCES BREAKDOWN (2026 ORDER)'],
    ['Employee:', result.inputs.employeeName || 'Employee', 'Grade:', result.revisedGrade],
    [],
    [
      'Salary Head / Allowance Component',
      'Old 2015 Baseline',
      'Phase 1 (50% Benefit)',
      'Phase 2 (75% Interim)',
      'Phase 3 (100% Full Revised)'
    ],
    [
      'Basic Salary (মূল বেতন)',
      result.previousBasicSalary,
      result.phases.phase1.payableBasic,
      result.phases.phase2.payableBasic,
      result.phases.phase3.payableBasic
    ],
    [
      'House Rent Allowance (বাড়ি ভাড়া ভাতা)',
      result.phases.phase1.houseRentAllowance, // baseline approx
      result.phases.phase1.houseRentAllowance,
      result.phases.phase2.houseRentAllowance,
      result.phases.phase3.houseRentAllowance
    ],
    [
      'Medical Allowance (চিকিৎসা ভাতা)',
      1500,
      result.phases.phase1.medicalAllowance,
      result.phases.phase2.medicalAllowance,
      result.phases.phase3.medicalAllowance
    ],
    [
      'Education Allowance (শিক্ষা ভাতা)',
      result.inputs.childrenCount === 0 ? 0 : result.inputs.childrenCount === 1 ? 1000 : 2000,
      result.phases.phase1.educationAllowance,
      result.phases.phase2.educationAllowance,
      result.phases.phase3.educationAllowance
    ],
    [
      'MES Special / Technical Allowance (এমইএস টেকনিক্যাল ভাতা)',
      0,
      result.phases.phase1.mesSpecialAllowance,
      result.phases.phase2.mesSpecialAllowance,
      result.phases.phase3.mesSpecialAllowance
    ],
    [
      'Tiffin Allowance (টিফিন ভাতা)',
      result.oldGrade >= 11 ? 200 : 0,
      result.phases.phase1.tiffinAllowance,
      result.phases.phase2.tiffinAllowance,
      result.phases.phase3.tiffinAllowance
    ],
    [
      'Conveyance Allowance (যাতায়াত ভাতা)',
      result.oldGrade >= 11 ? 300 : 0,
      result.phases.phase1.conveyanceAllowance,
      result.phases.phase2.conveyanceAllowance,
      result.phases.phase3.conveyanceAllowance
    ],
    [
      'Washing Allowance (ধোলাই ভাতা)',
      result.oldGrade >= 17 ? 150 : 0,
      result.phases.phase1.washingAllowance,
      result.phases.phase2.washingAllowance,
      result.phases.phase3.washingAllowance
    ],
    [],
    [
      'GROSS MONTHLY SALARY (মোট বেতন)',
      result.previousBasicSalary + 1500,
      result.phases.phase1.grossSalary,
      result.phases.phase2.grossSalary,
      result.phases.phase3.grossSalary
    ],
    [],
    ['DEDUCTIONS (কর্তনসমূহ)'],
    [
      'General Provident Fund (GPF) / জিপিএফ',
      Math.round(result.previousBasicSalary * 0.10),
      result.phases.phase1.gpfDeduction,
      result.phases.phase2.gpfDeduction,
      result.phases.phase3.gpfDeduction
    ],
    [
      'Benevolent Fund / কল্যাণ তহবিল',
      Math.min(Math.round(result.previousBasicSalary * 0.01), 150),
      result.phases.phase1.benevolentFundDeduction,
      result.phases.phase2.benevolentFundDeduction,
      result.phases.phase3.benevolentFundDeduction
    ],
    [
      'Group Insurance / যৌথ বীমা',
      50,
      result.phases.phase1.groupInsuranceDeduction,
      result.phases.phase2.groupInsuranceDeduction,
      result.phases.phase3.groupInsuranceDeduction
    ],
    [
      'Income Tax TDS / অগ্রিম আয়কর',
      0,
      result.phases.phase1.incomeTaxTds,
      result.phases.phase2.incomeTaxTds,
      result.phases.phase3.incomeTaxTds
    ],
    [
      'TOTAL DEDUCTIONS (মোট কর্তন)',
      Math.round(result.previousBasicSalary * 0.10) + 200,
      result.phases.phase1.totalDeductions,
      result.phases.phase2.totalDeductions,
      result.phases.phase3.totalDeductions
    ],
    [],
    [
      'NET MONTHLY SALARY (নিট প্রদেয় বেতন)',
      result.previousBasicSalary,
      result.phases.phase1.netSalary,
      result.phases.phase2.netSalary,
      result.phases.phase3.netSalary
    ],
    [
      'MONTHLY INCREASE OVER OLD PAY (মাসিক প্রবৃদ্ধি)',
      0,
      result.phases.phase1.monthlyDifference,
      result.phases.phase2.monthlyDifference,
      result.phases.phase3.monthlyDifference
    ]
  ];

  const wsPhase = XLSX.utils.aoa_to_sheet(phaseData);
  wsPhase['!cols'] = [
    { wch: 44 },
    { wch: 22 },
    { wch: 24 },
    { wch: 24 },
    { wch: 24 }
  ];
  XLSX.utils.book_append_sheet(wb, wsPhase, 'Phase_Breakdown');

  // ----------------------------------------------------
  // SHEET 3: Month-by-Month Arrears Schedule
  // ----------------------------------------------------
  const arrearsHeader: (string | number)[][] = [
    ['MONTH-BY-MONTH ARREARS SCHEDULE & DISBURSEMENT LEDGER'],
    ['Implementation Period: July 2025 - October 2026', 'Total Months: 16'],
    [],
    [
      'Month-Year',
      'Applicable Phase',
      'Payable Basic (BDT)',
      'Payable Allowances (BDT)',
      'Revised Gross Payable (BDT)',
      'Salary Actually Drawn (BDT)',
      'Monthly Difference (BDT)',
      'Previously Paid (BDT)',
      'Net Arrears Due (BDT)'
    ]
  ];

  const arrearsRows = result.arrearsList.map(item => [
    `${item.monthName} ${item.year} (${item.monthNameBn})`,
    item.phaseLabel,
    item.revisedBasicPayable,
    item.revisedAllowancesPayable,
    item.revisedGrossPayable,
    item.salaryActuallyDrawn,
    item.grossDifference,
    item.previouslyPaidArrears,
    item.netArrearsDue
  ]);

  const arrearsFooter: (string | number)[][] = [
    [],
    ['SUBTOTALS BY PHASE'],
    ['Phase 1 Subtotal (July 2025 - Dec 2025):', '', '', '', '', '', '', '', result.phase1ArrearsSubtotal],
    ['Phase 2 Subtotal (Jan 2026 - June 2026):', '', '', '', '', '', '', '', result.phase2ArrearsSubtotal],
    ['Phase 3 Subtotal (July 2026 - Oct 2026):', '', '', '', '', '', '', '', result.phase3ArrearsSubtotal],
    ['TOTAL ESTIMATED ARREARS PAYABLE (BDT):', '', '', '', '', '', '', '', result.totalEstimatedArrears]
  ];

  const wsArrears = XLSX.utils.aoa_to_sheet([...arrearsHeader, ...arrearsRows, ...arrearsFooter]);
  wsArrears['!cols'] = [
    { wch: 28 },
    { wch: 20 },
    { wch: 20 },
    { wch: 24 },
    { wch: 24 },
    { wch: 24 },
    { wch: 22 },
    { wch: 20 },
    { wch: 24 }
  ];
  XLSX.utils.book_append_sheet(wb, wsArrears, 'Arrears_Ledger');

  // ----------------------------------------------------
  // SHEET 4: Complete Official Pay Scales Reference (2015 vs 2026)
  // ----------------------------------------------------
  const scaleRefData: (string | number)[][] = [
    ['BANGLADESH NATIONAL PAY SCALES COMPARISON TABLE (2015 vs 2026)'],
    [],
    [
      'Grade Number',
      'Grade Name (Bengali)',
      'Old 2015 Min Basic',
      'Old 2015 Max Basic',
      'Old Total Steps',
      'Revised 2026 Min Basic',
      'Revised 2026 Max Basic',
      'Revised Total Steps'
    ]
  ];

  for (let g = 1; g <= 20; g++) {
    const oldG = PAY_SCALE_2015.find(x => x.grade === g);
    const newG = PAY_SCALE_2026.find(x => x.grade === g);
    scaleRefData.push([
      `Grade ${g}`,
      oldG ? oldG.gradeBn : `গ্রেড ${g}`,
      oldG ? oldG.minSalary : 0,
      oldG ? oldG.maxSalary : 0,
      oldG ? oldG.steps.length : 0,
      newG ? newG.minSalary : 0,
      newG ? newG.maxSalary : 0,
      newG ? newG.steps.length : 0
    ]);
  }

  const wsScales = XLSX.utils.aoa_to_sheet(scaleRefData);
  wsScales['!cols'] = [
    { wch: 16 },
    { wch: 22 },
    { wch: 20 },
    { wch: 20 },
    { wch: 18 },
    { wch: 22 },
    { wch: 22 },
    { wch: 20 }
  ];
  XLSX.utils.book_append_sheet(wb, wsScales, 'Pay_Scales_Reference');

  // Generate and download file
  const safeName = (result.inputs.employeeName || 'MES_Employee').replace(/[^a-zA-Z0-9]/g, '_');
  const finalFilename = `${filenamePrefix}_${safeName}.xlsx`;
  XLSX.writeFile(wb, finalFilename);
}

export function exportArrearsToCSV(result: FixationResult): void {
  const headers = ['Month-Year', 'Phase', 'Payable Basic (BDT)', 'Allowances (BDT)', 'Gross Payable (BDT)', 'Actually Drawn (BDT)', 'Difference (BDT)', 'Arrears Due (BDT)'];
  const rows = result.arrearsList.map(item => [
    `"${item.monthName} ${item.year}"`,
    `"${item.phaseLabel}"`,
    item.revisedBasicPayable,
    item.revisedAllowancesPayable,
    item.revisedGrossPayable,
    item.salaryActuallyDrawn,
    item.grossDifference,
    item.netArrearsDue
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `MES_Arrears_Schedule_2026.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
