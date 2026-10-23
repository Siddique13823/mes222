// Bengali number and currency utilities

const BANGLA_DIGITS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const ENGLISH_DIGITS: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

export function toBanglaNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null || num === '') return '০';
  const str = typeof num === 'number' ? Math.round(num).toString() : num.toString();
  return str.replace(/[0-9]/g, (digit) => BANGLA_DIGITS[digit] || digit);
}

export function toEnglishNumber(str: string): number {
  if (!str) return 0;
  const converted = str.replace(/[০-৯]/g, (digit) => ENGLISH_DIGITS[digit] || digit);
  const clean = converted.replace(/[^0-9.-]/g, '');
  return parseFloat(clean) || 0;
}

export function formatBDT(amount: number | undefined | null, isBangla = true): string {
  if (amount === undefined || amount === null) return isBangla ? '৳০' : '৳0';
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-IN'); // Indian/Bangladeshi numbering system (lakh/crore)
  if (!isBangla) {
    return `৳${formatted}`;
  }
  return `৳${toBanglaNumber(formatted)}`;
}

export function numberInBanglaWords(num: number): string {
  if (num === 0) return 'শূন্য টাকা মাত্র';
  const units = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ',
    'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোলো', 'সতেরো', 'আঠারো', 'উনিশ', 'বিশ',
    'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আঠাশ', 'উনত্রিশ', 'ত্রিশ',
    'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁয়ত্রিশ', 'আটত্রিশ', 'উনচল্লিশ', 'চল্লিশ',
    'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'উনপঞ্চাশ', 'পঞ্চাশ',
    'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'উনষাট', 'ষাট',
    'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'উনসত্তর', 'সত্তর',
    'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চুয়াত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'উনাশি', 'আশি',
    'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'আটাশি', 'ঊননব্বই', 'নব্বই',
    'একানব্বই', 'বানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
  ];

  let n = Math.floor(Math.abs(num));
  let result = '';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const hundred = Math.floor(n / 100);
  n %= 100;
  const remainder = n;

  if (crore > 0) {
    result += (crore < 100 ? units[crore] : crore.toString()) + ' কোটি ';
  }
  if (lakh > 0) {
    result += (lakh < 100 ? units[lakh] : lakh.toString()) + ' লক্ষ ';
  }
  if (thousand > 0) {
    result += (thousand < 100 ? units[thousand] : thousand.toString()) + ' হাজার ';
  }
  if (hundred > 0) {
    result += units[hundred] + ' শত ';
  }
  if (remainder > 0) {
    result += units[remainder] + ' ';
  }

  return (result.trim() || 'শূন্য') + ' টাকা মাত্র';
}
