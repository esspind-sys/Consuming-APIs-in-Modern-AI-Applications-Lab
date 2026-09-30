import type { GeminiStreamChunk } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Streams a response from Gemini.
// onChunk is called with each new piece of text as it arrives.
export async function streamGeminiResponse(
  prompt: string,
  onChunk: (textSoFar: string) => void
): Promise<void> {
  // "?alt=sse" tells Gemini to send Server-Sent Events (the "data:" lines).
  const response = await fetch(`${API_URL}?alt=sse&key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // A reader lets us pull the response out in chunks as it arrives.
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';        // holds partial data between reads
  let accumulated = '';   // the full answer built up so far

  while (true) {
    const { done, value } = await reader.read();
    if (done) break; // the stream has ended

    // Convert the raw bytes into text and add to our buffer.
    buffer += decoder.decode(value, { stream: true });

    // Split into lines. The last line may be incomplete, so we hold it back.
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data: ')) continue;

      const jsonString = trimmed.slice(6); // remove the "data: " prefix
      if (jsonString === '[DONE]') continue;

      try {
        const chunk: GeminiStreamChunk = JSON.parse(jsonString);
        const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          accumulated += text;   // append this piece
          onChunk(accumulated);  // tell App: "here's the answer so far"
        }
      } catch {
        // Ignore lines that aren't valid JSON (e.g. blank keep-alive lines).
      }
    }
  }
}