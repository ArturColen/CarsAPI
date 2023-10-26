import express from 'express';
import { createCarController, deleteCarController, findAllCarsController, updateCarController } from '../controllers/car-controller';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.post('/create', createCarController);

carRouter.put('/update/:id', updateCarController);

carRouter.delete('/delete/:id', deleteCarController);

export default carRouter;