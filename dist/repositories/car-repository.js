"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarRepository = exports.updateCarRepository = exports.createCarRepository = exports.findCarByIdRepository = exports.findAllCarsRepository = void 0;
const car_js_1 = require("../models/car.js");
const findAllCarsRepository = () => car_js_1.Car.find();
exports.findAllCarsRepository = findAllCarsRepository;
const findCarByIdRepository = (idCar) => car_js_1.Car.findById(idCar);
exports.findCarByIdRepository = findCarByIdRepository;
const createCarRepository = ({ model, price, color, manufacturer, category, releaseYear, numberSeats, enginePower, rimSize, version, weight, fuelType, }) => car_js_1.Car.create({
    model,
    price,
    color,
    manufacturer,
    category,
    releaseYear,
    numberSeats,
    enginePower,
    rimSize,
    version,
    weight,
    fuelType,
});
exports.createCarRepository = createCarRepository;
const updateCarRepository = async (idCar, carData) => {
    const updatedCar = await car_js_1.Car.findOneAndUpdate({ _id: idCar }, { ...carData }, { rawResult: true });
    return updatedCar;
};
exports.updateCarRepository = updateCarRepository;
const deleteCarRepository = (idCar) => car_js_1.Car.findOneAndDelete({ _id: idCar }, { rawResult: true });
exports.deleteCarRepository = deleteCarRepository;
