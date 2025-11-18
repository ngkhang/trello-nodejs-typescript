import { StatusCodes } from 'http-status-codes';

import { boardService } from '@services/board.service';

import type { NextFunction, Request, Response } from 'express';
import type { CreateBoardDto } from 'src/types/board.type';

const createBoard = async (
  req: Request<object, object, CreateBoardDto>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const createdBoard = await boardService.createNewBoard(req.body);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Create a new board successful!',
      statusCode: StatusCodes.CREATED,
      data: createdBoard,
    });
  } catch (error) {
    next(error);
  }
};

export const boardController = { createBoard };
