import axiosInstance from '../app/axios.ts';

export function postQuery(text: string, signal: AbortSignal) {
  return axiosInstance.post(
    '/words',
    {
      text
    },
    {
      responseType: 'stream',
      adapter: 'fetch',
      signal
    }
  );
}
