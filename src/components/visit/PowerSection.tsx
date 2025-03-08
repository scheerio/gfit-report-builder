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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['power'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({ [fieldName as keyof Visit['power']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['power'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ [name as keyof Visit['power']]: Number(value) });
      }
    }
  };

  const isNT = (value: any) => value === 'NT';

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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="bicep.rm"
              id="bicep.rm"
              required
              disabled={readOnly || isNT(data.bicep?.rm)}
              value={isNT(data.bicep?.rm) ? '' : (data.bicep?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.bicep?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bicep.rm-nt"
                name="bicep.rm-nt"
                checked={isNT(data.bicep?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="bicep.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bicep.pp" className="block text-sm font-medium text-gray-700">
            Bicep - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="bicep.pp"
              id="bicep.pp"
              required
              disabled={readOnly || isNT(data.bicep?.pp)}
              value={isNT(data.bicep?.pp) ? '' : (data.bicep?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.bicep?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bicep.pp-nt"
                name="bicep.pp-nt"
                checked={isNT(data.bicep?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="bicep.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tricep.rm" className="block text-sm font-medium text-gray-700">
            Tricep - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tricep.rm"
              id="tricep.rm"
              required
              disabled={readOnly || isNT(data.tricep?.rm)}
              value={isNT(data.tricep?.rm) ? '' : (data.tricep?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tricep?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tricep.rm-nt"
                name="tricep.rm-nt"
                checked={isNT(data.tricep?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tricep.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tricep.pp" className="block text-sm font-medium text-gray-700">
            Tricep - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tricep.pp"
              id="tricep.pp"
              required
              disabled={readOnly || isNT(data.tricep?.pp)}
              value={isNT(data.tricep?.pp) ? '' : (data.tricep?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tricep?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tricep.pp-nt"
                name="tricep.pp-nt"
                checked={isNT(data.tricep?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tricep.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="back.rm" className="block text-sm font-medium text-gray-700">
            Back - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="back.rm"
              id="back.rm"
              required
              disabled={readOnly || isNT(data.back?.rm)}
              value={isNT(data.back?.rm) ? '' : (data.back?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.back?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="back.rm-nt"
                name="back.rm-nt"
                checked={isNT(data.back?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="back.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="back.pp" className="block text-sm font-medium text-gray-700">
            Back - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="back.pp"
              id="back.pp"
              required
              disabled={readOnly || isNT(data.back?.pp)}
              value={isNT(data.back?.pp) ? '' : (data.back?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.back?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="back.pp-nt"
                name="back.pp-nt"
                checked={isNT(data.back?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="back.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="chest.rm" className="block text-sm font-medium text-gray-700">
            Chest - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="chest.rm"
              id="chest.rm"
              required
              disabled={readOnly || isNT(data.chest?.rm)}
              value={isNT(data.chest?.rm) ? '' : (data.chest?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.chest?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="chest.rm-nt"
                name="chest.rm-nt"
                checked={isNT(data.chest?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="chest.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="chest.pp" className="block text-sm font-medium text-gray-700">
            Chest - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="chest.pp"
              id="chest.pp"
              required
              disabled={readOnly || isNT(data.chest?.pp)}
              value={isNT(data.chest?.pp) ? '' : (data.chest?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.chest?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="chest.pp-nt"
                name="chest.pp-nt"
                checked={isNT(data.chest?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="chest.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="knee.rm" className="block text-sm font-medium text-gray-700">
            Knee - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="knee.rm"
              id="knee.rm"
              required
              disabled={readOnly || isNT(data.knee?.rm)}
              value={isNT(data.knee?.rm) ? '' : (data.knee?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.knee?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="knee.rm-nt"
                name="knee.rm-nt"
                checked={isNT(data.knee?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="knee.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="knee.pp" className="block text-sm font-medium text-gray-700">
            Knee - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="knee.pp"
              id="knee.pp"
              required
              disabled={readOnly || isNT(data.knee?.pp)}
              value={isNT(data.knee?.pp) ? '' : (data.knee?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.knee?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="knee.pp-nt"
                name="knee.pp-nt"
                checked={isNT(data.knee?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="knee.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="calf.rm" className="block text-sm font-medium text-gray-700">
            Calf - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="calf.rm"
              id="calf.rm"
              required
              disabled={readOnly || isNT(data.calf?.rm)}
              value={isNT(data.calf?.rm) ? '' : (data.calf?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.calf?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="calf.rm-nt"
                name="calf.rm-nt"
                checked={isNT(data.calf?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="calf.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="calf.pp" className="block text-sm font-medium text-gray-700">
            Calf - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="calf.pp"
              id="calf.pp"
              required
              disabled={readOnly || isNT(data.calf?.pp)}
              value={isNT(data.calf?.pp) ? '' : (data.calf?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.calf?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="calf.pp-nt"
                name="calf.pp-nt"
                checked={isNT(data.calf?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="calf.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="leg.rm" className="block text-sm font-medium text-gray-700">
            Leg - 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="leg.rm"
              id="leg.rm"
              required
              disabled={readOnly || isNT(data.leg?.rm)}
              value={isNT(data.leg?.rm) ? '' : (data.leg?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.leg?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="leg.rm-nt"
                name="leg.rm-nt"
                checked={isNT(data.leg?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="leg.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="leg.pp" className="block text-sm font-medium text-gray-700">
            Leg - Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="leg.pp"
              id="leg.pp"
              required
              disabled={readOnly || isNT(data.leg?.pp)}
              value={isNT(data.leg?.pp) ? '' : (data.leg?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.leg?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="leg.pp-nt"
                name="leg.pp-nt"
                checked={isNT(data.leg?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="leg.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.right.rm" className="block text-sm font-medium text-gray-700">
            Hip - Right 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="hip.right.rm"
              id="hip.right.rm"
              required
              disabled={readOnly || isNT(data.hip?.right?.rm)}
              value={isNT(data.hip?.right?.rm) ? '' : (data.hip?.right?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.hip?.right?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hip.right.rm-nt"
                name="hip.right.rm-nt"
                checked={isNT(data.hip?.right?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hip.right.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.right.pp" className="block text-sm font-medium text-gray-700">
            Hip - Right Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="hip.right.pp"
              id="hip.right.pp"
              required
              disabled={readOnly || isNT(data.hip?.right?.pp)}
              value={isNT(data.hip?.right?.pp) ? '' : (data.hip?.right?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.hip?.right?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hip.right.pp-nt"
                name="hip.right.pp-nt"
                checked={isNT(data.hip?.right?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hip.right.pp-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.left.rm" className="block text-sm font-medium text-gray-700">
            Hip - Left 1RM (lbs)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="hip.left.rm"
              id="hip.left.rm"
              required
              disabled={readOnly || isNT(data.hip?.left?.rm)}
              value={isNT(data.hip?.left?.rm) ? '' : (data.hip?.left?.rm || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.hip?.left?.rm) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hip.left.rm-nt"
                name="hip.left.rm-nt"
                checked={isNT(data.hip?.left?.rm)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hip.left.rm-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="hip.left.pp" className="block text-sm font-medium text-gray-700">
            Hip - Left Peak Power (watts)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="hip.left.pp"
              id="hip.left.pp"
              required
              disabled={readOnly || isNT(data.hip?.left?.pp)}
              value={isNT(data.hip?.left?.pp) ? '' : (data.hip?.left?.pp || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.hip?.left?.pp) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hip.left.pp-nt"
                name="hip.left.pp-nt"
                checked={isNT(data.hip?.left?.pp)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="hip.left.pp-nt" className="ml-2 text-sm text-gray-700">
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
              className={textareaStyles}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PowerSection;