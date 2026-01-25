import { FastifyInstance, FastifyReply } from 'fastify';
import chance from 'chance';

function handler(reply: FastifyReply) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  reply.raw.setHeaders(headers);
  reply.raw.flushHeaders();

  let counter = 0;

  const chanceInstance = chance();

  const interval = setInterval(() => {
    counter = counter + 1;

    reply.raw.write(`event: message\n`);
    reply.raw.write(`data: ${chanceInstance.word() + ' '}\n`);
    reply.raw.write('\n');
  }, 100);

  reply.raw.on('close', () => {
    clearInterval(interval);
    reply.raw.end();
  });
}

export function generateSentences(fastify: FastifyInstance) {
  fastify.get('/sentences', async (_request, reply) => handler(reply));
}

