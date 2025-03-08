import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Layout from '../components/Layout';
import ReportCard from '../components/ReportCard';
import { Patient, Visit } from '../types';

const GenerateReport = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisits, setSelectedVisits] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient details
        const patientDoc = await getDoc(doc(db, 'patients', patientId!));
        if (!patientDoc.exists()) {
          setError('Patient not found');
          return;
        }
        setPatient({ id: patientDoc.id, ...patientDoc.data() } as Patient);

        // Fetch visits
        const visitsQuery = query(
          collection(db, 'visits'),
          where('patientId', '==', patientId)
        );
        const visitsSnapshot = await getDocs(visitsQuery);
        const visitsData = visitsSnapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().date.toDate(),
          ...doc.data()
        })) as Visit[];
        setVisits(visitsData.sort((a, b) => b.date.getTime() - a.date.getTime()));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  const handleVisitSelect = (visitId: string) => {
    setSelectedVisits(prev => {
      if (prev.includes(visitId)) {
        return prev.filter(id => id !== visitId);
      }
      if (prev.length < 2) {
        return [...prev, visitId];
      }
      return [prev[1], visitId];
    });
  };

  const handleGenerateReport = () => {
    if (selectedVisits.length !== 2) {
      setError('Please select two visits to compare');
      return;
    }
    setShowReport(true);
  };

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error || !patient) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </Layout>
    );
  }

  if (showReport) {
    const visit1 = visits.find(v => v.id === selectedVisits[0])!;
    const visit2 = visits.find(v => v.id === selectedVisits[1])!;
    return (
      <Layout>
        <ReportCard
          patient={patient}
          visit1={visit1}
          visit2={visit2}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Generate G-FIT Report Card
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select two visits to compare
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {visits.map((visit) => (
              <li key={visit.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium text-primary-600 truncate">
                        Visit on {visit.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedVisits.includes(visit.id)}
                      onChange={() => handleVisitSelect(visit.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerateReport}
            disabled={selectedVisits.length !== 2}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            Generate Report
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateReport; 