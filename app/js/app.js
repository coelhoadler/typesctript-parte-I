System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoController_1, controller, dom, importa;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoController_1.NegociacaoController();
            dom = document.querySelector(".form");
            importa = document.querySelector("#botao-importar");
            if (dom)
                dom.addEventListener("submit", controller.adiciona.bind(controller));
            if (importa)
                importa.addEventListener("click", controller.importaDados.bind(controller));
        }
    };
});
