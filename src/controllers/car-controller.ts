import { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Carro from '../models/car';
import getMongoConnection from '../db';
import { removePrefixFromKeys } from '../utils/remove-prefix-keys';

export const findAllCarsController = async (req: Request, res: Response) => {
    let connection: MongoClient | null = null;

    try {
        connection = await getMongoConnection();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const result = await carCollection.find().toArray();

        const carsWithoutPrefix = result.map(removePrefixFromKeys);

        res.status(200).json({
            Cars: carsWithoutPrefix
        });
    }
    catch (err) {
        res.status(404).json({
            message: (err as Error).message
        });
    }
    finally {
        connection?.close();
    }
};

export const createCarController = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if (data.nome === undefined || data.nome === null || typeof data.nome !== 'string' || data.nome.trim() === '') {
            throw new Error('Nome do automóvel inválido!');
        }
        else if (data.preco === undefined || data.preco === null || typeof data.preco !== 'number' || data.preco.toString().trim() === '') {
            throw new Error('Preço do automóvel inválido!');
        }
        else if (data.cor === undefined || data.cor === null || typeof data.cor !== 'string' || data.cor.trim() === '') {
            throw new Error('Cor do automóvel inválida!');
        }
        else if (data.fabricante === undefined || data.fabricante === null || typeof data.fabricante !== 'string' || data.fabricante.trim() === '') {
            throw new Error('Fabricante do automóvel inválido!');
        }
        else if (data.categoria === undefined || data.categoria === null || typeof data.categoria !== 'string' || data.categoria.trim() === '') {
            throw new Error('Categoria do automóvel inválida!');
        }
        else if (data.ano_lancamento === undefined || data.ano_lancamento === null || typeof data.ano_lancamento !== 'number' || data.ano_lancamento.toString().trim() === '') {
            throw new Error('Ano de lançamento do automóvel inválido!');
        }
        else if (data.assentos === undefined || data.assentos === null || typeof data.assentos !== 'number' || data.assentos.toString().trim() === '') {
            throw new Error('Quantidade de assentos do automóvel inválida!');
        }
        else if (data.potencia === undefined || data.potencia === null || typeof data.potencia !== 'number' || data.potencia.toString().trim() === '') {
            throw new Error('Potência do automóvel inválida!');
        }
        else if (data.aro === undefined || data.aro === null || typeof data.aro !== 'number' || data.aro.toString().trim() === '') {
            throw new Error('Aro do automóvel inválido!');
        }
        else if (data.versao === undefined || data.versao === null || typeof data.versao !== 'string' || data.versao.trim() === '') {
            throw new Error('Versão do automóvel inválida!');
        }
        else if (data.peso === undefined || data.peso === null || typeof data.peso !== 'number' || data.peso.toString().trim() === '') {
            throw new Error('Peso do automóvel inválido!');
        }
        else if (data.abastecimento === undefined || data.abastecimento === null || typeof data.abastecimento !== 'string' || data.abastecimento.trim() === '') {
            throw new Error('Abastecimento do automóvel inválido!');
        }

        const car = new Carro(
            data.nome,
            data.preco,
            data.cor,
            data.fabricante,
            data.categoria,
            data.ano_lancamento,
            data.assentos,
            data.potencia,
            data.aro,
            data.versao,
            data.peso,
            data.abastecimento
        );

        const connection = await getMongoConnection();
        const db = connection.db();
        const carCollection = db.collection('cars');

        const carDocument = {
            ...car,
        };

        const result = await carCollection.insertOne(removePrefixFromKeys(carDocument));

        res.status(201).json({
            message: 'Carro criado com sucesso'
        });
    }
    catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    }
};

