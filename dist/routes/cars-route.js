"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_controller_js_1 = require("../controllers/car-controller.js");
const token_middleware_js_1 = require("../middlewares/token-middleware.js");
const carRouter = express_1.default.Router();
carRouter.get('/', car_controller_js_1.findAllCarsController);
carRouter.get('/search', car_controller_js_1.findCarByIdController);
carRouter.post('/', token_middleware_js_1.verifyTokenInBack, car_controller_js_1.createCarController);
carRouter.put('/:id', token_middleware_js_1.verifyTokenInBack, car_controller_js_1.updateCarController);
carRouter.delete('/:id', token_middleware_js_1.verifyTokenInBack, car_controller_js_1.deleteCarController);
exports.default = carRouter;
