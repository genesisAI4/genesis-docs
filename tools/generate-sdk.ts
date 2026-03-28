/**
 * @license
 * Copyright 2026 Genesis AI
 */

import { generateApi } from 'swagger-typescript-api';
import path from 'path';

/**
 * Generates a TypeScript SDK from the OpenAPI specification.
 */
generateApi({
  fileName: 'genesis-api.ts',
  output: path.resolve(process.cwd(), './sdk'),
  input: path.resolve(process.cwd(), './docs/api/openapi.yaml'),
  httpClientType: 'axios',
  generateClient: true,
  generateRouteTypes: true,
  generateResponses: true,
})
  .then(({ files }) => {
    console.log('SDK generated successfully');
  })
  .catch((e) => console.error('Failed to generate SDK:', e));
