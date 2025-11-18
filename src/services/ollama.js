// src/services/ollama.js
export async function askLlama(prompt, maxTokens = 220) {
  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:3b',
      prompt,
      stream: false,
      options: { temperature: 0.7, num_predict: maxTokens }
    })
  })
  if (!res.ok) throw new Error('Ollama injoignable')
  const data = await res.json()
  return data.response.trim()
}
