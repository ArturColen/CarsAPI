import express from 'express';
import { createCarController, deleteCarController, findAllCarsController, findCarByName, updateCarController } from '../controllers/car-controller';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.get('/search', findCarByName);

carRouter.post('/create', createCarController);

carRouter.put('/update', updateCarController);

carRouter.delete('/delete', deleteCarController);

export default carRouter;