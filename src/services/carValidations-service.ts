import { CarInterface } from '../interfaces/car-interface';

export const validateCarData = (carData: CarInterface) => {
    if (!carData.model) {
        throw new Error('Favor preencher corretamente o modelo do automóvel!');
    }
    else if (typeof carData.model !== 'string') {
        throw new Error('O modelo do automóvel deve ser uma string válida!');
    }
    else if (carData.model.trim() === '') {
        throw new Error('O modelo do automóvel não pode ser um campo vazio!');
    }
        
    if (!carData.price) {
        throw new Error('Favor preencher corretamente o preço do automóvel!');
    }
    else if (typeof carData.price !== 'number') {
        throw new Error('O preço do automóvel deve ser um número válido!');
    }
    else if (carData.price.toString().trim() === '') {
        throw new Error('O preço do automóvel não pode ser um campo vázio!');
    }
        
    if (!carData.color) {
        throw new Error('Favor preencher corretamente a cor do automóvel!');
    }
    else if (typeof carData.color !== 'string') {
        throw new Error('A cor do automóvel deve ser uma string válida!');
    }
    else if (carData.color.trim() === '') {
        throw new Error('A cor do automóvel não pode ser um campo vazio!');
    }
        
    if (!carData.manufacturer) {
        throw new Error('Favor preencher corretamente o fabricante do automóvel!');
    }
    else if (typeof carData.manufacturer !== 'string') {
        throw new Error('O fabricante do automóvel deve ser uma string válida!');
    }
    else if (carData.manufacturer.trim() === '') {
        throw new Error('O fabricante do automóvel não pode ser um campo vazio!');
    }
        
    if (!carData.category) {
        throw new Error('Favor preencher corretamente a categoria do automóvel!');
    }
    else if (typeof carData.category !== 'string') {
        throw new Error('A categoria do automóvel deve ser uma string válida!');
    }
    else if (carData.category.trim() === '') {
        throw new Error('A categoria do automóvel não pode ser um campo vazio!');
    }
        
    if (!carData.releaseYear) {
        throw new Error('Favor preencher corretamente o ano de lançamento do automóvel!');
    }
    else if (typeof carData.releaseYear !== 'number') {
        throw new Error('O ano de lançamento do automóvel deve ser um número válido!');
    }
    else if (carData.releaseYear.toString().trim() === '') {
        throw new Error('O ano de lançamento do automóvel não pode ser um campo vázio!');
    }

    if (!carData.numberSeats) {
        throw new Error('Favor preencher corretamente a quantidade de assentos do automóvel!');
    }
    else if (typeof carData.numberSeats !== 'number') {
        throw new Error('A quantidade de assentos do automóvel deve ser um número válido!');
    }
    else if (carData.numberSeats.toString().trim() === '') {
        throw new Error('A quantidade de assentos do automóvel não pode ser um campo vázio!');
    }
    
    if (!carData.enginePower) {
        throw new Error('Favor preencher corretamente a potência do automóvel!');
    }
    else if (typeof carData.enginePower !== 'number') {
        throw new Error('A potência do automóvel deve ser um número válido!');
    }
    else if (carData.enginePower.toString().trim() === '') {
        throw new Error('A potência do automóvel não pode ser um campo vázio!');
    }
    
    if (!carData.rimSize) {
        throw new Error('Favor preencher corretamente o tamanho do aro do automóvel!');
    }
    else if (typeof carData.rimSize !== 'number') {
        throw new Error('O tamanho do aro do automóvel deve ser um número válido!');
    }
    else if (carData.rimSize.toString().trim() === '') {
        throw new Error('O tamanho do aro do automóvel não pode ser um campo vázio!');
    }
    
    if (!carData.version) {
        throw new Error('Favor preencher corretamente a versão do automóvel!');
    }
    else if (typeof carData.version !== 'string') {
        throw new Error('A versão do automóvel deve ser uma string válida!');
    }
    else if (carData.version.trim() === '') {
        throw new Error('A versão do automóvel não pode ser um campo vazio!');
    }
    
    if (!carData.weight) {
        throw new Error('Favor preencher corretamente o peso do automóvel!');
    }
    else if (typeof carData.weight !== 'number') {
        throw new Error('O peso do automóvel deve ser um número válido!');
    }
    else if (carData.weight.toString().trim() === '') {
        throw new Error('O peso do automóvel não pode ser um campo vázio!');
    }
    
    if (!carData.fuelType) {
        throw new Error('Favor preencher corretamente o tipo de combustível do automóvel!');
    }
    else if (typeof carData.fuelType !== 'string') {
        throw new Error('O tipo de combustível do automóvel deve ser uma string válida!');
    }
    else if (carData.fuelType.trim() === '') {
        throw new Error('O tipo de combustível do automóvel não pode ser um campo vazio!');
    }
};