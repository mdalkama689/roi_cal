import type { Investment, InvestmentInputs, YearlyData } from '../types/investment';

export const calculateInvestmentGrowth = (
  inputs: InvestmentInputs
): Investment => {
  const {
    initialInvestment,
    monthlyContribution,
    annualInterestRate,
    investmentPeriod,
    compoundingFrequency,
  } = inputs;

  // Determine number of compounds per year
  let compoundsPerYear = 1; // default to annually
  switch (compoundingFrequency) {
    case 'daily':
      compoundsPerYear = 365;
      break;
    case 'monthly':
      compoundsPerYear = 12;
      break;
    case 'quarterly':
      compoundsPerYear = 4;
      break;
    case 'semi-annually':
      compoundsPerYear = 2;
      break;
    case 'annually':
      compoundsPerYear = 1;
      break;
  }

  const yearlyData: YearlyData[] = [];
  let currentPrincipal = initialInvestment;
  let totalInterestEarned = 0;

  // Calculate monthly rate
  const monthlyRate = annualInterestRate / 100 / 12;

  for (let year = 1; year <= investmentPeriod; year++) {
    let yearlyPrincipal = currentPrincipal;
    let yearlyEndBalance = yearlyPrincipal;

    // Process each month in the year
    for (let month = 1; month <= 12; month++) {
      // Add monthly contribution
      yearlyEndBalance += monthlyContribution;
      
      // Apply interest based on compounding frequency
      const shouldCompound =
        compoundingFrequency === 'daily' ||
        (compoundingFrequency === 'monthly') ||
        (compoundingFrequency === 'quarterly' && month % 3 === 0) ||
        (compoundingFrequency === 'semi-annually' && month % 6 === 0) ||
        (compoundingFrequency === 'annually' && month === 12);

      if (shouldCompound) {
        const interestRate =
          compoundingFrequency === 'daily'
            ? (annualInterestRate / 100) / 365
            : (annualInterestRate / 100) / compoundsPerYear;

        const compoundPeriods =
          compoundingFrequency === 'daily' ? 30 : 1; // approx 30 days per month
          
        const interest = yearlyEndBalance * (Math.pow(1 + interestRate, compoundPeriods) - 1);
        yearlyEndBalance += interest;
      } else if (compoundingFrequency === 'monthly') {
        // Simple monthly interest
        const interest = yearlyEndBalance * monthlyRate;
        yearlyEndBalance += interest;
      }
    }

    // Calculate total invested up to this year
    const totalInvested = initialInvestment + monthlyContribution * 12 * year;
    
    // Calculate interest earned this year
    const interestEarned = yearlyEndBalance - totalInvested;
    
    // Update total interest earned
    totalInterestEarned += (yearlyEndBalance - yearlyPrincipal - monthlyContribution * 12);

    // Store data for this year
    yearlyData.push({
      totalInvested,
      interestEarned: interestEarned > 0 ? interestEarned : 0,
      totalValue: yearlyEndBalance,
    });

    // Update principal for next year
    currentPrincipal = yearlyEndBalance;
  }

  return {
    initialInvestment,
    totalContributions: monthlyContribution * 12 * investmentPeriod,
    totalInterest: totalInterestEarned,
    finalValue: currentPrincipal,
    yearlyData,
  };
};