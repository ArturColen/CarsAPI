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
const db_1 = __importDefault(require("../db"));
const findAllCarsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("car");
        const result = yield carCollection.find().toArray();
        res.status(200).json({ Cars: result });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.findAllCarsController = findAllCarsController;
const findCarByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, db_1.default)();
        const db = conn.db();
        const carCollection = db.collection("car");
        const nome = req.params.nome;
        const result = yield carCollection.findOne({ nome: nome });
        res.status(200).json({ message: result });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.findCarByName = findCarByName;
const createCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //db.carro.insertOne({nome: "Kwdi", preco: 70000, cor: "Vermelho", fabricante: "Renault", categoria: "Compacto", ano_lancamento: 2018, assentos: 5, potencia: 75, aro: 13, versao: "Outsider", peso: 100, abastecimento: "flex"})
    }
    catch (err) {
    }
});
exports.createCarController = createCarController;
const updateCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
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
