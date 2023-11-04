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
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findCarByName = exports.findAllCarsController = void 0;
const mongodb_1 = require("mongodb");
const car_1 = __importDefault(require("../models/car"));
const db_1 = __importDefault(require("../db"));
const remove_prefix_keys_1 = require("../utils/remove-prefix-keys");
const findAllCarsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("cars");
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
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.findAllCarsController = findAllCarsController;
const findCarByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        const nome = req.query.nome;
        if (nome === undefined) {
            throw new Error("O parâmetro 'nome' não foi fornecido na consulta.");
        }
        if (typeof nome !== "string") {
            throw new Error("Informe corretamente o nome do carro");
        }
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = yield db.collection("cars");
        const query = { nome };
        const result = yield carCollection.find(query).toArray();
        if (result.length === 0) {
            res.status(404).json({
                message: "Carro não encontrado"
            });
        }
        else {
            const carsWithoutPrefix = result.map(remove_prefix_keys_1.removePrefixFromKeys);
            res.status(200).json({
                Car: carsWithoutPrefix
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.findCarByName = findCarByName;
const createCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.nome === undefined || data.nome === null || typeof data.nome !== 'string' || data.nome.trim() === "") {
            throw new Error("Nome do automóvel inválido!");
        }
        else if (data.preco === undefined || data.preco === null || typeof data.preco !== 'number' || data.preco.toString().trim() === "") {
            throw new Error("Preço do automóvel inválido!");
        }
        else if (data.cor === undefined || data.cor === null || typeof data.cor !== 'string' || data.cor.trim() === "") {
            throw new Error("Cor do automóvel inválida!");
        }
        else if (data.fabricante === undefined || data.fabricante === null || typeof data.fabricante !== 'string' || data.fabricante.trim() === "") {
            throw new Error("Fabricante do automóvel inválido!");
        }
        else if (data.categoria === undefined || data.categoria === null || typeof data.categoria !== 'string' || data.categoria.trim() === "") {
            throw new Error("Categoria do automóvel inválida!");
        }
        else if (data.ano_lancamento === undefined || data.ano_lancamento === null || typeof data.ano_lancamento !== 'number' || data.ano_lancamento.toString().trim() === "") {
            throw new Error("Ano de lançamento do automóvel inválido!");
        }
        else if (data.assentos === undefined || data.assentos === null || typeof data.assentos !== 'number' || data.assentos.toString().trim() === "") {
            throw new Error("Quantidade de assentos do automóvel inválida!");
        }
        else if (data.potencia === undefined || data.potencia === null || typeof data.potencia !== 'number' || data.potencia.toString().trim() === "") {
            throw new Error("Potência do automóvel inválida!");
        }
        else if (data.aro === undefined || data.aro === null || typeof data.aro !== 'number' || data.aro.toString().trim() === "") {
            throw new Error("Aro do automóvel inválido!");
        }
        else if (data.versao === undefined || data.versao === null || typeof data.versao !== 'string' || data.versao.trim() === "") {
            throw new Error("Versão do automóvel inválida!");
        }
        else if (data.peso === undefined || data.peso === null || typeof data.peso !== 'number' || data.peso.toString().trim() === "") {
            throw new Error("Peso do automóvel inválido!");
        }
        else if (data.abastecimento === undefined || data.abastecimento === null || typeof data.abastecimento !== 'string' || data.abastecimento.trim() === "") {
            throw new Error("Abastecimento do automóvel inválido!");
        }
        const car = new car_1.default(data.nome, data.preco, data.cor, data.fabricante, data.categoria, data.ano_lancamento, data.assentos, data.potencia, data.aro, data.versao, data.peso, data.abastecimento);
        const conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("cars");
        const carDocument = Object.assign({}, car);
        const result = yield carCollection.insertOne((0, remove_prefix_keys_1.removePrefixFromKeys)(carDocument));
        const insertedId = result.insertedId;
        const insertedCar = yield carCollection.findOne({ _id: insertedId });
        res.status(201).json({
            message: "Carro criado com sucesso"
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
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("cars");
        const id = req.query.id;
        const data = req.body;
        if (id === undefined) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        if (id === null || typeof id !== 'string' || id.trim() === "") {
            throw new Error("Id do automóvel inválido!");
        }
        else if (data.nome === undefined || data.nome === null || typeof data.nome !== 'string' || data.nome.trim() === "") {
            throw new Error("Nome do automóvel inválido!");
        }
        else if (data.preco === undefined || data.preco === null || typeof data.preco !== 'number' || data.preco.toString().trim() === "") {
            throw new Error("Preço do automóvel inválido!");
        }
        else if (data.cor === undefined || data.cor === null || typeof data.cor !== 'string' || data.cor.trim() === "") {
            throw new Error("Cor do automóvel inválida!");
        }
        else if (data.fabricante === undefined || data.fabricante === null || typeof data.fabricante !== 'string' || data.fabricante.trim() === "") {
            throw new Error("Fabricante do automóvel inválido!");
        }
        else if (data.categoria === undefined || data.categoria === null || typeof data.categoria !== 'string' || data.categoria.trim() === "") {
            throw new Error("Categoria do automóvel inválida!");
        }
        else if (data.ano_lancamento === undefined || data.ano_lancamento === null || typeof data.ano_lancamento !== 'number' || data.ano_lancamento.toString().trim() === "") {
            throw new Error("Ano de lançamento do automóvel inválido!");
        }
        else if (data.assentos === undefined || data.assentos === null || typeof data.assentos !== 'number' || data.assentos.toString().trim() === "") {
            throw new Error("Quantidade de assentos do automóvel inválida!");
        }
        else if (data.potencia === undefined || data.potencia === null || typeof data.potencia !== 'number' || data.potencia.toString().trim() === "") {
            throw new Error("Potência do automóvel inválida!");
        }
        else if (data.aro === undefined || data.aro === null || typeof data.aro !== 'number' || data.aro.toString().trim() === "") {
            throw new Error("Aro do automóvel inválido!");
        }
        else if (data.versao === undefined || data.versao === null || typeof data.versao !== 'string' || data.versao.trim() === "") {
            throw new Error("Versão do automóvel inválida!");
        }
        else if (data.peso === undefined || data.peso === null || typeof data.peso !== 'number' || data.peso.toString().trim() === "") {
            throw new Error("Peso do automóvel inválido!");
        }
        else if (data.abastecimento === undefined || data.abastecimento === null || typeof data.abastecimento !== 'string' || data.abastecimento.trim() === "") {
            throw new Error("Abastecimento do automóvel inválido!");
        }
        const objId = new mongodb_1.ObjectId(id);
        const carro = new car_1.default(data.nome, data.preco, data.cor, data.fabricante, data.categoria, data.ano_lancamento, data.assentos, data.potencia, data.aro, data.versao, data.peso, data.abastecimento);
        yield carCollection.updateOne({
            _id: objId
        }, {
            $set: (0, remove_prefix_keys_1.removePrefixFromKeys)(carro)
        });
        const result = yield carCollection.findOne({ _id: objId });
        if (result === undefined || result === null) {
            throw new Error("Carro não encontrado! Por favor, verifique se o ID inserido está correto!");
        }
        const carWithoutPrefix = (0, remove_prefix_keys_1.removePrefixFromKeys)(result);
        res.status(200).json({
            message: "Dados atualizados com sucesso."
        });
    }
    catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.updateCarController = updateCarController;
const deleteCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
    }
});
exports.deleteCarController = deleteCarController;
