import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Visit } from '../types/Visit';
import VisitForm from '../components/visit/VisitForm';
import { useAuth } from '../contexts/AuthContext';

const EditVisit: React.FC = () => {
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id: patientId, visitId } = useParams<{ id: string; visitId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchVisit = async () => {
      if (!visitId) return;

      try {
        const visitDoc = await getDoc(doc(db, 'visits', visitId));
        if (visitDoc.exists()) {
          setVisit({ id: visitDoc.id, ...visitDoc.data() } as Visit);
        } else {
          console.error('Visit not found');
          navigate(`/patients/${patientId}`);
        }
      } catch (error) {
        console.error('Error fetching visit:', error);
        alert('Error loading visit data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisit();
  }, [visitId, patientId, navigate]);

  const handleSubmit = async (data: Partial<Visit>) => {
    if (!visitId || !currentUser) {
      alert('No visit selected or not logged in. Please try again.');
      return;
    }
    
    setIsLoading(true);
    try {
      const visitData = {
        ...data,
        updatedAt: Timestamp.now()
      };

      await updateDoc(doc(db, 'visits', visitId), visitData);
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.error('Error updating visit:', error);
      alert('Error saving visit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>Loading...</div>
      </div>
    );
  }

  if (!visit) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Edit Visit
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              NT = Not Tested
            </p>
          </div>
        </div>
      </div>
      
      <VisitForm 
        initialData={visit}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditVisit; 