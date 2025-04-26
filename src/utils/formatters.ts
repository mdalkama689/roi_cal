export const formatCurrency = (
  value: number,
  options: { compact?: boolean } = {}
): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: options.compact ? 'compact' : 'standard',
    compactDisplay: 'short',
  });
  return formatter.format(value);
};

export const formatPercentage = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};