"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarService = exports.updateCarService = exports.createCarService = exports.findCarByIdService = exports.findAllCarsService = void 0;
const car_repository_js_1 = require("../repositories/car-repository.js");
const carValidations_service_js_1 = require("./carValidations-service.js");
const findAllCarsService = async () => {
    try {
        const cars = await (0, car_repository_js_1.findAllCarsRepository)();
        return cars;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.findAllCarsService = findAllCarsService;
const findCarByIdService = async (idCar) => {
    try {
        if (!idCar) {
            throw new Error('Id do carro não informado!');
        }
        const car = await (0, car_repository_js_1.findCarByIdRepository)(idCar);
        if (!car) {
            throw new Error('Carro não encontrado!');
        }
        return car;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.findCarByIdService = findCarByIdService;
const createCarService = async (carData) => {
    try {
        (0, carValidations_service_js_1.validateCarData)(carData);
        const createdCar = await (0, car_repository_js_1.createCarRepository)(carData);
        return createdCar;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.createCarService = createCarService;
const updateCarService = async (idCar, carData) => {
    try {
        (0, carValidations_service_js_1.validateCarData)(carData);
        const updatedCar = await (0, car_repository_js_1.updateCarRepository)(idCar, carData);
        if (!updatedCar) {
            throw new Error('Carro não encontrado!');
        }
        const updatedCarDocument = await (0, car_repository_js_1.findCarByIdRepository)(idCar);
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
const deleteCarService = async (idCar) => {
    try {
        const deletedCar = await (0, car_repository_js_1.deleteCarRepository)(idCar);
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
