import { describe, expect, it } from '@jest/globals';
import { comparePassword, hashedPassword } from '../../src/utils';

describe('Hash Password', () => {
  it('Hash Password', () => {
    expect(hashedPassword).toBeDefined();
  });

  it('Hash Password', async () => {
    const password = 'password';
    const hash = await hashedPassword(password);
    expect(hash).not.toEqual(password);
  });

  it('Compare Password', async () => {
    const password = 'password';
    const hash = await hashedPassword(password);
    const isEqual = await comparePassword(password, hash);
    expect(isEqual).toBeTruthy();
  });

  it('Compare Password', async () => {
    const password = 'password';
    const hash = await hashedPassword(password);
    const isEqual = await comparePassword('wrong password', hash);
    expect(isEqual).toBeFalsy();
  });
});
