import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import VisitForm from '../components/visit/VisitForm';
import { Visit } from '../types/Visit';

const NewVisit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const { currentUser } = useAuth();

  // Redirect if no patientId
  React.useEffect(() => {
    if (!patientId) {
      console.error('No patient ID provided');
      navigate('/patients');
    }
  }, [patientId, navigate]);

  const handleSubmit = async (data: Partial<Visit>) => {
    console.log('NewVisit handleSubmit called with:', data);
    if (!patientId || !currentUser) {
      alert('No patient selected or not logged in. Please try again.');
      navigate('/patients');
      return;
    }
    
    setIsLoading(true);
    try {
      const visitData: Partial<Visit> = {
        ...data,
        patientId,
        therapistId: currentUser.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      console.log('Saving visit data:', visitData);

      const docRef = await addDoc(collection(db, 'visits'), visitData);
      console.log('Visit saved with ID:', docRef.id);
      
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.error('Error saving visit:', error);
      alert('Error saving visit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the form if there's no patientId or user
  if (!patientId || !currentUser) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">New Visit</h1>
      </div>
      
      <VisitForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NewVisit; 