import express from 'express';

import { errorHandlerMiddleware, notFoundHandler } from '@middlewares/error-handler.middleware';

const app = express();

app.use(express.json());

// 404 Handler - catches undefined routes
app.use(notFoundHandler);

// Error Handler - catches all errors
app.use(errorHandlerMiddleware);

export default app;
