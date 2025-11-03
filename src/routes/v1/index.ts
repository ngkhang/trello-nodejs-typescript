import express from 'express';

import { boardRoute } from './board.route';

const Router = express.Router();

Router.use('/boards', boardRoute);

export const apisV1Route = Router;
