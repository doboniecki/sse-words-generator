import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import chance from 'chance';
import { clearInterval } from 'node:timers';
import { WordEvent, WordRequest } from '../types/words.js';

function handler(request: FastifyRequest, reply: FastifyReply) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  const requestBody = request.body as WordRequest;

  reply.raw.setHeaders(headers);
  reply.raw.flushHeaders();

  let counter = parseInt(requestBody.wordsCount);

  const intervalFrequency = parseInt(requestBody.milliseconds);

  const chanceInstance = chance();

  const sendEvent = () => {
    const eventMessage: WordEvent = {
      eventType: 'data',
      data: {
        text: chanceInstance.word()
      }
    };

    reply.raw.write(JSON.stringify(eventMessage));

    counter--;
  };

  sendEvent();

  const interval = setInterval(() => {
    if (counter === 0) {
      clearInterval(interval);
      reply.raw.end();
      return;
    }

    sendEvent();
  }, intervalFrequency);

  reply.raw.on('close', () => {
    clearInterval(interval);
    reply.raw.end();
  });
}

export function generateSentences(fastify: FastifyInstance) {
  fastify.post('/words', async (request, reply) =>
    handler(request, reply)
  );
}
