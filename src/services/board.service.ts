/* eslint-disable no-useless-catch */
import { BoardModel } from '@models/board.model';
import { slugify } from '@utils/formatter.util';

import type { CreateBoardDto, IBoard } from 'src/types/board.type';

const createNewBoard = async (createBoardDto: CreateBoardDto): Promise<IBoard> => {
  try {
    const { insertedId } = await BoardModel.insertNewBoard({
      ...createBoardDto,
      slug: slugify(createBoardDto.title),
    });

    const newBoard = await BoardModel.findOneById(insertedId);
    if (!newBoard) {
      throw new Error('Failed to retrieve created board');
    }

    return newBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = { createNewBoard };
