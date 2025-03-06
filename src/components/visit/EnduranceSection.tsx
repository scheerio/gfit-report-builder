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
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof typeof data, string];
      onChange({
        [parent]: {
          ...(data[parent] as object),
          [child]: child === 'type' || child === 'weight' ? value : Number(value)
        }
      });
    } else {
      onChange({ [name as EnduranceKey]: name === 'comments' ? value : Number(value) });
    }
  };

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
          <div className="mt-1">
            <input
              type="number"
              name="act.right"
              id="act.right"
              value={data.act?.right || ''}
              onChange={handleChange}
              className={inputStyles}
              step="1"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="act.left" className="block text-sm font-medium text-gray-700">
            Arm Curl Test - Left (reps)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="act.left"
              id="act.left"
              value={data.act?.left || ''}
              onChange={handleChange}
              className={inputStyles}
              step="1"
              readOnly={readOnly}
            />
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
          <div className="mt-1">
            <input
              type="number"
              name="sts.value"
              id="sts.value"
              value={data.sts?.value || ''}
              onChange={handleChange}
              className={inputStyles}
              step="0.1"
              readOnly={readOnly}
            />
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
          <div className="mt-1">
            <input
              type="number"
              name="tls.value"
              id="tls.value"
              value={data.tls?.value || ''}
              onChange={handleChange}
              className={inputStyles}
              step="1"
              readOnly={readOnly}
            />
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
          <div className="mt-1">
            <input
              type="number"
              name="uhr.right"
              id="uhr.right"
              value={data.uhr?.right || ''}
              onChange={handleChange}
              className={inputStyles}
              step="1"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="uhr.left" className="block text-sm font-medium text-gray-700">
            Unilateral Heel Rise - Left (reps)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="uhr.left"
              id="uhr.left"
              value={data.uhr?.left || ''}
              onChange={handleChange}
              className={inputStyles}
              step="1"
              readOnly={readOnly}
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

export default EnduranceSection; 