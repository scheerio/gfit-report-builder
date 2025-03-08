import { Gender } from './common';
import { Timestamp } from 'firebase/firestore';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Timestamp;
  gender: Gender;
  emrId?: string;
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory?: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  emrId: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory: string;
}

export interface PatientSubmitData {
  firstName: string;
  lastName: string;
  dateOfBirth: Timestamp;
  gender: Gender;
  emrId: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory: string;
} 