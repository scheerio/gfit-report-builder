import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import VisitForm from '../components/VisitForm';

interface VisitFormData {
  frt: number;
  ols: { right: number; left: number };
  srt: number;
  pst: { ap: number; ml: number };
  comments: string;
}

const EditVisit = () => {
  const { id: patientId, visitId } = useParams<{ id: string; visitId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<VisitFormData>({
    frt: 0,
    ols: { right: 0, left: 0 },
    srt: 0,
    pst: { ap: 0, ml: 0 },
    comments: ''
  });

  useEffect(() => {
    const fetchVisit = async () => {
      if (!visitId || !currentUser) return;

      try {
        const visitDoc = await getDoc(doc(db, 'visits', visitId));
        if (!visitDoc.exists()) {
          setError('Visit not found');
          return;
        }

        const visitData = visitDoc.data() as VisitFormData;
        setFormData(visitData);
      } catch (err) {
        console.error('Error fetching visit:', err);
        setError('Failed to load visit');
      } finally {
        setLoading(false);
      }
    };

    fetchVisit();
  }, [visitId, currentUser]);

  const handleSubmit = async (formData: VisitFormData) => {
    if (!visitId || !currentUser) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, 'visits', visitId), {
        ...formData,
        updatedAt: new Date()
      });
      navigate(`/patients/${patientId}`);
    } catch (err) {
      console.error('Error updating visit:', err);
      setError('Failed to update visit');
    } finally {
      setLoading(false);
    }
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Edit Visit
              </h2>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <VisitForm
            initialData={formData}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate(`/patients/${patientId}`)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditVisit; 