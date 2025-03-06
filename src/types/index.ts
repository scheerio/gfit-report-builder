export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'therapist';
  clinicInfo: {
    name: string;
    address: string;
    phone: string;
    fax?: string;
    website?: string;
  };
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  emrId?: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  contactInfo: {
    phone: string;
    email?: string;
    address?: string;
  };
  medicalHistory?: string;
  therapistId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit {
  id: string;
  patientId: string;
  therapistId: string;
  date: Date;
  testMonth: number;
  testYear: number;
  
  clinimetrics: {
    bmi: number;
    twd: number;
    grip: { right: number; left: number };
    obp: { systolic: number; diastolic: number };
    comments: string;
    subtotal?: number;
  };
  
  flexibility: {
    pke: { right: number; left: number };
    csr: { right: number; left: number };
    bst: { right: number; left: number };
    tbr: { right: number; left: number };
    comments: string;
    subtotal?: number;
  };
  
  balance: {
    frt: number;
    ols: { right: number; left: number };
    srt: number;
    pst: { ap: number; ml: number };
    comments: string;
    subtotal?: number;
  };
  
  gait: {
    tug: number;
    ncw: number;
    gst: { value: number; type: '6meter' | '30meter' | '45meter' };
    sct: { value: number; type: '5step' | '20step' };
    comments: string;
    subtotal?: number;
  };
  
  endurance: {
    act: { right: number; left: number; weight: '5lbs' | '8lbs' };
    sts: { value: number; type: '5x' | '30sec' };
    tls: { value: number; weight: '1lb' | '3lbs' | '5lbs' };
    uhr: { right: number; left: number };
    comments: string;
    subtotal?: number;
  };
  
  aerobic: {
    tms: number;
    mwt: { distance: number; speed: number; type: '2min' | '6min' };
    ikd: { ue: number; le: number };
    pws: { right: number; left: number };
    comments: string;
    subtotal?: number;
  };
  
  power: {
    bicep: { rm: number; pp: number };
    tricep: { rm: number; pp: number };
    back: { rm: number; pp: number };
    chest: { rm: number; pp: number };
    knee: { rm: number; pp: number };
    calf: { rm: number; pp: number };
    leg: { rm: number; pp: number };
    hip: { right: { rm: number; pp: number }; left: { rm: number; pp: number } };
    comments: string;
  };

  totalScore?: number;
  riskLevel?: 'LOW' | 'MODERATE' | 'HIGH';
  summary?: string;
} 