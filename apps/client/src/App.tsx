import { type FormEventHandler, useRef, useState} from 'react'
import './App.css'

function App() {
  const [output, setOutput] = useState('');

  const evtSourceRef = useRef<EventSource | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();

      const response = new EventSource('http://localhost:3000/events');

      response.onopen = (e) => {
          console.log('Connection established', e);
      };

      response.addEventListener('message', (e) => {
          setOutput(output => output + e.data);
      });

      evtSourceRef.current = response;
  }

  const onStopClick = () => {
    if (evtSourceRef.current) {
        evtSourceRef.current.close();
    }
  };

  return (
    <>
        <form noValidate onSubmit={handleSubmit}>
            <button type="submit">Send</button>
            <button type="button" onClick={onStopClick}>Stop</button>
        </form>
        <div>
            Output: {output}
        </div>
    </>
  )
}

export default App
