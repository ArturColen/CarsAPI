import { Request, Response } from 'express';
import getMongoConnection from '../db';
import { MongoClient } from 'mongodb';

export const findAllCarsController = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Está funcionando! :)'
    });
};

export const createCarController = (req: Request, res: Response) => {
};

export const updateCarController = (req: Request, res: Response) => {
};

export const deleteCarController = (req: Request, res: Response) => {
};