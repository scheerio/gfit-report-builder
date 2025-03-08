import { Timestamp } from 'firebase/firestore';
import { format as dateFormat } from 'date-fns';  // Rename to avoid confusion

export const formatDate = (timestamp: Timestamp, formatStr: string = 'M/d/yy') => {
  return dateFormat(timestamp.toDate(), formatStr);
};

export const calculateAge = (dob: Timestamp) => {
  const today = new Date();
  const birthDate = dob.toDate();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}; 