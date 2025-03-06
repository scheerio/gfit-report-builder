import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface GaitSectionProps {
  data: Visit['gait'];
  onChange: (data: Partial<Visit['gait']>) => void;
}

type GaitKey = keyof Visit['gait'];

const GaitSection: React.FC<GaitSectionProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="gst.type" className="block text-sm font-medium text-gray-700">
            Gait Speed Test Type
          </label>
          <div className="mt-1">
            <select
              name="gst.type"
              id="gst.type"
              value={data.gst?.type || '6meter'}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="6meter">6 Meter</option>
              <option value="30meter">30 Meter</option>
              <option value="45meter">45 Meter</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sct.value" className="block text-sm font-medium text-gray-700">
            Stair Climb Test (sec/step)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="sct.value"
              id="sct.value"
              value={data.sct?.value || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="sct.type" className="block text-sm font-medium text-gray-700">
            Stair Climb Test Type
          </label>
          <div className="mt-1">
            <select
              name="sct.type"
              id="sct.type"
              value={data.sct?.type || '5step'}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="5step">5 Step</option>
              <option value="20step">20 Step</option>
            </select>
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

export default GaitSection; 