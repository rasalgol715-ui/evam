import { Router } from 'express';
import { Ollama } from 'ollama';

const router = Router();
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Pas de message');

  try {
    const stream = await ollama.chat({
      model: 'llama3.2',
      messages: [{ role: 'user', content: message }],
      stream: true,
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of stream) {
      res.write(chunk.message.content);
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur IA');
  }
});

export default router;
