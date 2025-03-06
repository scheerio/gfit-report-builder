import React from 'react';

interface AerobicSectionProps {
  data: {
    tms: number;
    mwt: { distance: number; speed: number; type: '2min' | '6min' };
    ikd: { ue: number; le: number };
    pws: { right: number; left: number };
    comments: string;
  };
  onChange: (data: AerobicSectionProps['data']) => void;
}

const AerobicSection: React.FC<AerobicSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: number) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleMWTChange = (field: 'distance' | 'speed' | 'type', value: any) => {
    onChange({
      ...data,
      mwt: {
        ...data.mwt,
        [field]: value
      }
    });
  };

  const handleIKDChange = (type: 'ue' | 'le', value: number) => {
    onChange({
      ...data,
      ikd: {
        ...data.ikd,
        [type]: value
      }
    });
  };

  const handlePWSChange = (side: 'right' | 'left', value: number) => {
    onChange({
      ...data,
      pws: {
        ...data.pws,
        [side]: value
      }
    });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Aerobic & Endurance
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* TMS - Two Minute Step */}
          <div>
            <label htmlFor="tms" className="block text-sm font-medium text-gray-700">
              Two Minute Step (# steps)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="tms"
                value={data.tms}
                onChange={(e) => handleChange('tms', parseFloat(e.target.value))}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* MWT - Walk Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Walk Test
            </label>
            <div className="mt-1 space-y-2">
              <div>
                <label htmlFor="mwt-distance" className="block text-sm text-gray-500">
                  Distance (meters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="mwt-distance"
                  value={data.mwt.distance}
                  onChange={(e) => handleMWTChange('distance', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="mwt-speed" className="block text-sm text-gray-500">
                  Speed (meters/sec)
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="mwt-speed"
                  value={data.mwt.speed}
                  onChange={(e) => handleMWTChange('speed', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <select
                id="mwt-type"
                value={data.mwt.type}
                onChange={(e) => handleMWTChange('type', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="2min">2 minute</option>
                <option value="6min">6 minute</option>
              </select>
            </div>
          </div>

          {/* IKD - Isokinetic Dynamometry */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Isokinetic Dynamometry (mets)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ikd-ue" className="block text-sm text-gray-500">
                  Upper Extremity
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ikd-ue"
                  value={data.ikd.ue}
                  onChange={(e) => handleIKDChange('ue', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="ikd-le" className="block text-sm text-gray-500">
                  Lower Extremity
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ikd-le"
                  value={data.ikd.le}
                  onChange={(e) => handleIKDChange('le', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* PWS - Partial Wall Sit */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Partial Wall Sit (sec)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pws-right" className="block text-sm text-gray-500">
                  Right
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pws-right"
                  value={data.pws.right}
                  onChange={(e) => handlePWSChange('right', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="pws-left" className="block text-sm text-gray-500">
                  Left
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="pws-left"
                  value={data.pws.left}
                  onChange={(e) => handlePWSChange('left', parseFloat(e.target.value))}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="aerobic-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="aerobic-comments"
                rows={3}
                value={data.comments}
                onChange={(e) => onChange({ ...data, comments: e.target.value })}
                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AerobicSection; 