import { get, post } from './base.api';
import { Asset } from '@/types/assets';

const ASSETS_BASE_URL = '/assets';

export type AssetParams = {
  companyId?: string;
}

export async function getAssets(params?: AssetParams): Promise<Array<Asset>> {

  let query = '';

  if (params) {
    const entries = [];
    for (const key in params) {
      const value = params[key as keyof AssetParams];

      if (value !== undefined && value !== null) {
        entries.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }

    if (entries.length > 0) {
      query = '?' + entries.join('&');
    }
  }

  return await get<Array<Asset>>(`${ASSETS_BASE_URL}${query}`, {
    next: {
      tags: ['assets'],
    }
  });
};

export async function uploadAssets(data: FormData): Promise<unknown> {
  return await post<unknown>(`${ASSETS_BASE_URL}/upload`, data);
};


