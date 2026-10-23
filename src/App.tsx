import React, { useState } from 'react';
import { FixationResult, SavedEmployeeRecord, FixationInput } from './types';
import { calculateSalaryFixation } from './utils/calculator';
import { getSavedRecords, saveEmployeeRecord, deleteEmployeeRecord, INITIAL_SEEDED_RECORDS } from './utils/storage';
import { exportFixationToExcel } from './utils/excelExport';

// Components
import { Navbar } from './components/Navbar';
import { TabNavigation } from './components/TabNavigation';
import { Emblem } from './components/Emblem';
import { DashboardView } from './components/views/DashboardView';
import { SalaryCalculatorView } from './components/views/SalaryCalculatorView';
import { SalaryBreakdownView } from './components/views/SalaryBreakdownView';
import { PhaseWiseSalaryView } from './components/views/PhaseWiseSalaryView';
import { ArrearsCalculatorView } from './components/views/ArrearsCalculatorView';
import { EmployeeRecordsView } from './components/views/EmployeeRecordsView';
import { ServiceHistoryView } from './components/views/ServiceHistoryView';
import { PayScalesView } from './components/views/PayScalesView';
import { OfficialRulesView } from './components/views/OfficialRulesView';
import { ReportsExportView } from './components/views/ReportsExportView';
import { SettingsView } from './components/views/SettingsView';

