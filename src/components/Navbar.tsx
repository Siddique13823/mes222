import React from 'react';
import { Emblem } from './Emblem';
import { Calculator, Globe, FileSpreadsheet } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
  setIsBangla: (val: boolean) => void;
  onQuickCalculate: () => void;
  onExportExcel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isBangla,
  setIsBangla,
  onQuickCalculate,
  onExportExcel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single Brand Zone with dual emblems */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="flex items-center -space-x-2">
              <Emblem type="national" size="sm" className="ring-2 ring-white" />
              <Emblem type="mes" size="sm" className="ring-2 ring-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                {isBangla ? 'পে-ফিক্সেশন ২০২৬' : 'Pay Fixation 2026'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                {isBangla ? 'মিলিটারী ইঞ্জিনিয়ার সার্ভিসেস (MES)' : 'Military Engineer Services, Bangladesh'}
              </span>
            </div>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'dashboard' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              {isBangla ? 'ড্যাশবোর্ড' : 'Dashboard'}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'calculator' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              {isBangla ? 'বেতন ক্যালকুলেটর' : 'Calculator'}
            </button>
            <button
              onClick={() => setActiveTab('phase_wise')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'phase_wise' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              {isBangla ? 'ধাপভিত্তিক বেতন' : 'Phases'}
            </button>
            <button
              onClick={() => setActiveTab('arrears')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'arrears' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              {isBangla ? 'বকেয়া হিসাব' : 'Arrears'}
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'rules' ? 'text-emerald-800 font-semibold' : ''
              }`}
            >
              {isBangla ? 'সরকারি বিধি ও গেজেট' : 'Gazette Rules'}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsBangla(!isBangla)}
              title={isBangla ? 'Switch to English' : 'বাংলায় দেখুন'}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isBangla ? 'EN' : 'বাং'}</span>
            </button>

            <button
              onClick={onExportExcel}
              title={isBangla ? 'এক্সেল ডাউনলোড করুন' : 'Export to Excel'}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isBangla ? 'এক্সেল' : 'Excel'}</span>
            </button>

            <button
              onClick={onQuickCalculate}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4 text-emerald-300" />
              <span>{isBangla ? 'নতুন বেতন নির্ধারণ' : 'Calculate Salary'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
