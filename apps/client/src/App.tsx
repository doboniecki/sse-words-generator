import { type FormEventHandler, useState } from 'react';
import './App.css';
import { useReadableStream } from './hooks/useReadableStream.ts';

function App() {
  const [output, setOutput] = useState('');

  const [error, setError] = useState('');

  const { processData, abort } = useReadableStream();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      await processData((newValue) => {
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
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex gap-3 justify-center m-3'
      >
        <button type='submit'>Send</button>
        <button type='button' onClick={stopConnection}>
          Stop
        </button>
        <button type='button' onClick={onClear}>
          Clear
        </button>
      </form>
      <div className='p-5 max-h-50 text-green-400 wrap-break-word text-center italic font-serif first-letter:capitalize'>
        {output || 'Click "Send" to generate words by SSE'}
        {error && <div className='text-red-500'>{error}</div>}
      </div>
    </>
  );
}

export default App;
