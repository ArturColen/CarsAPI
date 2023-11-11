"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarRepository = exports.updateCarRepository = exports.createCarRepository = exports.findCarByIdRepository = exports.findAllCarsRepository = void 0;
const car_js_1 = __importDefault(require("../models/car.js"));
const findAllCarsRepository = () => car_js_1.default.find();
exports.findAllCarsRepository = findAllCarsRepository;
const findCarByIdRepository = (idUser) => car_js_1.default.findById(idUser);
exports.findCarByIdRepository = findCarByIdRepository;
const createCarRepository = ({ model, price, color, manufacturer, category, releaseYear, numberSeats, enginePower, rimSize, version, weight, fuelType, }) => car_js_1.default.create({
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
const updateCarRepository = async (id, carData) => {
    const updatedCar = await car_js_1.default.findOneAndUpdate({ _id: id }, { ...carData }, { rawResult: true });
    return updatedCar;
};
exports.updateCarRepository = updateCarRepository;
const deleteCarRepository = (id) => car_js_1.default.findOneAndDelete({ _id: id }, { rawResult: true });
exports.deleteCarRepository = deleteCarRepository;
