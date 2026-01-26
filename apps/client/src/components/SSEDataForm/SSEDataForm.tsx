import type { FormEventHandler } from 'react';

export default function SSEDataForm({
  handleSubmit,
  onClear,
  stopConnection
}: {
  handleSubmit: FormEventHandler;
  stopConnection: () => void;
  onClear: () => void;
}) {
  return (
    <form onSubmit={handleSubmit} className={'flex flex-col gap-3'}>
      <div>
        <input
          required
          type='number'
          name='wordsCount'
          placeholder='The amount of words (number)'
          className={'w-3/4 p-2 border-2 rounded-lg'}
        />
      </div>

      <div>
        <input
          required
          type='number'
          name='milliseconds'
          placeholder='Stream frequency value (ms)'
          className={'w-3/4 p-2 border-2 rounded-lg'}
        />
      </div>

      <div className='flex mt-4 gap-3 justify-center'>
        <button type='submit'>Send</button>
        <button type='button' onClick={stopConnection}>
          Stop
        </button>
        <button type='button' onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
}
