import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface EnduranceSectionProps {
  data: Visit['endurance'];
  onChange: (data: Partial<Visit['endurance']>) => void;
}

type EnduranceKey = keyof Visit['endurance'];

const EnduranceSection: React.FC<EnduranceSectionProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <div className="sm:col-span-2">
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
            />
          </div>
        </div>

        <div className="sm:col-span-2">
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
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="act.weight" className="block text-sm font-medium text-gray-700">
            Arm Curl Weight
          </label>
          <div className="mt-1">
            <select
              name="act.weight"
              id="act.weight"
              value={data.act?.weight || '5lbs'}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="5lbs">5 lbs</option>
              <option value="8lbs">8 lbs</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sts.value" className="block text-sm font-medium text-gray-700">
            Sit to Stand (count)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="sts.value"
              id="sts.value"
              value={data.sts?.value || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sts.type" className="block text-sm font-medium text-gray-700">
            Sit to Stand Type
          </label>
          <div className="mt-1">
            <select
              name="sts.type"
              id="sts.type"
              value={data.sts?.type || '5x'}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="5x">5 Repetitions</option>
              <option value="30sec">30 Seconds</option>
            </select>
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
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tls.weight" className="block text-sm font-medium text-gray-700">
            TLS Weight
          </label>
          <div className="mt-1">
            <select
              name="tls.weight"
              id="tls.weight"
              value={data.tls?.weight || '1lb'}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="1lb">1 lb</option>
              <option value="3lbs">3 lbs</option>
              <option value="5lbs">5 lbs</option>
            </select>
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

export default EnduranceSection; 