import React from 'react';
import { Visit } from '../../types/Visit';
import SectionContainer from './SectionContainer';
import { inputStyles, textareaStyles } from '../../styles/common';

interface FlexibilitySectionProps {
  data: Visit['flexibility'];
  onChange?: (data: Partial<Visit['flexibility']>) => void;
  readOnly?: boolean;
}

type FlexibilityKey = keyof Visit['flexibility'];

const FlexibilitySection: React.FC<FlexibilitySectionProps> = ({ 
  data, 
  onChange,
  readOnly = false 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
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
              required
              value={data.pke?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
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
              required
              value={data.pke?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
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
              required
              value={data.csr?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
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
              required
              value={data.csr?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
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
              required
              value={data.bst?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
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
              required
              value={data.bst?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.right" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Right (deg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tbr.right"
              id="tbr.right"
              required
              value={data.tbr?.right || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.left" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Left (deg)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="tbr.left"
              id="tbr.left"
              required
              value={data.tbr?.left || ''}
              onChange={handleChange}
              disabled={readOnly}
              className={`${inputStyles} ${readOnly ? 'bg-gray-50' : ''}`}
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
              disabled={readOnly}
              className={`${textareaStyles} ${readOnly ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FlexibilitySection; 