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
        const nome = req.params.nome;
        if (nome === undefined) {
            throw new Error("O parâmetro 'nome' não foi fornecido na consulta.");
        }
        if (typeof nome !== "string") {
            throw new Error("Informe corretamente o nome do carro");
        }
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = yield db.collection("cars");
        const query = { _nome: nome };
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
    let conn = null;
    try {
        const conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("cars");
        const carData = req.body;
        const newId = new mongodb_1.ObjectId();
        const newIdString = newId.toString();
        const car = new car_1.default(newIdString, carData.nome, carData.preco, carData.cor, carData.fabricante, carData.categoria, carData.ano_lancamento, carData.assentos, carData.potencia, carData.aro, carData.versao, carData.peso, carData.abastecimento);
        try {
            if (carData.nome.toString().trim() === "" || carData.nome === null || carData.nome === undefined || typeof carData.nome !== 'string') {
                throw new Error("Favor inserir o nome do automóvel de forma válida.");
            }
            else if (carData.preco.toString().trim() === "" || carData.preco === null || carData.preco === undefined || typeof carData.preco !== 'number') {
                throw new Error("Favor inserir o preço do automóvel de forma válida");
            }
            else if (carData.cor.toString().trim() === "" || carData.cor === null || carData.cor === undefined || typeof carData.cor !== 'string') {
                throw new Error("Favor inserir a cor do automóvel de forma válida");
            }
            else if (carData.fabricante.toString().trim() === "" || carData.fabricante === null || carData.fabricante === undefined || typeof carData.fabricante !== 'string') {
                throw new Error("Favor inserir o fabricante de automóveis de forma válida.");
            }
            else if (carData.categoria.toString().trim() === "" || carData.categoria === null || carData.categoria === undefined || typeof carData.categoria !== 'string') {
                throw new Error("Favor inserir a categoria do automóveis de forma válida.");
            }
            else if (carData.ano_lancamento.toString().trim() === "" || carData.ano_lancamento === null || carData.ano_lancamento === undefined || typeof carData.ano_lancamento !== 'number') {
                throw new Error("Favor inserir o ano de lançamento do automóvel de forma válida.");
            }
            else if (carData.assentos.toString().trim() === "" || carData.assentos === null || carData.assentos === undefined || typeof carData.assentos !== 'number') {
                throw new Error("Favor inserir a quantidade de assentos do automóvel de forma válida.");
            }
            else if (carData.potencia.toString().trim() === "" || carData.potencia === null || carData.potencia === undefined || typeof carData.potencia !== 'number') {
                throw new Error("Favor inserir a potência do automóvel de forma válida.");
            }
            else if (carData.aro.toString().trim() === "" || carData.aro === null || carData.aro === undefined || typeof carData.aro !== 'number') {
                throw new Error("Favor inserir o aro do automóvelde forma válida.");
            }
            else if (carData.versao.toString().trim() === "" || carData.versao === null || carData.versao === undefined || typeof carData.versao !== 'string') {
                throw new Error("Favor inserir a versão do automóvel de forma válida.");
            }
            else if (carData.peso.toString().trim() === "" || carData.peso === null || carData.peso === undefined || typeof carData.peso !== 'number') {
                throw new Error("Favor inserir o peso do automóvel de forma válida.");
            }
            else if (carData.abastecimento.toString().trim() === "" || carData.abastecimento === null || carData.abastecimento === undefined || typeof carData.abastecimento !== 'string') {
                throw new Error("Favor inserir o tipo bastecimento do automóvel de forma válida.");
            }
        }
        catch (err) {
            res.status(400).json({ message: err.message });
            return;
        }
        const carDocument = Object.assign({}, car);
        const result = yield carCollection.insertOne(carDocument);
        const insertedId = result.insertedId;
        const insertedCar = yield carCollection.findOne({ _id: insertedId });
        res.status(201).json({
            message: "Carro criado com sucesso", carro: insertedCar
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
    /*finally {
        conn?.close();
    }
    */
});
exports.createCarController = createCarController;
const updateCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("cars");
        const id = req.params.id;
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
        };
        if (id.toString().trim() === "" || id === null || id === undefined || typeof id !== 'string') {
            throw new Error("Id do automóvel inválido!");
        }
        else if (data.nome.toString().trim() === "" || data.nome === null || data.nome === undefined || typeof data.nome !== 'string') {
            throw new Error("Nome do automóvel inválido!");
        }
        else if (data.preco.toString().trim() === "" || data.preco === null || data.preco === undefined || typeof data.preco !== 'number') {
            throw new Error("Preço do automóvel inválido!");
        }
        //faltou adicionar a validação de cor
        else if (data.fabricante.toString().trim() === "" || data.fabricante === null || data.fabricante === undefined || typeof data.fabricante !== 'string') {
            throw new Error("Fabricante do automóvel inválido!");
        }
        else if (data.categoria.toString().trim() === "" || data.categoria === null || data.categoria === undefined || typeof data.categoria !== 'string') {
            throw new Error("Categoria do automóvel inválido!");
        }
        else if (data.ano_lancamento.toString().trim() === "" || data.ano_lancamento === null || data.ano_lancamento === undefined || typeof data.ano_lancamento !== 'number') {
            throw new Error("Ano de lançamento do automóvel inválido!");
        }
        else if (data.assentos.toString().trim() === "" || data.assentos === null || data.assentos === undefined || typeof data.assentos !== 'number') {
            throw new Error("Assentos do automóvel inválido!");
        }
        else if (data.potencia.toString().trim() === "" || data.potencia === null || data.potencia === undefined || typeof data.potencia !== 'number') {
            throw new Error("Potência do automóvel inválido!");
        }
        else if (data.aro.toString().trim() === "" || data.aro === null || data.aro === undefined || typeof data.aro !== 'number') {
            throw new Error("Aro do automóvel inválido!");
        }
        else if (data.versao.toString().trim() === "" || data.versao === null || data.versao === undefined || typeof data.versao !== 'string') {
            throw new Error("Versão do automóvel inválido!");
        }
        else if (data.peso.toString().trim() === "" || data.peso === null || data.peso === undefined || typeof data.peso !== 'number') {
            throw new Error("Peso do automóvel inválido!");
        }
        else if (data.abastecimento.toString().trim() === "" || data.abastecimento === null || data.abastecimento === undefined || typeof data.abastecimento !== 'string') {
            throw new Error("Abastecimento do automóvel inválido!");
        }
        const objId = new mongodb_1.ObjectId(id);
        yield carCollection.updateOne({
            _id: objId
        }, {
            $set: data
        });
        const result = yield carCollection.findOne({ _id: objId });
        const carWithoutPrefix = (0, remove_prefix_keys_1.removePrefixFromKeys)(result);
        res.status(200).json({
            message: carWithoutPrefix
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
