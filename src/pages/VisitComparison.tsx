import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { formatInTimeZone } from 'date-fns-tz';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Visit as VisitType, Patient, Gender, NumericOrNT } from '../types';
import { getNormativeValue, NormativeRange } from '../utils/normativeValues';
import { format } from 'date-fns';

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
  patientInfo: {
    fontSize: 12,
    marginBottom: 4,
  },
  clinicianInfo: {
    fontSize: 12,
    marginBottom: 20,
    color: '#666666',
  },
});

// PDF Document Component
const ComparisonDocument = ({ 
  visits,
  patient,
  clinicianName,
  age
}: { 
  visits: VisitType[];
  patient: Patient;
  clinicianName: string;
  age: number;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Patient Info Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Visit Comparison Report</Text>
        <Text style={styles.patientInfo}>
          {patient.lastName}, {patient.firstName} {patient.emrId ? `(EMR ID: ${patient.emrId})` : ''}
        </Text>
        <Text style={styles.patientInfo}>
          {format(patient.dateOfBirth.toDate(), 'M/d/yy')} ({age})
        </Text>
        <Text style={styles.clinicianInfo}>
          Clinician: {clinicianName}
        </Text>
      </View>

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
      <Text style={styles.header}>Muscle Performance - Endurance</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Arm Curl Test</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.act?.right || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sit to Stand</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.sts?.value || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Timed Loaded Standing</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.tls?.value || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Unilateral Heel Rise</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.endurance?.uhr?.right || '-'}
          </Text>
        ))}
      </View>

      {/* Aerobic Section */}
      <Text style={styles.header}>Aerobic & Endurance</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Two Minute Step</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.tms || '-'}
          </Text>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Walk Test</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.aerobic?.mwt?.distance || '-'} ({visit.aerobic?.mwt?.type || '-'})
          </Text>
        ))}
      </View>

      {/* Power Section */}
      <Text style={styles.header}>Muscle Performance - Power</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Bicep Power</Text>
        {visits.map((visit, i) => (
          <Text key={i} style={i === 0 ? styles.value1 : styles.value2}>
            {visit.power?.bicep?.pp || '-'}
          </Text>
        ))}
      </View>

      {/* Add other power measurements */}

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

// Add helper functions
const formatValue = (value: NumericOrNT) => {
  if (value === 'NT') return 'NT';
  if (value === null || value === undefined) return '-';
  return value.toString();
};

const formatNormativeValue = (value: NormativeRange) => {
  if (value.text) return value.text;
  if (value.min && value.max) return `${value.min}-${value.max}`;
  if (value.min) return `≥ ${value.min}`;
  if (value.max) return `≤ ${value.max}`;
  return '-';
};

// Add new interface for editable fields
interface EditableHeaderData {
  firstName: string;
  lastName: string;
  emrId: string;
  dateOfBirth: string;
  clinicianName: string;
}

