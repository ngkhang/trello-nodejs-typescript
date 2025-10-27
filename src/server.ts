import app from './app';
import envConfig from './config/environment.config';

const appEnv = envConfig.app;

const server = app.listen(appEnv.port, appEnv.host, () => {
  console.info(`Server is running in: http://${appEnv.host}:${appEnv.port}`);
});

process.on('SIGINT', () => {
  console.info('Server closed');
  server.close((error) => {
    if (error) {
      console.error('Close Server has error');
    }
  });
});
