export const API_BASE_URL = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:5001';

export async function get<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, method: 'GET' });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(`${response.statusText}: ${error.message}`);
  }
  return response.json() as Promise<T>;
}

export async function post<U>(url: string, data: BodyInit, options?: RequestInit): Promise<U> {
  const response: Response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(`${response.statusText}: ${error.message}`);
  }
  return response.json() as Promise<U>;
}