import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface BalanceSectionProps {
  data: Visit['balance'];
  onChange: (data: Partial<Visit['balance']>) => void;
}

type BalanceKey = keyof Visit['balance'];

const BalanceSection: React.FC<BalanceSectionProps> = ({ data, onChange }) => {
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
              value={data.frt || ''}
              onChange={handleChange}
              className={inputStyles}
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
              value={data.ols?.right || ''}
              onChange={handleChange}
              className={inputStyles}
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
              value={data.ols?.left || ''}
              onChange={handleChange}
              className={inputStyles}
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
              value={data.srt || ''}
              onChange={handleChange}
              className={inputStyles}
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
              value={data.pst?.ap || ''}
              onChange={handleChange}
              className={inputStyles}
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
              value={data.pst?.ml || ''}
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

export default BalanceSection; 