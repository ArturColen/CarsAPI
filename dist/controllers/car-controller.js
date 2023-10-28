"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarController = exports.updateCarController = exports.createCarController = exports.findCarByName = exports.findAllCarsController = void 0;
const findAllCarsController = (req, res) => {
    res.status(200).json({
        message: 'Está funcionando! :)'
    });
};
exports.findAllCarsController = findAllCarsController;
const findCarByName = (req, res) => {
    try {
        const nome = req.params.nome;
        res.status(200).json({ message: `Carro ${nome} localizado com sucesso` });
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
    finally {
    }
};
exports.findCarByName = findCarByName;
const createCarController = (req, res) => {
};
exports.createCarController = createCarController;
const updateCarController = (req, res) => {
};
exports.updateCarController = updateCarController;
const deleteCarController = (req, res) => {
};
exports.deleteCarController = deleteCarController;
