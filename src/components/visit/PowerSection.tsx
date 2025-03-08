import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface PowerSectionProps {
  data: Visit['power'];
  onChange?: (data: Partial<Visit['power']>) => void;
  readOnly?: boolean;
}

type PowerKey = keyof Visit['power'];

const PowerSection: React.FC<PowerSectionProps> = ({ data, onChange, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.') as [keyof typeof data, string, string | undefined];
      if (subChild) {
        onChange({
          [parent]: {
            ...(data[parent] as object),
            [child]: {
              ...(data[parent] as any)?.[child],
              [subChild]: Number(value)
            }
          }
        });
      } else {
        onChange({
          [parent]: {
            ...(data[parent] as object),
            [child]: Number(value)
          }
        });
      }
    } else {
      onChange({ [name as PowerKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="Muscle Performance - Power" 
      description="Record 1 Rep Max (lbs) and Peak Power (watts) measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="bicep.rm" className="block text-sm font-medium text-gray-700">
            Bicep - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="bicep.rm"
              id="bicep.rm"
              required
              value={data.bicep?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bicep.pp" className="block text-sm font-medium text-gray-700">
            Bicep - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="bicep.pp"
              id="bicep.pp"
              required
              value={data.bicep?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tricep.rm" className="block text-sm font-medium text-gray-700">
            Tricep - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tricep.rm"
              id="tricep.rm"
              required
              value={data.tricep?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tricep.pp" className="block text-sm font-medium text-gray-700">
            Tricep - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tricep.pp"
              id="tricep.pp"
              required
              value={data.tricep?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="back.rm" className="block text-sm font-medium text-gray-700">
            Back - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="back.rm"
              id="back.rm"
              required
              value={data.back?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="back.pp" className="block text-sm font-medium text-gray-700">
            Back - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="back.pp"
              id="back.pp"
              required
              value={data.back?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="chest.rm" className="block text-sm font-medium text-gray-700">
            Chest - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="chest.rm"
              id="chest.rm"
              required
              value={data.chest?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="chest.pp" className="block text-sm font-medium text-gray-700">
            Chest - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="chest.pp"
              id="chest.pp"
              required
              value={data.chest?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="knee.rm" className="block text-sm font-medium text-gray-700">
            Knee - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="knee.rm"
              id="knee.rm"
              required
              value={data.knee?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="knee.pp" className="block text-sm font-medium text-gray-700">
            Knee - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="knee.pp"
              id="knee.pp"
              required
              value={data.knee?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="calf.rm" className="block text-sm font-medium text-gray-700">
            Calf - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="calf.rm"
              id="calf.rm"
              required
              value={data.calf?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="calf.pp" className="block text-sm font-medium text-gray-700">
            Calf - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="calf.pp"
              id="calf.pp"
              required
              value={data.calf?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="leg.rm" className="block text-sm font-medium text-gray-700">
            Leg - 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="leg.rm"
              id="leg.rm"
              required
              value={data.leg?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="leg.pp" className="block text-sm font-medium text-gray-700">
            Leg - Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="leg.pp"
              id="leg.pp"
              required
              value={data.leg?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.right.rm" className="block text-sm font-medium text-gray-700">
            Hip - Right 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="hip.right.rm"
              id="hip.right.rm"
              required
              value={data.hip?.right?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.right.pp" className="block text-sm font-medium text-gray-700">
            Hip - Right Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="hip.right.pp"
              id="hip.right.pp"
              required
              value={data.hip?.right?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.left.rm" className="block text-sm font-medium text-gray-700">
            Hip - Left 1RM (lbs)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="hip.left.rm"
              id="hip.left.rm"
              required
              value={data.hip?.left?.rm || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.left.pp" className="block text-sm font-medium text-gray-700">
            Hip - Left Peak Power (watts)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="hip.left.pp"
              id="hip.left.pp"
              required
              value={data.hip?.left?.pp || ''}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="1"
              disabled={readOnly}
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
              disabled={readOnly}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PowerSection; 