export function logarTempoDeExecucao(props : IlogarTempoDeExecucao) {

    return function(target: any, propertyKey: string, descriptor : PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            let unidade : any;
            let divisor : any;

            if (props) {
                if (props.timestampFormat) {
                    if (props.timestampFormat == "seconds") {
                        console.log("caindo aqui");
                        unidade = "s";
                        divisor = 1000;
                    } else {
                        unidade = "ms";
                        divisor = 1;
                    }
                }
            }

            console.log("-----------------");
            console.log(`parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();

            console.log(`o retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
            console.log(`o método ${propertyKey} demorou ${((t2 - t1) / divisor).toFixed(3)} ${unidade}`);

            return retorno;
        }

        return descriptor;

    }

}

interface IlogarTempoDeExecucao {
    timestampFormat : string;
}