export default function App() {
  // Bengali First Default
  const [isBangla, setIsBangla] = useState<boolean>(true);
  
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Initial calculation state (pre-loaded with Sub-Assistant Engineer Grade 10)
  const [currentResult, setCurrentResult] = useState<FixationResult>(() => {
    const defaultInput: FixationInput = {
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
    return calculateSalaryFixation(defaultInput);
  });

  // Saved Employee records
  const [savedRecords, setSavedRecords] = useState<SavedEmployeeRecord[]>(() => getSavedRecords());

  // Handlers
  const handleCalculationComplete = (newResult: FixationResult) => {
    setCurrentResult(newResult);
    // Automatically auto-save or update records
    const autoRec: SavedEmployeeRecord = {
      id: `mes-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      employeeName: newResult.inputs.employeeName || 'Officer/Staff',
      employeeId: newResult.inputs.employeeId || 'MES-NID',
      designation: newResult.inputs.designation || 'Staff',
      grade: newResult.inputs.grade,
      officeOrUnit: newResult.inputs.officeOrUnit || 'MES Unit',
      employeeCategory: newResult.inputs.employeeCategory,
      mesTrade: newResult.inputs.mesTrade,
      previousBasicSalary: newResult.inputs.previousBasicSalary,
      finalRevisedBasic: newResult.finalRevisedBasic,
      totalArrears: newResult.totalEstimatedArrears,
      inputs: newResult.inputs,
      resultSummary: {
        fullRevisedBasic: newResult.finalRevisedBasic,
        phase1Basic: newResult.phases.phase1.payableBasic,
        phase3Gross: newResult.phases.phase3.grossSalary,
        phase3Net: newResult.phases.phase3.netSalary
      },
      notes: 'সদ্য গণনাকৃত রেকর্ড'
    };
    const updated = saveEmployeeRecord(autoRec);
    setSavedRecords(updated);
  };

  const handleSelectRecord = (record: SavedEmployeeRecord) => {
    const recalc = calculateSalaryFixation(record.inputs);
    setCurrentResult(recalc);
    setActiveTab('breakdown');
  };

  const handleSaveCurrentResult = (notes: string) => {
    const newRecord: SavedEmployeeRecord = {
      id: `mes-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      employeeName: currentResult.inputs.employeeName || 'Staff',
      employeeId: currentResult.inputs.employeeId || 'MES-ID',
      designation: currentResult.inputs.designation || 'Staff',
      grade: currentResult.inputs.grade,
      officeOrUnit: currentResult.inputs.officeOrUnit || 'MES Cantonment',
      employeeCategory: currentResult.inputs.employeeCategory,
      mesTrade: currentResult.inputs.mesTrade,
      previousBasicSalary: currentResult.inputs.previousBasicSalary,
      finalRevisedBasic: currentResult.finalRevisedBasic,
      totalArrears: currentResult.totalEstimatedArrears,
      inputs: currentResult.inputs,
      resultSummary: {
        fullRevisedBasic: currentResult.finalRevisedBasic,
        phase1Basic: currentResult.phases.phase1.payableBasic,
        phase3Gross: currentResult.phases.phase3.grossSalary,
        phase3Net: currentResult.phases.phase3.netSalary
      },
      notes: notes || 'সংরক্ষিত পে-ফিক্সেশন বিবরণী'
    };
    const updated = saveEmployeeRecord(newRecord);
    setSavedRecords(updated);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = deleteEmployeeRecord(id);
    setSavedRecords(updated);
  };

  const handleReloadRecords = () => {
    setSavedRecords(getSavedRecords());
  };

  const handleExportExcel = () => {
    exportFixationToExcel(currentResult);
  };

  const handleResetDefaults = () => {
    localStorage.removeItem('mes_bd_pay_fixation_records_v1');
    setSavedRecords(INITIAL_SEEDED_RECORDS);
    const recalc = calculateSalaryFixation(INITIAL_SEEDED_RECORDS[0].inputs);
    setCurrentResult(recalc);
  };

  const handleApplySimulation = (newBasic: number, gradeNumber: number) => {
    const updatedInput: FixationInput = {
      ...currentResult.inputs,
      previousBasicSalary: newBasic,
      grade: gradeNumber
    };
    const res = calculateSalaryFixation(updatedInput);
    setCurrentResult(res);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBangla={isBangla}
        setIsBangla={setIsBangla}
        onQuickCalculate={() => setActiveTab('calculator')}
        onExportExcel={handleExportExcel}
      />

      {/* 11 Functional Tabs Navigation Bar */}
      <div className="no-print">
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isBangla={isBangla}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentResult={currentResult}
            savedRecords={savedRecords}
            onSelectRecord={handleSelectRecord}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
            onExportExcel={handleExportExcel}
          />
        )}

        {activeTab === 'calculator' && (
          <SalaryCalculatorView
            currentResult={currentResult}
            onCalculationComplete={handleCalculationComplete}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'breakdown' && (
          <SalaryBreakdownView
            currentResult={currentResult}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'phase_wise' && (
          <PhaseWiseSalaryView
            currentResult={currentResult}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'arrears' && (
          <ArrearsCalculatorView
            currentResult={currentResult}
            onUpdateResult={(updated) => setCurrentResult(updated)}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'records' && (
          <EmployeeRecordsView
            savedRecords={savedRecords}
            currentResult={currentResult}
            onSelectRecord={handleSelectRecord}
            onSaveCurrentResult={handleSaveCurrentResult}
            onDeleteRecord={handleDeleteRecord}
            onReloadRecords={handleReloadRecords}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'service_history' && (
          <ServiceHistoryView
            currentResult={currentResult}
            onApplySimulation={handleApplySimulation}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'pay_scales' && (
          <PayScalesView
            onSelectGrade={(gr) => {
              handleApplySimulation(currentResult.inputs.previousBasicSalary, gr);
            }}
            setActiveTab={setActiveTab}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'rules' && (
          <OfficialRulesView isBangla={isBangla} />
        )}

        {activeTab === 'reports' && (
          <ReportsExportView
            currentResult={currentResult}
            isBangla={isBangla}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            isBangla={isBangla}
            setIsBangla={setIsBangla}
            onResetDefaults={handleResetDefaults}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <Emblem type="national" size="sm" />
              <Emblem type="mes" size="sm" />
              <div>
                <p className="font-semibold text-slate-800">
                  {isBangla ? 'বাংলাদেশ সরকারি কর্মচারী পে-ফিক্সেশন ২০২৬' : 'Bangladesh Government Employees Pay Fixation 2026'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isBangla ? 'মিলিটারী ইঞ্জিনিয়ার সার্ভিসেস (MES) • প্রতিরক্ষা মন্ত্রণালয়' : 'Military Engineer Services (MES) • Ministry of Defence'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => setActiveTab('rules')} className="hover:text-emerald-800 transition-colors">
                {isBangla ? 'বিধিমালা ও গেজেট' : 'Gazette Rules'}
              </button>
              <span>·</span>
              <button onClick={() => setActiveTab('reports')} className="hover:text-emerald-800 transition-colors">
                {isBangla ? 'রিপোর্ট' : 'Reports'}
              </button>
              <span>·</span>
              <button onClick={() => setActiveTab('settings')} className="hover:text-emerald-800 transition-colors">
                {isBangla ? 'সেটিংস' : 'Settings'}
              </button>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center sm:text-left text-[11px] text-slate-400">
            {isBangla
              ? 'স্বাধীন বেতন নির্ধারণ ও বকেয়া হিসাব প্ল্যাটফর্ম। আইবাস++ ও সরকারি গেজেট নীতিমালার আলোকে প্রস্তুতকৃত।'
              : 'Independent salary fixation & arrears calculation platform built in accordance with iBAS++ & MoF Gazette regulations.'}
          </div>
        </div>
      </footer>

    </div>
  );
}
