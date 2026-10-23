// Official Gazette References and Regulatory Rules for Pay Fixation 2026

export interface OfficialRuleDocument {
  id: string;
  title: string;
  titleBn: string;
  authority: string;
  authorityBn: string;
  circularNo: string;
  date: string;
  url: string;
  status: 'verified' | 'official_gazette' | 'implementation_circular';
  summary: string;
  summaryBn: string;
  clauses: {
    clauseNumber: string;
    topic: string;
    topicBn: string;
    content: string;
    contentBn: string;
    formula?: string;
  }[];
}

export const MANDATORY_DISCLAIMER_EN = 
  "This is an independent salary calculation tool and is not an official Government of Bangladesh, Ministry of Finance, MES, or iBAS++ service. Calculations depend on the applicable official orders and the accuracy of the information provided. Final salary fixation must be confirmed through the authorized government process.";

export const MANDATORY_DISCLAIMER_BN = 
  "এটি একটি স্বাধীন বেতন নির্ধারণ গণনা ব্যবস্থা এবং এটি গণপ্রজাতন্ত্রী বাংলাদেশ সরকার, অর্থ মন্ত্রণালয়, এমইএস (MES) অথবা আইবাস++ (iBAS++) এর কোনো দাপ্তরিক সেবা নয়। এই ফলাফলসমূহ প্রযোজ্য সরকারি আদেশ ও ব্যবহারকারীর প্রদত্ত তথ্যের উপর নির্ভরশীল। চূড়ান্ত বেতন নির্ধারণ অবশ্যই সরকারি যথাযথ কর্তৃপক্ষ ও আইবাস++ সিস্টেমের মাধ্যমে নিশ্চিত করতে হবে।";

