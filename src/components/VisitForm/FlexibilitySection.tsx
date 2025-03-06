import React from 'react';

interface FlexibilitySectionProps {
  data: {
    pke: { right: number; left: number };
    csr: { right: number; left: number };
    bst: { right: number; left: number };
    tbr: { right: number; left: number };
    comments: string;
  };
  onChange: (data: FlexibilitySectionProps['data']) => void;
}

const FlexibilitySection: React.FC<FlexibilitySectionProps> = ({ data, onChange }) => {
  const handleBilateralChange = (
    measurement: 'pke' | 'csr' | 'bst' | 'tbr',
    side: 'right' | 'left',
    value: number
  ) => {
    onChange({
      ...data,
      [measurement]: {
        ...data[measurement],
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
          ROM & Flexibility
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* PKE - Passive Knee Extension */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passive Knee Extension (deg)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pke-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  id="pke-right"
                  value={data.pke.right}
                  onChange={(e) => handleBilateralChange('pke', 'right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="pke-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  id="pke-left"
                  value={data.pke.left}
                  onChange={(e) => handleBilateralChange('pke', 'left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* CSR - Chair Sit & Reach */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chair Sit & Reach (in)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="csr-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="csr-right"
                  value={data.csr.right}
                  onChange={(e) => handleBilateralChange('csr', 'right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="csr-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="csr-left"
                  value={data.csr.left}
                  onChange={(e) => handleBilateralChange('csr', 'left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* BST - Back Scratch Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Back Scratch Test (in)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bst-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="bst-right"
                  value={data.bst.right}
                  onChange={(e) => handleBilateralChange('bst', 'right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="bst-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="bst-left"
                  value={data.bst.left}
                  onChange={(e) => handleBilateralChange('bst', 'left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* TBR - Total Body Rotation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Body Rotation (in)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tbr-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="tbr-right"
                  value={data.tbr.right}
                  onChange={(e) => handleBilateralChange('tbr', 'right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="tbr-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="tbr-left"
                  value={data.tbr.left}
                  onChange={(e) => handleBilateralChange('tbr', 'left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="flexibility-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="flexibility-comments"
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

export default FlexibilitySection; 