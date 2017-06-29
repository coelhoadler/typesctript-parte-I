export function domInject(seletor : string) {

    return function(target : any, key : string) {

        let elemento : Element;

        const getter = function() {
            if (!elemento) {
                console.log(`buscando elemento do DOM pelo seletor: #${seletor}, para injetar na propriedade ${key}`);
                elemento = <HTMLElement> document.querySelector(seletor);
                console.log(elemento);
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get : getter // toda vez que eu faço um get ele acessa essa função
        })

    }

}