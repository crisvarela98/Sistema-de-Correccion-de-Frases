var correcciones;

async function cargarCorrecciones() {
    try {
        var respuesta = await fetch('data/correcciones.json');
        correcciones = await respuesta.json();
        console.log('Correcciones cargadas:', correcciones);
    } catch (error) {
        console.error('Error al cargar las correcciones:', error);
    }
}

cargarCorrecciones();

function corregirFrase() {
    var fraseOriginal = document.getElementById('frase').value;
    var fraseCorregida = aplicarCorrecciones(fraseOriginal);

    document.getElementById('resultado').innerHTML = `
        <p>Frase Corregida: ${fraseCorregida}</p>
    `;
}

function aplicarCorrecciones(frase) {
    if (!correcciones || !correcciones.correcciones) {
        console.error('Error: No se han cargado las correcciones.');
        return frase;
    }

    // Aplicar correcciones de palabra
    correcciones.correcciones.forEach(correccion => {
        if (correccion.palabra) {
            var expresionRegular = new RegExp("\\b" + correccion.palabra + "\\b", 'gi');
            frase = frase.replace(expresionRegular, correccion.correccion);
        }
    });

    // Aplicar correcciones de frase
    correcciones.correcciones.forEach(correccion => {
        if (correccion.frase) {
            var expresionRegular = new RegExp(correccion.frase, 'gi');
            frase = frase.replace(expresionRegular, correccion.correccion);
        }
    });

    return frase;
}
