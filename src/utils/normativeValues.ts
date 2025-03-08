import { Gender } from '../types';

export interface NormativeRange {
  min?: number;
  max?: number;
  text?: string;
}

export const getNormativeValue = (
  measurement: string,
  age: number,
  gender: Gender
): NormativeRange => {
  switch (measurement) {
    case 'bmi':
      return { min: 19, max: 30 };
      
    case 'grip':
      if (gender === 'M') {
        if (age >= 85) return { min: 55 };
        if (age >= 80) return { min: 60 };
        if (age >= 75) return { min: 69 };
        if (age >= 70) return { min: 80 };
        return { min: 84 };
      } else {
        if (age >= 85) return { min: 35 };
        if (age >= 80) return { min: 38 };
        if (age >= 75) return { min: 43 };
        return { min: 50 };
      }

    case 'twd':
      return { max: 15, text: '≤ 15 cm' };

    case 'obp':
      return { text: '≤ 20/10 mmHg drop' };

    case 'pke':
      return gender === 'M' 
        ? { min: -27, max: 0, text: '-27° to 0°' }
        : { min: -15, max: 0, text: '-15° to 0°' };

    case 'csr': // Chair Sit & Reach
      if (gender === 'M') {
        if (age >= 90) return { min: -6.5 };
        if (age >= 85) return { min: -5.5 };
        if (age >= 80) return { min: -5.5 };
        if (age >= 75) return { min: -4.0 };
        if (age >= 70) return { min: -3.5 };
        return { min: -3.0 };
      } else {
        if (age >= 90) return { min: -3.0 };
        if (age >= 85) return { min: -2.5 };
        if (age >= 80) return { min: -2.0 };
        if (age >= 75) return { min: -1.5 };
        if (age >= 70) return { min: -1.0 };
        return { min: -0.5 };
      }

    case 'bst': // Back Scratch Test
      if (gender === 'M') {
        if (age >= 90) return { min: -10.5 };
        if (age >= 85) return { min: -10.0 };
        if (age >= 80) return { min: -9.5 };
        if (age >= 75) return { min: -9.0 };
        if (age >= 70) return { min: -8.0 };
        if (age >= 65) return { min: -7.5 };
        return { min: -6.5 };
      } else {
        if (age >= 90) return { min: -8.0 };
        if (age >= 85) return { min: -7.0 };
        if (age >= 80) return { min: -5.5 };
        if (age >= 75) return { min: -5.0 };
        if (age >= 70) return { min: -4.0 };
        if (age >= 65) return { min: -3.5 };
        return { min: -3.0 };
      }

    case 'tbr': // Total Body Rotation
      if (age >= 75) return { min: 23.6, max: 36.0 };
      return { min: 25.1, max: 36.0 };

    case 'frt': // Functional Reach Test
      if (gender === 'M') {
        return age >= 70 ? { min: 10.5 } : { min: 13.75 };
      } else {
        return age >= 70 ? { min: 13.26 } : { min: 15.0 };
      }

    case 'ols': // One Leg Stance
      if (age >= 80) {
        return gender === 'M' ? { min: 8.7, max: 30 } : { min: 10.6, max: 30 };
      } else if (age >= 70) {
        return gender === 'M' ? { min: 25.9, max: 30 } : { min: 16.7, max: 30 };
      }
      return { min: 30 };

    case 'srt': // Step Reaction Time
      return { max: 1200, text: '< 1200 ms' };

    case 'pst': // Postural Sway
      return { max: 30, text: '< 30.0 mm' };

    case 'tug': // Timed Up & Go
      if (age >= 80) return { max: 11.3, text: '< 11.3 sec' };
      if (age >= 70) return { max: 9.2, text: '< 9.2 sec' };
      return { max: 8.1, text: '< 8.1 sec' };

    case 'ncw': // Narrow Corridor Walk
      return { max: 15, text: '≤ 15% change' };

    case 'gaitSpeed': // Gait Speed
      if (gender === 'M') {
        if (age >= 80) return { min: 0.83 };
        if (age >= 70) return { min: 0.96 };
        return { min: 1.03 };
      } else {
        if (age >= 80) return { min: 0.78 };
        if (age >= 70) return { min: 0.93 };
        return { min: 1.0 };
      }

    case 'stairClimb':
      return { max: 1.1, text: '≤ 1.1 sec/step' };

    // Add other measurements following the same pattern...
  }
  return {};
}; 