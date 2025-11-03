/* eslint-disable no-useless-catch */

import { BoardModel } from '@models/board.model';
import { slugify } from '@utils/formatter.util';

import type { ObjectId } from 'mongodb';

interface BoardResponse {
  _id: ObjectId;
  title: string;
  slug: string;
  description: string;
  columnOrderIds: string[];
  createdAt: Date;
  updatedAt: Date | null;
  _destroy: boolean;
}

const createNewBoard = async (data: { title: string; description: string }): Promise<BoardResponse> => {
  try {
    const newBoard = {
      ...data,
      slug: slugify(data.title),
    };

    const { insertedId } = await BoardModel.insertNewBoard(newBoard);
    const createdNewBoard = await BoardModel.findOneById(insertedId);

    if (!createdNewBoard) {
      throw new Error('Failed to retrieve created board');
    }
    return createdNewBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = { createNewBoard };
