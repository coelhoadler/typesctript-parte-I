import { NegociacoesView, MensagemView } from '../views/index';

import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';

import { domInject, throttle } from '../helpers/decorators/index';

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

    @throttle()
    adiciona() {
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

    @throttle()
    importaDados() {

        const isOK = (data : Response) => {
            if (data.ok) {
                return data;
            } else {
                throw new Error(data.statusText);
            }
        };
        
        fetch("http://localhost:8080/dados")
            .then(res => isOK(res))
            .then(res => res.json())
            .then((dados : NegociacaoParcial[]) => {
                dados
                    .map(dado => new Negociacao(new Date(), dado.montante, dado.vezes))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));

                    this._negociacoesView.update(this._negociacoes);
            })
            .catch((err) => {
                throw new Error(err);
            })

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