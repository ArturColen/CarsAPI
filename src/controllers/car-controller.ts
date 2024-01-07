import { Request, Response } from 'express';
import { CarInterface } from '../interfaces/car-interface';
import * as carService from '../services/car-service';
import { validateCarData } from '../services/carValidations-service.js';

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

export const findCarByIdController = async (req: Request, res: Response) => {
    try {
        const idCar = req.query.id as string | undefined;

        if (!idCar) {
            throw new Error("O 'id' não foi fornecido na consulta.");
        }

        const car = await carService.findCarByIdService(idCar);

        res.status(200).json({
            Car: car
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O ID fornecido não é válido para exibição do carro.',
            });
        } 
        else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
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
        const idCar = req.params.id as string | undefined;
        const carData = req.body as CarInterface;

        if (!idCar) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        validateCarData(carData);

        const updatedCar = await carService.updateCarService(idCar, carData);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Car: updatedCar,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O ID fornecido não é válido para atualização do carro.',
            });
        } 
        else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    try {
        const idCar = req.params.id as string | undefined;

        if (!idCar) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        await carService.deleteCarService(idCar);

        res.status(200).json({
            message: 'Exclusão feita com sucesso!'
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O ID fornecido não é válido para exclusão do carro.',
            });
        } 
        else {
            res.status(500).json({
                message: (error as Error).message,
            });
        }
    }
};