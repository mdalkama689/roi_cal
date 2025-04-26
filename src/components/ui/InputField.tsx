import React from 'react';
import { NumericFormat } from 'react-number-format';

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  suffix?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  value,
  onChange,
  min,
  max,
  step = 1,
  currency,
  suffix,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        {currency && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{currency}</span>
          </div>
        )}
        
        {type === 'number' && currency ? (
          <NumericFormat
            id={id}
            name={name}
            className={`block w-full rounded-md bg-slate-700 border-slate-600 focus:border-blue-500 focus:ring-blue-500 text-white pl-8 pr-4 py-2 ${
              currency ? 'pl-8' : ''
            } ${suffix ? 'pr-16' : ''}`}
            value={value}
            onValueChange={(values) => {
              const e = {
                target: {
                  name,
                  value: values.floatValue || 0,
                },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(e);
            }}
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            className={`block w-full rounded-md bg-slate-700 border-slate-600 focus:border-blue-500 focus:ring-blue-500 text-white px-4 py-2 ${
              currency ? 'pl-8' : ''
            } ${suffix ? 'pr-16' : ''}`}
          />
        )}
        
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};