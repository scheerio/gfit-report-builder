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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['balance'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({ [fieldName as keyof Visit['balance']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['balance'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ [name as keyof Visit['balance']]: Number(value) });
      }
    }
  };

  const isNT = (value: number | null | undefined | 'NT'): boolean => {
    return value === 'NT';
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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="frt"
              id="frt"
              required
              disabled={readOnly || isNT(data.frt)}
              value={isNT(data.frt) ? '' : (data.frt || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.frt) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="frt-nt"
                name="frt-nt"
                checked={isNT(data.frt)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="frt-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ols.right" className="block text-sm font-medium text-gray-700">
            One Leg Stance - Right (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="ols.right"
              id="ols.right"
              required
              disabled={readOnly || isNT(data.ols?.right)}
              value={isNT(data.ols?.right) ? '' : (data.ols?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.ols?.right) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ols.right-nt"
                name="ols.right-nt"
                checked={isNT(data.ols?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ols.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ols.left" className="block text-sm font-medium text-gray-700">
            One Leg Stance - Left (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="ols.left"
              id="ols.left"
              required
              disabled={readOnly || isNT(data.ols?.left)}
              value={isNT(data.ols?.left) ? '' : (data.ols?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.ols?.left) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ols.left-nt"
                name="ols.left-nt"
                checked={isNT(data.ols?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ols.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="srt" className="block text-sm font-medium text-gray-700">
            Step Reaction Time (ms)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="srt"
              id="srt"
              required
              disabled={readOnly || isNT(data.srt)}
              value={isNT(data.srt) ? '' : (data.srt || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.srt) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="srt-nt"
                name="srt-nt"
                checked={isNT(data.srt)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="srt-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pst.ap" className="block text-sm font-medium text-gray-700">
            Postural Sway Test - AP (mm)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pst.ap"
              id="pst.ap"
              required
              disabled={readOnly || isNT(data.pst?.ap)}
              value={isNT(data.pst?.ap) ? '' : (data.pst?.ap || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pst?.ap) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pst.ap-nt"
                name="pst.ap-nt"
                checked={isNT(data.pst?.ap)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pst.ap-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pst.ml" className="block text-sm font-medium text-gray-700">
            Postural Sway Test - ML (mm)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pst.ml"
              id="pst.ml"
              required
              disabled={readOnly || isNT(data.pst?.ml)}
              value={isNT(data.pst?.ml) ? '' : (data.pst?.ml || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pst?.ml) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pst.ml-nt"
                name="pst.ml-nt"
                checked={isNT(data.pst?.ml)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pst.ml-nt" className="ml-2 text-sm text-gray-700">
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