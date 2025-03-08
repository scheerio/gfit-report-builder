import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles, radioGroupStyles, radioLabelStyles, radioInputStyles } from '../../styles/common';

interface AerobicSectionProps {
  data: Visit['aerobic'];
  onChange?: (data: Partial<Visit['aerobic']>) => void;
  readOnly?: boolean;
}

type AerobicKey = keyof Visit['aerobic'];

const AerobicSection: React.FC<AerobicSectionProps> = ({ data, onChange, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof typeof data, string];
      onChange({
        [parent]: {
          ...(data[parent] as object),
          [child]: child === 'type' ? value : Number(value)
        }
      });
    } else {
      onChange({ [name as AerobicKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="Aerobic & Endurance" 
      description="Record aerobic capacity and endurance measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="tms" className="block text-sm font-medium text-gray-700">
            Two Minute Step (# steps)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tms"
              id="tms"
              required
              value={data.tms || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="mwt.distance" className="block text-sm font-medium text-gray-700">
            Walk Test Distance (meters)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="mwt.distance"
              id="mwt.distance"
              required
              value={data.mwt?.distance || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="mwt.speed" className="block text-sm font-medium text-gray-700">
            Walk Test Speed (meters/sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="mwt.speed"
              id="mwt.speed"
              required
              value={data.mwt?.speed || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="mwt.type"
                value="2min"
                checked={data.mwt?.type === '2min'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              2 min
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="mwt.type"
                value="6min"
                checked={data.mwt?.type === '6min'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              6 min
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ikd.ue" className="block text-sm font-medium text-gray-700">
            Isokinetics - UE
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="ikd.ue"
              id="ikd.ue"
              required
              value={data.ikd?.ue || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ikd.le" className="block text-sm font-medium text-gray-700">
            Isokinetics - LE
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="ikd.le"
              id="ikd.le"
              required
              value={data.ikd?.le || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pws.right" className="block text-sm font-medium text-gray-700">
            Partial Wall Sit - Right (sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pws.right"
              id="pws.right"
              required
              value={data.pws?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pws.left" className="block text-sm font-medium text-gray-700">
            Partial Wall Sit - Left (sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pws.left"
              id="pws.left"
              required
              value={data.pws?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
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
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AerobicSection; 