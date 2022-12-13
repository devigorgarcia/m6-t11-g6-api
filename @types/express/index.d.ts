import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        id: string;
        is_admin: boolean;
      };
    }
  }
}
