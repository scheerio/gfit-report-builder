import React from 'react';

interface GaitSectionProps {
  data: {
    tug: number;
    ncw: number;
    gst: { value: number; type: '6meter' | '30meter' | '45meter' };
    sct: { value: number; type: '5step' | '20step' };
    comments: string;
  };
  onChange: (data: GaitSectionProps['data']) => void;
}

const GaitSection: React.FC<GaitSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleGSTChange = (field: 'value' | 'type', value: any) => {
    onChange({
      ...data,
      gst: {
        ...data.gst,
        [field]: value
      }
    });
  };

  const handleSCTChange = (field: 'value' | 'type', value: any) => {
    onChange({
      ...data,
      sct: {
        ...data.sct,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Gait & Locomotion
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* TUG - Timed Up-and-Go */}
          <div>
            <label htmlFor="tug" className="block text-sm font-medium text-gray-700">
              Timed Up-and-Go (sec)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="tug"
                value={data.tug}
                onChange={(e) => handleChange('tug', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* NCW - Narrow Corridor Walk */}
          <div>
            <label htmlFor="ncw" className="block text-sm font-medium text-gray-700">
              Narrow Corridor Walk (% change)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="ncw"
                value={data.ncw}
                onChange={(e) => handleChange('ncw', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* GST - Gait Speed Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gait Speed Test (meters/sec)
            </label>
            <div className="mt-1 space-y-2">
              <input
                type="number"
                step="0.1"
                id="gst-value"
                value={data.gst.value}
                onChange={(e) => handleGSTChange('value', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <select
                id="gst-type"
                value={data.gst.type}
                onChange={(e) => handleGSTChange('type', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="6meter">6 meter</option>
                <option value="30meter">30 meter</option>
                <option value="45meter">45 meter</option>
              </select>
            </div>
          </div>

          {/* SCT - Stair Climb Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stair Climb Test (sec/step)
            </label>
            <div className="mt-1 space-y-2">
              <input
                type="number"
                step="0.1"
                id="sct-value"
                value={data.sct.value}
                onChange={(e) => handleSCTChange('value', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <select
                id="sct-type"
                value={data.sct.type}
                onChange={(e) => handleSCTChange('type', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="5step">5 step</option>
                <option value="20step">20 step</option>
              </select>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="gait-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="gait-comments"
                rows={3}
                value={data.comments}
                onChange={(e) => handleChange('comments', e.target.value)}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaitSection; 