import React, { useState, useEffect } from 'react';
import { Visit } from '../../types/Visit';
import { Timestamp } from 'firebase/firestore';
import ClinimetricsSection from './ClinimetricsSection';
import FlexibilitySection from './FlexibilitySection';
import BalanceSection from './BalanceSection';
import GaitSection from './GaitSection';
import EnduranceSection from './EnduranceSection';
import AerobicSection from './AerobicSection';
import PowerSection from './PowerSection';

interface VisitFormProps {
  initialData?: Partial<Visit>;
  onSubmit: (data: Partial<Visit>) => Promise<void>;
  isLoading?: boolean;
}

const defaultVisit: Partial<Visit> = {
  date: Timestamp.now(),
  clinimetrics: {
    bmi: 0,
    twd: 0,
    grip: { right: 0, left: 0 },
    obp: { systolic: 0, diastolic: 0 }
  },
  flexibility: {
    pke: { right: 0, left: 0 },
    csr: { right: 0, left: 0 },
    bst: { right: 0, left: 0 },
    tbr: { right: 0, left: 0 }
  },
  balance: {
    frt: 0,
    ols: { right: 0, left: 0 },
    srt: 0,
    pst: { ap: 0, ml: 0 }
  },
  gait: {
    tug: 0,
    ncw: 0,
    gst: { value: 0, type: '6meter' },
    sct: { value: 0, type: '5step' }
  },
  endurance: {
    act: { right: 0, left: 0, weight: '5lbs' },
    sts: { value: 0, type: '5x' },
    tls: { value: 0, weight: '1lb' },
    uhr: { right: 0, left: 0 }
  },
  aerobic: {
    tms: 0,
    mwt: { distance: 0, speed: 0, type: '2min' },
    ikd: { ue: 0, le: 0 },
    pws: { right: 0, left: 0 }
  },
  power: {
    bicep: { rm: 0, pp: 0 },
    tricep: { rm: 0, pp: 0 },
    back: { rm: 0, pp: 0 },
    chest: { rm: 0, pp: 0 },
    knee: { rm: 0, pp: 0 },
    calf: { rm: 0, pp: 0 },
    leg: { rm: 0, pp: 0 },
    hip: {
      right: { rm: 0, pp: 0 },
      left: { rm: 0, pp: 0 }
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
    await onSubmit(formData);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        {/* Date Selection */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Visit Date</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select the date of this visit.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <input
                type="date"
                value={formData.date instanceof Timestamp ? formData.date.toDate().toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date: Timestamp.fromDate(new Date(e.target.value))
                }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <ClinimetricsSection 
          data={formData.clinimetrics!}
          onChange={(data) => updateSection('clinimetrics', data)}
        />

        <FlexibilitySection 
          data={formData.flexibility!}
          onChange={(data) => updateSection('flexibility', data)}
        />

        <BalanceSection 
          data={formData.balance!}
          onChange={(data) => updateSection('balance', data)}
        />

        <GaitSection 
          data={formData.gait!}
          onChange={(data) => updateSection('gait', data)}
        />

        <EnduranceSection 
          data={formData.endurance!}
          onChange={(data) => updateSection('endurance', data)}
        />

        <AerobicSection 
          data={formData.aerobic!}
          onChange={(data) => updateSection('aerobic', data)}
        />

        <PowerSection 
          data={formData.power!}
          onChange={(data) => updateSection('power', data)}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Visit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VisitForm; 