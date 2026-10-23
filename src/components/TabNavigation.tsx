import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  PieChart, 
  Layers, 
  CalendarClock, 
  Users, 
  History, 
  Table2, 
  FileText, 
  Printer, 
  Settings 
} from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isBangla: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  isBangla
}) => {
  const tabs = [
    {
      id: 'dashboard',
      label: isBangla ? 'ড্যাশবোর্ড' : 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'calculator',
      label: isBangla ? 'বেতন ক্যালকুলেটর' : 'Salary Calculator',
      icon: Calculator
    },
    {
      id: 'breakdown',
      label: isBangla ? 'বেতনের বিবরণ' : 'Salary Breakdown',
      icon: PieChart
    },
    {
      id: 'phase_wise',
      label: isBangla ? 'ধাপভিত্তিক বেতন' : 'Phase-wise Salary',
      icon: Layers
    },
    {
      id: 'arrears',
      label: isBangla ? 'বকেয়া হিসাব' : 'Arrears Calculator',
      icon: CalendarClock
    },
    {
      id: 'records',
      label: isBangla ? 'কর্মচারী রেকর্ড' : 'Employee Records',
      icon: Users
    },
    {
      id: 'service_history',
      label: isBangla ? 'চাকরির ইতিবৃত্ত' : 'Service History',
      icon: History
    },
    {
      id: 'pay_scales',
      label: isBangla ? 'বেতন স্কেল তুলনা' : 'Pay Scales',
      icon: Table2
    },
    {
      id: 'rules',
      label: isBangla ? 'সরকারি বিধি ও গেজেট' : 'Official Rules',
      icon: FileText
    },
    {
      id: 'reports',
      label: isBangla ? 'রিপোর্ট ও এক্সপোর্ট' : 'Reports & Export',
      icon: Printer
    },
    {
      id: 'settings',
      label: isBangla ? 'সেটিংস' : 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className="bg-slate-100/80 border-b border-slate-200 sticky top-18 z-30 overflow-x-auto no-scrollbar py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 min-w-max py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
