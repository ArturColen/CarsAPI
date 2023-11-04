export default class Carro {
    private _nome: string;
    private _preco: number;
    private _cor: string;
    private _fabricante: string;
    private _categoria: string;
    private _ano_lancamento: number;
    private _assentos: number;
    private _potencia: number;
    private _aro: number;
    private _versao: string;
    private _peso: number;
    private _abastecimento: string;

    constructor(nome: string, preco: number, cor: string, fabricante: string, categoria: string, ano_lancamento: number, assentos: number, potencia: number, aro: number, versao: string, peso: number, abastecimento: string) {
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
        this._abastecimento = abastecimento;
    }

    get nome() {
        return this._nome;
    }

    get preco() {
        return this._preco;
    }

    get cor() {
        return this._cor;
    }

    get fabricante() {
        return this._fabricante;
    }

    get categoria() {
        return this._categoria;
    }

    get anoLancamento() {
        return this._ano_lancamento;
    }

    get assentos() {
        return this._assentos;
    }

    get potencia() {
        return this._potencia;
    }

    get aro() {
        return this._aro;
    }

    get versao() {
        return this._versao;
    }

    get peso() {
        return this._peso;
    }

    get abastecimento() {
        return this._abastecimento;
    }
}