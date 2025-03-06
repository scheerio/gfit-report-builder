import React from 'react';

interface PowerSectionProps {
  data: {
    bicep: { rm: number; pp: number };
    tricep: { rm: number; pp: number };
    back: { rm: number; pp: number };
    chest: { rm: number; pp: number };
    knee: { rm: number; pp: number };
    calf: { rm: number; pp: number };
    leg: { rm: number; pp: number };
    hip: { right: { rm: number; pp: number }; left: { rm: number; pp: number } };
    comments: string;
  };
  onChange: (data: PowerSectionProps['data']) => void;
}

const PowerSection: React.FC<PowerSectionProps> = ({ data, onChange }) => {
  const handleMuscleChange = (
    muscle: keyof Omit<PowerSectionProps['data'], 'hip' | 'comments'>,
    field: 'rm' | 'pp',
    value: number
  ) => {
    onChange({
      ...data,
      [muscle]: {
        ...data[muscle],
        [field]: value
      }
    });
  };

  const handleHipChange = (
    side: 'right' | 'left',
    field: 'rm' | 'pp',
    value: number
  ) => {
    onChange({
      ...data,
      hip: {
        ...data.hip,
        [side]: {
          ...data.hip[side],
          [field]: value
        }
      }
    });
  };

  const renderMuscleInputs = (
    muscle: keyof Omit<PowerSectionProps['data'], 'hip' | 'comments'>,
    label: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${muscle}-rm`} className="block text-sm text-gray-500">
            1 Rep Max (lbs)
          </label>
          <input
            type="number"
            id={`${muscle}-rm`}
            value={data[muscle].rm}
            onChange={(e) => handleMuscleChange(muscle, 'rm', parseFloat(e.target.value))}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`${muscle}-pp`} className="block text-sm text-gray-500">
            Peak Power (watts)
          </label>
          <input
            type="number"
            id={`${muscle}-pp`}
            value={data[muscle].pp}
            onChange={(e) => handleMuscleChange(muscle, 'pp', parseFloat(e.target.value))}
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Muscle Performance - Power
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {renderMuscleInputs('bicep', 'Bicep')}
          {renderMuscleInputs('tricep', 'Tricep')}
          {renderMuscleInputs('back', 'Back')}
          {renderMuscleInputs('chest', 'Chest')}
          {renderMuscleInputs('knee', 'Knee')}
          {renderMuscleInputs('calf', 'Calf')}
          {renderMuscleInputs('leg', 'Leg')}

          {/* Hip (bilateral) */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Hip
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {/* Right Hip */}
              <div>
                <label className="block text-sm text-gray-500">Right</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="hip-right-rm" className="block text-sm text-gray-500">
                      1RM (lbs)
                    </label>
                    <input
                      type="number"
                      id="hip-right-rm"
                      value={data.hip.right.rm}
                      onChange={(e) => handleHipChange('right', 'rm', parseFloat(e.target.value))}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="hip-right-pp" className="block text-sm text-gray-500">
                      PP (watts)
                    </label>
                    <input
                      type="number"
                      id="hip-right-pp"
                      value={data.hip.right.pp}
                      onChange={(e) => handleHipChange('right', 'pp', parseFloat(e.target.value))}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Left Hip */}
              <div>
                <label className="block text-sm text-gray-500">Left</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="hip-left-rm" className="block text-sm text-gray-500">
                      1RM (lbs)
                    </label>
                    <input
                      type="number"
                      id="hip-left-rm"
                      value={data.hip.left.rm}
                      onChange={(e) => handleHipChange('left', 'rm', parseFloat(e.target.value))}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="hip-left-pp" className="block text-sm text-gray-500">
                      PP (watts)
                    </label>
                    <input
                      type="number"
                      id="hip-left-pp"
                      value={data.hip.left.pp}
                      onChange={(e) => handleHipChange('left', 'pp', parseFloat(e.target.value))}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="sm:col-span-2">
            <label htmlFor="power-comments" className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <div className="mt-1">
              <textarea
                id="power-comments"
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

export default PowerSection; 