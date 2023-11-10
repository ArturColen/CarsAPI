"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Carro {
    constructor(nome, preco, cor, fabricante, categoria, ano_lancamento, assentos, potencia, aro, versao, peso, tipo_combustivel) {
        this._nome = nome;
        this._preco = preco;
        this._cor = cor;
        this._fabricante = fabricante;
        this._categoria = categoria;
        this._ano_lancamento = ano_lancamento;
        this._assentos = assentos;
        this._potencia = potencia;
        this._aro = aro;
        this._versao = versao;
        this._peso = peso;
        this._tipo_combustivel = tipo_combustivel;
    }
}
exports.default = Carro;
