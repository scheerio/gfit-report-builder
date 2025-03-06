import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface ClinimetricsSectionProps {
  data: Visit['clinimetrics'];
  onChange: (data: Partial<Visit['clinimetrics']>) => void;
}

type ClinimetricsKey = keyof Visit['clinimetrics'];

const ClinimetricsSection: React.FC<ClinimetricsSectionProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof typeof data, string];
      onChange({
        [parent]: {
          ...(data[parent] as object),
          [child]: Number(value)
        }
      });
    } else {
      onChange({ [name as ClinimetricsKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="Clinimetrics" 
      description="Record body mass, wall distance, grip strength, and blood pressure measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
            Body Mass Index (BMI)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="bmi"
              id="bmi"
              value={data.bmi || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="twd" className="block text-sm font-medium text-gray-700">
            Tragus Wall Distance (cm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="twd"
              id="twd"
              value={data.twd || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="grip.right" className="block text-sm font-medium text-gray-700">
            Grip Strength - Right (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="grip.right"
              id="grip.right"
              value={data.grip?.right || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="grip.left" className="block text-sm font-medium text-gray-700">
            Grip Strength - Left (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="grip.left"
              id="grip.left"
              value={data.grip?.left || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="obp.systolic" className="block text-sm font-medium text-gray-700">
            Blood Pressure - Systolic (mmHg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="obp.systolic"
              id="obp.systolic"
              value={data.obp?.systolic || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="obp.diastolic" className="block text-sm font-medium text-gray-700">
            Blood Pressure - Diastolic (mmHg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="obp.diastolic"
              id="obp.diastolic"
              value={data.obp?.diastolic || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <div className="mt-1">
            <textarea
              id="comments"
              name="comments"
              rows={3}
              value={data.comments || ''}
              onChange={handleChange}
              className={textareaStyles}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ClinimetricsSection; 