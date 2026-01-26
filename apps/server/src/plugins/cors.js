import cors from '@fastify/cors';
export async function corsPlugin(fastify) {
  await fastify.register(cors, {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });
}
