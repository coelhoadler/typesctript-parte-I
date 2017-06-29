import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

let dom = document.querySelector(".form");
let importa = document.querySelector("#botao-importar");

if (dom)
    dom.addEventListener("submit", controller.adiciona.bind(controller));

if (importa)
    importa.addEventListener("click", controller.importaDados.bind(controller));