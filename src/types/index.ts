export interface Product {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'deprecated' | 'subscription' | 'matured';
  tvl?: number;
  apy?: number;
  term?: '1 Month' | '3 Months' | '6 Months' | '1 Year';
  liquidity?: number;
  fixedAPR?: number;
  variableAPR?: number;
  subscriptionEnd?: Date;
  maturityDate?: Date;
  depositToken?: string;
  shareToken?: string;
  platform?: string;
  strategy?: string;
  isVerified?: boolean;
  performance?: {
    daily?: number;
    weekly?: number;
    monthly?: number;
    yearly?: number;
  };
} 