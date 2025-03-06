import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { formatInTimeZone } from 'date-fns-tz';

interface Visit {
  id: string;
  date: {
    toDate: () => Date;
  };
  frt: number;
  ols: { right: number; left: number };
  srt: number;
  pst: { ap: number; ml: number };
  comments: string;
  therapistId: string;
  patientId: string;
  createdAt: any;
  updatedAt: any;
}

const VisitDetails = () => {
  const { id: patientId, visitId } = useParams<{ id: string; visitId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisit = async () => {
      if (!visitId || !currentUser) return;

      try {
        const visitDoc = await getDoc(doc(db, 'visits', visitId));
        if (!visitDoc.exists()) {
          setError('Visit not found');
          return;
        }

        setVisit({
          id: visitDoc.id,
          ...visitDoc.data()
        } as Visit);
      } catch (err) {
        console.error('Error fetching visit:', err);
        setError('Failed to load visit');
      } finally {
        setLoading(false);
      }
    };

    fetchVisit();
  }, [visitId, currentUser]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !visit) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error || 'Visit not found'}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Visit Details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {formatInTimeZone(visit.date.toDate(), 'America/New_York', 'MMM d, yyyy h:mm a zzz')}
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                onClick={() => navigate(`/patients/${patientId}/visits/${visitId}/edit`)}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Visit
              </button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">FRT Score</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.frt}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">SRT Score</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.srt}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">OLS Right</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.ols?.right || 0}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">OLS Left</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.ols?.left || 0}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">PST AP</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.pst?.ap || 0}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">PST ML</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.pst?.ml || 0}</dd>
                </div>

                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Comments</dt>
                  <dd className="mt-1 text-sm text-gray-900">{visit.comments}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate(`/patients/${patientId}`)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back to Patient
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisitDetails; 