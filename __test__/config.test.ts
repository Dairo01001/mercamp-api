import { describe, it } from '@jest/globals';
import { PORT } from '../src/config';

describe('config', () => {
  it('should return PORT env(test)', () => {
    expect(PORT).toBe('3001');
  });
});
