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

        if (!data.nome) {
            throw new Error('Favor preencher corretamente o nome do automóvel!');
        }
        else if (typeof data.nome !== 'string') {
            throw new Error('O nome do automóvel deve ser uma string válida!');
        }
        else if (data.nome.trim() === '') {
            throw new Error('O nome do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.preco) {
            throw new Error('Favor preencher corretamente o preço do automóvel!');
        }
        else if (typeof data.preco !== 'number') {
            throw new Error('O preço do automóvel deve ser um número válido!');
        }
        else if (data.preco.toString().trim() === '') {
            throw new Error('O preço do automóvel não pode ser um campo vázio!');
        }
            
        if (!data.cor) {
            throw new Error('Favor preencher corretamente a cor do automóvel!');
        }
        else if (typeof data.cor !== 'string') {
            throw new Error('A cor do automóvel deve ser uma string válida!');
        }
        else if (data.cor.trim() === '') {
            throw new Error('A cor do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.fabricante) {
            throw new Error('Favor preencher corretamente o fabricante do automóvel!');
        }
        else if (typeof data.fabricante !== 'string') {
            throw new Error('O fabricante do automóvel deve ser uma string válida!');
        }
        else if (data.fabricante.trim() === '') {
            throw new Error('O fabricante do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.categoria) {
            throw new Error('Favor preencher corretamente a categoria do automóvel!');
        }
        else if (typeof data.categoria !== 'string') {
            throw new Error('A categoria do automóvel deve ser uma string válida!');
        }
        else if (data.categoria.trim() === '') {
            throw new Error('A categoria do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.ano_lancamento) {
            throw new Error('Favor preencher corretamente o ano de lançamento do automóvel!');
        }
        else if (typeof data.ano_lancamento !== 'number') {
            throw new Error('O ano de lançamento do automóvel deve ser um número válido!');
        }
        else if (data.ano_lancamento.toString().trim() === '') {
            throw new Error('O ano de lançamento do automóvel não pode ser um campo vázio!');
        }
    
        if (!data.assentos) {
            throw new Error('Favor preencher corretamente a quantidade de assentos do automóvel!');
        }
        else if (typeof data.assentos !== 'number') {
            throw new Error('A quantidade de assentos do automóvel deve ser um número válido!');
        }
        else if (data.assentos.toString().trim() === '') {
            throw new Error('A quantidade de assentos do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.potencia) {
            throw new Error('Favor preencher corretamente a potência do automóvel!');
        }
        else if (typeof data.potencia !== 'number') {
            throw new Error('A potência do automóvel deve ser um número válido!');
        }
        else if (data.potencia.toString().trim() === '') {
            throw new Error('A potência do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.aro) {
            throw new Error('Favor preencher corretamente o tamanho do aro do automóvel!');
        }
        else if (typeof data.aro !== 'number') {
            throw new Error('O tamanho do aro do automóvel deve ser um número válido!');
        }
        else if (data.aro.toString().trim() === '') {
            throw new Error('O tamanho do aro do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.versao) {
            throw new Error('Favor preencher corretamente a versão do automóvel!');
        }
        else if (typeof data.versao !== 'string') {
            throw new Error('A versão do automóvel deve ser uma string válida!');
        }
        else if (data.versao.trim() === '') {
            throw new Error('A versão do automóvel não pode ser um campo vazio!');
        }
        
        if (!data.peso) {
            throw new Error('Favor preencher corretamente o peso do automóvel!');
        }
        else if (typeof data.peso !== 'number') {
            throw new Error('O peso do automóvel deve ser um número válido!');
        }
        else if (data.peso.toString().trim() === '') {
            throw new Error('O peso do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.tipo_combustivel) {
            throw new Error('Favor preencher corretamente o tipo de combustível do automóvel!');
        }
        else if (typeof data.tipo_combustivel !== 'string') {
            throw new Error('O tipo de combustível do automóvel deve ser uma string válida!');
        }
        else if (data.tipo_combustivel.trim() === '') {
            throw new Error('O tipo de combustível do automóvel não pode ser um campo vazio!');
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
            data.tipo_combustivel
        );

        const connection = await getMongoConnection();
        const db = connection.db();
        const carCollection = db.collection('cars');

        const carDocument = {
            ...car,
        };

        await carCollection.insertOne(carDocument);
        const insertedCar = await carCollection.findOne(carDocument);

        res.status(201).json({
            message: 'Carro criado com sucesso',
            Car: removePrefixFromKeys(insertedCar)
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

        if (!id) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        else if (typeof id !== 'string') {
            throw new Error("O 'id' do automóvel deve ser uma string válida!");
        }
        else if (id.trim() === '') {
            throw new Error("O 'id' do automóvel não pode ser um campo vazio!");
        }

        if (!data.nome) {
            throw new Error('Favor preencher corretamente o nome do automóvel!');
        }
        else if (typeof data.nome !== 'string') {
            throw new Error('O nome do automóvel deve ser uma string válida!');
        }
        else if (data.nome.trim() === '') {
            throw new Error('O nome do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.preco) {
            throw new Error('Favor preencher corretamente o preço do automóvel!');
        }
        else if (typeof data.preco !== 'number') {
            throw new Error('O preço do automóvel deve ser um número válido!');
        }
        else if (data.preco.toString().trim() === '') {
            throw new Error('O preço do automóvel não pode ser um campo vázio!');
        }
            
        if (!data.cor) {
            throw new Error('Favor preencher corretamente a cor do automóvel!');
        }
        else if (typeof data.cor !== 'string') {
            throw new Error('A cor do automóvel deve ser uma string válida!');
        }
        else if (data.cor.trim() === '') {
            throw new Error('A cor do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.fabricante) {
            throw new Error('Favor preencher corretamente o fabricante do automóvel!');
        }
        else if (typeof data.fabricante !== 'string') {
            throw new Error('O fabricante do automóvel deve ser uma string válida!');
        }
        else if (data.fabricante.trim() === '') {
            throw new Error('O fabricante do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.categoria) {
            throw new Error('Favor preencher corretamente a categoria do automóvel!');
        }
        else if (typeof data.categoria !== 'string') {
            throw new Error('A categoria do automóvel deve ser uma string válida!');
        }
        else if (data.categoria.trim() === '') {
            throw new Error('A categoria do automóvel não pode ser um campo vazio!');
        }
            
        if (!data.ano_lancamento) {
            throw new Error('Favor preencher corretamente o ano de lançamento do automóvel!');
        }
        else if (typeof data.ano_lancamento !== 'number') {
            throw new Error('O ano de lançamento do automóvel deve ser um número válido!');
        }
        else if (data.ano_lancamento.toString().trim() === '') {
            throw new Error('O ano de lançamento do automóvel não pode ser um campo vázio!');
        }
    
        if (!data.assentos) {
            throw new Error('Favor preencher corretamente a quantidade de assentos do automóvel!');
        }
        else if (typeof data.assentos !== 'number') {
            throw new Error('A quantidade de assentos do automóvel deve ser um número válido!');
        }
        else if (data.assentos.toString().trim() === '') {
            throw new Error('A quantidade de assentos do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.potencia) {
            throw new Error('Favor preencher corretamente a potência do automóvel!');
        }
        else if (typeof data.potencia !== 'number') {
            throw new Error('A potência do automóvel deve ser um número válido!');
        }
        else if (data.potencia.toString().trim() === '') {
            throw new Error('A potência do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.aro) {
            throw new Error('Favor preencher corretamente o tamanho do aro do automóvel!');
        }
        else if (typeof data.aro !== 'number') {
            throw new Error('O tamanho do aro do automóvel deve ser um número válido!');
        }
        else if (data.aro.toString().trim() === '') {
            throw new Error('O tamanho do aro do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.versao) {
            throw new Error('Favor preencher corretamente a versão do automóvel!');
        }
        else if (typeof data.versao !== 'string') {
            throw new Error('A versão do automóvel deve ser uma string válida!');
        }
        else if (data.versao.trim() === '') {
            throw new Error('A versão do automóvel não pode ser um campo vazio!');
        }
        
        if (!data.peso) {
            throw new Error('Favor preencher corretamente o peso do automóvel!');
        }
        else if (typeof data.peso !== 'number') {
            throw new Error('O peso do automóvel deve ser um número válido!');
        }
        else if (data.peso.toString().trim() === '') {
            throw new Error('O peso do automóvel não pode ser um campo vázio!');
        }
        
        if (!data.tipo_combustivel) {
            throw new Error('Favor preencher corretamente o tipo de combustível do automóvel!');
        }
        else if (typeof data.tipo_combustivel !== 'string') {
            throw new Error('O tipo de combustível do automóvel deve ser uma string válida!');
        }
        else if (data.tipo_combustivel.trim() === '') {
            throw new Error('O tipo de combustível do automóvel não pode ser um campo vazio!');
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
            data.tipo_combustivel
        );

        await carCollection.updateOne({
            _id: objId
        }, {
            $set: removePrefixFromKeys(carro)
        });

        const result = await carCollection.findOne({ _id: objId });

        if (!result) {
            res.status(404).json({
                message: 'Carro não encontrado!'
            });
        }
        else {
            const carWithoutPrefix = removePrefixFromKeys(result);

            res.status(200).json({
                message: 'Dados atualizados com sucesso.',
                Car: carWithoutPrefix,
            });
        }
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

        if (!idCar) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        else if (typeof idCar !== 'string') {
            throw new Error("O 'id' do automóvel deve ser uma string válida!");
        }
        else if (idCar.trim() === '') {
            throw new Error("O 'id' do automóvel não pode ser um campo vazio!");
        }

        const objId = new ObjectId(idCar);

        const deletedCar = await carCollection.findOneAndDelete({ _id: objId });

        if (!deletedCar.value) {
            res.status(404).json({
                message: 'Carro não encontrado! Por favor, verifique se o ID inserido está correto!'
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