import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Log } from '../shared/entities/log.entity';

export const logMiddleware = () => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const agent = req.headers['user-agent'];

    const logObj = new Log();
    logObj.ip = ip;
    logObj.method = method;
    logObj.originalUrl = originalUrl;
    logObj.agent = agent ? agent : 'null';

    const logRepository = getRepository(Log);
    logRepository.save(logObj);

    next();
  };
};
