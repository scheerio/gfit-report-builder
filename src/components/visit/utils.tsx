import { inputStyles } from '../../styles/common';

export const renderField = (
  label: string,
  name: string,
  value: any,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onNTChange: (fieldName: string) => void,
  readOnly: boolean = false,
  required: boolean = true,
  step: string = "0.1"
) => (
  <div className="sm:col-span-3">
    <div className="flex items-center justify-between">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`${name}-nt`}
          checked={value === 'NT'}
          onChange={() => onNTChange(name)}
          disabled={readOnly}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor={`${name}-nt`} className="ml-2 text-sm text-gray-600">
          NT
        </label>
      </div>
    </div>
    <div className="mt-1">
      <input
        type="number"
        name={name}
        id={name}
        value={value === 'NT' ? '' : value || ''}
        onChange={onChange}
        disabled={readOnly || value === 'NT'}
        required={required && value !== 'NT'}
        className={`${inputStyles} ${readOnly || value === 'NT' ? 'bg-gray-50' : ''}`}
        step={step}
      />
    </div>
  </div>
); 