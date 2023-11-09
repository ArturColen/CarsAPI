"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_middleware_js_1 = require("./middlewares/cors-middleware.js");
const cars_route_js_1 = __importDefault(require("./routes/cars-route.js"));
const error_middleware_js_1 = require("./middlewares/error-middleware.js");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, cors_middleware_js_1.configureCORS)(app);
app.use(error_middleware_js_1.errorMiddleware);
app.use('/cars', cars_route_js_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
