import React from 'react';

interface ClinimetricsSectionProps {
  data: {
    bmi: number;
    twd: number;
    grip: {
      right: number;
      left: number;
    };
    obp: {
      systolic: number;
      diastolic: number;
    };
    comments: string;
  };
  onChange: (data: ClinimetricsSectionProps['data']) => void;
}

const ClinimetricsSection: React.FC<ClinimetricsSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleGripChange = (side: 'right' | 'left', value: number) => {
    onChange({
      ...data,
      grip: {
        ...data.grip,
        [side]: value
      }
    });
  };

  const handleOBPChange = (type: 'systolic' | 'diastolic', value: number) => {
    onChange({
      ...data,
      obp: {
        ...data.obp,
        [type]: value
      }
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Clinimetrics
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bmi" className="block text-sm font-medium text-gray-700">
              Body Mass Index (BMI)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="bmi"
                value={data.bmi}
                onChange={(e) => handleChange('bmi', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="twd" className="block text-sm font-medium text-gray-700">
              Tragus Wall Distance (cm)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="twd"
                value={data.twd}
                onChange={(e) => handleChange('twd', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grip Strength (lbs)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="grip-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  id="grip-right"
                  value={data.grip.right}
                  onChange={(e) => handleGripChange('right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="grip-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  id="grip-left"
                  value={data.grip.left}
                  onChange={(e) => handleGripChange('left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Orthostatic Blood Pressure (mmHg)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="obp-systolic" className="block text-sm text-gray-500">
                  Systolic
                </label>
                <input
                  type="number"
                  id="obp-systolic"
                  value={data.obp.systolic}
                  onChange={(e) => handleOBPChange('systolic', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="obp-diastolic" className="block text-sm text-gray-500">
                  Diastolic
                </label>
                <input
                  type="number"
                  id="obp-diastolic"
                  value={data.obp.diastolic}
                  onChange={(e) => handleOBPChange('diastolic', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="comments"
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

export default ClinimetricsSection; 