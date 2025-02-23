export const calculateAPRs = (lpYield: number) => {
  console.log('📊 calculateAPRs called with:', {
    lpYield,
    type: typeof lpYield,
    isValid: !isNaN(lpYield) && lpYield > 0
  });

  if (!lpYield || isNaN(lpYield)) {
    console.warn('Invalid APR input:', lpYield);
    return {
      fixedAPR: {
        '3 Months': '0.00%',
        '6 Months': '0.00%',
        '1 Year': '0.00%'
      },
      variableAPR: {
        '3 Months': '0.00%',
        '6 Months': '0.00%',
        '1 Year': '0.00%'
      }
    };
  }

  // Fixed rates stay the same
  const fixed3Month = lpYield * 52;
  const fixed6Month = lpYield * 60;
  const fixed1Year = lpYield * 72;

  // Variable rates should INCREASE with term length
  const variable3Month = lpYield * 96;  // Base variable rate
  const variable6Month = lpYield * 110; // Higher for 6 months
  const variable1Year = lpYield * 125;  // Highest for 1 year

  return {
    fixedAPR: {
      '3 Months': `${fixed3Month.toFixed(2)}%`,
      '6 Months': `${fixed6Month.toFixed(2)}%`,
      '1 Year': `${fixed1Year.toFixed(2)}%`
    },
    variableAPR: {
      '3 Months': `${variable3Month.toFixed(2)}%`,
      '6 Months': `${variable6Month.toFixed(2)}%`,
      '1 Year': `${variable1Year.toFixed(2)}%`
    }
  };
};

export const formatAPR = (apr: number): string => {
  if (isNaN(apr)) return '0.00%';
  // Convert decimal to percentage with 2 decimal places
  return `${(apr * 100).toFixed(2)}%`;
};

export const formatTVL = (value: number): string => {
  // Format with commas for thousands
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}; 