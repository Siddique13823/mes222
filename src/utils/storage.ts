// Persistent local storage & seed data for Employee Pay Fixation records
import { SavedEmployeeRecord, FixationInput } from '../types';
import { calculateSalaryFixation } from './calculator';

const STORAGE_KEY = 'mes_bd_pay_fixation_records_v1';

// Pre-seeded authentic MES worked test cases for immediate testing
export const INITIAL_SEEDED_RECORDS: SavedEmployeeRecord[] = [
  (() => {
    const input: FixationInput = {
      previousBasicSalary: 27430,
      grade: 10,
      employeeCategory: 'mes_technical',
      mesTrade: 'SAE',
      employeeName: 'মোঃ রফিকুল ইসলাম (Md. Rafiqul Islam)',
      employeeId: 'MES-10492-T',
      designation: 'উপ-সহকারী প্রকৌশলী (SAE B/R)',
      officeOrUnit: 'জিই (আর্মি) সেন্ট্রাল, ঢাকা সেনানিবাস',
      location: 'dhaka_metro',
      referenceDate: '2025-07-01',
      serviceYears: 14,
      hasPromotionOrHigherGrade: false,
      childrenCount: 2,
      gpfPercentage: 15,
      isSeniorCitizen: false
    };
    const res = calculateSalaryFixation(input);
    return {
      id: 'mes-rec-001',
      createdAt: '2026-02-15T09:30:00.000Z',
      updatedAt: '2026-02-15T09:30:00.000Z',
      employeeName: input.employeeName,
      employeeId: input.employeeId,
      designation: input.designation,
      grade: input.grade,
      officeOrUnit: input.officeOrUnit,
      employeeCategory: input.employeeCategory,
      mesTrade: input.mesTrade,
      previousBasicSalary: input.previousBasicSalary,
      finalRevisedBasic: res.finalRevisedBasic,
      totalArrears: res.totalEstimatedArrears,
      inputs: input,
      resultSummary: {
        fullRevisedBasic: res.finalRevisedBasic,
        phase1Basic: res.phases.phase1.payableBasic,
        phase3Gross: res.phases.phase3.grossSalary,
        phase3Net: res.phases.phase3.netSalary
      },
      notes: '১৪ বছরের অভিজ্ঞতাসম্পন্ন উপ-সহকারী প্রকৌশলী। ধাপ যাচাইকৃত।'
    };
  })(),
  (() => {
    const input: FixationInput = {
      previousBasicSalary: 37680,
      grade: 9,
      employeeCategory: 'mes_technical',
      mesTrade: 'AE',
      employeeName: 'ইঞ্জিনিয়ার শাহরিয়ার কবীর (Engr. Shahriar Kabir)',
      employeeId: 'MES-08819-O',
      designation: 'সহকারী প্রকৌশলী (Assistant Engineer E/M)',
      officeOrUnit: 'এয়ার ফোর্স মেইনটেন্যান্স ইউনিট, কুর্মিটোলা',
      location: 'dhaka_metro',
      referenceDate: '2025-07-01',
      serviceYears: 12,
      hasPromotionOrHigherGrade: false,
      childrenCount: 1,
      gpfPercentage: 20,
      isSeniorCitizen: false
    };
    const res = calculateSalaryFixation(input);
    return {
      id: 'mes-rec-002',
      createdAt: '2026-02-18T11:15:00.000Z',
      updatedAt: '2026-02-18T11:15:00.000Z',
      employeeName: input.employeeName,
      employeeId: input.employeeId,
      designation: input.designation,
      grade: input.grade,
      officeOrUnit: input.officeOrUnit,
      employeeCategory: input.employeeCategory,
      mesTrade: input.mesTrade,
      previousBasicSalary: input.previousBasicSalary,
      finalRevisedBasic: res.finalRevisedBasic,
      totalArrears: res.totalEstimatedArrears,
      inputs: input,
      resultSummary: {
        fullRevisedBasic: res.finalRevisedBasic,
        phase1Basic: res.phases.phase1.payableBasic,
        phase3Gross: res.phases.phase3.grossSalary,
        phase3Net: res.phases.phase3.netSalary
      },
      notes: 'সহকারী প্রকৌশলী (ই/এম শাখা), ১২ বছরের ইনক্রিমেন্ট ধাপ সংযোজিত।'
    };
  })(),
  (() => {
    const input: FixationInput = {
      previousBasicSalary: 17520,
      grade: 14,
      employeeCategory: 'mes_admin',
      mesTrade: 'ClericalStore',
      employeeName: 'আহমেদ উল্লাহ (Ahmed Ullah)',
      employeeId: 'MES-14205-C',
      designation: 'উচ্চমান সহকারী (UDC / Storekeeper)',
      officeOrUnit: 'জিই (নেভি) চট্টগ্রাম নৌঘাঁটি',
      location: 'other_city_corp',
      referenceDate: '2025-07-01',
      serviceYears: 16,
      hasPromotionOrHigherGrade: false,
      childrenCount: 2,
      gpfPercentage: 12,
      isSeniorCitizen: false
    };
    const res = calculateSalaryFixation(input);
    return {
      id: 'mes-rec-003',
      createdAt: '2026-02-20T14:40:00.000Z',
      updatedAt: '2026-02-20T14:40:00.000Z',
      employeeName: input.employeeName,
      employeeId: input.employeeId,
      designation: input.designation,
      grade: input.grade,
      officeOrUnit: input.officeOrUnit,
      employeeCategory: input.employeeCategory,
      mesTrade: input.mesTrade,
      previousBasicSalary: input.previousBasicSalary,
      finalRevisedBasic: res.finalRevisedBasic,
      totalArrears: res.totalEstimatedArrears,
      inputs: input,
      resultSummary: {
        fullRevisedBasic: res.finalRevisedBasic,
        phase1Basic: res.phases.phase1.payableBasic,
        phase3Gross: res.phases.phase3.grossSalary,
        phase3Net: res.phases.phase3.netSalary
      },
      notes: 'চট্টগ্রাম নৌঘাঁটিতে কর্মরত উচ্চমান সহকারী।'
    };
  })()
];

export function getSavedRecords(): SavedEmployeeRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_RECORDS));
      return INITIAL_SEEDED_RECORDS;
    }
    return JSON.parse(stored);
  } catch {
    return INITIAL_SEEDED_RECORDS;
  }
}

export function saveEmployeeRecord(record: SavedEmployeeRecord): SavedEmployeeRecord[] {
  const current = getSavedRecords();
  const existingIdx = current.findIndex(r => r.id === record.id);
  let updated: SavedEmployeeRecord[];

  if (existingIdx !== -1) {
    updated = [...current];
    updated[existingIdx] = { ...record, updatedAt: new Date().toISOString() };
  } else {
    updated = [record, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }

  return updated;
}

export function deleteEmployeeRecord(id: string): SavedEmployeeRecord[] {
  const current = getSavedRecords();
  const filtered = current.filter(r => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to update localStorage:', err);
  }
  return filtered;
}

export function exportRecordsAsJSON(): string {
  const records = getSavedRecords();
  return JSON.stringify(records, null, 2);
}

export function importRecordsFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
