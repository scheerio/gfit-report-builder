import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Visit, Patient } from '../../types';
import { calculateTotalScore, determineRiskLevel } from '../../utils/scoreCalculations';

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
});

const ReportCard: React.FC<ReportCardProps> = ({ patient, visit1, visit2 }) => {
  // Calculate age for normative values
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  const ageGroup = determineAgeGroup(age);

  // Calculate scores
  const score1 = calculateTotalScore(visit1, ageGroup);
  const score2 = calculateTotalScore(visit2, ageGroup);
  const riskLevel = determineRiskLevel(score2); // Use most recent visit for risk level

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
            <Text>Date of Birth: {new Date(patient.dateOfBirth).toLocaleDateString()}</Text>
            <Text>EMR ID: {patient.emrId || 'N/A'}</Text>
          </View>

          {/* Clinimetrics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinimetrics</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Body Mass Index (BMI)</Text>
              <Text style={styles.value}>{visit1.clinimetrics.bmi}</Text>
              <Text style={styles.value}>{visit2.clinimetrics.bmi}</Text>
            </View>
            {/* Add other clinimetrics measurements */}
            {visit2.clinimetrics.comments && (
              <Text style={styles.comments}>{visit2.clinimetrics.comments}</Text>
            )}
          </View>

          {/* Add other sections (Flexibility, Balance, etc.) */}

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

export default ReportCard; 