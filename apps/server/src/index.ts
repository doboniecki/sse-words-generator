import { buildFastifyApp } from './app/appBuilder.js';

const server = await buildFastifyApp();

try {
  await server.listen({ port: process.env.APP_PORT, host: '0.0.0.0' });
} catch (e) {
  console.log(e);
}
