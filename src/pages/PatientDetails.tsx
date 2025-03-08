import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { format, formatInTimeZone } from 'date-fns-tz';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { calculateAge } from '../utils/dateUtils';

interface Patient {
  firstName: string;
  lastName: string;
  emrId: string;
  dateOfBirth: string;
  gender: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  medicalHistory: string;
  therapistId: string;
  createdAt: any;
  updatedAt: any;
}

interface Visit {
  id: string;
  date: {
    toDate: () => Date;  // Firestore Timestamp
  };
  patientId: string;
  therapistId: string;
  frt: number;
  ols: { right: number; left: number };
  srt: number;
  pst: { ap: number; ml: number };
  comments: string;
  createdAt: any;
  updatedAt: any;
}

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVisits, setSelectedVisits] = useState<string[]>([]);
  const [isVisitDeleteModalOpen, setIsVisitDeleteModalOpen] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState<string | null>(null);

  const fetchVisits = async () => {
    if (!id || !currentUser) return;
    
    try {
      const visitsQuery = query(
        collection(db, 'visits'),
        where('patientId', '==', id)
      );
      
      const visitsSnapshot = await getDocs(visitsQuery);
      console.log('Raw visits data:', visitsSnapshot.docs.map(doc => doc.data()));
      
      const visitsData = visitsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Visit[];
      
      console.log('Processed visits:', visitsData);
      setVisits(visitsData);
    } catch (err) {
      console.error('Error fetching visits:', err);
      console.error('Error details:', err instanceof Error ? err.message : err);
      setVisits([]);
    }
  };

  useEffect(() => {
    const fetchPatientAndVisits = async () => {
      try {
        if (!id || !currentUser) return;

        setLoading(true);
        setError('');

        // Fetch patient details
        const patientDoc = await getDoc(doc(db, 'patients', id));
        
        if (!patientDoc.exists()) {
          setError('Patient not found');
          return;
        }

        const patientData = patientDoc.data() as Patient;
        
        if (patientData.therapistId !== currentUser.uid) {
          setError('You do not have permission to view this patient');
          return;
        }

        setPatient(patientData);

        // Fetch visits
        await fetchVisits();
      } catch (err) {
        console.error('Error fetching patient:', err);
        setError('Failed to load patient details');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientAndVisits();
  }, [id, currentUser]);

  // Add delete handlers
  const handleDeletePatient = async () => {
    if (!id || !currentUser) return;

    try {
      // First delete all visits for this patient
      const visitsSnapshot = await getDocs(query(
        collection(db, 'visits'),
        where('patientId', '==', id)
      ));

      const deleteVisits = visitsSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteVisits);

      // Then delete the patient
      await deleteDoc(doc(db, 'patients', id));
      navigate('/patients');
    } catch (err) {
      console.error('Error deleting patient:', err);
      setError('Failed to delete patient');
    }
  };

  const handleDeleteVisit = async (visitId: string) => {
    setVisitToDelete(visitId);
    setIsVisitDeleteModalOpen(true);
  };

  const confirmDeleteVisit = async () => {
    if (!visitToDelete) return;

    try {
      await deleteDoc(doc(db, 'visits', visitToDelete));
      // Refresh visits
      await fetchVisits();
      setIsVisitDeleteModalOpen(false);
      setVisitToDelete(null);
    } catch (err) {
      console.error('Error deleting visit:', err);
      setError('Failed to delete visit');
    }
  };

  const handleVisitSelect = (visitId: string) => {
    setSelectedVisits(prev => {
      if (prev.includes(visitId)) {
        return prev.filter(id => id !== visitId);
      }
      if (prev.length < 2) {
        return [...prev, visitId];
      }
      return prev;
    });
  };

  const handleGenerateComparison = () => {
    if (selectedVisits.length !== 2) return;
    navigate(`/patients/${id}/compare/${selectedVisits[0]}/${selectedVisits[1]}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Patient Information
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                onClick={() => navigate(`/patients/${id}/edit`)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Patient
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Patient
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{`${patient.firstName} ${patient.lastName}`}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">EMR ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.emrId}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.dateOfBirth} ({calculateAge(patient.dateOfBirth)} years old)
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.gender}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.contactInfo.phone}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Visit History
              </h3>
              <div className="flex space-x-4">
                {selectedVisits.length === 2 && (
                  <button
                    onClick={handleGenerateComparison}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Compare Selected Visits
                  </button>
                )}
                <button
                  onClick={() => navigate(`/patients/${id}/visits/new`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  New Visit
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              {visits.length === 0 ? (
                <div className="px-4 py-5 sm:px-6 text-gray-500 text-sm">
                  No visits recorded yet
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {visits.map((visit) => (
                    <li key={visit.id} className="hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <input
                              type="checkbox"
                              checked={selectedVisits.includes(visit.id)}
                              onChange={() => handleVisitSelect(visit.id)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <div className="text-sm font-medium text-primary-600">
                              Visit on {formatInTimeZone(visit.date.toDate(), 'America/New_York', 'MMM d, yyyy h:mm a zzz')}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/patients/${id}/visits/${visit.id}/edit`)}
                              className="px-3 py-2 text-xs font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteVisit(visit.id)}
                              className="px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => navigate(`/patients/${id}/visits/${visit.id}`)}
                              className="px-3 py-2 text-xs font-medium text-primary-700 bg-primary-100 rounded-md hover:bg-primary-200"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/patients/${id}/report`)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Generate Report
            </button>
          </div>

          <Transition.Root show={isDeleteModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsDeleteModalOpen}>
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Delete Patient
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this patient? This action cannot be undone and will delete all associated visits.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          handleDeletePatient();
                          setIsDeleteModalOpen(false);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsDeleteModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Visit Delete Confirmation Modal */}
          <Transition.Root show={isVisitDeleteModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsVisitDeleteModalOpen}>
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Delete Visit
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this visit? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={confirmDeleteVisit}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsVisitDeleteModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDetails; 