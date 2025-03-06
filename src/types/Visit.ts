import { Timestamp } from 'firebase/firestore';

export interface Visit {
  id: string;
  patientId: string;
  therapistId: string;
  date: Timestamp;
  
  // Clinimetrics
  clinimetrics: {
    bmi: number | null;
    twd: number | null; // Tragus Wall Distance (cm)
    grip: {
      right: number | null;
      left: number | null;
    }; // Grip Strength (lbs)
    obp: {
      systolic: number | null;
      diastolic: number | null;
    }; // Orthostatic Blood Pressure (mmHg)
    comments?: string;
    subtotal?: number;
  };
  
  // ROM & Flexibility
  flexibility: {
    pke: {
      right: number | null;
      left: number | null;
    }; // Passive Knee Extension (deg)
    csr: {
      right: number | null;
      left: number | null;
    }; // Chair Sit & Reach (in)
    bst: {
      right: number | null;
      left: number | null;
    }; // Back Scratch Test (in)
    tbr: {
      right: number | null;
      left: number | null;
    }; // Total Body Rotation (in)
    comments?: string;
    subtotal?: number;
  };
  
  // Balance
  balance: {
    frt: number | null; // Functional Reach (in)
    ols: {
      right: number | null;
      left: number | null;
    }; // One Leg Stance (sec)
    srt: number | null; // Step Reaction Time (ms)
    pst: {
      ap: number | null; // Anterior-Posterior
      ml: number | null; // Medial-Lateral
    }; // Postural Sway Test (mm)
    comments?: string;
    subtotal?: number;
  };
  
  // Gait & Locomotion
  gait: {
    tug: number | null; // Timed Up-and-Go (sec)
    ncw: number | null; // Narrow Corridor Walk (% change)
    gst: {
      value: number | null;
      type: '6meter' | '30meter' | '45meter';
    }; // Gait Speed Test
    sct: {
      value: number | null;
      type: '5step' | '20step';
    }; // Stair Climb Test
    comments?: string;
    subtotal?: number;
  };
  
  // Muscle Performance - Endurance
  endurance: {
    act: {
      right: number | null;
      left: number | null;
      weight: '5lbs' | '8lbs';
    }; // Arm Curl Test
    sts: {
      value: number | null;
      type: '5x' | '30sec';
    }; // Sit to Stand
    tls: {
      value: number | null;
      weight: '1lb' | '3lbs' | '5lbs';
    }; // Timed Loaded Standing
    uhr: {
      right: number | null;
      left: number | null;
    }; // Unilateral Heel Rise
    comments?: string;
    subtotal?: number;
  };
  
  // Aerobic & Endurance
  aerobic: {
    tms: number | null; // Two Minute Step
    mwt: {
      distance: number | null;
      speed: number | null;
      type: '2min' | '6min';
    }; // Walk Test
    ikd: {
      ue: number | null; // Upper Extremity
      le: number | null; // Lower Extremity
    }; // Isokinetic Dynamometry
    pws: {
      right: number | null;
      left: number | null;
    }; // Partial Wall Sit
    comments?: string;
    subtotal?: number;
  };
  
  // Muscle Performance - Power
  power: {
    bicep: {
      rm: number | null; // 1 Rep Max (lbs)
      pp: number | null; // Peak Power (watts)
    };
    tricep: {
      rm: number | null;
      pp: number | null;
    };
    back: {
      rm: number | null;
      pp: number | null;
    };
    chest: {
      rm: number | null;
      pp: number | null;
    };
    knee: {
      rm: number | null;
      pp: number | null;
    };
    calf: {
      rm: number | null;
      pp: number | null;
    };
    leg: {
      rm: number | null;
      pp: number | null;
    };
    hip: {
      right: {
        rm: number | null;
        pp: number | null;
      };
      left: {
        rm: number | null;
        pp: number | null;
      };
    };
    comments?: string;
    subtotal?: number;
  };
  
  // Summary
  totalScore?: number;
  riskLevel?: 'LOW' | 'MODERATE' | 'HIGH';
  summary?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
} 