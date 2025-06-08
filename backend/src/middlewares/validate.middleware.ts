import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = <T extends object>(
  dto: { fromPayload: (payload: any) => T }
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = dto.fromPayload(req.body); 
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
      const messages = errors.map(err => Object.values(err.constraints || {})).flat();
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Validation failed', errors: messages });
      return
    }

    req.body = instance;
    next();
  };
}
