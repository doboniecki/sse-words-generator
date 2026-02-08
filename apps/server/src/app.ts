import fastify from 'fastify';
import { corsPlugin } from './plugins/cors.js';
import { WordsRoutes } from './routes/words/words.route.js';

const buildFastifyApp = async () => {
  const app = fastify({
    logger: {
      level: 'info'
    }
  });

  await corsPlugin(app);

  app.route(WordsRoutes.POST);

  return app;
};

export default buildFastifyApp;
