import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import ApiError from '@utils/api-error.util';

import type { NextFunction, Request, Response } from 'express';

const createBoard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: unknown) {
    const errorMessage = new Error(error as string).message;

    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);

    next(customError);
  }
};

export const boardValidation = { createBoard };
