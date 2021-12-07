import { jest } from '@jest/globals';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

global.jest = jest;

// eslint-disable-next-line no-underscore-dangle
global.__filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
global.__dirname = dirname(__filename);