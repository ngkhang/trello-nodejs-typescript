import 'dotenv/config';

interface EnvironmentsType {
  app: {
    host: string;
    port: number;
  };
}

type Environment = 'development';

export const nodeEnv = (process.env.NODE_ENV || 'development') as Environment;

const development: EnvironmentsType = {
  app: {
    host: process.env.APP_HOST || '',
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 8017,
  },
};

const envConfigs: Record<Environment, EnvironmentsType> = {
  development,
};

const envConfig = envConfigs[nodeEnv];

export default envConfig;
