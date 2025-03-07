import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { formatInTimeZone } from 'date-fns-tz';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Visit {
  id: string;
  date: { toDate: () => Date };
  balance: {
    frt: number;
    ols: { right: number; left: number };
    srt: number;
    pst: { ap: number; ml: number };
    comments: string;
  };
}

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 5,
  },
  label: {
    width: '30%',
    fontSize: 12,
  },
  value1: {
    width: '35%',
    fontSize: 12,
  },
  value2: {
    width: '35%',
    fontSize: 12,
  },
  header: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

// PDF Document Component
const ComparisonDocument = ({ visits }: { visits: Visit[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Visit Comparison Report</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Date</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {formatInTimeZone(visit.date.toDate(), 'America/New_York', 'MMM d, yyyy h:mm a')}
          </Text>
        ))}
      </View>

      <Text style={styles.header}>Test Results</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>FRT Score</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.frt || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>OLS Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.ols?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>OLS Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.ols?.left || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>SRT Score</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.srt || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>PST AP</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.pst?.ap || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>PST ML</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.pst?.ml || '-'}
          </Text>
        ))}
      </View>

      <Text style={styles.header}>Comments</Text>
      {visits.map((visit, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>Visit {i + 1}</Text>
          <Text style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.comments || '-'}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

const VisitComparison = () => {
  const { id: patientId, visit1Id, visit2Id } = useParams<{ id: string; visit1Id: string; visit2Id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisits = async () => {
      if (!visit1Id || !visit2Id || !currentUser) return;

      try {
        const visit1Doc = await getDoc(doc(db, 'visits', visit1Id));
        const visit2Doc = await getDoc(doc(db, 'visits', visit2Id));

        if (!visit1Doc.exists() || !visit2Doc.exists()) {
          setError('One or more visits not found');
          return;
        }

        setVisits([
          { id: visit1Doc.id, ...visit1Doc.data() } as Visit,
          { id: visit2Doc.id, ...visit2Doc.data() } as Visit
        ]);
      } catch (err) {
        console.error('Error fetching visits:', err);
        setError('Failed to load visits');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, [visit1Id, visit2Id, currentUser]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || visits.length !== 2) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error || 'Invalid visits selected'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="max-w-3xl mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Visit Comparison
                </h2>
              </div>
              <div className="mt-4 flex md:mt-0 md:ml-4">
                <PDFDownloadLink
                  document={<ComparisonDocument visits={visits} />}
                  fileName="visit-comparison.pdf"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  {({ loading }) => (
                    <span>
                      {loading ? 'Generating PDF...' : 'Download PDF'}
                    </span>
                  )}
                </PDFDownloadLink>
              </div>
            </div>

            {/* Add a visual comparison table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium text-gray-500"></div>
                  <div className="font-medium text-gray-900">Visit 1</div>
                  <div className="font-medium text-gray-900">Visit 2</div>

                  <div className="font-medium text-gray-500">Date</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatInTimeZone(visit.date.toDate(), 'America/New_York', 'MMM d, yyyy h:mm a')}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">FRT Score</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.frt || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">OLS Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.ols?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">OLS Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.ols?.left || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">SRT Score</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.srt || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">PST AP</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.pst?.ap || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">PST ML</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.pst?.ml || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Comments</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.balance?.comments || '-'}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate(`/patients/${patientId}`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VisitComparison; 