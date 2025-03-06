import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles, radioGroupStyles, radioLabelStyles, radioInputStyles } from '../../styles/common';

interface GaitSectionProps {
  data: Visit['gait'];
  onChange?: (data: Partial<Visit['gait']>) => void;
  readOnly?: boolean;
}

type GaitKey = keyof Visit['gait'];

const GaitSection: React.FC<GaitSectionProps> = ({ data, onChange, readOnly }) => {
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
      onChange({ [name as GaitKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="Gait & Locomotion" 
      description="Record walking and movement assessments."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="tug" className="block text-sm font-medium text-gray-700">
            Timed Up-and-Go (sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tug"
              id="tug"
              value={data.tug || ''}
              onChange={handleChange}
              className={inputStyles}
              step="0.1"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="ncw" className="block text-sm font-medium text-gray-700">
            Narrow Corridor Walk (% change)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="ncw"
              id="ncw"
              value={data.ncw || ''}
              onChange={handleChange}
              className={inputStyles}
              step="0.1"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="gst.value" className="block text-sm font-medium text-gray-700">
            Gait Speed Test (meters/sec)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="gst.value"
              id="gst.value"
              value={data.gst?.value || ''}
              onChange={handleChange}
              className={inputStyles}
              step="0.01"
              readOnly={readOnly}
            />
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="6meter"
                checked={data.gst?.type === '6meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              6 meter
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="30meter"
                checked={data.gst?.type === '30meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              30 meter
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="gst.type"
                value="45meter"
                checked={data.gst?.type === '45meter'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              45 meter
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sct.value" className="block text-sm font-medium text-gray-700">
            Stair Climb (sec/step)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="sct.value"
              id="sct.value"
              value={data.sct?.value || ''}
              onChange={handleChange}
              className={inputStyles}
              step="0.01"
              readOnly={readOnly}
            />
          </div>
          <div className={radioGroupStyles}>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sct.type"
                value="5step"
                checked={data.sct?.type === '5step'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              5 Step
            </label>
            <label className={radioLabelStyles}>
              <input
                type="radio"
                name="sct.type"
                value="20step"
                checked={data.sct?.type === '20step'}
                onChange={handleChange}
                className={radioInputStyles}
                readOnly={readOnly}
              />
              20 Step
            </label>
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

export default GaitSection; 