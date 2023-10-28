import express from 'express';
import { createCarController, deleteCarController, findAllCarsController, findCarByName, updateCarController } from '../controllers/car-controller';

const carRouter = express.Router();

carRouter.get('/', findAllCarsController);

carRouter.get('/search/:nome', findCarByName);

carRouter.post('/create', createCarController);

carRouter.put('/update/:id', updateCarController);

carRouter.delete('/delete/:id', deleteCarController);

export default carRouter;