import express from 'express';

import { boardController } from '@controllers/board.controller';
import { boardValidation } from '@validations/board.validation';

const Router = express.Router();

Router.route('/').post(boardValidation.createBoard, boardController.createBoard);

export const boardRoute = Router;