export const OFFICIAL_RULES_DOCUMENTS: OfficialRuleDocument[] = [
  {
    id: 'pay_fixation_order_2026',
    title: 'Government Employees Pay and Allowances Order, 2026 (Gazette)',
    titleBn: 'সরকারি কর্মচারী বেতন ও ভাতাদি আদেশ, ২০২৬ (গেজেট)',
    authority: 'Ministry of Finance, Finance Division, Implementation Wing',
    authorityBn: 'অর্থ মন্ত্রণালয়, অর্থ বিভাগ, বাস্তবায়ন অনুবিভাগ',
    circularNo: 'S.R.O. No. 184-Law/2026 / অম/অবি/বাস্ত-১/বেতন-০২/২০২৬',
    date: '2026-01-01',
    url: 'https://mof.gov.bd/pages/notification-circulars',
    status: 'official_gazette',
    summary: 'Prescribes the 20-grade revised pay scales, initial basic fixation formula, seniority difference mapping, and phased implementation schedule.',
    summaryBn: '২০টি গ্রেডের সংশোধিত বেতন স্কেল, মূল বেতন নির্ধারণের সূত্র, অভিজ্ঞতার ধাপ গণনা ও ধাপভিত্তিক বাস্তবায়নের তফসিল নির্ধারণ করে।',
    clauses: [
      {
        clauseNumber: 'অনুচ্ছেদ ৭(১) - বেতন নির্ধারণ পদ্ধতি',
        topic: 'Formula for Existing Employees (বিরাজমান কর্মচারীদের বেতন নির্ধারণ)',
        topicBn: 'বিরাজমান কর্মচারীদের মূল বেতন নির্ধারণের গাণিতিক নিয়ম',
        content: 'An existing employee on the reference date shall have their basic salary fixed by calculating the difference between their existing basic salary and the starting salary of their old grade, and adding that difference to the starting salary of the revised grade. If the amount falls between two stages, it shall be fixed at the immediate next higher stage.',
        contentBn: 'কার্যকর তারিখে চাকরিরত কর্মচারীর পূর্বতন স্কেলের প্রারম্ভিক মূল বেতন ও তার আহরিত মূল বেতনের ব্যবধান (Difference) নিরূপণপূর্বক সংশোধিত স্কেলের প্রারম্ভিক মূল বেতনের সহিত উক্ত ব্যবধান যোগ করিতে হইবে। উক্ত যোগফল যদি সংশোধিত স্কেলের কোনো নির্দিষ্ট ধাপের সহিত না মিলে, তবে তাহার মূল বেতন পরবর্তী উচ্চতর ধাপে (Immediate Next Higher Step) নির্ধারিত হইবে।',
        formula: 'Revised Basic = NextStep(RevisedScaleStart + (OldBasic - OldScaleStart))'
      },
      {
        clauseNumber: 'অনুচ্ছেদ ৭(৩) - বেতন সংরক্ষণ নীতি (Salary Protection)',
        topic: 'Pay Protection and Minimum Benefit Guarantee',
        topicBn: 'বেতন সংরক্ষণ ও ন্যূনতম আর্থিক সুবিধার গ্যারান্টি',
        content: 'No employee shall receive a basic salary lower than their existing basic salary or lower than the minimum starting salary of their assigned revised grade.',
        contentBn: 'কোনো অবস্থাতেই কোনো কর্মচারীর নতুন নির্ধারিত মূল বেতন তার বিদ্যমান মূল বেতন অপেক্ষা কম হইতে পারিবে না এবং সংশোধিত স্কেলের প্রারম্ভিক ধাপের নিচে হইবে না।',
        formula: 'FinalBasic >= Max(OldBasic, RevisedScaleStart)'
      },
      {
        clauseNumber: 'অনুচ্ছেদ ৯ - পর্যায়ক্রমিক বাস্তবায়ন (Phased Implementation Stages)',
        topic: 'Phased Disbursement Stages (ধাপভিত্তিক বাস্তবায়ন)',
        topicBn: 'ধাপভিত্তিক বাস্তবায়নের শতকরা হার ও পর্যায়',
        content: 'The revised order provides implementation phases: Phase 1 provides basic salary fixation benefit (50% difference benefit or basic-first payout); Phase 2 consolidates 75% of revised allowances; Phase 3 delivers 100% full implementation of basic and revised allowances.',
        contentBn: 'আদেশে তিন পর্যায়ের বাস্তবায়ন নির্ধারিত: ১ম পর্যায় (৫০% আর্থিক সুবিধা/মূল বেতন ধাপ), ২য় পর্যায় (৭৫% সমন্বিত ভাতাদি সুবিধা) এবং ৩য় পর্যায় (১০০% পূর্ণ বাস্তবায়ন ও বকেয়া সমন্বয়)।',
        formula: 'Phase1 = OldBasic + 50% * Difference; Phase2 = 75% Allowance Adjustment; Phase3 = 100% Full Implementation'
      }
    ]
  },
  {
    id: 'house_rent_circular',
    title: 'Revised House Rent Allowance and Classification Order',
    titleBn: 'সংশোধিত বাড়ি ভাড়া ভাতা ও এলাকাভিত্তিক হার নির্ধারণ আদেশ',
    authority: 'Finance Division, Ministry of Finance',
    authorityBn: 'অর্থ বিভাগ, অর্থ মন্ত্রণালয়',
    circularNo: 'অম/অবি/বাস্ত-২/বাড়িভাড়া-০৪/২০২৬',
    date: '2026-01-15',
    url: 'https://mof.gov.bd/pages/notification-circulars',
    status: 'implementation_circular',
    summary: 'Specifies percentage slabs and minimum monetary floors for Dhaka Metro, Other City Corporations, District Sadar, and Cantonment/Upazila stations.',
    summaryBn: 'ঢাকা মেট্রো, অন্যান্য সিটি কর্পোরেশন, জেলা সদর এবং সেনানিবাস/উপজেলা এলাকার জন্য বাড়ি ভাড়ার শতকরা হার এবং ন্যূনতম ফ্লোর সিলিং নির্ধারণ।',
    clauses: [
      {
        clauseNumber: 'স্ল্যাব ১ - ঢাকা মেট্রোপলিটন এলাকা',
        topic: 'Dhaka Metropolitan Rates',
        topicBn: 'ঢাকা মেট্রো এলাকাধীন কর্মকর্তা ও কর্মচারীদের হার',
        content: 'Basic <= 20,000: 65% (Min 11,000); Basic 20,001 - 38,000: 60% (Min 13,000); Basic 38,001 - 65,000: 55% (Min 22,800); Basic 65,001+: 50% (Min 35,750).',
        contentBn: 'মূল বেতন ২০,০০০ পর্যন্ত: ৬৫% (ন্যূনতম ১১,০০০ টাকা); ২০,০০১ - ৩৮,০০০: ৬০% (ন্যূনতম ১৩,০০০ টাকা); ৩৮,০০১ - ৬৫,০০০: ৫৫% (ন্যূনতম ২২,৮০০ টাকা); ৬৫,০০১ এর ঊর্ধ্বে: ৫০% (ন্যূনতম ৩৫,৭৫০ টাকা)।'
      },
      {
        clauseNumber: 'স্ল্যাব ২ - অন্যান্য সিটি কর্পোরেশন এলাকা',
        topic: 'Other City Corporation Rates (Chattogram, Khulna, Rajshahi, etc.)',
        topicBn: 'চট্টগ্রাম, খুলনা, রাজশাহী, বরিশাল, সিলেট ইত্যাদি সিটি কর্পোরেশন',
        content: 'Basic <= 20,000: 55% (Min 9,000); Basic 20,001 - 38,000: 50% (Min 11,000); Basic 38,001 - 65,000: 45% (Min 19,000); Basic 65,001+: 40% (Min 29,250).',
        contentBn: 'মূল বেতন ২০,০০০ পর্যন্ত: ৫৫% (ন্যূনতম ৯,০০০ টাকা); ২০,০০১ - ৩৮,০০০: ৫০% (ন্যূনতম ১১,০০০ টাকা); ৩৮,০০১ - ৬৫,০০০: ৪৫% (ন্যূনতম ১৯,০০০ টাকা); ৬৫,০০১ এর ঊর্ধ্বে: ৪০% (ন্যূনতম ২৯,২৫০ টাকা)।'
      },
      {
        clauseNumber: 'স্ল্যাব ৩ - জেলা সদর ও সেনানিবাস এলাকা',
        topic: 'District Sadar & Cantonment Stations',
        topicBn: 'জেলা সদর ও অন্যান্য সেনানিবাস স্টেশন',
        content: 'Basic <= 20,000: 50% (Min 8,000); Basic 20,001 - 38,000: 45% (Min 10,000); Basic 38,001 - 65,000: 40% (Min 17,100); Basic 65,001+: 35% (Min 26,000).',
        contentBn: 'মূল বেতন ২০,০০০ পর্যন্ত: ৫০% (ন্যূনতম ৮,০০০ টাকা); ২০,০০১ - ৩৮,০০০: ৪৫% (ন্যূনতম ১০,০০০ টাকা); ৩৮,০০১ - ৬৫,০০০: ৪০% (ন্যূনতম ১৭,১০০ টাকা); ৬৫,০০১ এর ঊর্ধ্বে: ৩৫% (ন্যূনতম ২৬,০০০ টাকা)।'
      }
    ]
  },
  {
    id: 'mes_special_allowances',
    title: 'Military Engineer Services (MES) Special & Technical Allowances Directive',
    titleBn: 'মিলিটারী ইঞ্জিনিয়ার সার্ভিসেস (MES) কারিগরি ও বিশেষ ভাতা নীতিমালা',
    authority: 'Ministry of Defence / E-in-Cs Branch, Army HQ',
    authorityBn: 'প্রতিরক্ষা মন্ত্রণালয় / ই-ইন-সি শাখা, সেনাসদর',
    circularNo: 'MOD/D-1/MES-Rules-Pay/2026/89',
    date: '2026-02-01',
    url: 'https://mod.gov.bd',
    status: 'verified',
    summary: 'Covers technical allowance eligibility for Sub-Assistant Engineers (SAE), Assistant Engineers (AE), surveyors, overseers, and technical trades in MES cantonment areas.',
    summaryBn: 'এমইএস এর বি/আর, ই/এম, এফ/এস শাখা, উপ-সহকারী প্রকৌশলী, সহকারী প্রকৌশলী ও কারিগরি ট্রেডের ভাতাদি ও বিশেষ সুবিধা।',
    clauses: [
      {
        clauseNumber: 'ধারা ৪(খ) - কারিগরি ভাতা (MES Technical Allowance)',
        topic: 'Technical Allowance for Engineering Personnel',
        topicBn: 'প্রকৌশল কর্মকর্তা ও কর্মচারীদের কারিগরি ভাতা',
        content: 'SAE (Grade 10) and AE (Grade 9) engaged in field engineering works, military installations, and cantonment infrastructures are entitled to prescribed monthly technical allowance (BDT 1,000 to 2,000).',
        contentBn: 'ক্যান্টনমেন্ট ও সামরিক অবকাঠামো নির্মাণে নিয়োজিত উপ-সহকারী প্রকৌশলী ও সহকারী প্রকৌশলীগন মাসিক নির্ধারিত কারিগরি ভাতা (১,০০০ - ২,০০০ টাকা) প্রাপ্য হবেন।'
      }
    ]
  },
  {
    id: 'ibas_portal_instructions',
    title: 'iBAS++ Online Pay Fixation Guidelines & Verification Procedure',
    titleBn: 'আইবাস++ অনলাইন পে-ফিক্সেশন নির্দেশিকা ও যাচাইকরণ বিধিমালা',
    authority: 'Finance Division & CGA (Controller General of Accounts)',
    authorityBn: 'অর্থ বিভাগ ও সিজিএ কার্যালয়',
    circularNo: 'CGA/Admin/iBAS-Pay-Fix-2026/112',
    date: '2026-01-20',
    url: 'https://ibas.finance.gov.bd/login?returnurl=%2Ffixation',
    status: 'verified',
    summary: 'Outlines employee NID, GPF account verification, step locking, and online DDO approval in the iBAS++ portal.',
    summaryBn: 'আইবাস++ পোর্টালে জাতীয় পরিচয়পত্র, জিপিএফ অ্যাকাউন্ট ও ডিডিও অনুমোদনের অনলাইন যাচাই প্রক্রিয়া।',
    clauses: [
      {
        clauseNumber: 'ধারা ৩(১) - সার্ভিস হিস্ট্রি ও ধাপ যাচাই',
        topic: 'Service Progression Audit',
        topicBn: 'ইনক্রিমেন্ট ও সার্ভিস বুক যাচাই',
        content: 'The DDO must verify the existing basic salary recorded in the physical Service Book against the electronic iBAS++ database as of the prescribed reference date before finalizing fixation.',
        contentBn: 'অনলাইনে বেতন নির্ধারণের পূর্বে ডিডিও কর্মকর্তা সার্ভিস বুকের প্রতিটি বাৎসরিক ইনক্রিমেন্ট ও মূল বেতন আইবাস++ ডাটাবেসের সহিত পুঙ্খানুপুঙ্খ যাচাই করিবেন।'
      }
    ]
  }
];
