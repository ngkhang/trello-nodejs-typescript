import 'dotenv/config';

interface EnvironmentsType {
  app: {
    host: string;
    port: number;
  };
  db: {
    mongoName: string;
    mongoUri: string;
  };
}

type Environment = 'development';

export const nodeEnv = (process.env.NODE_ENV || 'development') as Environment;

const development: EnvironmentsType = {
  app: {
    host: process.env.APP_HOST || '',
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 8017,
  },
  db: {
    mongoName: process.env.DB_MONGO_NAME || 'ngkhang',
    mongoUri: process.env.DB_MONGO_URI || '',
  },
};

const envConfigs: Record<Environment, EnvironmentsType> = {
  development,
};

const envConfig = envConfigs[nodeEnv];

export default envConfig;
