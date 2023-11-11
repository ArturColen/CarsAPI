import { Request, Response } from 'express';
import { CarInterface } from '../interfaces/car-interface';
import * as carService from '../services/car-service';
import { validateCarData } from '../services/validations-service.js';

export const findAllCarsController = async (req: Request, res: Response) => {
    try {
        const cars = await carService.findAllCarsService();

        res.status(200).json({
            Cars: cars
        });
    }
    catch (error) {
        res.status(404).json({
            message: (error as Error).message
        });
    }
};

export const createCarController = async (req: Request, res: Response) => {
    try {
        const carData = req.body as CarInterface;
        
        validateCarData(carData);

        const createdCar = await carService.createCarService(carData);

        res.status(201).json({
            message: 'Carro criado com sucesso',
            Car: createdCar,
        });
    }
    catch (error) {
        res.status(500).json({
            message: (error as Error).message,
        });
    }
};

export const updateCarController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string | undefined;
        const carData = req.body as CarInterface;

        if (!id) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        validateCarData(carData);

        const updatedCar = await carService.updateCarService(id, carData);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Car: updatedCar,
        });
    }
    catch (error) {
        res.status(404).json({
            message: (error as Error).message,
        });
    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string | undefined;

        if (!id) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        await carService.deleteCarService(id);

        res.status(200).json({
            message: 'Exclusão feita com sucesso!'
        });
    }
    catch (error) {
        res.status(404).json({
            message: (error as Error).message,
        });
    }
};