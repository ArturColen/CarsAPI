"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findAllCarsController = void 0;
const carService = __importStar(require("../services/car-service"));
const validations_service_js_1 = require("../services/validations-service.js");
const findAllCarsController = async (req, res) => {
    try {
        const cars = await carService.findAllCarsService();
        res.status(200).json({
            Cars: cars
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};
exports.findAllCarsController = findAllCarsController;
const createCarController = async (req, res) => {
    try {
        const carData = req.body;
        (0, validations_service_js_1.validateCarData)(carData);
        const createdCar = await carService.createCarService(carData);
        res.status(201).json({
            message: 'Carro criado com sucesso',
            Car: createdCar,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.createCarController = createCarController;
const updateCarController = async (req, res) => {
    try {
        const id = req.params.id;
        const carData = req.body;
        if (!id) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        (0, validations_service_js_1.validateCarData)(carData);
        const updatedCar = await carService.updateCarService(id, carData);
        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Car: updatedCar,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
exports.updateCarController = updateCarController;
const deleteCarController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error("O parâmetro 'id' não foi fornecido na consulta.");
        }
        await carService.deleteCarService(id);
        res.status(200).json({
            message: 'Exclusão feita com sucesso!'
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};
exports.deleteCarController = deleteCarController;
