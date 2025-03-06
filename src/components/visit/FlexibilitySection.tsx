import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface FlexibilitySectionProps {
  data: Visit['flexibility'];
  onChange: (data: Partial<Visit['flexibility']>) => void;
}

type FlexibilityKey = keyof Visit['flexibility'];

const FlexibilitySection: React.FC<FlexibilitySectionProps> = ({ data, onChange }) => {
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
      onChange({ [name as FlexibilityKey]: name === 'comments' ? value : Number(value) });
    }
  };

  return (
    <SectionContainer 
      title="ROM & Flexibility" 
      description="Record range of motion and flexibility measurements."
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="pke.right" className="block text-sm font-medium text-gray-700">
            Passive Knee Extension - Right (deg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pke.right"
              id="pke.right"
              value={data.pke?.right || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pke.left" className="block text-sm font-medium text-gray-700">
            Passive Knee Extension - Left (deg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="pke.left"
              id="pke.left"
              value={data.pke?.left || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="csr.right" className="block text-sm font-medium text-gray-700">
            Chair Sit & Reach - Right (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="csr.right"
              id="csr.right"
              value={data.csr?.right || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="csr.left" className="block text-sm font-medium text-gray-700">
            Chair Sit & Reach - Left (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="csr.left"
              id="csr.left"
              value={data.csr?.left || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bst.right" className="block text-sm font-medium text-gray-700">
            Back Scratch Test - Right (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="bst.right"
              id="bst.right"
              value={data.bst?.right || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bst.left" className="block text-sm font-medium text-gray-700">
            Back Scratch Test - Left (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="bst.left"
              id="bst.left"
              value={data.bst?.left || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.right" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Right (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tbr.right"
              id="tbr.right"
              value={data.tbr?.right || ''}
              onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.left" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Left (in)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tbr.left"
              id="tbr.left"
              value={data.tbr?.left || ''}
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

export default FlexibilitySection; 