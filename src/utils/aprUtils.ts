export const calculateAPRs = (baseAPR: number, term: string) => {
  const multipliers: Record<string, number> = {
    '3 Months': 1,
    '6 Months': 1.1,
    '1 Year': 1.2
  };
  
  const multiplier = multipliers[term] || 1;
  return {
    fixed: baseAPR * multiplier,
    variable: baseAPR * multiplier * 1.2
  };
};

export const formatAPR = (apr: number): string => {
  return `${(apr * 100).toFixed(2)}%`;
}; 