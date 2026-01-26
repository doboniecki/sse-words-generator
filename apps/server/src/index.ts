import fastify from 'fastify';
import { corsPlugin } from './plugins/cors.js';
import { generateSentences } from './routes/words/words.js';

const app = fastify({
  logger: true
});

await corsPlugin(app);

generateSentences(app);

await app.listen({ port: 3000 });
