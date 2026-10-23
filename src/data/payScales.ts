// Official Bangladesh National Pay Scales: 2015 (8th Scale) and 2026 (Revised Pay Order)
import { PayScaleGrade } from '../types';

// National Pay Scale 2015 (S.R.O. No. 367-Law/2015) - 20 Grades with full steps
export const PAY_SCALE_2015: PayScaleGrade[] = [
  {
    grade: 1,
    gradeBn: '১ম গ্রেড',
    minSalary: 78000,
    maxSalary: 78000,
    steps: [78000] // Fixed
  },
  {
    grade: 2,
    gradeBn: '২য় গ্রেড',
    minSalary: 66000,
    maxSalary: 76490,
    steps: [66000, 69300, 72770, 76490]
  },
  {
    grade: 3,
    gradeBn: '৩য় গ্রেড',
    minSalary: 56500,
    maxSalary: 74400,
    steps: [56500, 59330, 62300, 65420, 68700, 72140, 74400]
  },
  {
    grade: 4,
    gradeBn: '৪র্থ গ্রেড',
    minSalary: 50000,
    maxSalary: 71200,
    steps: [50000, 52500, 55130, 57890, 60790, 63830, 67030, 70390, 71200]
  },
  {
    grade: 5,
    gradeBn: '৫ম গ্রেড',
    minSalary: 43000,
    maxSalary: 69850,
    steps: [43000, 45150, 47410, 49790, 52280, 54900, 57650, 60540, 63570, 66750, 69850]
  },
  {
    grade: 6,
    gradeBn: '৬ষ্ঠ গ্রেড',
    minSalary: 35500,
    maxSalary: 67010,
    steps: [35500, 37280, 39150, 41110, 43170, 45330, 47600, 49980, 52480, 55110, 57870, 60770, 63810, 67010]
  },
  {
    grade: 7,
    gradeBn: '৭ম গ্রেড',
    minSalary: 29000,
    maxSalary: 63410,
    steps: [29000, 30450, 31980, 33580, 35260, 37030, 38890, 40840, 42890, 45040, 47300, 49670, 52160, 54770, 57510, 60390, 63410]
  },
  {
    grade: 8,
    gradeBn: '৮ম গ্রেড',
    minSalary: 23000,
    maxSalary: 60370,
    steps: [23000, 24150, 25360, 26630, 27970, 29370, 30840, 32390, 34010, 35720, 37510, 39390, 41360, 43430, 45610, 47900, 50300, 52820, 55470, 58250, 60370]
  },
  {
    grade: 9,
    gradeBn: '৯ম গ্রেড',
    minSalary: 22000,
    maxSalary: 53060,
    steps: [22000, 23100, 24260, 25480, 26760, 28100, 29510, 30990, 32540, 34170, 35880, 37680, 39570, 41550, 43630, 45820, 48120, 50530, 53060]
  },
  {
    grade: 10,
    gradeBn: '১০ম গ্রেড',
    minSalary: 16000,
    maxSalary: 38640,
    steps: [16000, 16800, 17640, 18530, 19460, 20440, 21470, 22550, 23680, 24870, 26120, 27430, 28810, 30260, 31780, 33370, 35040, 36800, 38640]
  },
  {
    grade: 11,
    gradeBn: '১১তম গ্রেড',
    minSalary: 12500,
    maxSalary: 32240,
    steps: [12500, 13130, 13790, 14480, 15210, 15980, 16780, 17620, 18510, 19440, 20420, 21450, 22530, 23660, 24850, 26100, 27410, 28790, 30230, 31750, 32240]
  },
  {
    grade: 12,
    gradeBn: '১২তম গ্রেড',
    minSalary: 11300,
    maxSalary: 27300,
    steps: [11300, 11870, 12470, 13100, 13760, 14450, 15180, 15940, 16740, 17580, 18460, 19390, 20360, 21380, 22450, 23580, 24760, 26000, 27300]
  },
  {
    grade: 13,
    gradeBn: '১৩তম গ্রেড',
    minSalary: 11000,
    maxSalary: 26590,
    steps: [11000, 11550, 12130, 12740, 13380, 14050, 14760, 15500, 16280, 17100, 17960, 18860, 19810, 20810, 21860, 22960, 24110, 25320, 26590]
  },
  {
    grade: 14,
    gradeBn: '১৪তম গ্রেড',
    minSalary: 10200,
    maxSalary: 24680,
    steps: [10200, 10710, 11250, 11820, 12420, 13050, 13710, 14400, 15120, 15880, 16680, 17520, 18400, 19320, 20290, 21310, 22380, 23500, 24680]
  },
  {
    grade: 15,
    gradeBn: '১৫তম গ্রেড',
    minSalary: 9700,
    maxSalary: 23490,
    steps: [9700, 10190, 10700, 11240, 11810, 12410, 13040, 13700, 14390, 15110, 15870, 16670, 17510, 18390, 19310, 20280, 21300, 22370, 23490]
  },
  {
    grade: 16,
    gradeBn: '১৬তম গ্রেড',
    minSalary: 9300,
    maxSalary: 22490,
    steps: [9300, 9770, 10260, 10780, 11320, 11890, 12490, 13120, 13780, 14470, 15200, 15960, 16760, 17600, 18480, 19410, 20390, 21410, 22490]
  },
  {
    grade: 17,
    gradeBn: '১৭তম গ্রেড',
    minSalary: 9000,
    maxSalary: 21800,
    steps: [9000, 9450, 9930, 10430, 10960, 11510, 12090, 12700, 13340, 14010, 14720, 15460, 16240, 17060, 17920, 18820, 19770, 20760, 21800]
  },
  {
    grade: 18,
    gradeBn: '১৮তম গ্রেড',
    minSalary: 8800,
    maxSalary: 21310,
    steps: [8800, 9240, 9710, 10200, 10710, 11250, 11820, 12420, 13050, 13710, 14400, 15120, 15880, 16680, 17520, 18400, 19320, 20290, 21310]
  },
  {
    grade: 19,
    gradeBn: '১৯তম গ্রেড',
    minSalary: 8500,
    maxSalary: 20570,
    steps: [8500, 8930, 9380, 9850, 10350, 10870, 11420, 12000, 12600, 13230, 13900, 14600, 15330, 16100, 16910, 17760, 18650, 19590, 20570]
  },
  {
    grade: 20,
    gradeBn: '২০তম গ্রেড',
    minSalary: 8250,
    maxSalary: 20010,
    steps: [8250, 8670, 9110, 9570, 10050, 10560, 11090, 11650, 12240, 12860, 13510, 14190, 14900, 15650, 16440, 17270, 18140, 19050, 20010]
  }
];

