import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDb } from '@config/mongodb.config';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators.util';

import type { IBoard, IBoardValidate } from 'src/types/board.type';

type IBoardDocument = Omit<IBoard, '_id'> & { _id: ObjectId };

// Define collection name
const BOARD_COLLECTION_NAME = 'boards';

// Define collection schema
const BOARD_COLLECTION_SCHEMA = Joi.object<IBoardValidate>({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const validateCreateBoard = async (data: Partial<IBoardValidate>): Promise<IBoardValidate> =>
  await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });

const insertNewBoard = async (data: Partial<IBoard>): Promise<{ acknowledged: boolean; insertedId: string }> => {
  try {
    const validData = await validateCreateBoard(data);
    const { acknowledged, insertedId } = await getDb().collection(BOARD_COLLECTION_NAME).insertOne(validData);

    return {
      acknowledged,
      insertedId: insertedId.toString(),
    };
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id: string): Promise<IBoard | null> => {
  try {
    const board = await getDb()
      .collection<IBoardDocument>(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });

    if (!board) return null;

    return {
      ...board,
      _id: board._id.toString(),
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  insertNewBoard,
  findOneById,
};
