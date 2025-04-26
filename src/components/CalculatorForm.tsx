import React from 'react';
import { RefreshCw } from 'lucide-react';
import { InputField } from './ui/InputField';
import { SelectField } from './ui/SelectField';
import type { InvestmentInputs } from '../types/investment';

interface CalculatorFormProps {
  inputs: InvestmentInputs;
  onChange: (name: keyof InvestmentInputs, value: number | string) => void;
  onReset: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  onChange,
  onReset,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert to number if the input is a number field
    if (name !== 'compoundingFrequency') {
      onChange(name as keyof InvestmentInputs, Number(value));
    } else {
      onChange(name as keyof InvestmentInputs, value);
    }
  };

  return (
    <form className="space-y-6">
      <InputField
        id="initialInvestment"
        name="initialInvestment"
        label="Initial Investment (₹)"
        type="number"
        value={inputs.initialInvestment}
        onChange={handleChange}
        currency="₹"
        min={0}
      />
      
      <InputField
        id="monthlyContribution"
        name="monthlyContribution"
        label="Monthly Contribution (₹)"
        type="number"
        value={inputs.monthlyContribution}
        onChange={handleChange}
        currency="₹"
        min={0}
      />
      
      <InputField
        id="annualInterestRate"
        name="annualInterestRate"
        label="Annual Interest Rate (%)"
        type="number"
        value={inputs.annualInterestRate}
        onChange={handleChange}
        suffix="%"
        min={0}
        max={100}
        step={0.1}
      />
      
      <InputField
        id="investmentPeriod"
        name="investmentPeriod"
        label="Investment Period (years)"
        type="number"
        value={inputs.investmentPeriod}
        onChange={handleChange}
        suffix="years"
        min={1}
        max={50}
      />
      
      <SelectField
        id="compoundingFrequency"
        name="compoundingFrequency"
        label="Compounding Frequency"
        value={inputs.compoundingFrequency}
        onChange={handleChange}
        options={[
          { value: 'annually', label: 'Annually' },
          { value: 'semi-annually', label: 'Semi-Annually' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'daily', label: 'Daily' },
        ]}
      />
      
      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Reset to Default
        </button>
      </div>
    </form>
  );
};