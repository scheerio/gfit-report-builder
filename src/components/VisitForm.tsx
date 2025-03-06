import React, { useState, useEffect } from 'react';
import { inputStyles, textareaStyles } from '../styles/common';

interface VisitFormData {
  frt: number;
  ols: { right: number; left: number };
  srt: number;
  pst: { ap: number; ml: number };
  comments: string;
}

interface VisitFormProps {
  initialData?: VisitFormData;  // Make it optional
  onSubmit: (data: VisitFormData) => void;
  loading?: boolean;
  onCancel: () => void;
}

const defaultFormData: VisitFormData = {
  frt: 0,
  ols: { right: 0, left: 0 },
  srt: 0,
  pst: { ap: 0, ml: 0 },
  comments: ''
};

const VisitForm: React.FC<VisitFormProps> = ({ initialData, onSubmit, loading = false, onCancel }) => {
  const [formData, setFormData] = useState<VisitFormData>(initialData || defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'ols' || parent === 'pst') {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: Number(value)
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'comments' ? value : Number(value)
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Visit Measurements</h3>
          <p className="mt-1 text-sm text-gray-500">Enter the patient's test results.</p>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label htmlFor="frt" className="block text-sm font-medium text-gray-700">
              FRT Score
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="frt"
                id="frt"
                value={formData.frt}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ols.right" className="block text-sm font-medium text-gray-700">
              OLS Right
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="ols.right"
                id="ols.right"
                value={formData.ols.right}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ols.left" className="block text-sm font-medium text-gray-700">
              OLS Left
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="ols.left"
                id="ols.left"
                value={formData.ols.left}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="srt" className="block text-sm font-medium text-gray-700">
              SRT Score
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="srt"
                id="srt"
                value={formData.srt}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="pst.ap" className="block text-sm font-medium text-gray-700">
              PST AP
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="pst.ap"
                id="pst.ap"
                value={formData.pst.ap}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="pst.ml" className="block text-sm font-medium text-gray-700">
              PST ML
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="pst.ml"
                id="pst.ml"
                value={formData.pst.ml}
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
                value={formData.comments}
                onChange={handleChange}
                className={textareaStyles}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VisitForm; 