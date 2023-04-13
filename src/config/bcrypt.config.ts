import * as bcrypt from 'bcryptjs';

export const BcryptConfig = {
  saltRounds: 10,
  hash: async (password: string): Promise<string> => {
    return bcrypt.hash(password, BcryptConfig.saltRounds);
  },
  compare: async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  },
};
