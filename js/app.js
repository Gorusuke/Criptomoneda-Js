const cotizador = new API('7895fbc0bb993f7f16fedd236b1849129b62689642f69e9cb0b80549c72269b8');
const ui = new Interfaz();




// leer formulario

const formulario = document.getElementById('formulario');

// EventListeners
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    // leer la moneda seleccionada
    const monedaSelect = document.getElementById('moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    // la Criptomoneda seleccionada
    const criptoMonedaSelect = document.getElementById('criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    // comprobar que los campos no esten vacios
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        // Arrojar una aletra de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else{
        // todo bien, consultar api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then((result) => {
                ui.mostrarResultado(result.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada)
            })
    }

});