import app from './app';

const hostname = 'localhost';
const port = 8017;

const server = app.listen(port, hostname, () => {
  console.info(`Server is running in: http://${hostname}:${port}`);
});

process.on('SIGINT', () => {
  console.info('Server closed');
  server.close((error) => {
    if (error) {
      console.error('Close Server has error');
    }
  });
});
