import { Request, Response } from 'express';
import getMongoConnection from '../db';
import { MongoClient, ObjectId } from 'mongodb';

export const findAllCarsController = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null
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
    let conn: MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("car")

        const nome = req.params.nome
        const result = await carCollection.findOne({ nome: nome })
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
    let conn: MongoClient | null = null
    try {
        conn = await getMongoConnection()
        const db = conn.db()
        const carCollection = db.collection("car")

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

        const objId = new ObjectId(id)
        await carCollection.updateOne({
            _id: objId
        }, {
            $set: 
                data 
        })

        const result = await carCollection.findOne({ _id: objId })
        res.status(200).json({ message: result })
    }
    catch (err) {
        res.status(404).json({ message: (err as Error).message })
    }
    finally {
        conn?.close()
    }
};

export const deleteCarController = async (req: Request, res: Response) => {
    try {

    }
    catch (err) {

    }
};