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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['aerobic'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({ [fieldName as keyof Visit['aerobic']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['aerobic'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ [name as keyof Visit['aerobic']]: Number(value) });
      }
    }
  };

  const isNT = (value: any) => value === 'NT';

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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tms"
              id="tms"
              required
              disabled={readOnly || isNT(data.tms)}
              value={isNT(data.tms) ? '' : (data.tms || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tms) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tms-nt"
                name="tms-nt"
                checked={isNT(data.tms)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tms-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="mwt.distance" className="block text-sm font-medium text-gray-700">
            Walk Test Distance (meters)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="mwt.distance"
              id="mwt.distance"
              required
              disabled={readOnly || isNT(data.mwt?.distance)}
              value={isNT(data.mwt?.distance) ? '' : (data.mwt?.distance || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.mwt?.distance) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mwt.distance-nt"
                name="mwt.distance-nt"
                checked={isNT(data.mwt?.distance)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="mwt.distance-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="mwt.speed" className="block text-sm font-medium text-gray-700">
            Walk Test Speed (meters/sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="mwt.speed"
              id="mwt.speed"
              required
              disabled={readOnly || isNT(data.mwt?.speed)}
              value={isNT(data.mwt?.speed) ? '' : (data.mwt?.speed || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.mwt?.speed) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mwt.speed-nt"
                name="mwt.speed-nt"
                checked={isNT(data.mwt?.speed)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="mwt.speed-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="ikd.ue"
              id="ikd.ue"
              required
              disabled={readOnly || isNT(data.ikd?.ue)}
              value={isNT(data.ikd?.ue) ? '' : (data.ikd?.ue || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.ikd?.ue) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ikd.ue-nt"
                name="ikd.ue-nt"
                checked={isNT(data.ikd?.ue)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ikd.ue-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ikd.le" className="block text-sm font-medium text-gray-700">
            Isokinetics - LE
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="ikd.le"
              id="ikd.le"
              required
              disabled={readOnly || isNT(data.ikd?.le)}
              value={isNT(data.ikd?.le) ? '' : (data.ikd?.le || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.ikd?.le) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ikd.le-nt"
                name="ikd.le-nt"
                checked={isNT(data.ikd?.le)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="ikd.le-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pws.right" className="block text-sm font-medium text-gray-700">
            Partial Wall Sit - Right (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pws.right"
              id="pws.right"
              required
              disabled={readOnly || isNT(data.pws?.right)}
              value={isNT(data.pws?.right) ? '' : (data.pws?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pws?.right) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pws.right-nt"
                name="pws.right-nt"
                checked={isNT(data.pws?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pws.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pws.left" className="block text-sm font-medium text-gray-700">
            Partial Wall Sit - Left (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pws.left"
              id="pws.left"
              required
              disabled={readOnly || isNT(data.pws?.left)}
              value={isNT(data.pws?.left) ? '' : (data.pws?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pws?.left) ? 'bg-gray-50' : ''}`}
              step="1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pws.left-nt"
                name="pws.left-nt"
                checked={isNT(data.pws?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pws.left-nt" className="ml-2 text-sm text-gray-700">
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

export default AerobicSection; 