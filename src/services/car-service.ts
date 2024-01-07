import { CarInterface } from '../interfaces/car-interface.js';
import * as carRepository from '../repositories/car-repository.js';
import { validateCarData } from './carValidations-service.js';

export const findAllCarsService = async () => {
    try {
        const cars = await carRepository.findAllCarsRepository();
        return cars;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const findCarByIdService = async (idCar: string) => {
    try {
        if (!idCar) {
            throw new Error('Id do carro não informado!');
        }

        const car = await carRepository.findCarByIdRepository(idCar);

        if (!car) {
            throw new Error('Carro não encontrado!');
        }

        return car;
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

export const updateCarService = async (idCar: string, carData: CarInterface) => {
    try {
        validateCarData(carData);
        
        const updatedCar = await carRepository.updateCarRepository(idCar, carData);
        
        if (!updatedCar) {
            throw new Error('Carro não encontrado!');
        }
        
        const updatedCarDocument = await carRepository.findCarByIdRepository(idCar);

        if (!updatedCarDocument) {
            throw new Error('Carro não encontrado!');
        }

        return updatedCarDocument;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};

export const deleteCarService = async (idCar: string) => {
    try {
        const deletedCar = await carRepository.deleteCarRepository(idCar);

        if (!deletedCar) {
            throw new Error('Carro não encontrado!');
        }

        return deletedCar;
    }
    catch (error) {
        throw new Error((error as Error).message);
    }
};