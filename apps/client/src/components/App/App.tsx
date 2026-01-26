import { type FormEventHandler, useState } from 'react';
import './App.css';
import { useReadableStream } from '../../hooks/useReadableStream.ts';
import SSEDataForm from '../SSEDataForm/SSEDataForm.tsx';

function App() {
  const [output, setOutput] = useState('');

  const [error, setError] = useState('');

  const { processData, abort } = useReadableStream();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      await processData(data, (newValue) => {
        setOutput((output) => `${output}${newValue.data.text} `);
      });
    } catch (error) {
      if ((error as { name: string }).name === 'AbortError') {
        setError('Aborted');
      } else {
        setError(JSON.stringify(error));
      }
    }
  };

  const stopConnection = () => {
    abort();
  };

  const onClear = () => {
    stopConnection();
    setOutput('');
    setError('');
  };

  return (
    <>
      <h1 className='mb-10 font-bold italic'>Server-sent events</h1>

      <SSEDataForm
        handleSubmit={handleSubmit}
        stopConnection={stopConnection}
        onClear={onClear}
      />

      <div className='p-5 max-h-50 text-green-400 wrap-break-word m-auto italic font-serif first-letter:capitalize max-w-100'>
        {output || 'Click "Send" to generate words by SSE'}
        {error && <div className='text-red-500'>{error}</div>}
      </div>
    </>
  );
}

export default App;
