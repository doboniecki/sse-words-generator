import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import chance from 'chance';
import { clearInterval } from 'node:timers';

function handler(request: FastifyRequest, reply: FastifyReply) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  reply.raw.setHeaders(headers);
  reply.raw.flushHeaders();

  let counter = 0;

  const chanceInstance = chance();

  const interval = setInterval(() => {
    counter = counter + 1;

    if (counter > 20) {
      clearInterval(interval);
      reply.raw.end();
      return;
    }

    reply.raw.write(
      JSON.stringify({
        eventType: 'data',
        data: {
          text: chanceInstance.word()
        }
      })
    );
  }, 100);

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
