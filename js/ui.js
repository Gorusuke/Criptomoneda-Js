class Interfaz{


    constructor(){
        this.init();
    }

    init(){
        this.construirSelect();
    }

    construirSelect(){
        
        cotizador.obtenerMonedasAPI()
            .then((monedas) => {
                // seleccionar el select donde pondremos las modenas
                const select = document.getElementById('criptomoneda');
                // iterar por los resultados de la Api
                for(const[key, value] of Object.entries(monedas.monedas.Data)){
                    // añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        
        // seleccionar mensaje 
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        // mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    // imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, crypto){

        // ocultar el resultado anterior
        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        const datosMoneda =resultado[crypto][moneda];

        // recortar digitos
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let fechaActualizada = new Date(datosMoneda.LASTUPDATE *1000).toLocaleDateString('es-CO');

        // construir template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p> El Precio De ${datosMoneda.FROMSYMBOL} A Moneda ${datosMoneda.TOSYMBOL} Es De: $${precio}</p>
                    <p> Variacion Ultimo Dia: %${porcentaje}</p>
                    <p> Ultima Actualizacion: ${fechaActualizada}</p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            // insertar resultado
            document.getElementById('resultado').innerHTML = templateHTML;
            
            // oculatr el spinner
            this.mostrarOcultarSpinner('none');

        }, 3000);
    }

    // muestra ek spinner al cargar la cotizacion
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista; 
    }
}