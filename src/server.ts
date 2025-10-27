import app from './app';
import envConfig from './config/environment.config';
import { closeDb, connectDb } from './config/mongodb.config';

const appEnv = envConfig.app;

void (async () => {
  try {
    // Connect to MongoDb Cloud
    await connectDb();
    console.info('Connected to MongoDB Cloud');

    // Start Server
    const server = app.listen(appEnv.port, appEnv.host, () => {
      console.info(`Server is running in: http://${appEnv.host}:${appEnv.port}`);
    });

    // Shutdown handler
    process.on('SIGINT', async () => {
      console.info('Close Server');
      await closeDb();
      server.close();
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
