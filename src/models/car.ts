import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
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

export const Car = mongoose.model('Car', CarSchema);