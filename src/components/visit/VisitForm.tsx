import React, { useState } from 'react';
import { Visit } from '../../types/Visit';
import { Timestamp } from 'firebase/firestore';
import ClinimetricsSection from './ClinimetricsSection';
import FlexibilitySection from './FlexibilitySection';
import BalanceSection from './BalanceSection';
import GaitSection from './GaitSection';
import AerobicSection from './AerobicSection';
import EnduranceSection from './EnduranceSection';
import PowerSection from './PowerSection';

interface VisitFormProps {
  initialData?: Partial<Visit>;
  onSubmit: (data: Partial<Visit>) => Promise<void>;
  isLoading?: boolean;
}

const defaultVisit: Partial<Visit> = {
  date: Timestamp.now(),
  clinimetrics: {
    bmi: null,
    twd: null,
    grip: { right: null, left: null },
    obp: { systolic: null, diastolic: null }
  },
  flexibility: {
    pke: { right: null, left: null },
    csr: { right: null, left: null },
    bst: { right: null, left: null },
    tbr: { right: null, left: null }
  },
  balance: {
    frt: null,
    ols: { right: null, left: null },
    srt: null,
    pst: { ap: null, ml: null }
  },
  gait: {
    tug: null,
    ncw: null,
    gst: { value: null, type: '6meter' },
    sct: { value: null, type: '5step' }
  },
  aerobic: {
    tms: null,
    mwt: { distance: null, speed: null, type: '2min' },
    ikd: { ue: null, le: null },
    pws: { right: null, left: null }
  },
  endurance: {
    act: { right: null, left: null, weight: '5lbs' },
    sts: { value: null, type: '5x' },
    tls: { value: null, weight: '1lb' },
    uhr: { right: null, left: null }
  },
  power: {
    bicep: { rm: null, pp: null },
    tricep: { rm: null, pp: null },
    back: { rm: null, pp: null },
    chest: { rm: null, pp: null },
    knee: { rm: null, pp: null },
    calf: { rm: null, pp: null },
    leg: { rm: null, pp: null },
    hip: {
      right: { rm: null, pp: null },
      left: { rm: null, pp: null }
    }
  }
};

const exampleVisit: Partial<Visit> = {
  date: Timestamp.now(),
  clinimetrics: {
    bmi: 24.5,
    twd: 12.3,
    grip: { right: 65, left: 62 },
    obp: { systolic: 122, diastolic: 78 }
  },
  flexibility: {
    pke: { right: 175, left: 172 },
    csr: { right: 2.5, left: 2.3 },
    bst: { right: -1.5, left: -1.8 },
    tbr: { right: 85, left: 82 }
  },
  balance: {
    frt: 14.2,
    ols: { right: 45, left: 42 },
    srt: 850,
    pst: { ap: 25, ml: 18 }
  },
  gait: {
    tug: 8.5,
    ncw: 15,
    gst: { value: 1.2, type: '6meter' },
    sct: { value: 0.8, type: '5step' }
  },
  aerobic: {
    tms: 95,
    mwt: { distance: 150, speed: 1.25, type: '2min' },
    ikd: { ue: 45, le: 85 },
    pws: { right: 35, left: 32 }
  },
  endurance: {
    act: { right: 18, left: 16, weight: '5lbs' },
    sts: { value: 12, type: '5x' },
    tls: { value: 45, weight: '3lbs' },
    uhr: { right: 22, left: 20 }
  },
  power: {
    bicep: { rm: 25, pp: 150 },
    tricep: { rm: 20, pp: 130 },
    back: { rm: 85, pp: 450 },
    chest: { rm: 65, pp: 380 },
    knee: { rm: 95, pp: 520 },
    calf: { rm: 75, pp: 420 },
    leg: { rm: 145, pp: 850 },
    hip: {
      right: { rm: 85, pp: 480 },
      left: { rm: 82, pp: 465 }
    }
  }
};

const VisitForm: React.FC<VisitFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<Visit>>({
    ...defaultVisit,
    ...initialData
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  const updateSection = <K extends keyof Visit>(
    section: K,
    data: Partial<Visit[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        ...data
      }
    }));
  };

  const handlePopulateExample = () => {
    setFormData(prev => ({
      ...prev,
      ...exampleVisit
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Test Month/Year</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select the date of this visit.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="flex space-x-4">
              <input
                type="date"
                value={formData.date instanceof Timestamp ? formData.date.toDate().toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: Timestamp.fromDate(new Date(e.target.value))
                }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handlePopulateExample}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Populate Example Values
              </button>
            </div>
          </div>
        </div>
      </div>

      <ClinimetricsSection
        data={formData.clinimetrics || defaultVisit.clinimetrics!}
        onChange={data => updateSection('clinimetrics', data)}
      />

      <FlexibilitySection
        data={formData.flexibility || defaultVisit.flexibility!}
        onChange={data => updateSection('flexibility', data)}
      />

      <BalanceSection
        data={formData.balance || defaultVisit.balance!}
        onChange={data => updateSection('balance', data)}
      />

      <GaitSection
        data={formData.gait || defaultVisit.gait!}
        onChange={data => updateSection('gait', data)}
      />

      <AerobicSection
        data={formData.aerobic || defaultVisit.aerobic!}
        onChange={data => updateSection('aerobic', data)}
      />

      <EnduranceSection
        data={formData.endurance || defaultVisit.endurance!}
        onChange={data => updateSection('endurance', data)}
      />

      <PowerSection
        data={formData.power || defaultVisit.power!}
        onChange={data => updateSection('power', data)}
      />

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Visit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VisitForm; 