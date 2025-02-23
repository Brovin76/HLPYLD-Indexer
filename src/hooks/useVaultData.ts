import { useEffect, useState } from 'react';
import { formatAPR } from '@/utils/aprUtils';

interface VaultData {
  fixedAPR: string;
  variableAPR: string;
  tvl: string;
  // ... other fields
}

export function useVaultData() {
  const [data, setData] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for now
        const fixedAPR = 5.2;
        const variableAPR = 6.8;

        setData({
          fixedAPR: formatAPR(fixedAPR),
          variableAPR: formatAPR(variableAPR),
          tvl: '$276,497,405'
        });
      } catch (error) {
        console.error('Failed to fetch vault data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
} 