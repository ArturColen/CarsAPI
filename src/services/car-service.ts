import { CarInterface } from '../interfaces/car-interface.js';
import * as carRepository from '../repositories/car-repository.js';
import { validateCarData } from './validations-service.js';

export const findAllCarsService = async () => {
    try {
        const cars = await carRepository.findAllCarsRepository();
        return cars;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const createCarService = async (carData: CarInterface) => {
    try {
        validateCarData(carData);
        
        const createdCar = await carRepository.createCarRepository(carData);

        return createdCar;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const updateCarService = async (id: string, carData: CarInterface) => {
    try {
        validateCarData(carData);
        
        const updatedCar = await carRepository.updateCarRepository(id, carData);
        
        if (!updatedCar) {
            throw new Error('Carro não encontrado!');
        }
        
        const updatedCarDocument = await carRepository.findCarByIdRepository(id);

        if (!updatedCarDocument) {
            throw new Error('Carro não encontrado!');
        }

        return updatedCarDocument;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteCarService = async (id: string) => {
    try {
        const deletedCar = await carRepository.deleteCarRepository(id);

        if (!deletedCar) {
            throw new Error('Carro não encontrado!');
        }

        return deletedCar;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};