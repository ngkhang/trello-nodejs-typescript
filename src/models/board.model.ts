import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { getDb } from '@config/mongodb.config';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@utils/validators.util';

import type { InsertOneResult } from 'mongodb';

interface IBoard {
  _id: ObjectId;
  title: string;
  slug: string;
  description: string;
  columnOrderIds: string[];
  createdAt: Date;
  updatedAt: Date | null;
  _destroy: boolean;
}

interface IBoardInput extends Omit<IBoard, '_id'> {
  _id?: ObjectId;
}

// Define collection name
const BOARD_COLLECTION_NAME = 'boards';
// Define collection schema
const BOARD_COLLECTION_SCHEMA = Joi.object<IBoardInput>({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false),
});

const validationModel = async (data: Partial<IBoardInput>): Promise<IBoardInput> =>
  await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });

const insertNewBoard = async (data: Partial<IBoard>): Promise<InsertOneResult> => {
  try {
    const validData = await validationModel(data);
    return await getDb().collection(BOARD_COLLECTION_NAME).insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id: ObjectId): Promise<IBoard | null> => {
  try {
    const board = await getDb()
      .collection<IBoard>(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });

    return board;
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
