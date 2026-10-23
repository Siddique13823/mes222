import React, { useState } from 'react';
import { SavedEmployeeRecord, FixationResult } from '../../types';
import { formatBDT, toBanglaNumber } from '../../utils/banglaNumbers';
import { exportRecordsAsJSON, importRecordsFromJSON } from '../../utils/storage';
import { 
  Search, 
  UserPlus, 
  Download, 
  Upload, 
  Trash2, 
  ArrowRight, 
  FileSpreadsheet, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface EmployeeRecordsViewProps {
  savedRecords: SavedEmployeeRecord[];
  currentResult: FixationResult;
  onSelectRecord: (record: SavedEmployeeRecord) => void;
  onSaveCurrentResult: (notes: string) => void;
  onDeleteRecord: (id: string) => void;
  onReloadRecords: () => void;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const EmployeeRecordsView: React.FC<EmployeeRecordsViewProps> = ({
  savedRecords,
  currentResult,
  onSelectRecord,
  onSaveCurrentResult,
  onDeleteRecord,
  onReloadRecords,
  setActiveTab,
  isBangla
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [saveNotes, setSaveNotes] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const filteredRecords = savedRecords.filter(r => {
    const matchesSearch = 
      r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.officeOrUnit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = gradeFilter === 'all' || r.grade.toString() === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCurrentResult(saveNotes);
    setSaveNotes('');
    setShowSaveModal(false);
  };

  const handleExportJSON = () => {
    const jsonStr = exportRecordsAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MES_Employee_Records_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const success = importRecordsFromJSON(text);
        if (success) {
          onReloadRecords();
          setImportStatus('রেকর্ড সফলভাবে আমদানি হয়েছে!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('আমদানি ব্যর্থ হয়েছে। ফাইলের ফরম্যাট সঠিক নয়।');
          setTimeout(() => setImportStatus(null), 4000);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'কর্মচারী বেতন নির্ধারণ রেকর্ড ব্যবস্থাপনা' : 'Employee Pay Fixation Records'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'সংরক্ষিত কর্মকর্তা-কর্মচারীদের প্রোফাইল, পূর্ববর্তী বেতন, নতুন ধাপ এবং বকেয়ার আর্কাইভ।' 
              : 'Archive of saved officer & staff records, previous pay, revised step pay, and arrears.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowSaveModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-300" />
            <span>{isBangla ? 'চলতি হিসাব সংরক্ষণ করুন' : 'Save Current Result'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isBangla ? 'ব্যাকআপ (JSON)' : 'Export JSON'}</span>
          </button>

          <label className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>{isBangla ? 'রিস্টোর' : 'Import'}</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBangla ? 'নাম, আইডি, বা পদবী দিয়ে খুঁজুন...' : 'Search by name, ID, or post...'}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 shrink-0">{isBangla ? 'গ্রেড অনুযায়ী ফিল্টার:' : 'Grade Filter:'}</span>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
          >
            <option value="all">{isBangla ? 'সকল গ্রেড' : 'All Grades'}</option>
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                {isBangla ? `গ্রেড ${toBanglaNumber(i + 1)}` : `Grade ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-medium">{isBangla ? 'কোনো কর্মচারী রেকর্ড পাওয়া যায়নি' : 'No records found'}</p>
            <p className="text-xs text-slate-400">{isBangla ? 'বেতন ক্যালকুলেটরে গিয়ে হিসাব সম্পন্ন করে সংরক্ষণ করুন।' : 'Run a salary calculation and click Save.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4">{isBangla ? 'কর্মচারীর নাম ও পরিচিতি' : 'Employee Details'}</th>
                  <th className="py-3 px-3">{isBangla ? 'পদবী ও শাখা' : 'Designation & Trade'}</th>
                  <th className="py-3 px-3">{isBangla ? 'গ্রেড' : 'Grade'}</th>
                  <th className="py-3 px-3 text-right">{isBangla ? 'পূর্ববর্তী মূল বেতন' : 'Old Basic'}</th>
                  <th className="py-3 px-3 text-right">{isBangla ? 'সংশোধিত মূল বেতন' : 'Revised Basic'}</th>
                  <th className="py-3 px-3 text-right">{isBangla ? 'মোট বকেয়া' : 'Total Arrears'}</th>
                  <th className="py-3 px-4 text-center">{isBangla ? 'অ্যাকশন' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{r.employeeName}</div>
                      <div className="text-[11px] text-slate-500 font-mono-numbers">{r.employeeId} · {r.officeOrUnit}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="text-slate-800">{r.designation}</div>
                      <div className="text-[11px] text-slate-400">{r.mesTrade || r.employeeCategory}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {isBangla ? `গ্রেড ${toBanglaNumber(r.grade)}` : `Grade ${r.grade}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-numbers text-slate-600">
                      {formatBDT(r.previousBasicSalary, isBangla)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-numbers font-bold text-emerald-950">
                      {formatBDT(r.finalRevisedBasic, isBangla)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-numbers font-bold text-blue-900">
                      {formatBDT(r.totalArrears, isBangla)}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            onSelectRecord(r);
                            setActiveTab('breakdown');
                          }}
                          title={isBangla ? 'ক্যালকুলেটরে লোড করুন' : 'Load in Calculator'}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded transition-colors flex items-center gap-1"
                        >
                          <span>{isBangla ? 'লোড' : 'Load'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(r.id)}
                          title={isBangla ? 'মুছে ফেলুন' : 'Delete'}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {isBangla ? 'চলতি বেতন হিসাব সংরক্ষণ' : 'Save Current Pay Fixation'}
            </h3>
            <p className="text-xs text-slate-500">
              {currentResult.inputs.employeeName} ({currentResult.inputs.designation}) এর বেতন হিসাব ডাটাবেসে স্থায়ীভাবে সংরক্ষিত হবে।
            </p>

            <form onSubmit={handleSaveCurrent} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isBangla ? 'মন্তব্য বা সার্ভিস নোট (ঐচ্ছিক)' : 'Service Notes (Optional)'}
                </label>
                <textarea
                  value={saveNotes}
                  onChange={(e) => setSaveNotes(e.target.value)}
                  placeholder="e.g. ১৪ বছরের সেবাকাল, জিই ঢাকা সেনানিবাসে কর্মরত।"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  {isBangla ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm"
                >
                  {isBangla ? 'সংরক্ষণ সম্পন্ন করুন' : 'Confirm & Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
