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
exports.deleteCarService = exports.updateCarService = exports.createCarService = exports.findAllCarsService = void 0;
const carRepository = __importStar(require("../repositories/car-repository.js"));
const validations_service_js_1 = require("./validations-service.js");
const findAllCarsService = async () => {
    try {
        const cars = await carRepository.findAllCarsRepository();
        return cars;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.findAllCarsService = findAllCarsService;
const createCarService = async (carData) => {
    try {
        (0, validations_service_js_1.validateCarData)(carData);
        const createdCar = await carRepository.createCarRepository(carData);
        return createdCar;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createCarService = createCarService;
const updateCarService = async (id, carData) => {
    try {
        (0, validations_service_js_1.validateCarData)(carData);
        const updatedCar = await carRepository.updateCarRepository(id, carData);
        if (!updatedCar) {
            throw new Error('Carro não encontrado!');
        }
        const updatedCarDocument = await carRepository.findCarByIdRepository(id);
        if (!updatedCarDocument) {
            throw new Error('Carro não encontrado!');
        }
        return updatedCarDocument;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.updateCarService = updateCarService;
const deleteCarService = async (id) => {
    try {
        const deletedCar = await carRepository.deleteCarRepository(id);
        if (!deletedCar) {
            throw new Error('Carro não encontrado!');
        }
        return deletedCar;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.deleteCarService = deleteCarService;
