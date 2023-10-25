"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_middlewares_js_1 = require("./middlewares/cors.middlewares.js");
const routes_1 = __importDefault(require("./routes"));
const port = 3000;
const app = (0, express_1.default)();
(0, cors_middlewares_js_1.configureCORS)(app);
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
