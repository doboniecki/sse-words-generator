import app from './app.js';

const server = await app();

await server.listen({ port: 3000 });
