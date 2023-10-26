"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findAllCarsController = void 0;
const findAllCarsController = (req, res) => {
    res.status(200).json({
        message: 'Está funcionando! :)'
    });
};
exports.findAllCarsController = findAllCarsController;
const createCarController = (req, res) => {
};
exports.createCarController = createCarController;
const updateCarController = (req, res) => {
};
exports.updateCarController = updateCarController;
const deleteCarController = (req, res) => {
};
exports.deleteCarController = deleteCarController;
