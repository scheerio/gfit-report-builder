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

export const FlexibilitySection: React.FC<FlexibilitySectionProps> = ({ 
  data, 
  onChange,
  readOnly = false 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const fieldName = name.replace('-nt', '');
      if (name.includes('.')) {
        const [parent, child] = fieldName.split('.') as [keyof Visit['flexibility'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: (e.target as HTMLInputElement).checked ? 'NT' : ''
          }
        });
      } else {
        onChange({ [fieldName as keyof Visit['flexibility']]: (e.target as HTMLInputElement).checked ? 'NT' : '' });
      }
    } else if (name === 'comments') {
      onChange({ comments: value });
    } else {
      if (name.includes('.')) {
        const [parent, child] = name.split('.') as [keyof Visit['flexibility'], string];
        const currentParentValue = data[parent] || {};
        onChange({
          [parent]: {
            ...currentParentValue,
            [child]: Number(value)
          }
        });
      } else {
        onChange({ [name as keyof Visit['flexibility']]: Number(value) });
      }
    }
  };

  const isNT = (value: any) => value === 'NT';

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
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pke.right"
              id="pke.right"
              required
              disabled={readOnly || isNT(data.pke?.right)}
              value={isNT(data.pke?.right) ? '' : (data.pke?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pke?.right) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pke.right-nt"
                name="pke.right-nt"
                checked={isNT(data.pke?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pke.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="pke.left" className="block text-sm font-medium text-gray-700">
            Passive Knee Extension - Left (deg)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="pke.left"
              id="pke.left"
              required
              disabled={readOnly || isNT(data.pke?.left)}
              value={isNT(data.pke?.left) ? '' : (data.pke?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.pke?.left) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pke.left-nt"
                name="pke.left-nt"
                checked={isNT(data.pke?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pke.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="csr.right" className="block text-sm font-medium text-gray-700">
            Chair Sit & Reach - Right (in)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="csr.right"
              id="csr.right"
              required
              disabled={readOnly || isNT(data.csr?.right)}
              value={isNT(data.csr?.right) ? '' : (data.csr?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.csr?.right) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="csr.right-nt"
                name="csr.right-nt"
                checked={isNT(data.csr?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="csr.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="csr.left" className="block text-sm font-medium text-gray-700">
            Chair Sit & Reach - Left (in)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="csr.left"
              id="csr.left"
              required
              disabled={readOnly || isNT(data.csr?.left)}
              value={isNT(data.csr?.left) ? '' : (data.csr?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.csr?.left) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="csr.left-nt"
                name="csr.left-nt"
                checked={isNT(data.csr?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="csr.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bst.right" className="block text-sm font-medium text-gray-700">
            Back Scratch Test - Right (in)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="bst.right"
              id="bst.right"
              required
              disabled={readOnly || isNT(data.bst?.right)}
              value={isNT(data.bst?.right) ? '' : (data.bst?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.bst?.right) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bst.right-nt"
                name="bst.right-nt"
                checked={isNT(data.bst?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="bst.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="bst.left" className="block text-sm font-medium text-gray-700">
            Back Scratch Test - Left (in)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="bst.left"
              id="bst.left"
              required
              disabled={readOnly || isNT(data.bst?.left)}
              value={isNT(data.bst?.left) ? '' : (data.bst?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.bst?.left) ? 'bg-gray-50' : ''}`}
              step="0.1"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bst.left-nt"
                name="bst.left-nt"
                checked={isNT(data.bst?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="bst.left-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.right" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Right (deg)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tbr.right"
              id="tbr.right"
              required
              disabled={readOnly || isNT(data.tbr?.right)}
              value={isNT(data.tbr?.right) ? '' : (data.tbr?.right || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tbr?.right) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tbr.right-nt"
                name="tbr.right-nt"
                checked={isNT(data.tbr?.right)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tbr.right-nt" className="ml-2 text-sm text-gray-700">
                NT
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="tbr.left" className="block text-sm font-medium text-gray-700">
            Total Body Rotation - Left (deg)
          </label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              name="tbr.left"
              id="tbr.left"
              required
              disabled={readOnly || isNT(data.tbr?.left)}
              value={isNT(data.tbr?.left) ? '' : (data.tbr?.left || '')}
              onChange={handleChange}
              className={`${inputStyles} ${readOnly || isNT(data.tbr?.left) ? 'bg-gray-50' : ''}`}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="tbr.left-nt"
                name="tbr.left-nt"
                checked={isNT(data.tbr?.left)}
                onChange={handleChange}
                disabled={readOnly}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="tbr.left-nt" className="ml-2 text-sm text-gray-700">
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
              className={`${textareaStyles} ${readOnly ? 'bg-gray-50' : ''}`}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FlexibilitySection;