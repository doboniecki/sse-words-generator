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

  app.register(
    (app, _, done) => {
      app.route(WordsRoutes.POST);
      done();
    },
    {
      prefix: '/v1'
    }
  );

  await corsPlugin(app);

  return app;
};
