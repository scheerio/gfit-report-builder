import React from 'react';

interface EnduranceSectionProps {
  data: {
    act: { right: number; left: number; weight: '5lbs' | '8lbs' };
    sts: { value: number; type: '5x' | '30sec' };
    tls: { value: number; weight: '1lb' | '3lbs' | '5lbs' };
    uhr: { right: number; left: number };
    comments: string;
  };
  onChange: (data: EnduranceSectionProps['data']) => void;
}

const EnduranceSection: React.FC<EnduranceSectionProps> = ({ data, onChange }) => {
  const handleACTChange = (field: 'right' | 'left' | 'weight', value: any) => {
    onChange({
      ...data,
      act: {
        ...data.act,
        [field]: value
      }
    });
  };

  const handleSTSChange = (field: 'value' | 'type', value: any) => {
    onChange({
      ...data,
      sts: {
        ...data.sts,
        [field]: value
      }
    });
  };

  const handleTLSChange = (field: 'value' | 'weight', value: any) => {
    onChange({
      ...data,
      tls: {
        ...data.tls,
        [field]: value
      }
    });
  };

  const handleUHRChange = (side: 'right' | 'left', value: number) => {
    onChange({
      ...data,
      uhr: {
        ...data.uhr,
        [side]: value
      }
    });
  };

  const handleCommentsChange = (value: string) => {
    onChange({
      ...data,
      comments: value
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Muscle Performance - Endurance
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* ACT - Arm Curl Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arm Curl Test (reps)
            </label>
            <div className="mt-1 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="act-right" className="block text-sm text-gray-500">
                    Right
                  </label>
                  <input
                    type="number"
                    id="act-right"
                    value={data.act.right}
                    onChange={(e) => handleACTChange('right', parseFloat(e.target.value))}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="act-left" className="block text-sm text-gray-500">
                    Left
                  </label>
                  <input
                    type="number"
                    id="act-left"
                    value={data.act.left}
                    onChange={(e) => handleACTChange('left', parseFloat(e.target.value))}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <select
                id="act-weight"
                value={data.act.weight}
                onChange={(e) => handleACTChange('weight', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="5lbs">5 lbs</option>
                <option value="8lbs">8 lbs</option>
              </select>
            </div>
          </div>

          {/* STS - Sit to Stand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sit to Stand
            </label>
            <div className="mt-1 space-y-2">
              <input
                type="number"
                id="sts-value"
                value={data.sts.value}
                onChange={(e) => handleSTSChange('value', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <select
                id="sts-type"
                value={data.sts.type}
                onChange={(e) => handleSTSChange('type', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="5x">5 repetitions</option>
                <option value="30sec">30 seconds</option>
              </select>
            </div>
          </div>

          {/* TLS - Timed Loaded Standing */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timed Loaded Standing (sec)
            </label>
            <div className="mt-1 space-y-2">
              <input
                type="number"
                step="0.1"
                id="tls-value"
                value={data.tls.value}
                onChange={(e) => handleTLSChange('value', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <select
                id="tls-weight"
                value={data.tls.weight}
                onChange={(e) => handleTLSChange('weight', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="1lb">1 lb</option>
                <option value="3lbs">3 lbs</option>
                <option value="5lbs">5 lbs</option>
              </select>
            </div>
          </div>

          {/* UHR - Unilateral Heel Rise */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Unilateral Heel Rise (reps)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="uhr-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  id="uhr-right"
                  value={data.uhr.right}
                  onChange={(e) => handleUHRChange('right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="uhr-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  id="uhr-left"
                  value={data.uhr.left}
                  onChange={(e) => handleUHRChange('left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="endurance-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="endurance-comments"
                rows={3}
                value={data.comments}
                onChange={(e) => handleCommentsChange(e.target.value)}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnduranceSection; 