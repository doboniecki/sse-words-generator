import { useRef } from 'react';
import { postQuery } from '../queries/message.ts';

export const useReadableStream = () => {
  const abortControllerRef = useRef<AbortController>(null);

  const processData = async (
    data: FormData,
    onNewValue: (value: {
      eventType: string;
      data: { text: string };
    }) => void
  ) => {
    const abortController = new AbortController();

    abortControllerRef.current = abortController;

    const response = await postQuery(data, abortController.signal);

    const stream = response.data as ReadableStream | null;

    if (stream?.getReader) {
      const reader = stream.getReader();

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = JSON.parse(
          decoder.decode(value, { stream: true })
        ) as { eventType: string; data: { text: string } };

        onNewValue(text);
      }
    }
  };

  const abort = () => {
    abortControllerRef.current?.abort();
  };

  return {
    processData,
    abort
  };
};