// Add new component for editable header
const EditableHeader: React.FC<{
  patient: Patient;
  clinicianName: string;
  onSave: (data: EditableHeaderData) => void;
}> = ({ patient, clinicianName, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<EditableHeaderData>({
    firstName: patient.firstName,
    lastName: patient.lastName,
    emrId: patient.emrId || '',
    dateOfBirth: format(patient.dateOfBirth.toDate(), 'yyyy-MM-dd'),
    clinicianName: clinicianName,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {patient.lastName}, {patient.firstName} ({patient.emrId ? `EMR ID: ${patient.emrId}` : 'No EMR ID'})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {format(patient.dateOfBirth.toDate(), 'M/d/yy')} ({calculateAge(patient.dateOfBirth.toDate())})
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Clinician</p>
          <p className="text-sm font-medium text-gray-900">{clinicianName}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-sm text-primary-600 hover:text-primary-500"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">EMR ID</label>
          <input
            type="text"
            value={formData.emrId}
            onChange={(e) => setFormData({ ...formData, emrId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Clinician Name</label>
        <input
          type="text"
          value={formData.clinicianName}
          onChange={(e) => setFormData({ ...formData, clinicianName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

// Add helper function for age calculation
const calculateAge = (dob: Date) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const VisitComparison = () => {
  const { id: patientId, visit1Id, visit2Id } = useParams<{ id: string; visit1Id: string; visit2Id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [visits, setVisits] = useState<VisitType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clinicianName, setClinicianName] = useState(currentUser?.displayName || 'Unknown Clinician');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch patient details first
        const patientDoc = await getDoc(doc(db, 'patients', patientId!));
        if (!patientDoc.exists()) {
          setError('Patient not found');
          return;
        }
        setPatient({ id: patientDoc.id, ...patientDoc.data() } as Patient);

        // Then fetch visits
        const visit1Doc = await getDoc(doc(db, 'visits', visit1Id!));
        const visit2Doc = await getDoc(doc(db, 'visits', visit2Id!));

        if (!visit1Doc.exists() || !visit2Doc.exists()) {
          setError('One or more visits not found');
          return;
        }

        setVisits([
          { id: visit1Doc.id, ...visit1Doc.data() } as VisitType,
          { id: visit2Doc.id, ...visit2Doc.data() } as VisitType
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (patientId && visit1Id && visit2Id) {
      fetchData();
    }
  }, [patientId, visit1Id, visit2Id]);

  // Add save handler
  const handleHeaderSave = async (data: EditableHeaderData) => {
    try {
      const newDateOfBirth = Timestamp.fromDate(new Date(data.dateOfBirth));
      
      // Update patient document
      await updateDoc(doc(db, 'patients', patientId!), {
        firstName: data.firstName,
        lastName: data.lastName,
        emrId: data.emrId,
        dateOfBirth: newDateOfBirth,
      });

      // Update local state
      setPatient(prev => {
        if (!prev) return null;
        return {
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          emrId: data.emrId,
          dateOfBirth: newDateOfBirth,
        };
      });
      
      setClinicianName(data.clinicianName);
    } catch (err) {
      console.error('Error updating patient:', err);
      // Add error handling UI feedback here
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

  const age = patient ? new Date().getFullYear() - patient.dateOfBirth.toDate().getFullYear() : 0;

  const renderNormativeValue = (measurement: string) => {
    if (!patient) return '-';
    return formatNormativeValue(getNormativeValue(measurement, age, patient.gender));
  };

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
                {patient ? (
                  <PDFDownloadLink
                    document={
                      <ComparisonDocument 
                        visits={visits} 
                        patient={patient}
                        clinicianName={clinicianName}
                        age={age}
                      />
                    }
                    fileName="visit-comparison.pdf"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    {({ loading }) => (
                      <span>
                        {loading ? 'Generating PDF...' : 'Download PDF'}
                      </span>
                    )}
                  </PDFDownloadLink>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                  >
                    Loading Patient Data...
                  </button>
                )}
              </div>
            </div>

            {/* Add a visual comparison table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
              {/* Patient Info Header */}
              <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
                {patient && (
                  <EditableHeader
                    patient={patient}
                    clinicianName={clinicianName}
                    onSave={handleHeaderSave}
                  />
                )}
              </div>

              {/* Rest of comparison table */}
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium text-gray-500">Measurement</div>
                  <div className="font-medium text-gray-900">Normative Values</div>
                  <div className="font-medium text-gray-900">Visit 1</div>
                  <div className="font-medium text-gray-900">Visit 2</div>

                  {/* Clinimetrics Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Clinimetrics</div>
                  
                  <div className="font-medium text-gray-500">Body Mass Index</div>
                  <div className="text-gray-900">{renderNormativeValue('bmi')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.clinimetrics?.bmi ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Tragus Wall Distance</div>
                  <div className="text-gray-900">{renderNormativeValue('twd')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.clinimetrics?.twd ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Grip Strength - Right</div>
                  <div className="text-gray-900">{renderNormativeValue('grip')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.clinimetrics?.grip?.right ?? null)}
                    </div>
                  ))}

                  {/* Flexibility Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Flexibility</div>

                  <div className="font-medium text-gray-500">Passive Knee Extension</div>
                  <div className="text-gray-900">{renderNormativeValue('pke')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.flexibility?.pke?.right ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Chair Sit & Reach</div>
                  <div className="text-gray-900">{renderNormativeValue('csr')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.flexibility?.csr?.right ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Back Scratch Test</div>
                  <div className="text-gray-900">{renderNormativeValue('bst')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.flexibility?.bst?.right ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Total Body Rotation</div>
                  <div className="text-gray-900">{renderNormativeValue('tbr')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.flexibility?.tbr?.right ?? null)}
                    </div>
                  ))}

                  {/* Balance Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Balance</div>

                  <div className="font-medium text-gray-500">Functional Reach Test</div>
                  <div className="text-gray-900">{renderNormativeValue('frt')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.balance?.frt ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">One Leg Stance</div>
                  <div className="text-gray-900">{renderNormativeValue('ols')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.balance?.ols?.right ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Step Reaction Time</div>
                  <div className="text-gray-900">{renderNormativeValue('srt')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.balance?.srt ?? null)}
                    </div>
                  ))}

                  {/* Gait Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Gait & Locomotion</div>

                  <div className="font-medium text-gray-500">Timed Up & Go</div>
                  <div className="text-gray-900">{renderNormativeValue('tug')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.gait?.tug ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Narrow Corridor Walk</div>
                  <div className="text-gray-900">{renderNormativeValue('ncw')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.gait?.ncw ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Gait Speed</div>
                  <div className="text-gray-900">{renderNormativeValue('gaitSpeed')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.gait?.gst?.value ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Stair Climb</div>
                  <div className="text-gray-900">{renderNormativeValue('stairClimb')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.gait?.sct?.value ?? null)}
                    </div>
                  ))}

                  {/* Endurance Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Muscle Performance - Endurance</div>

                  <div className="font-medium text-gray-500">Arm Curl Test</div>
                  <div className="text-gray-900">{renderNormativeValue('act')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.endurance?.act?.right ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Sit to Stand</div>
                  <div className="text-gray-900">{renderNormativeValue('sts')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.endurance?.sts?.value ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Timed Loaded Standing</div>
                  <div className="text-gray-900">{renderNormativeValue('tls')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.endurance?.tls?.value ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Unilateral Heel Rise</div>
                  <div className="text-gray-900">{renderNormativeValue('uhr')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.endurance?.uhr?.right ?? null)}
                    </div>
                  ))}

                  {/* Aerobic Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Aerobic & Endurance</div>

                  <div className="font-medium text-gray-500">Two Minute Step</div>
                  <div className="text-gray-900">{renderNormativeValue('tms')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.aerobic?.tms ?? null)}
                    </div>
                  ))}

                  <div className="font-medium text-gray-500">Walk Test</div>
                  <div className="text-gray-900">{renderNormativeValue('mwt')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.aerobic?.mwt?.distance ?? null)}
                    </div>
                  ))}

                  {/* Power Section */}
                  <div className="col-span-4 font-bold text-gray-700 mt-4">Muscle Performance - Power</div>

                  <div className="font-medium text-gray-500">Bicep Power</div>
                  <div className="text-gray-900">{renderNormativeValue('bicepPower')}</div>
                  {visits.map((visit, i) => (
                    <div key={i} className="text-gray-900">
                      {formatValue(visit.power?.bicep?.pp ?? null)}
                    </div>
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