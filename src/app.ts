import express from 'express';

import { errorHandlerMiddleware, notFoundHandler } from '@middlewares/error-handler.middleware';
import { apisV1Route } from '@routes/v1';

const app = express();

app.use(express.json());

app.use('/v1', apisV1Route);

// 404 Handler - catches undefined routes
app.use(notFoundHandler);

// Error Handler - catches all errors
app.use(errorHandlerMiddleware);

export default app;