// Revised Pay Order 2026 (9th National Pay Scale Structure) - 20 Grades with full steps
export const PAY_SCALE_2026: PayScaleGrade[] = [
  {
    grade: 1,
    gradeBn: '১ম গ্রেড',
    minSalary: 160000,
    maxSalary: 160000,
    steps: [160000] // Fixed
  },
  {
    grade: 2,
    gradeBn: '২য় গ্রেড',
    minSalary: 135000,
    maxSalary: 156800,
    steps: [135000, 141750, 148840, 156800]
  },
  {
    grade: 3,
    gradeBn: '৩য় গ্রেড',
    minSalary: 115000,
    maxSalary: 152500,
    steps: [115000, 120750, 126790, 133130, 139790, 146780, 152500]
  },
  {
    grade: 4,
    gradeBn: '৪র্থ গ্রেড',
    minSalary: 102000,
    maxSalary: 146000,
    steps: [102000, 107100, 112460, 118080, 123980, 130180, 136690, 143520, 146000]
  },
  {
    grade: 5,
    gradeBn: '৫ম গ্রেড',
    minSalary: 88000,
    maxSalary: 143200,
    steps: [88000, 92400, 97020, 101870, 106960, 112310, 117930, 123830, 130020, 136520, 143200]
  },
  {
    grade: 6,
    gradeBn: '৬ষ্ঠ গ্রেড',
    minSalary: 72500,
    maxSalary: 137400,
    steps: [72500, 76130, 79940, 83940, 88140, 92550, 97180, 102040, 107140, 112500, 118130, 124040, 130240, 137400]
  },
  {
    grade: 7,
    gradeBn: '৭ম গ্রেড',
    minSalary: 59500,
    maxSalary: 130000,
    steps: [59500, 62480, 65600, 68880, 72320, 75940, 79740, 83730, 87920, 92320, 96940, 101790, 106880, 112220, 117830, 123720, 130000]
  },
  {
    grade: 8,
    gradeBn: '৮ম গ্রেড',
    minSalary: 47200,
    maxSalary: 123800,
    steps: [47200, 49560, 52040, 54640, 57370, 60240, 63250, 66410, 69730, 73220, 76880, 80720, 84760, 89000, 93450, 98120, 103030, 108180, 113590, 119270, 123800]
  },
  {
    grade: 9,
    gradeBn: '৯ম গ্রেড',
    minSalary: 45000,
    maxSalary: 108800,
    steps: [45000, 47250, 49610, 52090, 54690, 57420, 60290, 63300, 66470, 69790, 73280, 76940, 80790, 84830, 89070, 93520, 98200, 103110, 108800]
  },
  {
    grade: 10,
    gradeBn: '১০ম গ্রেড',
    minSalary: 32800,
    maxSalary: 79200,
    steps: [32800, 34440, 36160, 37970, 39870, 41860, 43950, 46150, 48460, 50880, 53420, 56090, 58890, 61830, 64920, 68170, 71580, 75160, 79200]
  },
  {
    grade: 11,
    gradeBn: '১১তম গ্রেড',
    minSalary: 25600,
    maxSalary: 66100,
    steps: [25600, 26880, 28220, 29630, 31110, 32670, 34300, 36020, 37820, 39710, 41700, 43790, 45980, 48280, 50690, 53220, 55880, 58670, 61600, 64680, 66100]
  },
  {
    grade: 12,
    gradeBn: '১২তম গ্রেড',
    minSalary: 23200,
    maxSalary: 56000,
    steps: [23200, 24360, 25580, 26860, 28200, 29610, 31090, 32640, 34270, 35980, 37780, 39670, 41650, 43730, 45920, 48220, 50630, 53160, 56000]
  },
  {
    grade: 13,
    gradeBn: '১৩তম গ্রেড',
    minSalary: 22500,
    maxSalary: 54500,
    steps: [22500, 23630, 24810, 26050, 27350, 28720, 30160, 31670, 33250, 34910, 36660, 38500, 40430, 42450, 44570, 46800, 49140, 51600, 54500]
  },
  {
    grade: 14,
    gradeBn: '১৪তম গ্রেড',
    minSalary: 20900,
    maxSalary: 50600,
    steps: [20900, 21950, 23050, 24200, 25410, 26680, 28010, 29410, 30880, 32420, 34040, 35740, 37530, 39410, 41380, 43450, 45620, 47900, 50600]
  },
  {
    grade: 15,
    gradeBn: '১৫তম গ্রেড',
    minSalary: 19900,
    maxSalary: 48200,
    steps: [19900, 20900, 21950, 23050, 24200, 25410, 26680, 28010, 29410, 30880, 32420, 34040, 35740, 37530, 39410, 41380, 43450, 45620, 48200]
  },
  {
    grade: 16,
    gradeBn: '১৬তম গ্রেড',
    minSalary: 19000,
    maxSalary: 46100,
    steps: [19000, 19950, 20950, 22000, 23100, 24260, 25470, 26740, 28080, 29480, 30950, 32500, 34130, 35840, 37630, 39510, 41490, 43560, 46100]
  },
  {
    grade: 17,
    gradeBn: '১৭তম গ্রেড',
    minSalary: 18500,
    maxSalary: 44700,
    steps: [18500, 19430, 20400, 21420, 22490, 23610, 24790, 26030, 27330, 28700, 30140, 31650, 33230, 34890, 36630, 38460, 40380, 42400, 44700]
  },
  {
    grade: 18,
    gradeBn: '১৮তম গ্রেড',
    minSalary: 18000,
    maxSalary: 43700,
    steps: [18000, 18900, 19850, 20840, 21880, 22970, 24120, 25330, 26600, 27930, 29330, 30800, 32340, 33960, 35660, 37440, 39310, 41280, 43700]
  },
  {
    grade: 19,
    gradeBn: '১৯তম গ্রেড',
    minSalary: 17400,
    maxSalary: 42200,
    steps: [17400, 18270, 19180, 20140, 21150, 22210, 23320, 24490, 25710, 27000, 28350, 29770, 31260, 32820, 34460, 36180, 37990, 39890, 42200]
  },
  {
    grade: 20,
    gradeBn: '২০তম গ্রেড',
    minSalary: 17000,
    maxSalary: 41000,
    steps: [17000, 17850, 18740, 19680, 20660, 21690, 22770, 23910, 25110, 26370, 27690, 29070, 30520, 32050, 33650, 35330, 37100, 38960, 41000]
  }
];

