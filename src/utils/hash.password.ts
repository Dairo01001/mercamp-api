import bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../config';

export const hashedPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
