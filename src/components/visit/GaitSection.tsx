import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles, radioGroupStyles, radioLabelStyles, radioInputStyles } from '../../styles/common';

interface GaitSectionProps {
  data: Visit['gait'];
  onChange?: (data: Partial<Visit['gait']>) => void;
  readOnly?: boolean;
}

type GaitKey = keyof Visit['gait'];

const GaitSection: React.FC<GaitSectionProps> = ({ data, onChange, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['gait'], string];
        if (parent === 'gst' || parent === 'sct') {
          onChange({
            [parent]: {
              ...(data[parent] || {}),
              [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
            }
          });
        }
      } else {
        onChange({ [fieldName as keyof Visit['gait']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['gait'], string];
        if (parent === 'gst' || parent === 'sct') {
          onChange({
            [parent]: {
              ...(data[parent] || {}),
              [child]: child === 'type' ? value : Number(value)
            }
          });
        }
      } else {
        onChange({ [name as keyof Visit['gait']]: Number(value) });
      }
    }
  };

  const isNT = (value: any) => value === 'NT';

  return (
    <SectionContainer 
      title="Gait & Locomotion" 
      description="Record walking and movement assessments."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="tug" className="block text-sm font-medium text-gray-700">
            Timed Up-and-Go (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tug"
              id="tug"
              required
              disabled={readOnly || isNT(data.tug)}
              value={isNT(data.tug) ? '' : (data.tug || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tug) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tug-nt"
                name="tug-nt"
                checked={isNT(data.tug)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tug-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ncw" className="block text-sm font-medium text-gray-700">
            Narrow Corridor Walk (% change)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="ncw"
              id="ncw"
              required
              disabled={readOnly || isNT(data.ncw)}
              value={isNT(data.ncw) ? '' : (data.ncw || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.ncw) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ncw-nt"
                name="ncw-nt"
                checked={isNT(data.ncw)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ncw-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="gst.value" className="block text-sm font-medium text-gray-700">
            Gait Speed Test (meters/sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="gst.value"
              id="gst.value"
              required
              disabled={readOnly || isNT(data.gst?.value)}
              value={isNT(data.gst?.value) ? '' : (data.gst?.value || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.gst?.value) ? 'bg-gray-50' : ''}`}
              step="0.01"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="gst.value-nt"
                name="gst.value-nt"
                checked={isNT(data.gst?.value)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="gst.value-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="6meter"
                checked={data.gst?.type === '6meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              6 meter
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="30meter"
                checked={data.gst?.type === '30meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              30 meter
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="45meter"
                checked={data.gst?.type === '45meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              45 meter
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sct.value" className="block text-sm font-medium text-gray-700">
            Step Climbing Test (steps/min)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="sct.value"
              id="sct.value"
              required
              disabled={readOnly || isNT(data.sct?.value)}
              value={isNT(data.sct?.value) ? '' : (data.sct?.value || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.sct?.value) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sct.value-nt"
                name="sct.value-nt"
                checked={isNT(data.sct?.value)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="sct.value-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sct.type"
                value="5step"
                checked={data.sct?.type === '5step'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              5 Step
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sct.type"
                value="20step"
                checked={data.sct?.type === '20step'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              20 Step
            </label>
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

export default GaitSection; 