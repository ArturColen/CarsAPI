import { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import Carro from '../models/car';
import getMongoConnection from '../db';
import { removePrefixFromKeys } from '../utils/remove-prefix-keys';

export const findAllCarsController = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("cars")
        const result = await carCollection.find().toArray();

        const carsWithoutPrefix = result.map(removePrefixFromKeys);

        res.status(200).json({
            Cars: carsWithoutPrefix
        })
    }
    catch (err) {
        res.status(404).json({
            message: (err as Error).message
        })
    }
    finally {
        conn?.close()
    }
};

export const findCarByName = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null;

    try {
        const nome = req.params.nome;

        if (nome === undefined) {
            throw new Error("O parâmetro 'nome' não foi fornecido na consulta.");
        }

        if (typeof nome !== "string") {
            throw new Error("Informe corretamente o nome do carro");
        }

        conn = await getMongoConnection();
        const db = conn.db();
        const carCollection = await db.collection("cars");

        const query = { _nome: nome };

        const result = await carCollection.find(query).toArray();

        if (result.length === 0) {
            res.status(404).json({
                message: "Carro não encontrado"
            });
        }
        else {
            const carsWithoutPrefix = result.map(removePrefixFromKeys);
            res.status(200).json({
                Car: carsWithoutPrefix
            });
        }
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    }
    finally {
        conn?.close();
    }
}

export const createCarController = async (req: Request, res: Response) => {
    try {
        const carData = req.body;
        const newId = new ObjectId();
        const newIdString = newId.toString();

        const car = new Carro(
            newIdString,
            carData.nome,
            carData.preco,
            carData.cor,
            carData.fabricante,
            carData.categoria,
            carData.anoLancamento,
            carData.assentos,
            carData.potencia,
            carData.aro,
            carData.versao,
            carData.peso,
            carData.abastecimento
        );

        const conn = await getMongoConnection();
        const db = conn.db();
        const carCollection = db.collection("cars");

        const carDocument = {
            ...car,
        };

        const result = await carCollection.insertOne(carDocument);

        const insertedId = result.insertedId;
        const insertedCar = await carCollection.findOne({ _id: insertedId });

        res.status(201).json({
            message: "Carro criado com sucesso", carro: insertedCar
        });
    }
    catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    }
};

export const updateCarController = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("cars")

        const id = req.params.id

        const data = {
            nome: req.body.nome,
            preco: req.body.preco,
            fabricante: req.body.fabricante,
            categoria: req.body.categoria,
            ano_lancamento: req.body.ano_lancamento,
            assentos: req.body.assentos,
            potencia: req.body.potencia,
            aro: req.body.aro,
            versao: req.body.versao,
            peso: req.body.peso,
            abastecimento: req.body.abastecimento
        }

        if (id.toString().trim() === "" || id === null || id === undefined || typeof id !== 'string') {
            throw new Error("Id do automóvel inválido!")
        }
        else if (data.nome.toString().trim() === "" || data.nome === null || data.nome === undefined || typeof data.nome !== 'string') {
            throw new Error("Nome do automóvel inválido!")
        }
        else if (data.preco.toString().trim() === "" || data.preco === null || data.preco === undefined || typeof data.preco !== 'number') {
            throw new Error("Preço do automóvel inválido!")
        }
        else if (data.fabricante.toString().trim() === "" || data.fabricante === null || data.fabricante === undefined || typeof data.fabricante !== 'string') {
            throw new Error("Fabricante do automóvel inválido!")
        }
        else if (data.categoria.toString().trim() === "" || data.categoria === null || data.categoria === undefined || typeof data.categoria !== 'string') {
            throw new Error("Categoria do automóvel inválido!")
        }
        else if (data.ano_lancamento.toString().trim() === "" || data.ano_lancamento === null || data.ano_lancamento === undefined || typeof data.ano_lancamento !== 'number') {
            throw new Error("Ano de lançamento do automóvel inválido!")
        }
        else if (data.assentos.toString().trim() === "" || data.assentos === null || data.assentos === undefined || typeof data.assentos !== 'number') {
            throw new Error("Assentos do automóvel inválido!")
        }
        else if (data.potencia.toString().trim() === "" || data.potencia === null || data.potencia === undefined || typeof data.potencia !== 'number') {
            throw new Error("Potência do automóvel inválido!")
        }
        else if (data.aro.toString().trim() === "" || data.aro === null || data.aro === undefined || typeof data.aro !== 'number') {
            throw new Error("Aro do automóvel inválido!")
        }
        else if (data.versao.toString().trim() === "" || data.versao === null || data.versao === undefined || typeof data.versao !== 'string') {
            throw new Error("Versão do automóvel inválido!")
        }
        else if (data.peso.toString().trim() === "" || data.peso === null || data.peso === undefined || typeof data.peso !== 'number') {
            throw new Error("Peso do automóvel inválido!")
        }
        else if (data.abastecimento.toString().trim() === "" || data.abastecimento === null || data.abastecimento === undefined || typeof data.abastecimento !== 'string') {
            throw new Error("Abastecimento do automóvel inválido!")
        }

        const objId = new ObjectId(id);

        await carCollection.updateOne({
            _id: objId
        }, {
            $set: data
        }
        );

        const result = await carCollection.findOne({ _id: objId });

        const carWithoutPrefix = removePrefixFromKeys(result);
        res.status(200).json({
            message: carWithoutPrefix
        });
    }
    catch (err) {
        res.status(404).json({
            message: (err as Error).message
        });
    }
    finally {
        conn?.close();
    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null

    try {
        conn = await getMongoConnection();
        const db = conn.db();
        const carCollection = db.collection("cars");
        const idCar = req.params.id;

        carCollection.deleteOne({ _id: idCar }, (err, deletedCar) => {
            if (err) {
                console.log(err);
                res.status(500).send('Erro na tentativa de exclusão do carro!');
            } else if (!deletedCar) {
                res.status(404).send('Carro não encontrado!');
            } else {
                res.status(200).send('Exclusão feita com sucesso!');
            }
        });
    }
    catch (err) {
        res.status(500).send('Erro na tentativa de exclusão do carro!');
        console.log(err);
    }
};