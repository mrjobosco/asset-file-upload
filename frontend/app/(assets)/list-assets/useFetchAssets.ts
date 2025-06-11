import { Asset } from '@/types/assets';
import { useEffect, useState } from 'react';
import { getAssets } from '@/services/assets.api';

export interface UseFetchAssetsReturn {
  assets: Array<Asset>,
  loading: boolean,
  error: string | null,
  fetchAssets: (companyId?: string) => Promise<void>;
}

export function useFetchAssets(): UseFetchAssetsReturn {

  const [assets, setAssets] = useState<Array<Asset>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async (companyId?: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAssets(companyId ? { companyId } : undefined);
      setAssets(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to fetch assets');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, []);

  return { assets, loading, error, fetchAssets };
}