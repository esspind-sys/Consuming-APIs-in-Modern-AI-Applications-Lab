import { useState } from 'react';
import { streamGeminiResponse } from './api/gemini';
import ChatForm from './components/ChatForm';

type Status = 'idle' | 'loading' | 'streaming' | 'error';

function App() {
  const [response, setResponse] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(prompt: string) {
    // --- TEMPORARY DIAGNOSTICS (remove once working) ---
    console.log('Key loaded?', import.meta.env.VITE_API_KEY);
    console.log('URL loaded?', import.meta.env.VITE_API_URL);
    // ---------------------------------------------------

    setResponse('');
    setStatus('loading');

    try {
      await streamGeminiResponse(prompt, (textSoFar) => {
        setStatus('streaming');
        setResponse(textSoFar);
      });
      setStatus('idle');
    } catch (err) {
      console.error('Chat request failed:', err); // <-- shows the real error
      setStatus('error');
    }
  }

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>AI Chat</h1>

      <ChatForm
        onSubmit={handleSubmit}
        disabled={status === 'loading' || status === 'streaming'}
      />

      {status === 'loading' && <p>⏳ Waiting for response…</p>}

      {status === 'error' && (
        <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>
      )}

      {response && (
        <div style={{ marginTop: '1rem', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
          {response}
          {status === 'streaming' && <span> ▋</span>}
        </div>
      )}
    </main>
  );
}

export default App;