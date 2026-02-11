import app from './app/appBuilder.js';

const server = await app();

await server.listen({ port: process.env.APP_PORT });
