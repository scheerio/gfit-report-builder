import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Visit } from '../types/Visit';
import VisitForm from '../components/visit/VisitForm';

const NewVisit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { patientId } = useParams();

  const handleSubmit = async (data: Partial<Visit>) => {
    if (!patientId) return;
    
    setIsLoading(true);
    try {
      const visitRef = doc(db, 'patients', patientId, 'visits', Date.now().toString());
      await setDoc(visitRef, data);
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.error('Error saving visit:', error);
      alert('Error saving visit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900">New Visit</h2>
      </div>
      <div className="mt-5">
        <VisitForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default NewVisit; 