import React, { useState } from 'react';
import ClinimetricsSection from './ClinimetricsSection';
import FlexibilitySection from './FlexibilitySection';
import BalanceSection from './BalanceSection';
import GaitSection from './GaitSection';
import EnduranceSection from './EnduranceSection';
import AerobicSection from './AerobicSection';
import PowerSection from './PowerSection';

interface VisitFormProps {
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  onCancel: () => void;
}

const VisitForm: React.FC<VisitFormProps> = ({ onSubmit, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    clinimetrics: {
      bmi: 0,
      twd: 0,
      grip: { right: 0, left: 0 },
      obp: { systolic: 0, diastolic: 0 },
      comments: '',
    },
    flexibility: {
      pke: { right: 0, left: 0 },
      csr: { right: 0, left: 0 },
      bst: { right: 0, left: 0 },
      tbr: { right: 0, left: 0 },
      comments: '',
    },
    balance: {
      frt: 0,
      ols: { right: 0, left: 0 },
      srt: 0,
      pst: { ap: 0, ml: 0 },
      comments: '',
    },
    gait: {
      tug: 0,
      ncw: 0,
      gst: { value: 0, type: '6meter' as const },
      sct: { value: 0, type: '5step' as const },
      comments: '',
    },
    endurance: {
      act: { right: 0, left: 0, weight: '5lbs' as const },
      sts: { value: 0, type: '5x' as const },
      tls: { value: 0, weight: '1lb' as const },
      uhr: { right: 0, left: 0 },
      comments: '',
    },
    aerobic: {
      tms: 0,
      mwt: { distance: 0, speed: 0, type: '2min' as const },
      ikd: { ue: 0, le: 0 },
      pws: { right: 0, left: 0 },
      comments: '',
    },
    power: {
      bicep: { rm: 0, pp: 0 },
      tricep: { rm: 0, pp: 0 },
      back: { rm: 0, pp: 0 },
      chest: { rm: 0, pp: 0 },
      knee: { rm: 0, pp: 0 },
      calf: { rm: 0, pp: 0 },
      leg: { rm: 0, pp: 0 },
      hip: { right: { rm: 0, pp: 0 }, left: { rm: 0, pp: 0 } },
      comments: '',
    },
  });

  const handleSectionChange = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ClinimetricsSection
        data={formData.clinimetrics}
        onChange={(data) => handleSectionChange('clinimetrics', data)}
      />

      <FlexibilitySection
        data={formData.flexibility}
        onChange={(data) => handleSectionChange('flexibility', data)}
      />

      <BalanceSection
        data={formData.balance}
        onChange={(data) => handleSectionChange('balance', data)}
      />

      <GaitSection
        data={formData.gait}
        onChange={(data) => handleSectionChange('gait', data)}
      />

      <EnduranceSection
        data={formData.endurance}
        onChange={(data) => handleSectionChange('endurance', data)}
      />

      <AerobicSection
        data={formData.aerobic}
        onChange={(data) => handleSectionChange('aerobic', data)}
      />

      <PowerSection
        data={formData.power}
        onChange={(data) => handleSectionChange('power', data)}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {loading ? 'Saving...' : 'Save Visit'}
        </button>
      </div>
    </form>
  );
};

export default VisitForm; 