import React, { useState } from 'react';
import { 
  OFFICIAL_RULES_DOCUMENTS, 
  MANDATORY_DISCLAIMER_BN, 
  MANDATORY_DISCLAIMER_EN 
} from '../../data/officialRules';
import { 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Search,
  Scale
} from 'lucide-react';

interface OfficialRulesViewProps {
  isBangla: boolean;
}

export const OfficialRulesView: React.FC<OfficialRulesViewProps> = ({ isBangla }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(OFFICIAL_RULES_DOCUMENTS[0].id);

  const activeDoc = OFFICIAL_RULES_DOCUMENTS.find(d => d.id === selectedDocId) || OFFICIAL_RULES_DOCUMENTS[0];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isBangla ? 'সরকারি বিধিমালা, গেজেট ও আইবাস++ পে-ফিক্সেশন নীতিমালা' : 'Official Rules, Gazette & iBAS++ Regulations'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isBangla 
              ? 'অর্থ মন্ত্রণালয়ের বাস্তবায়ন অনুবিভাগ ও গেজেট আদেশের যাচাইকৃত সূত্র ও আইনি ব্যাখা।' 
              : 'Verified statutory clauses, S.R.O. citations, and Ministry of Finance directives.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://mof.gov.bd/pages/notification-circulars"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5"
          >
            <span>{isBangla ? 'অর্থ মন্ত্রণালয় সার্কুলার' : 'MoF Circulars'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://ibas.finance.gov.bd/login?returnurl=%2Ffixation"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>{isBangla ? 'আইবাস++ পোর্টাল' : 'iBAS++ Portal'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-amber-900">
          <Scale className="w-4 h-4 text-amber-800" />
          <span>{isBangla ? 'সংবিধিবদ্ধ সতর্কবার্তা ও সরকারি নীতি' : 'Mandatory Regulatory Notice & Disclaimer'}</span>
        </div>
        <p className="leading-relaxed">
          {isBangla ? MANDATORY_DISCLAIMER_BN : MANDATORY_DISCLAIMER_EN}
        </p>
      </div>

      {/* Document Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Document List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            {isBangla ? 'গেজেট ও আদেশ তালিকা' : 'Statutory Documents'}
          </h3>

          {OFFICIAL_RULES_DOCUMENTS.map((doc) => {
            const isSelected = selectedDocId === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-emerald-800">{doc.date}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {doc.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                  {isBangla ? doc.titleBn : doc.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {isBangla ? doc.summaryBn : doc.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right 2 Cols: Selected Document Clauses & Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-800 font-semibold">{activeDoc.circularNo}</span>
              <span className="text-xs text-slate-500">{activeDoc.date}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              {isBangla ? activeDoc.titleBn : activeDoc.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBangla ? activeDoc.authorityBn : activeDoc.authority}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {isBangla ? 'আইনি ধারা ও বেতন নির্ধারণের সূত্রসমূহ' : 'Key Clauses & Fixation Directives'}
            </h4>

            {activeDoc.clauses.map((clause, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 font-mono">
                    {clause.clauseNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    {isBangla ? clause.topicBn : clause.topic}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {isBangla ? clause.contentBn : clause.content}
                </p>

                {clause.formula && (
                  <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-300 font-mono text-xs overflow-x-auto">
                    <code>{clause.formula}</code>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isBangla ? 'বিধিমালা ও বাস্তবায়ন সূত্র যাচাইকৃত' : 'Clauses and formula references verified'}</span>
            </div>
            <a
              href={activeDoc.url}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-800 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{isBangla ? 'মূল গেজেট নথি দেখুন' : 'View Source Circular'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
