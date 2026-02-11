// oxlint-disable typescript/no-empty-object-type
// oxlint-disable typescript/consistent-type-definitions

import { EnvironmentalVariables } from '../app/env.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentalVariables {}
  }
}
