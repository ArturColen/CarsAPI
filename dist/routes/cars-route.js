"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_js_1 = require("../controllers/car-controller.js");
const carRouter = express_1.default.Router();
carRouter.get('/', car_controller_js_1.findAllCarsController);
carRouter.get('/search', car_controller_js_1.findCarByIdController);
carRouter.post('/', car_controller_js_1.createCarController);
carRouter.put('/:id', car_controller_js_1.updateCarController);
carRouter.delete('/:id', car_controller_js_1.deleteCarController);
exports.default = carRouter;
