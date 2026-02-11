import { loadEnvFile } from 'node:process';
import { PathLike } from 'fs';
import { z } from 'zod';
import { LogLevel } from 'fastify';

export const EnvSchema = z.object({
  APP_PORT: z.coerce.number(),
  LOG_LEVEL: z
    .literal(['error', 'warn', 'debug', 'trace'] satisfies LogLevel[])
    .default('error')
});

export type EnvironmentalVariables = z.infer<typeof EnvSchema>;

export default (path?: PathLike) => {
  try {
    loadEnvFile(path);
    return EnvSchema.parse(process.env);
  } catch (error) {
    throw new Error(`Environment variables error`, { cause: error });
  }
};
