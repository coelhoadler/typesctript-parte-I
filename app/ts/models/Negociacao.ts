export class Negociacao {

    // constructor(private _data : Date, private _quantidade : number, private _valor : number) { }
    constructor(readonly data : Date, readonly quantidade : number, readonly valor : number) { }

    // quando usamos o modificador de acesso "readonly"
    // ñ precisamos declarar os getters

    // get data() {
    //     return this._data;
    // }

    // get quantidade() {
    //     return this._quantidade;
    // }

    // get valor() {
    //     return this._valor;
    // }

    get volume() {
        return this.quantidade * this.valor;
    }

}