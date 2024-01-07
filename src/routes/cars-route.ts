import express from 'express';
import { findAllCarsController, findCarByIdController, createCarController, updateCarController, deleteCarController } from '../controllers/car-controller.js';
import { verifyTokenInBack } from '../middlewares/token-middleware.js';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.get('/search', findCarByIdController);

carRouter.post('/', verifyTokenInBack, createCarController);

carRouter.put('/:id', verifyTokenInBack, updateCarController);

carRouter.delete('/:id', verifyTokenInBack, deleteCarController);

export default carRouter;