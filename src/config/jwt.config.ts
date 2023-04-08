import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'your-secret-key', // Replace with your own secret key
  signOptions: {
    expiresIn: process.env.JWT_EXPIRATION || '1h', // Set the token expiration time
  },
};