export const updateCarController = async (req: Request, res: Response) => {
    let connection: MongoClient | null = null;

    try {
        connection = await getMongoConnection();
        const db = connection.db();
        const carCollection = db.collection('cars');

        const id = req.query.id as string | undefined;;
        const data = req.body;

        if (id === undefined) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        if (id === null || typeof id !== 'string' || id.trim() === '') {
            throw new Error('Id do automóvel inválido!');
        }
        else if (data.nome === undefined || data.nome === null || typeof data.nome !== 'string' || data.nome.trim() === '') {
            throw new Error('Nome do automóvel inválido!');
        }
        else if (data.preco === undefined || data.preco === null || typeof data.preco !== 'number' || data.preco.toString().trim() === '') {
            throw new Error('Preço do automóvel inválido!');
        }
        else if (data.cor === undefined || data.cor === null || typeof data.cor !== 'string' || data.cor.trim() === '') {
            throw new Error('Cor do automóvel inválida!');
        }
        else if (data.fabricante === undefined || data.fabricante === null || typeof data.fabricante !== 'string' || data.fabricante.trim() === '') {
            throw new Error('Fabricante do automóvel inválido!');
        }
        else if (data.categoria === undefined || data.categoria === null || typeof data.categoria !== 'string' || data.categoria.trim() === '') {
            throw new Error('Categoria do automóvel inválida!');
        }
        else if (data.ano_lancamento === undefined || data.ano_lancamento === null || typeof data.ano_lancamento !== 'number' || data.ano_lancamento.toString().trim() === '') {
            throw new Error('Ano de lançamento do automóvel inválido!');
        }
        else if (data.assentos === undefined || data.assentos === null || typeof data.assentos !== 'number' || data.assentos.toString().trim() === '') {
            throw new Error('Quantidade de assentos do automóvel inválida!');
        }
        else if (data.potencia === undefined || data.potencia === null || typeof data.potencia !== 'number' || data.potencia.toString().trim() === '') {
            throw new Error('Potência do automóvel inválida!');
        }
        else if (data.aro === undefined || data.aro === null || typeof data.aro !== 'number' || data.aro.toString().trim() === '') {
            throw new Error('Aro do automóvel inválido!');
        }
        else if (data.versao === undefined || data.versao === null || typeof data.versao !== 'string' || data.versao.trim() === '') {
            throw new Error('Versão do automóvel inválida!');
        }
        else if (data.peso === undefined || data.peso === null || typeof data.peso !== 'number' || data.peso.toString().trim() === '') {
            throw new Error('Peso do automóvel inválido!');
        }
        else if (data.abastecimento === undefined || data.abastecimento === null || typeof data.abastecimento !== 'string' || data.abastecimento.trim() === '') {
            throw new Error('Abastecimento do automóvel inválido!');
        }

        const objId = new ObjectId(id);

        const carro = new Carro(
            data.nome,
            data.preco,
            data.cor,
            data.fabricante,
            data.categoria,
            data.ano_lancamento,
            data.assentos,
            data.potencia,
            data.aro,
            data.versao,
            data.peso,
            data.abastecimento
        );

        await carCollection.updateOne({
            _id: objId
        }, {
            $set: removePrefixFromKeys(carro)
        });

        const result = await carCollection.findOne({ _id: objId });

        if (result === undefined || result === null) {
            throw new Error('Carro não encontrado! Por favor, verifique se o ID inserido está correto!');
        }

        const carWithoutPrefix = removePrefixFromKeys(result);

        res.status(200).json({
            message: 'Dados atualizados com sucesso.'
        });
    }
    catch (err) {
        res.status(404).json({
            message: (err as Error).message
        });
    }
    finally {
        connection?.close();
    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    let connection: MongoClient | null = null;

    try {
        connection = await getMongoConnection();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const idCar = req.query.id as string | undefined;

        if (idCar === undefined) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }

        if (idCar === null || typeof idCar !== 'string' || idCar.trim() === '') {
            throw new Error('Id do automóvel inválido!');
        }

        const objId = new ObjectId(idCar);

        const deletedCar = await carCollection.findOneAndDelete({ _id: objId });

        if (!deletedCar.value) {
            res.status(404).json({
                message: 'Carro não encontrado!'
            });
        }
        else {
            res.status(200).json({
                message: 'Exclusão feita com sucesso!'
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    }
    finally {
        connection?.close();
    }
};