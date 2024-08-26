import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyZodObject, ZodError } from 'zod';

interface IError {
  label: string;
  message: string;
}

export const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: IError[] = error.issues.map((issue) => ({
        label: String(issue.path[1]),
        message: issue.message,
      }));

      res.status(StatusCodes.BAD_REQUEST).json(errors);
    }
  }
};
