import express from 'express';
import { findAllCarsController, findCarByIdController, createCarController, updateCarController, deleteCarController } from '../controllers/car-controller.js';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.get('/search', findCarByIdController);

carRouter.post('/', createCarController);

carRouter.put('/:id', updateCarController);

carRouter.delete('/:id', deleteCarController);

export default carRouter;