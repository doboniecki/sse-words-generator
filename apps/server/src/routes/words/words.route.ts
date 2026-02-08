import { ROUTES } from '../../constants/routes.js';
import { wordsGeneratorHandler } from './handlers/generateWords.handler.js';

export const WordsRoutes = {
  POST: {
    method: 'POST',
    url: ROUTES.Words,
    handler: wordsGeneratorHandler
  }
} as const;
