import { StatusCodes } from 'http-status-codes';

import { nodeEnv } from '@config/environment.config';
import ApiError from '@utils/api-error.util';

import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  stack?: string;
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
): void => {
  const response: ErrorResponse = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong',
  };

  if (error instanceof ApiError) {
    response.statusCode = error.statusCode;
    response.message = error.message;
  }

  if (nodeEnv === 'development') {
    response.stack = error.stack;
  }

  // Log error for debugging
  if (nodeEnv === 'development') {
    console.error('Error', {
      name: error.name,
      ...response,
    });
  }

  res.status(response.statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiError(StatusCodes.NOT_FOUND, `Cannot ${req.method} ${req.originalUrl}`);

  next(error);
};
