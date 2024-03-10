"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findCarByIdController = exports.findAllCarsController = void 0;
const carValidations_service_js_1 = require("../services/carValidations-service.js");
const car_service_1 = require("../services/car-service");
const findAllCarsController = async (req, res) => {
    try {
        const cars = await (0, car_service_1.findAllCarsService)();
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
const findCarByIdController = async (req, res) => {
    try {
        const idCar = req.query.id;
        if (!idCar) {
            throw new Error('O "id" não foi fornecido na consulta.');
        }
        const car = await (0, car_service_1.findCarByIdService)(idCar);
        res.status(200).json({
            Car: car
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para exibição do carro.',
            });
        }
        else {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
exports.findCarByIdController = findCarByIdController;
const createCarController = async (req, res) => {
    try {
        const carData = req.body;
        (0, carValidations_service_js_1.validateCarData)(carData);
        const createdCar = await (0, car_service_1.createCarService)(carData);
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
        const idCar = req.params.id;
        const carData = req.body;
        if (!idCar) {
            throw new Error('O parâmetro "id" não foi fornecido na consulta.');
        }
        (0, carValidations_service_js_1.validateCarData)(carData);
        const updatedCar = await (0, car_service_1.updateCarService)(idCar, carData);
        res.status(200).json({
            message: 'Dados atualizados com sucesso.',
            Car: updatedCar,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para atualização do carro.',
            });
        }
        else {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
exports.updateCarController = updateCarController;
const deleteCarController = async (req, res) => {
    try {
        const idCar = req.params.id;
        if (!idCar) {
            throw new Error('O parâmetro "id" não foi fornecido na consulta.');
        }
        await (0, car_service_1.deleteCarService)(idCar);
        res.status(200).json({
            message: 'Exclusão feita com sucesso!'
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
            res.status(400).json({
                message: 'O "id" fornecido não é válido para exclusão do carro.',
            });
        }
        else {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
exports.deleteCarController = deleteCarController;
