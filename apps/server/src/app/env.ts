import 'dotenv/config';

import { z } from 'zod';
import { LogLevel } from 'fastify';

export const EnvSchema = z.object({
  APP_PORT: z.coerce.number().min(1000),
  LOG_LEVEL: z
    .literal(['error', 'warn', 'debug', 'trace'] satisfies LogLevel[])
    .default('error')
});

export type EnvironmentalVariables = z.infer<typeof EnvSchema>;

export default () => {
  try {
    console.log(process.env.APP_PORT, process.env.LOG_LEVEL);
    return EnvSchema.parse(process.env);
  } catch (error) {
    throw new Error(`Environment variables error`, { cause: error });
  }
};
