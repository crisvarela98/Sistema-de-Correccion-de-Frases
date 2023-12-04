var correcciones;
var temaNoche = false;

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
    var palabras = fraseOriginal.split(/\s+/);

    var fraseCorregida = palabras.map(function(palabra) {
        var palabraLimpia = palabra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
        return correcciones.palabrasOfensivas[palabraLimpia] || palabra;
    });

    document.getElementById('resultado').innerHTML = `
        <p>Frase Original: ${fraseOriginal}</p>
        <p>Frase Corregida: ${fraseCorregida.join(' ').trim()}</p>
    `;
}

function cambiarTema() {
    temaNoche = !temaNoche;
    document.body.classList.toggle('noche', temaNoche);
    document.querySelector('.container').classList.toggle('noche', temaNoche);
    document.querySelector('button').classList.toggle('noche', temaNoche);
    document.querySelector('h1').classList.toggle('noche', temaNoche);
    document.querySelector('#resultado').classList.toggle('noche', temaNoche);
}
