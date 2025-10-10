import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { z } from 'zod';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: { useDefaults: true },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" }
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '100kb' }));

// secure cookie example
app.get('/login-sim', (req, res) => {
  res.cookie('session', 'demo', { httpOnly: true, secure: true, sameSite: 'lax' });
  res.json({ ok: true });
});

// validated echo
const echoSchema = z.object({ q: z.string().max(100) });
app.get('/echo', (req, res) => {
  const parsed = echoSchema.safeParse({ q: String(req.query.q || '') });
  if (!parsed.success) return res.status(400).json({ error: 'invalid input' });
  res.json({ echo: parsed.data.q.replace(/[<>]/g, '') });
});

app.get('/', (req, res) => res.send('Secure app running'));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Secure app listening on ${port}`));
