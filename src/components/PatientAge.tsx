import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

interface PatientAgeProps {
  dateOfBirth: Timestamp;
  className?: string;
}

const PatientAge: React.FC<PatientAgeProps> = ({ dateOfBirth, className = '' }) => {
  const calculateAge = (dob: Timestamp) => {
    const today = new Date();
    const birthDate = dob.toDate();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <span className={className}>
      {format(dateOfBirth.toDate(), 'M/d/yy')} ({calculateAge(dateOfBirth)} y/o)
    </span>
  );
};

export default PatientAge; 