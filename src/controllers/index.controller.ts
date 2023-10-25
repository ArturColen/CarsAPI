import { Request, Response } from 'express';
import getMongoConnection from '../db';
import { MongoClient } from 'mongodb';

export const getIndex = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Está funcionando! :)'
    });
};