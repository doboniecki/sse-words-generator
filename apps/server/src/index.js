import fastify from 'fastify';
import { corsPlugin } from './plugins/cors.js';
const app = fastify({
    logger: true
});
await app.register(corsPlugin);
app.get('/events', async (_request, reply) => {
    const message = {
        id: '123',
        event: 'test',
        data: { hello: 'world' }
    };
    reply.send(message);
});
await app.listen({ port: 3000 });
