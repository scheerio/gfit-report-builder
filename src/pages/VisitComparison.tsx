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
  clinimetrics: {
    bmi: number;
    twd: number;
    grip: { right: number; left: number };
    obp: { systolic: number; diastolic: number };
    comments: string;
  };
  flexibility: {
    pke: { right: number; left: number };
    csr: { right: number; left: number };
    bst: { right: number; left: number };
    tbr: { right: number; left: number };
    comments: string;
  };
  balance: {
    frt: number;
    ols: { right: number; left: number };
    srt: number;
    pst: { ap: number; ml: number };
    comments: string;
  };
  gait: {
    tug: number;
    ncw: number;
    gst: { value: number; type: '6meter' | '30meter' | '45meter' };
    sct: { value: number; type: '5step' | '20step' };
    comments: string;
  };
  endurance: {
    act: { right: number; left: number; weight: '5lbs' | '8lbs' };
    sts: { value: number; type: '5x' | '30sec' };
    tls: { value: number; weight: '1lb' | '3lbs' | '5lbs' };
    uhr: { right: number; left: number };
    comments: string;
  };
  aerobic: {
    tms: number;
    mwt: { distance: number; speed: number; type: '2min' | '6min' };
    ikd: { ue: number; le: number };
    pws: { right: number; left: number };
    comments: string;
  };
  power: {
    bicep: { rm: number; pp: number };
    tricep: { rm: number; pp: number };
    back: { rm: number; pp: number };
    chest: { rm: number; pp: number };
    knee: { rm: number; pp: number };
    calf: { rm: number; pp: number };
    leg: { rm: number; pp: number };
    hip: { right: { rm: number; pp: number }; left: { rm: number; pp: number } };
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

      {/* Clinimetrics Section */}
      <Text style={styles.header}>Clinimetrics</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>BMI</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.bmi || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Target Walking Distance</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.twd || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Grip Strength - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.grip?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Grip Strength - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.grip?.left || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Blood Pressure - Systolic</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.obp?.systolic || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Blood Pressure - Diastolic</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.obp?.diastolic || '-'}
          </Text>
        ))}
      </View>

      {/* Flexibility Section */}
      <Text style={styles.header}>Flexibility</Text>

      <View style={styles.row}>
        <Text style={styles.label}>PKE - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.pke?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>PKE - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.pke?.left || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>CSR - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.csr?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>CSR - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.csr?.left || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>BST - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.bst?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>BST - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.bst?.left || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>TBR - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.tbr?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>TBR - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.flexibility?.tbr?.left || '-'}
          </Text>
        ))}
      </View>

      {/* Balance Section */}
      <Text style={styles.header}>Balance</Text>

      <View style={styles.row}>
        <Text style={styles.label}>FRT Score</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.frt || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>OLS - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.ols?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>OLS - Left</Text>
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
        <Text style={styles.label}>PST - AP</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.pst?.ap || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>PST - ML</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.balance?.pst?.ml || '-'}
          </Text>
        ))}
      </View>

      {/* Gait Section */}
      <Text style={styles.header}>Gait & Locomotion</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Timed Up-and-Go</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.gait?.tug || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Normal Comfortable Walk</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.gait?.ncw || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Gait Speed Test</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.gait?.gst?.value || '-'} ({visit.gait?.gst?.type || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Stair Climb Test</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.gait?.sct?.value || '-'} ({visit.gait?.sct?.type || '-'})
          </Text>
        ))}
      </View>

      {/* Endurance Section */}
      <Text style={styles.header}>Endurance</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Arm Curl Test - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.act?.right || '-'} ({visit.endurance?.act?.weight || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Arm Curl Test - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.act?.left || '-'} ({visit.endurance?.act?.weight || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sit-to-Stand Test</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.sts?.value || '-'} ({visit.endurance?.sts?.type || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Toe Lift Series</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.tls?.value || '-'} ({visit.endurance?.tls?.weight || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Upper Hand Reach - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.uhr?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Upper Hand Reach - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.uhr?.left || '-'}
          </Text>
        ))}
      </View>

      {/* Aerobic Section */}
      <Text style={styles.header}>Aerobic</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Two Minute Step</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.tms || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Modified Walk Test Distance</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.mwt?.distance || '-'} ({visit.aerobic?.mwt?.type || '-'})
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Modified Walk Test Speed</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.mwt?.speed || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>IKD Upper Extremity</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.ikd?.ue || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>IKD Lower Extremity</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.ikd?.le || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Partial Wall Sit - Right</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.pws?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Partial Wall Sit - Left</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.pws?.left || '-'}
          </Text>
        ))}
      </View>

      {/* Power Section */}
      <Text style={styles.header}>Power</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Bicep - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.bicep?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Bicep - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.bicep?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tricep - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.tricep?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tricep - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.tricep?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Back - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.back?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Back - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.back?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Chest - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.chest?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Chest - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.chest?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Knee - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.knee?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Knee - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.knee?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Calf - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.calf?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Calf - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.calf?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Leg - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.leg?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Leg - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.leg?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hip Right - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.hip?.right?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hip Right - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.hip?.right?.pp || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hip Left - 1RM</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.hip?.left?.rm || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hip Left - Peak Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.hip?.left?.pp || '-'}
          </Text>
        ))}
      </View>

      {/* Comments Sections */}
      <Text style={styles.header}>Comments</Text>
      {visits.map((visit, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.label}>Visit {i + 1}</Text>
          <Text style={i === 0 ? styles.value1 : styles.value2}>
            {visit.clinimetrics?.comments || '-'}
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

                  {/* Clinimetrics Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Clinimetrics</div>
                  <div className="font-medium text-gray-500">BMI</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.bmi || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Target Walking Distance</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.twd || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Grip Strength - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.grip?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Grip Strength - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.grip?.left || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Blood Pressure - Systolic</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.obp?.systolic || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Blood Pressure - Diastolic</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.clinimetrics?.obp?.diastolic || '-'}</div>
                  ))}

                  {/* Flexibility Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Flexibility</div>
                  <div className="font-medium text-gray-500">PKE - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.pke?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">PKE - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.pke?.left || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">CSR - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.csr?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">CSR - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.csr?.left || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">BST - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.bst?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">BST - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.bst?.left || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">TBR - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.tbr?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">TBR - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.flexibility?.tbr?.left || '-'}</div>
                  ))}

                  {/* Gait Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Gait & Locomotion</div>
                  <div className="font-medium text-gray-500">Timed Up-and-Go</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.gait?.tug || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Normal Comfortable Walk</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.gait?.ncw || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Gait Speed Test Value</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.gait?.gst?.value || '-'} ({visit.gait?.gst?.type || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Stair Climb Test Value</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.gait?.sct?.value || '-'} ({visit.gait?.sct?.type || '-'})</div>
                  ))}

                  {/* Endurance Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Endurance</div>
                  <div className="font-medium text-gray-500">Arm Curl Test - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.act?.right || '-'} ({visit.endurance?.act?.weight || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Arm Curl Test - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.act?.left || '-'} ({visit.endurance?.act?.weight || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Sit-to-Stand Test</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.sts?.value || '-'} ({visit.endurance?.sts?.type || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Toe Lift Series</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.tls?.value || '-'} ({visit.endurance?.tls?.weight || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Upper Hand Reach - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.uhr?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Upper Hand Reach - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.endurance?.uhr?.left || '-'}</div>
                  ))}

                  {/* Aerobic Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Aerobic</div>
                  <div className="font-medium text-gray-500">Two Minute Step</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.tms || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Modified Walk Test Distance</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.mwt?.distance || '-'} ({visit.aerobic?.mwt?.type || '-'})</div>
                  ))}

                  <div className="font-medium text-gray-500">Modified Walk Test Speed</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.mwt?.speed || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">IKD Upper Extremity</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.ikd?.ue || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">IKD Lower Extremity</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.ikd?.le || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Partial Wall Sit - Right</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.pws?.right || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Partial Wall Sit - Left</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.aerobic?.pws?.left || '-'}</div>
                  ))}

                  {/* Power Section */}
                  <div className="font-medium text-gray-500 col-span-3 mt-4">Power</div>
                  <div className="font-medium text-gray-500">Bicep - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.bicep?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Bicep - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.bicep?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Tricep - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.tricep?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Tricep - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.tricep?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Back - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.back?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Back - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.back?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Chest - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.chest?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Chest - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.chest?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Knee - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.knee?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Knee - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.knee?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Calf - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.calf?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Calf - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.calf?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Leg - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.leg?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Leg - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.leg?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Hip Right - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.hip?.right?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Hip Right - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.hip?.right?.pp || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Hip Left - 1RM</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.hip?.left?.rm || '-'}</div>
                  ))}

                  <div className="font-medium text-gray-500">Hip Left - Peak Power</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">{visit.power?.hip?.left?.pp || '-'}</div>
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