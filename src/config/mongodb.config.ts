import { MongoClient, ServerApiVersion } from 'mongodb';

import envConfig from './environment.config';

import type { Db } from 'mongodb';

const dbEnv = envConfig.db;

let mongoDbClientInstanceInitial: null | Db = null;

const mongoDbClientInstance = new MongoClient(dbEnv.mongoUri, {
  serverApi: {
    strict: true,
    deprecationErrors: true,
    version: ServerApiVersion.v1,
  },
});

export const connectDb = async (): Promise<void> => {
  await mongoDbClientInstance.connect();

  mongoDbClientInstanceInitial = mongoDbClientInstance.db(dbEnv.mongoName);
};

export const closeDb = async (): Promise<void> => {
  await mongoDbClientInstance.close();
};

export const getDb = (): Db => {
  if (!mongoDbClientInstanceInitial) throw new Error('Please connect to database');

  return mongoDbClientInstanceInitial;
};
