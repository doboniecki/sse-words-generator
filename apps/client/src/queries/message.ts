import axiosInstance from '../utils/axios.ts';

export function postQuery(data: FormData, signal: AbortSignal) {
  return axiosInstance.post(
    'v1/words',
    Object.fromEntries(data.entries()),
    {
      responseType: 'stream',
      adapter: 'fetch',
      signal
    }
  );
}
