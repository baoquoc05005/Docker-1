import express from 'express';
import { createClient } from 'redis';

// Redis address comes from the environment, not hardcoded.
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

const COUNTER_KEY_NAME = 'mycounter';

const app = express();
app.set('views', new URL('./views', import.meta.url).pathname);
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/health', (req, res) => {
  return res.status(200).send('OK');
});

app.get('/incr', async (req, res) => {
  const count = await client.incrBy(COUNTER_KEY_NAME, 1);
  return res.json({ count });
});

app.get('/reset', async (req, res) => {
  await client.del(COUNTER_KEY_NAME);
  return res.json({ count: 0 });
});

// Home page: page-view counter, +1 on every visit.
app.get('/', async (req, res) => {
  const count = await client.incr(COUNTER_KEY_NAME);
  return res.render('homepage', { count });
});

await client.connect();

app.listen(5000, () => {
  console.log('Server listening on port 5000.');
});