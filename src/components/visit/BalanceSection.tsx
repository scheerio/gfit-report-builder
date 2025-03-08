import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface BalanceSectionProps {
  data: Visit['balance'];
  onChange?: (data: Partial<Visit['balance']>) => void;
  readOnly?: boolean;
}

type BalanceKey = keyof Visit['balance'];

const BalanceSection: React.FC<BalanceSectionProps> = ({ data, onChange, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
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
      onChange({ [name as BalanceKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="Balance" 
      description="Record balance and stability measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="frt" className="block text-sm font-medium text-gray-700">
            Functional Reach Test (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="frt"
              id="frt"
              required
              value={data.frt || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ols.right" className="block text-sm font-medium text-gray-700">
            One Leg Stance - Right (sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="ols.right"
              id="ols.right"
              required
              value={data.ols?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ols.left" className="block text-sm font-medium text-gray-700">
            One Leg Stance - Left (sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="ols.left"
              id="ols.left"
              required
              value={data.ols?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="srt" className="block text-sm font-medium text-gray-700">
            Step Reaction Time (ms)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="srt"
              id="srt"
              required
              value={data.srt || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pst.ap" className="block text-sm font-medium text-gray-700">
            Postural Sway Test - AP (mm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pst.ap"
              id="pst.ap"
              required
              value={data.pst?.ap || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pst.ml" className="block text-sm font-medium text-gray-700">
            Postural Sway Test - ML (mm)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pst.ml"
              id="pst.ml"
              required
              value={data.pst?.ml || ''}
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

export default BalanceSection; 