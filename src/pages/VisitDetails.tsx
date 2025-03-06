import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Visit } from '../types/Visit';
import ClinimetricsSection from '../components/visit/ClinimetricsSection';
import FlexibilitySection from '../components/visit/FlexibilitySection';
import BalanceSection from '../components/visit/BalanceSection';
import GaitSection from '../components/visit/GaitSection';
import AerobicSection from '../components/visit/AerobicSection';
import EnduranceSection from '../components/visit/EnduranceSection';
import PowerSection from '../components/visit/PowerSection';

const VisitDetails: React.FC = () => {
  const [visit, setVisit] = useState<Visit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id: patientId, visitId } = useParams<{ id: string; visitId: string }>();
  const navigate = useNavigate();

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
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Visit Details - {visit.date.toDate().toLocaleDateString()}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/patients/${patientId}`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Patient
          </button>
          <button
            onClick={() => navigate(`/patients/${patientId}/visits/${visitId}/edit`)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Edit Visit
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <ClinimetricsSection
          data={visit.clinimetrics}
          readOnly
        />

        <FlexibilitySection
          data={visit.flexibility}
          readOnly
        />

        <BalanceSection
          data={visit.balance}
          readOnly
        />

        <GaitSection
          data={visit.gait}
          readOnly
        />

        <AerobicSection
          data={visit.aerobic}
          readOnly
        />

        <EnduranceSection
          data={visit.endurance}
          readOnly
        />

        <PowerSection
          data={visit.power}
          readOnly
        />
      </div>
    </div>
  );
};

export default VisitDetails; 