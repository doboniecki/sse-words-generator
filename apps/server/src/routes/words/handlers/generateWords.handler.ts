import { FastifyReply, FastifyRequest } from 'fastify';
import { WordEvent, WordRequest } from '../types/index.js';
import { wordsGenerator } from '../utils/wordsGenerator.js';

export function wordsGeneratorHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  const requestBody = request.body as WordRequest;

  reply.raw.setHeaders(headers);

  if (!requestBody) {
    reply.status(400).send('Request body not found');
    return;
  }

  let counter = parseInt(requestBody.wordsCount);

  const intervalFrequency = parseInt(requestBody.milliseconds);

  if (intervalFrequency <= 0 || counter <= 0) {
    reply.status(400).send('Values should be greater than 0');
    return;
  }

  const sendEvent = () => {
    const eventMessage: WordEvent = {
      eventType: 'data',
      data: {
        text: wordsGenerator()
      }
    };

    reply.status(201).raw.write(JSON.stringify(eventMessage));

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
