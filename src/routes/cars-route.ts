import express from 'express';
import { createCarController, deleteCarController, findAllCarsController, updateCarController } from '../controllers/car-controller';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.post('/', createCarController);

carRouter.put('/', updateCarController);

carRouter.delete('/', deleteCarController);

export default carRouter;