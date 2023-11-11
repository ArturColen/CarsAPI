"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CarSchema = new mongoose_1.default.Schema({
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    numberSeats: {
        type: Number,
        required: true,
    },
    enginePower: {
        type: Number,
        required: true,
    },
    rimSize: {
        type: Number,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    fuelType: {
        type: String,
        required: true,
    },
});
const Car = mongoose_1.default.model('Car', CarSchema);
exports.default = Car;
