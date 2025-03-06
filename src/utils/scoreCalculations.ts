interface NormativeRange {
  min?: number;
  max?: number;
  threshold?: number;
}

interface NormativeRanges {
  [key: string]: NormativeRange;
}

const normativeRanges: {
  [ageGroup: string]: {
    [measurement: string]: NormativeRange;
  };
} = {
  '18-30': {
    bmi: { min: 18.5, max: 24.9 },
    twd: { threshold: 15 },
    grip: { threshold: 42 },
    // Add other normative ranges for each age group
  },
  // Add other age groups
};

export const calculateScore = (
  measurement: string,
  value: number,
  ageGroup: string
): number => {
  const ranges = normativeRanges[ageGroup]?.[measurement];
  if (!ranges) return 0;

  if (ranges.threshold !== undefined) {
    return value >= ranges.threshold ? 1 : 0;
  }

  if (ranges.min !== undefined && ranges.max !== undefined) {
    return value >= ranges.min && value <= ranges.max ? 1 : 0;
  }

  return 0;
};

export const calculateTotalScore = (visit: any, ageGroup: string): number => {
  let totalScore = 0;

  // Add up scores from each section
  // This is a simplified version - you'll need to add all measurements
  totalScore += calculateScore('bmi', visit.clinimetrics.bmi, ageGroup);
  totalScore += calculateScore('twd', visit.clinimetrics.twd, ageGroup);
  // Add other calculations

  return totalScore;
};

export const determineRiskLevel = (totalScore: number): 'LOW' | 'MODERATE' | 'HIGH' => {
  if (totalScore >= 17) return 'LOW';
  if (totalScore >= 9) return 'MODERATE';
  return 'HIGH';
}; 