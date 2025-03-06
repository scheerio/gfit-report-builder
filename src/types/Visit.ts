import { Timestamp } from 'firebase/firestore';

export interface Visit {
  id: string;
  patientId: string;
  therapistId: string;
  date: Timestamp;
  
  // Clinimetrics
  clinimetrics: {
    bmi: number;
    twd: number; // Tragus Wall Distance (cm)
    grip: {
      right: number;
      left: number;
    }; // Grip Strength (lbs)
    obp: {
      systolic: number;
      diastolic: number;
    }; // Orthostatic Blood Pressure (mmHg)
    comments?: string;
    subtotal?: number;
  };
  
  // ROM & Flexibility
  flexibility: {
    pke: {
      right: number;
      left: number;
    }; // Passive Knee Extension (deg)
    csr: {
      right: number;
      left: number;
    }; // Chair Sit & Reach (in)
    bst: {
      right: number;
      left: number;
    }; // Back Scratch Test (in)
    tbr: {
      right: number;
      left: number;
    }; // Total Body Rotation (in)
    comments?: string;
    subtotal?: number;
  };
  
  // Balance
  balance: {
    frt: number; // Functional Reach (in)
    ols: {
      right: number;
      left: number;
    }; // One Leg Stance (sec)
    srt: number; // Step Reaction Time (ms)
    pst: {
      ap: number; // Anterior-Posterior
      ml: number; // Medial-Lateral
    }; // Postural Sway Test (mm)
    comments?: string;
    subtotal?: number;
  };
  
  // Gait & Locomotion
  gait: {
    tug: number; // Timed Up-and-Go (sec)
    ncw: number; // Narrow Corridor Walk (% change)
    gst: {
      value: number;
      type: '6meter' | '30meter' | '45meter';
    }; // Gait Speed Test
    sct: {
      value: number;
      type: '5step' | '20step';
    }; // Stair Climb Test
    comments?: string;
    subtotal?: number;
  };
  
  // Muscle Performance - Endurance
  endurance: {
    act: {
      right: number;
      left: number;
      weight: '5lbs' | '8lbs';
    }; // Arm Curl Test
    sts: {
      value: number;
      type: '5x' | '30sec';
    }; // Sit to Stand
    tls: {
      value: number;
      weight: '1lb' | '3lbs' | '5lbs';
    }; // Timed Loaded Standing
    uhr: {
      right: number;
      left: number;
    }; // Unilateral Heel Rise
    comments?: string;
    subtotal?: number;
  };
  
  // Aerobic & Endurance
  aerobic: {
    tms: number; // Two Minute Step
    mwt: {
      distance: number;
      speed: number;
      type: '2min' | '6min';
    }; // Walk Test
    ikd: {
      ue: number; // Upper Extremity
      le: number; // Lower Extremity
    }; // Isokinetic Dynamometry
    pws: {
      right: number;
      left: number;
    }; // Partial Wall Sit
    comments?: string;
    subtotal?: number;
  };
  
  // Muscle Performance - Power
  power: {
    bicep: {
      rm: number; // 1 Rep Max (lbs)
      pp: number; // Peak Power (watts)
    };
    tricep: {
      rm: number;
      pp: number;
    };
    back: {
      rm: number;
      pp: number;
    };
    chest: {
      rm: number;
      pp: number;
    };
    knee: {
      rm: number;
      pp: number;
    };
    calf: {
      rm: number;
      pp: number;
    };
    leg: {
      rm: number;
      pp: number;
    };
    hip: {
      right: {
        rm: number;
        pp: number;
      };
      left: {
        rm: number;
        pp: number;
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