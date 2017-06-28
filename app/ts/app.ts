import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

let dom = document.querySelector(".form");

if (dom)
    dom.addEventListener("submit", controller.adiciona.bind(controller));