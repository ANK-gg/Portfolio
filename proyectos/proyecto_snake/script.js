const lienzo = document.getElementById("gameCanvas");
const ctx = lienzo.getContext("2d");

// Cargar imágenes de la cabeza
const imgCabeza = {
    ARRIBA: new Image(),
    ABAJO: new Image(),
    IZQUIERDA: new Image(),
    DERECHA: new Image()
};
imgCabeza.ARRIBA.src = "material/cabeza_arriba.png";
imgCabeza.ABAJO.src = "material/cabeza_abajo.png";
imgCabeza.IZQUIERDA.src = "material/cabeza_izquierda.png";
imgCabeza.DERECHA.src = "material/cabeza_derecha.png";

// Cargar imágenes del cuerpo
const imgCuerpo = {
    ARRIBA: new Image(),
    ABAJO: new Image(),
    IZQUIERDA: new Image(),
    DERECHA: new Image()
};
imgCuerpo.ARRIBA.src = "material/cuerpo_arriba.png";
imgCuerpo.ABAJO.src = "material/cuerpo_abajo.png";
imgCuerpo.IZQUIERDA.src = "material/cuerpo_izquierda.png";
imgCuerpo.DERECHA.src = "material/cuerpo_derecha.png";

// Cargar imágenes de la cola
const imgCola = {
    ARRIBA: new Image(),
    ABAJO: new Image(),
    IZQUIERDA: new Image(),
    DERECHA: new Image()
};
imgCola.ARRIBA.src = "material/cola_arriba.png";
imgCola.ABAJO.src = "material/cola_abajo.png";
imgCola.IZQUIERDA.src = "material/cola_izquierda.png";
imgCola.DERECHA.src = "material/cola_derecha.png";

const imgComida = new Image();
imgComida.src = "material/manzana.png"; // Asegúrate que la ruta sea correcta
let juegoActivo = true;
const tamaño = 20;

// Variables de la serpiente
let serpiente = [{ x: 200, y: 200 }];
let direccion = "DERECHA";

// Comida y puntaje
let comida = { x: 0, y: 0 };
let puntaje = 0;

// Inicializar juego
function iniciarJuego() {
    generarComida();
    document.addEventListener("keydown", cambiarDireccion);
    setInterval(actualizarJuego, 100);
}

// Función para obtener la dirección entre dos segmentos
function obtenerDireccion(segA, segB) {
    if (segA.x < segB.x) return "DERECHA";
    if (segA.x > segB.x) return "IZQUIERDA";
    if (segA.y < segB.y) return "ABAJO";
    if (segA.y > segB.y) return "ARRIBA";
    return "ARRIBA"; // Valor por defecto
}

// Dibujar la serpiente y la comida
function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);

    // Dibujar comida
    
    ctx.drawImage(imgComida, comida.x, comida.y, tamaño, tamaño);

    // Dibujar la serpiente
    serpiente.forEach((segmento, index) => {
        if (index === 0) {
            // Dibujar la cabeza según la dirección actual
            ctx.drawImage(imgCabeza[direccion], segmento.x, segmento.y, tamaño, tamaño);
        } else if (index === serpiente.length - 1) {
            // Determinar la dirección de la cola
            let cola = serpiente[serpiente.length - 1];
            let anterior = serpiente[serpiente.length - 2];
            let direccionCola = obtenerDireccion(cola, anterior);
            ctx.drawImage(imgCola[direccionCola], segmento.x, segmento.y, tamaño, tamaño);
        } else {
            // Determinar la dirección del cuerpo
            let anterior = serpiente[index - 1];
            let siguiente = serpiente[index + 1];

            let direccionCuerpo = obtenerDireccion(anterior, segmento);
            ctx.drawImage(imgCuerpo[direccionCuerpo], segmento.x, segmento.y, tamaño, tamaño);
        }
    });
}

// Generar comida en una posición aleatoria
function generarComida() {
    comida.x = Math.floor(Math.random() * (lienzo.width / tamaño)) * tamaño;
    comida.y = Math.floor(Math.random() * (lienzo.height / tamaño)) * tamaño;
}

// Cambiar dirección
function cambiarDireccion(evento) {
    const tecla = evento.key;
    if (tecla === "ArrowUp" && direccion !== "ABAJO") direccion = "ARRIBA";
    if (tecla === "ArrowDown" && direccion !== "ARRIBA") direccion = "ABAJO";
    if (tecla === "ArrowLeft" && direccion !== "DERECHA") direccion = "IZQUIERDA";
    if (tecla === "ArrowRight" && direccion !== "IZQUIERDA") direccion = "DERECHA";
}

// Mover la serpiente
function moverSerpiente() {
    let cabeza = { ...serpiente[0] };

    if (direccion === "ARRIBA") cabeza.y -= tamaño;
    if (direccion === "ABAJO") cabeza.y += tamaño;
    if (direccion === "IZQUIERDA") cabeza.x -= tamaño;
    if (direccion === "DERECHA") cabeza.x += tamaño;

    serpiente.unshift(cabeza);

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
        puntaje++;
        document.getElementById("score").innerText = puntaje;
        generarComida();
    } else {
        serpiente.pop();
    }
}

// Detectar colisión con el cuerpo
function colisionCuerpo() {
    let cabeza = serpiente[0];
    for (let i = 1; i < serpiente.length; i++) {
        if (cabeza.x === serpiente[i].x && cabeza.y === serpiente[i].y) {
            return true;
        }
    }
    return false;
}

// Actualizar el juego
function actualizarJuego() {
    if (!juegoActivo) return;

    moverSerpiente();

    let cabeza = serpiente[0];
    if (cabeza.x < 0 || cabeza.x >= lienzo.width || cabeza.y < 0 || cabeza.y >= lienzo.height) {
        juegoActivo = false;
        return;
    }

    if (colisionCuerpo()) {
        juegoActivo = false;
        return;
    }

    dibujar();
}
function reiniciarJuego() {
    // Reiniciar variables
    serpiente = [{ x: 200, y: 200 }];
    direccion = "DERECHA";
    puntaje = 0;
    juegoActivo = true;
    document.getElementById("score").innerText = puntaje;
    generarComida();
}
document.getElementById("volver").addEventListener("click", function() {
    window.location.href = "../../index.html";
});


// Iniciar el juego
iniciarJuego();