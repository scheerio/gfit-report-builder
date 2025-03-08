import React, { useState } from 'react';
import ClinimetricsSection from '../visit/ClinimetricsSection';
import FlexibilitySection from '../visit/FlexibilitySection';
import BalanceSection from '../visit/BalanceSection';
import GaitSection from '../visit/GaitSection';
import EnduranceSection from '../visit/EnduranceSection';
import AerobicSection from '../visit/AerobicSection';
import PowerSection from '../visit/PowerSection';
import { Visit } from '../../types/Visit';

interface VisitFormProps {
  onSubmit: (data: Partial<Visit>) => Promise<void>;
  loading: boolean;
  onCancel: () => void;
  initialData?: Visit;
}

interface FormData {
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

const VisitForm: React.FC<VisitFormProps> = ({ onSubmit, loading, onCancel, initialData }) => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleSectionChange = <T extends keyof FormData>(section: T, data: FormData[T]) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const validateForm = (data: typeof formData): boolean => {
    // Helper function to check if a value is valid
    const isValidNumber = (value: number | null): boolean => 
      value !== null && !isNaN(value) && value !== 0;

    // Check clinimetrics
    if (!isValidNumber(data.clinimetrics.bmi) ||
        !isValidNumber(data.clinimetrics.twd) ||
        !isValidNumber(data.clinimetrics.grip.right) ||
        !isValidNumber(data.clinimetrics.grip.left) ||
        !isValidNumber(data.clinimetrics.obp.systolic) ||
        !isValidNumber(data.clinimetrics.obp.diastolic)) {
      alert('Please complete all Clinimetrics fields');
      return false;
    }

    // Check flexibility
    if (!isValidNumber(data.flexibility.pke.right) ||
        !isValidNumber(data.flexibility.pke.left) ||
        !isValidNumber(data.flexibility.csr.right) ||
        !isValidNumber(data.flexibility.csr.left) ||
        !isValidNumber(data.flexibility.bst.right) ||
        !isValidNumber(data.flexibility.bst.left) ||
        !isValidNumber(data.flexibility.tbr.right) ||
        !isValidNumber(data.flexibility.tbr.left)) {
      alert('Please complete all Flexibility fields');
      return false;
    }

    // Check balance
    if (!isValidNumber(data.balance.frt) ||
        !isValidNumber(data.balance.ols.right) ||
        !isValidNumber(data.balance.ols.left) ||
        !isValidNumber(data.balance.srt) ||
        !isValidNumber(data.balance.pst.ap) ||
        !isValidNumber(data.balance.pst.ml)) {
      alert('Please complete all Balance fields');
      return false;
    }

    // Check gait
    if (!isValidNumber(data.gait.tug) ||
        !isValidNumber(data.gait.ncw) ||
        !isValidNumber(data.gait.gst.value) ||
        !isValidNumber(data.gait.sct.value)) {
      alert('Please complete all Gait fields');
      return false;
    }

    // Check endurance
    if (!isValidNumber(data.endurance.act.right) ||
        !isValidNumber(data.endurance.act.left) ||
        !isValidNumber(data.endurance.sts.value) ||
        !isValidNumber(data.endurance.tls.value) ||
        !isValidNumber(data.endurance.uhr.right) ||
        !isValidNumber(data.endurance.uhr.left)) {
      alert('Please complete all Endurance fields');
      return false;
    }

    // Check aerobic
    if (!isValidNumber(data.aerobic.tms) ||
        !isValidNumber(data.aerobic.mwt.distance) ||
        !isValidNumber(data.aerobic.mwt.speed) ||
        !isValidNumber(data.aerobic.ikd.ue) ||
        !isValidNumber(data.aerobic.ikd.le) ||
        !isValidNumber(data.aerobic.pws.right) ||
        !isValidNumber(data.aerobic.pws.left)) {
      alert('Please complete all Aerobic fields');
      return false;
    }

    // Check power
    if (!isValidNumber(data.power.bicep.rm) ||
        !isValidNumber(data.power.bicep.pp) ||
        !isValidNumber(data.power.tricep.rm) ||
        !isValidNumber(data.power.tricep.pp) ||
        !isValidNumber(data.power.back.rm) ||
        !isValidNumber(data.power.back.pp) ||
        !isValidNumber(data.power.chest.rm) ||
        !isValidNumber(data.power.chest.pp) ||
        !isValidNumber(data.power.knee.rm) ||
        !isValidNumber(data.power.knee.pp) ||
        !isValidNumber(data.power.calf.rm) ||
        !isValidNumber(data.power.calf.pp) ||
        !isValidNumber(data.power.leg.rm) ||
        !isValidNumber(data.power.leg.pp) ||
        !isValidNumber(data.power.hip.right.rm) ||
        !isValidNumber(data.power.hip.right.pp) ||
        !isValidNumber(data.power.hip.left.rm) ||
        !isValidNumber(data.power.hip.left.pp)) {
      alert('Please complete all Power fields');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      alert('Please fill in all required fields');
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ClinimetricsSection
        data={formData.clinimetrics}
        onChange={(data) => handleSectionChange('clinimetrics', data as FormData['clinimetrics'])}
      />

      <FlexibilitySection
        data={formData.flexibility}
        onChange={(data) => handleSectionChange('flexibility', data as FormData['flexibility'])}
      />

      <BalanceSection
        data={formData.balance}
        onChange={(data) => handleSectionChange('balance', data as FormData['balance'])}
      />

      <GaitSection
        data={formData.gait}
        onChange={(data) => handleSectionChange('gait', data as FormData['gait'])}
      />

      <EnduranceSection
        data={formData.endurance}
        onChange={(data) => handleSectionChange('endurance', data as FormData['endurance'])}
      />

      <AerobicSection
        data={formData.aerobic}
        onChange={(data) => handleSectionChange('aerobic', data as FormData['aerobic'])}
      />

      <PowerSection
        data={formData.power}
        onChange={(data) => handleSectionChange('power', data as FormData['power'])}
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