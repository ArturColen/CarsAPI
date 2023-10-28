"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("../controllers/car-controller");
const carRouter = express_1.default.Router();
carRouter.get('/', car_controller_1.findAllCarsController);
carRouter.get('/search/:nome', car_controller_1.findCarByName);
carRouter.post('/create', car_controller_1.createCarController);
carRouter.put('/update/:id', car_controller_1.updateCarController);
carRouter.delete('/delete/:id', car_controller_1.deleteCarController);
exports.default = carRouter;
