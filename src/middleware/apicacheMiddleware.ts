import { Request } from 'express';
import apicache from 'apicache';

export const apiCacheMiddleware = () => {
  const cacheOptions = {
    statusCode: { include: [200, 201] },
    defaultDuration: 60000,
    appendKey: (req: Request) => req.method,
  };
  const cacheMiddleware = apicache.options(cacheOptions).middleware();
  return cacheMiddleware;
};
