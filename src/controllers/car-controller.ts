import { Request, Response } from 'express';
import getMongoConnection from '../db';
import { MongoClient } from 'mongodb';

export const findAllCarsController = async (req: Request, res: Response) => {
    let conn : MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("car")

        const result = await carCollection.find().toArray()
        res.status(200).json({ Cars: result })
    }
    catch (err) {
        res.status(404).json({ message: (err as Error).message })
    }
    finally {
        conn?.close()
    }
};

export const findCarByName = async (req: Request, res: Response) => {
    let conn : MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("car")

        const nome = req.params.nome
        const result = await carCollection.findOne({nome: nome})
        res.status(200).json({ message: result })
    }
    catch (err) {
        res.status(404).json({ message: (err as Error).message })
    }
    finally {
        conn?.close()
    }
}

export const createCarController = async (req: Request, res: Response) => {
    try {
        //db.carro.insertOne({nome: "Kwdi", preco: 70000, cor: "Vermelho", fabricante: "Renault", categoria: "Compacto", ano_lancamento: 2018, assentos: 5, potencia: 75, aro: 13, versao: "Outsider", peso: 100, abastecimento: "flex"})
    }
    catch (err) {

    }
};

export const updateCarController = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {

    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {

    }
};