// Helper to find a grade by number in 2015 scale
export function getOldScaleGrade(gradeNumber: number): PayScaleGrade | undefined {
  return PAY_SCALE_2015.find(g => g.grade === gradeNumber);
}

// Helper to find a grade by number in 2026 scale
export function getNewScaleGrade(gradeNumber: number): PayScaleGrade | undefined {
  return PAY_SCALE_2026.find(g => g.grade === gradeNumber);
}

// Helper to determine the employee's likely grade from existing basic salary (if not explicitly chosen)
export function findMatchingOldGrade(basicSalary: number): { grade: number; exactMatch: boolean; stepIndex: number } | null {
  if (!basicSalary || basicSalary <= 0) return null;

  // Check for exact step match
  for (const scale of PAY_SCALE_2015) {
    const idx = scale.steps.indexOf(basicSalary);
    if (idx !== -1) {
      return { grade: scale.grade, exactMatch: true, stepIndex: idx + 1 };
    }
  }

  // If no exact match (e.g., custom increment or personal pay), find grade range
  for (const scale of PAY_SCALE_2015) {
    if (basicSalary >= scale.minSalary && basicSalary <= scale.maxSalary) {
      // Find closest step
      let closestIdx = 0;
      let minDiff = Infinity;
      scale.steps.forEach((s, idx) => {
        const diff = Math.abs(s - basicSalary);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      return { grade: scale.grade, exactMatch: false, stepIndex: closestIdx + 1 };
    }
  }

  return null;
}

// Find appropriate revised step in 2026 scale based on calculated raw basic
export function determineRevisedStep(gradeNumber: number, rawCalculatedBasic: number): {
  finalBasic: number;
  stepIndex: number;
  totalSteps: number;
  isNextHigherStep: boolean;
} {
  const gradeScale = getNewScaleGrade(gradeNumber);
  if (!gradeScale) {
    return {
      finalBasic: rawCalculatedBasic,
      stepIndex: 1,
      totalSteps: 1,
      isNextHigherStep: false
    };
  }

  const steps = gradeScale.steps;
  const totalSteps = steps.length;

  // Grade 1 is fixed
  if (gradeNumber === 1 || steps.length === 1) {
    return {
      finalBasic: steps[0],
      stepIndex: 1,
      totalSteps: 1,
      isNextHigherStep: false
    };
  }

  // If raw basic is less than or equal to starting salary, fix at starting salary (Step 1)
  if (rawCalculatedBasic <= steps[0]) {
    return {
      finalBasic: steps[0],
      stepIndex: 1,
      totalSteps,
      isNextHigherStep: false
    };
  }

  // If raw basic is greater than or equal to maximum step, fix at maximum step
  if (rawCalculatedBasic >= steps[steps.length - 1]) {
    return {
      finalBasic: steps[steps.length - 1],
      stepIndex: totalSteps,
      totalSteps,
      isNextHigherStep: false
    };
  }

  // Check exact step match
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] === rawCalculatedBasic) {
      return {
        finalBasic: steps[i],
        stepIndex: i + 1,
        totalSteps,
        isNextHigherStep: false
      };
    }
  }

  // Official Rule: If calculated basic falls between two steps, it must be fixed at the IMMEDIATE NEXT HIGHER STEP (পরবর্তী উচ্চতর ধাপ)
  for (let i = 0; i < steps.length; i++) {
    if (steps[i] > rawCalculatedBasic) {
      return {
        finalBasic: steps[i],
        stepIndex: i + 1,
        totalSteps,
        isNextHigherStep: true
      };
    }
  }

  // Fallback to highest step
  return {
    finalBasic: steps[steps.length - 1],
    stepIndex: totalSteps,
    totalSteps,
    isNextHigherStep: false
  };
}
