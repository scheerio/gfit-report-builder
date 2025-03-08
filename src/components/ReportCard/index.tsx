import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Visit, Patient, Gender, NumericOrNT } from '../../types';
import { calculateTotalScore, determineRiskLevel } from '../../utils/scoreCalculations';
import { getNormativeValue, NormativeRange } from '../../utils/normativeValues';
import { Timestamp } from 'firebase/firestore';

interface ReportCardProps {
  patient: Patient;
  visit1: Visit;
  visit2: Visit;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    flex: 2,
    fontSize: 12,
  },
  value: {
    flex: 1,
    fontSize: 12,
  },
  comments: {
    fontSize: 10,
    marginTop: 5,
    fontStyle: 'italic',
  },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  normValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666',
  },
  value1: {
    flex: 1,
    fontSize: 12,
  },
  value2: {
    flex: 1,
    fontSize: 12,
  },
});

const ReportCard: React.FC<ReportCardProps> = ({ patient, visit1, visit2 }) => {
  // Calculate age for normative values
  const age = new Date().getFullYear() - patient.dateOfBirth.toDate().getFullYear();
  const ageGroup = determineAgeGroup(age);

  // Calculate scores
  const score1 = calculateTotalScore(visit1, ageGroup);
  const score2 = calculateTotalScore(visit2, ageGroup);
  const riskLevel = determineRiskLevel(score2); // Use most recent visit for risk level

  // Convert gender if needed
  const gender: Gender = patient.gender === 'M' ? 'M' : 'F';  // Assuming patient.gender is already 'M' or 'F'

  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>G-FIT Report Card</Text>
            <Text style={styles.subtitle}>
              {patient.firstName} {patient.lastName}
            </Text>
            <Text>Date of Birth: {patient.dateOfBirth.toDate().toLocaleDateString()}</Text>
            <Text>EMR ID: {patient.emrId || 'N/A'}</Text>
          </View>

          {/* Clinimetrics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinimetrics</Text>
            <MeasurementRow
              label="Body Mass Index (BMI)"
              measurement="bmi"
              visit1Value={visit1.clinimetrics.bmi}
              visit2Value={visit2.clinimetrics.bmi}
              age={age}
              gender={gender}
            />
            {/* Add other clinimetrics measurements */}
            {visit2.clinimetrics.comments && (
              <Text style={styles.comments}>{visit2.clinimetrics.comments}</Text>
            )}
          </View>

          {/* Add other sections (Flexibility, Balance, etc.) */}

          {/* Grip Strength Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Grip Strength</Text>
            <MeasurementRow
              label="Grip Strength - Right"
              measurement="grip"
              visit1Value={visit1.clinimetrics?.grip?.right ?? null}
              visit2Value={visit2.clinimetrics?.grip?.right ?? null}
              age={age}
              gender={gender}
            />
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Initial Assessment Score:</Text>
              <Text style={styles.value}>{score1}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Current Assessment Score:</Text>
              <Text style={styles.value}>{score2}</Text>
            </View>
            <Text style={styles.riskLevel}>
              Risk Level: {riskLevel}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

// Helper function to determine age group for normative values
const determineAgeGroup = (age: number): string => {
  if (age < 30) return '18-30';
  if (age < 40) return '31-40';
  if (age < 50) return '41-50';
  if (age < 60) return '51-60';
  if (age < 70) return '61-70';
  return '70+';
};

// Update the row component to include normative values
const MeasurementRow: React.FC<{
  label: string;
  measurement: string;
  visit1Value: NumericOrNT;
  visit2Value: NumericOrNT;
  age: number;
  gender: Gender;
}> = ({ label, measurement, visit1Value, visit2Value, age, gender }) => {
  const normValue = getNormativeValue(measurement, age, gender);
  
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

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.normValue}>
        {formatNormativeValue(normValue)}
      </Text>
      <Text style={styles.value1}>{formatValue(visit1Value)}</Text>
      <Text style={styles.value2}>{formatValue(visit2Value)}</Text>
    </View>
  );
};

export default ReportCard; 