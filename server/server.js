import express from 'express';
import cors from 'cors';
import aiRoute from './routes/ai.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/ai', aiRoute);

app.listen(PORT, () => console.log(`Serveur IA sur http://localhost:${PORT}`));
