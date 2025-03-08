import React from 'react';
import { Gender } from '../../types';
import { Timestamp } from 'firebase/firestore';
import { PatientFormData, PatientSubmitData } from '../../types/Patient';

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  onSubmit: (data: PatientSubmitData) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState<PatientFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: initialData?.gender || 'M',
    emrId: initialData?.emrId || '',
    contactInfo: {
      phone: initialData?.contactInfo?.phone || '',
      email: initialData?.contactInfo?.email || '',
      address: initialData?.contactInfo?.address || '',
    },
    medicalHistory: initialData?.medicalHistory || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData: PatientSubmitData = {
      ...formData,
      dateOfBirth: Timestamp.fromDate(new Date(formData.dateOfBirth)),
    };
    onSubmit(patientData);
  };

  // ... rest of your form logic ...

  return (
    <form onSubmit={handleSubmit}>
      {/* ... other form fields ... */}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData.gender === 'M'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formData.gender === 'F'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </div>

      {/* ... other form fields ... */}
    </form>
  );
};

export default PatientForm; 