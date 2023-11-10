"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findAllCarsController = void 0;
const mongodb_1 = require("mongodb");
const car_1 = __importDefault(require("../models/car"));
const db_1 = __importDefault(require("../db"));
const remove_prefix_keys_1 = require("../utils/remove-prefix-keys");
const findAllCarsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = null;
    try {
        connection = yield (0, db_1.default)();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const result = yield carCollection.find().toArray();
        const carsWithoutPrefix = result.map(remove_prefix_keys_1.removePrefixFromKeys);
        res.status(200).json({
            Cars: carsWithoutPrefix
        });
    }
    catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
    finally {
        connection === null || connection === void 0 ? void 0 : connection.close();
    }
});
exports.findAllCarsController = findAllCarsController;
const createCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const car = new car_1.default(data.nome, data.preco, data.cor, data.fabricante, data.categoria, data.ano_lancamento, data.assentos, data.potencia, data.aro, data.versao, data.peso, data.tipo_combustivel);
        const connection = yield (0, db_1.default)();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const carDocument = Object.assign({}, car);
        yield carCollection.insertOne(carDocument);
        const insertedCar = yield carCollection.findOne(carDocument);
        res.status(201).json({
            message: 'Carro criado com sucesso',
            Car: (0, remove_prefix_keys_1.removePrefixFromKeys)(insertedCar)
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
exports.createCarController = createCarController;
const updateCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = null;
    try {
        connection = yield (0, db_1.default)();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const id = req.params.id;
        ;
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
        const objId = new mongodb_1.ObjectId(id);
        const carro = new car_1.default(data.nome, data.preco, data.cor, data.fabricante, data.categoria, data.ano_lancamento, data.assentos, data.potencia, data.aro, data.versao, data.peso, data.tipo_combustivel);
        yield carCollection.updateOne({
            _id: objId
        }, {
            $set: (0, remove_prefix_keys_1.removePrefixFromKeys)(carro)
        });
        const result = yield carCollection.findOne({ _id: objId });
        if (!result) {
            res.status(404).json({
                message: 'Carro não encontrado!'
            });
        }
        else {
            const carWithoutPrefix = (0, remove_prefix_keys_1.removePrefixFromKeys)(result);
            res.status(200).json({
                message: 'Dados atualizados com sucesso.',
                Car: carWithoutPrefix,
            });
        }
    }
    catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
    finally {
        connection === null || connection === void 0 ? void 0 : connection.close();
    }
});
exports.updateCarController = updateCarController;
const deleteCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection = null;
    try {
        connection = yield (0, db_1.default)();
        const db = connection.db();
        const carCollection = db.collection('cars');
        const idCar = req.params.id;
        if (!idCar) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        else if (typeof idCar !== 'string') {
            throw new Error("O 'id' do automóvel deve ser uma string válida!");
        }
        else if (idCar.trim() === '') {
            throw new Error("O 'id' do automóvel não pode ser um campo vazio!");
        }
        const objId = new mongodb_1.ObjectId(idCar);
        const deletedCar = yield carCollection.findOneAndDelete({ _id: objId });
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
            message: err.message
        });
    }
    finally {
        connection === null || connection === void 0 ? void 0 : connection.close();
    }
});
exports.deleteCarController = deleteCarController;
