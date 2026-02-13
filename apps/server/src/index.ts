import fastify from 'fastify';

const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL
  }
});

try {
  await server.listen({ port: process.env.APP_PORT, host: '0.0.0.0' });
} catch (e) {
  console.log(e);
}
