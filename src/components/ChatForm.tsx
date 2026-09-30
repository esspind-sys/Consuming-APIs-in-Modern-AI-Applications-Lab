import { useState } from 'react';

interface ChatFormProps {
  onSubmit: (prompt: string) => void;
  disabled: boolean;
}

function ChatForm({ onSubmit, disabled }: ChatFormProps) {
  const [prompt, setPrompt] = useState<string>('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt);
    setPrompt(''); // clear the box after sending
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask the AI something…"
        disabled={disabled}
        style={{ width: '60%', padding: '0.5rem' }}
      />
      <button type="submit" disabled={disabled}>
        {disabled ? 'Thinking…' : 'Send'}
      </button>
    </form>
  );
}

export default ChatForm;