import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import EditPatient from './pages/EditPatient';
import NewVisit from './pages/NewVisit';
import EditVisit from './pages/EditVisit';
import VisitDetails from './pages/VisitDetails';
import GenerateReport from './pages/GenerateReport';
import NewPatient from './pages/NewPatient';
import VisitComparison from './pages/VisitComparison';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientList /></PrivateRoute>} />
          <Route path="/patients/new" element={<PrivateRoute><NewPatient /></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><PatientDetails /></PrivateRoute>} />
          <Route path="/patients/:id/edit" element={<PrivateRoute><EditPatient /></PrivateRoute>} />
          <Route path="/patients/:id/visits/new" element={<PrivateRoute><NewVisit /></PrivateRoute>} />
          <Route path="/patients/:id/visits/:visitId" element={<PrivateRoute><VisitDetails /></PrivateRoute>} />
          <Route path="/patients/:id/visits/:visitId/edit" element={<PrivateRoute><EditVisit /></PrivateRoute>} />
          <Route path="/patients/:id/report" element={<PrivateRoute><GenerateReport /></PrivateRoute>} />
          <Route path="/patients/:id/compare/:visit1Id/:visit2Id" element={<PrivateRoute><VisitComparison /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 