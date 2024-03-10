import mongoose from 'mongoose';
import { CarInterface } from '../interfaces/car-interface.js';
import { Car } from '../models/car.js';

export const findAllCarsRepository = () => Car.find();

export const findCarByIdRepository = (idCar: string) => Car.findById(idCar);

export const createCarRepository = ({
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
}: CarInterface) => 
    Car.create({
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

export const updateCarRepository = async (idCar: string, carData: Partial<CarInterface>): Promise<mongoose.Document | null> => {
    const updatedCar = await Car.findOneAndUpdate (
        { _id: idCar },
        { ...carData },
        { rawResult: true }
    );
    
    return updatedCar;
};

export const deleteCarRepository = (idCar: string) => Car.findOneAndDelete({ _id: idCar }, { rawResult: true });