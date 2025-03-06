import React from 'react';

interface BalanceSectionProps {
  data: {
    frt: number;
    ols: { right: number; left: number };
    srt: number;
    pst: { ap: number; ml: number };
    comments: string;
  };
  onChange: (data: BalanceSectionProps['data']) => void;
}

const BalanceSection: React.FC<BalanceSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: number | string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleOLSChange = (side: 'right' | 'left', value: number) => {
    onChange({
      ...data,
      ols: {
        ...data.ols,
        [side]: value
      }
    });
  };

  const handlePSTChange = (direction: 'ap' | 'ml', value: number) => {
    onChange({
      ...data,
      pst: {
        ...data.pst,
        [direction]: value
      }
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Balance
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* FRT - Functional Reach Test */}
          <div>
            <label htmlFor="frt" className="block text-sm font-medium text-gray-700">
              Functional Reach Test (in)
            </label>
            <div className="mt-1">
              <input
                type="number"
                step="0.1"
                id="frt"
                value={data.frt}
                onChange={(e) => handleChange('frt', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* OLS - One Leg Stance */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              One Leg Stance (sec)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ols-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ols-right"
                  value={data.ols.right}
                  onChange={(e) => handleOLSChange('right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="ols-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ols-left"
                  value={data.ols.left}
                  onChange={(e) => handleOLSChange('left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* SRT - Step Reaction Time */}
          <div>
            <label htmlFor="srt" className="block text-sm font-medium text-gray-700">
              Step Reaction Time (ms)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="srt"
                value={data.srt}
                onChange={(e) => handleChange('srt', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* PST - Postural Sway Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postural Sway Test (mm)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pst-ap" className="block text-sm text-gray-500">
                  Anterior-Posterior
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pst-ap"
                  value={data.pst.ap}
                  onChange={(e) => handlePSTChange('ap', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="pst-ml" className="block text-sm text-gray-500">
                  Medial-Lateral
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pst-ml"
                  value={data.pst.ml}
                  onChange={(e) => handlePSTChange('ml', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="balance-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="balance-comments"
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

export default BalanceSection; 