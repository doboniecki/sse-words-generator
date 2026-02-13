import fastify from 'fastify';
import { corsPlugin } from '../plugins/cors.js';
import { WordsRoutes } from '../routes/words/words.route.js';
import setupEnv from './env.js';

export const buildFastifyApp = async () => {
  setupEnv();

  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL
    }
  });

  console.log(app);

  await corsPlugin(app);

  app.route(WordsRoutes.POST);

  return app;
};
