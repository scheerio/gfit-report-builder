import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles, radioGroupStyles, radioLabelStyles, radioInputStyles } from '../../styles/common';

interface EnduranceSectionProps {
  data: Visit['endurance'];
  onChange?: (data: Partial<Visit['endurance']>) => void;
  readOnly?: boolean;
}

type EnduranceKey = keyof Visit['endurance'];

const EnduranceSection: React.FC<EnduranceSectionProps> = ({ data, onChange, readOnly }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['endurance'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({ [fieldName as keyof Visit['endurance']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['endurance'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ [name as keyof Visit['endurance']]: Number(value) });
      }
    }
  };

  const isNT = (value: any) => value === 'NT';

  return (
    <SectionContainer 
      title="Muscle Performance - Endurance" 
      description="Record muscle endurance measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="act.right" className="block text-sm font-medium text-gray-700">
            Arm Curl Test - Right (reps)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="act.right"
              id="act.right"
              required
              disabled={readOnly || isNT(data.act?.right)}
              value={isNT(data.act?.right) ? '' : (data.act?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.act?.right) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="act.right-nt"
                name="act.right-nt"
                checked={isNT(data.act?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="act.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="act.left" className="block text-sm font-medium text-gray-700">
            Arm Curl Test - Left (reps)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="act.left"
              id="act.left"
              required
              disabled={readOnly || isNT(data.act?.left)}
              value={isNT(data.act?.left) ? '' : (data.act?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.act?.left) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="act.left-nt"
                name="act.left-nt"
                checked={isNT(data.act?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="act.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Arm Curl Weight
          </label>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="act.weight"
                value="5lbs"
                checked={data.act?.weight === '5lbs'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              5 lbs
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="act.weight"
                value="8lbs"
                checked={data.act?.weight === '8lbs'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              8 lbs
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sts.value" className="block text-sm font-medium text-gray-700">
            Sit to Stand
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="sts.value"
              id="sts.value"
              required
              disabled={readOnly || isNT(data.sts?.value)}
              value={isNT(data.sts?.value) ? '' : (data.sts?.value || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.sts?.value) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sts.value-nt"
                name="sts.value-nt"
                checked={isNT(data.sts?.value)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="sts.value-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sts.type"
                value="5x"
                checked={data.sts?.type === '5x'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              5x (seconds)
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sts.type"
                value="30sec"
                checked={data.sts?.type === '30sec'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              30 sec (reps)
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tls.value" className="block text-sm font-medium text-gray-700">
            Timed Loaded Standing (sec)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tls.value"
              id="tls.value"
              required
              disabled={readOnly || isNT(data.tls?.value)}
              value={isNT(data.tls?.value) ? '' : (data.tls?.value || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tls?.value) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tls.value-nt"
                name="tls.value-nt"
                checked={isNT(data.tls?.value)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tls.value-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="tls.weight"
                value="1lb"
                checked={data.tls?.weight === '1lb'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              1 lb
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="tls.weight"
                value="3lbs"
                checked={data.tls?.weight === '3lbs'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              3 lbs
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="tls.weight"
                value="5lbs"
                checked={data.tls?.weight === '5lbs'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              5 lbs
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="uhr.right" className="block text-sm font-medium text-gray-700">
            Unilateral Heel Rise - Right (reps)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="uhr.right"
              id="uhr.right"
              required
              disabled={readOnly || isNT(data.uhr?.right)}
              value={isNT(data.uhr?.right) ? '' : (data.uhr?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.uhr?.right) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="uhr.right-nt"
                name="uhr.right-nt"
                checked={isNT(data.uhr?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="uhr.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="uhr.left" className="block text-sm font-medium text-gray-700">
            Unilateral Heel Rise - Left (reps)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="uhr.left"
              id="uhr.left"
              required
              disabled={readOnly || isNT(data.uhr?.left)}
              value={isNT(data.uhr?.left) ? '' : (data.uhr?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.uhr?.left) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="uhr.left-nt"
                name="uhr.left-nt"
                checked={isNT(data.uhr?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="uhr.left-nt" className="ml-2 text-sm text-gray-700">
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

export default EnduranceSection; 