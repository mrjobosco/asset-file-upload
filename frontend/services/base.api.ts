export async function get<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, method: 'GET' });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(`${response.statusText}: ${error.message}`);
  }
  return response.json() as Promise<T>;
}

export async function post<U>(url: string, data: BodyInit, options?: RequestInit): Promise<U> {
  const response: Response = await fetch(url, {
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