import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface ClinimetricsSectionProps {
  data: Visit['clinimetrics'];
  onChange?: (data: Partial<Visit['clinimetrics']>) => void;
  readOnly?: boolean;
}

type ClinimetricsKey = keyof Visit['clinimetrics'];

export const ClinimetricsSection: React.FC<ClinimetricsSectionProps> = ({ 
  data, 
  onChange,
  readOnly = false 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['clinimetrics'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          ...data,
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({
          ...data,
          [fieldName as keyof Visit['clinimetrics']]: (e.target as HTMLInputElement).checked ? 'NT' : ''
        });
      }
    } else if (name === 'comments') {
      onChange({ ...data, comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['clinimetrics'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          ...data,
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ ...data, [name as keyof Visit['clinimetrics']]: Number(value) });
      }
    }
  };

  const isNT = (value: number | null | undefined | 'NT'): boolean => {
    return value === 'NT';
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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="bmi"
              id="bmi"
              required
              disabled={readOnly || isNT(data.bmi)}
              value={isNT(data.bmi) ? '' : (data.bmi || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.bmi) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bmi-nt"
                name="bmi-nt"
                checked={isNT(data.bmi)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="bmi-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="twd" className="block text-sm font-medium text-gray-700">
            Tragus Wall Distance (cm)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="twd"
              id="twd"
              required
              disabled={readOnly || isNT(data.twd)}
              value={isNT(data.twd) ? '' : (data.twd || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.twd) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twd-nt"
                name="twd-nt"
                checked={isNT(data.twd)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="twd-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="grip.right" className="block text-sm font-medium text-gray-700">
            Grip Strength - Right (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="grip.right"
              id="grip.right"
              required
              disabled={readOnly || isNT(data.grip?.right)}
              value={isNT(data.grip?.right) ? '' : (data.grip?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.grip?.right) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="grip.right-nt"
                name="grip.right-nt"
                checked={isNT(data.grip?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="grip.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="grip.left" className="block text-sm font-medium text-gray-700">
            Grip Strength - Left (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="grip.left"
              id="grip.left"
              required
              disabled={readOnly || isNT(data.grip?.left)}
              value={isNT(data.grip?.left) ? '' : (data.grip?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.grip?.left) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="grip.left-nt"
                name="grip.left-nt"
                checked={isNT(data.grip?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="grip.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="obp.systolic" className="block text-sm font-medium text-gray-700">
            Orthostatic Blood Pressure - Systolic
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="obp.systolic"
              id="obp.systolic"
              required
              disabled={readOnly || isNT(data.obp?.systolic)}
              value={isNT(data.obp?.systolic) ? '' : (data.obp?.systolic || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.obp?.systolic) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="obp.systolic-nt"
                name="obp.systolic-nt"
                checked={isNT(data.obp?.systolic)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="obp.systolic-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="obp.diastolic" className="block text-sm font-medium text-gray-700">
            Orthostatic Blood Pressure - Diastolic
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="obp.diastolic"
              id="obp.diastolic"
              required
              disabled={readOnly || isNT(data.obp?.diastolic)}
              value={isNT(data.obp?.diastolic) ? '' : (data.obp?.diastolic || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.obp?.diastolic) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="obp.diastolic-nt"
                name="obp.diastolic-nt"
                checked={isNT(data.obp?.diastolic)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="obp.diastolic-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
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
              disabled={readOnly}
              className={`${textareaStyles} ${readOnly ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ClinimetricsSection;