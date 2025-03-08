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