import { type FormEventHandler, useRef, useState} from 'react'
import './App.css'

function App() {
  const [output, setOutput] = useState('');

  const evtSourceRef = useRef<EventSource | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();

      const response = new EventSource('http://localhost:3000/sentences');

      response.onopen = (e) => {
          console.log('Connection established', e);
      };

      response.addEventListener('message', (e) => {
          setOutput(output => output + e.data);
      });

      evtSourceRef.current = response;
  }

  const stopConnection = () => {
    if (evtSourceRef.current) {
        evtSourceRef.current.close();
    }
  };

  const onClear = () => {
      stopConnection();
      setOutput('');
  }

  return (
    <>
        <h1 className="mb-10 font-bold italic">Server-sent events</h1>
        <form noValidate onSubmit={handleSubmit} className="flex gap-3 justify-center m-3">
            <button type="submit">Send</button>
            <button type="button" onClick={stopConnection}>Stop</button>
            <button type="button" onClick={onClear}>Clear</button>
        </form>
        <div className="p-5 max-h-50 overflow-scroll text-green-400 wrap-break-word text-center italic font-serif first-letter:capitalize">
            {output || 'Click "Send" to generate words by SSE'}
        </div>
    </>
  )
}

export default App
