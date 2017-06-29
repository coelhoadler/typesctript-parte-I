import { NegociacoesView, MensagemView } from '../views/index';

import { Negociacao, Negociacoes } from '../models/index';

import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData : HTMLInputElement;
    
    @domInject('#quantidade')
    private _inputQuantidade : HTMLInputElement;

    @domInject('#valor')
    private _inputValor : HTMLInputElement;

    private _negociacoes  = new Negociacoes();
    private _negociacoesView = new NegociacoesView("#negociacoesView", true);
    private _mensagemView = new MensagemView("#mensagemView", true); 

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event : Event) {
        event.preventDefault();

        let data = new Date(this._inputData.value.replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update("A negociação precisa ser realizada em um dia útil! :(");
            return;
        }

        const negociacao = new Negociacao(
            data,
            +this._inputQuantidade.value,
            +this._inputValor.value
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);

        this._mensagemView.update("Negociação adicionada com sucesso :)");
    }

    private _ehDiaUtil(data : Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

}

enum DiaDaSemana { 
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}