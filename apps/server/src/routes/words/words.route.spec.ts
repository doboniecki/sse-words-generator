import { describe, test, expect, afterAll } from 'vitest';
import { buildFastifyApp } from '../../app/appBuilder.js';

describe('Words Route', async () => {
  const app = await buildFastifyApp();

  afterAll(async () => {
    await app.close();
  });

  describe('POST', async () => {
    test('should return 400 code when request body is not found', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/words'
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('Request body not found');
    });

    test('should return 400 code when request is not correct', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/words',
        body: {
          wordsCount: 1,
          milliseconds: -1
        }
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toBe('Values should be greater than 0');
    });

    test('should return an array of words when parameters provided', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/words',
        body: {
          wordsCount: 1,
          milliseconds: 500
        }
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatch(/eventType/);
    });
  });
});
