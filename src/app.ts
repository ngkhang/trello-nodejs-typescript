import express from 'express';

const app = express();

// Initialize router
app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Initialized Router',
  }),
);

export default app;
