let pantalla = document.getElementById("pantalla");
let modoGrados = true; // Inicia en grados
let funcionSeleccionada = null; // Almacena la función trigonométrica seleccionada
let angulo = ''; // Almacena el ángulo ingresado

// Función para insertar valores en la pantalla
function insertar(valor) {
    if (funcionSeleccionada) {
        // Si hay una función seleccionada, agregar el valor al ángulo
        angulo += valor;
    } else {
        // Si no hay función seleccionada, agregar el valor directamente a la pantalla
        pantalla.value += valor;
    }
    actualizarPantalla();
}

// Función para borrar la pantalla
function borrar() {
    pantalla.value = "";
    funcionSeleccionada = null;
    angulo = '';
}

// Función para calcular el resultado
function calcular() {
    try {
        let expresion = pantalla.value;

        // Si hay una función seleccionada, calcular su valor
        if (funcionSeleccionada) {
            const anguloNum = parseFloat(angulo);
            if (isNaN(anguloNum)) {
                pantalla.value = "Error";
                return;
            }

            // Convertir a radianes si está en modo grados
            const radianes = modoGrados ? (anguloNum * Math.PI) / 180 : anguloNum;

            let resultado;
            switch (funcionSeleccionada) {
                case 'sin':
                    resultado = Math.sin(radianes);
                    break;
                case 'cos':
                    resultado = Math.cos(radianes);
                    break;
                case 'tan':
                    resultado = Math.tan(radianes);
                    break;
                default:
                    resultado = "Error";
            }

            pantalla.value = resultado.toFixed(4);
            funcionSeleccionada = null;
            angulo = '';
        } else {
            // Si no hay función seleccionada, evaluar la expresión directamente
            expresion = expresion.replace(/sin\(/g, "Math.sin(")
                                 .replace(/cos\(/g, "Math.cos(")
                                 .replace(/tan\(/g, "Math.tan(");

            if (modoGrados) {
                expresion = expresion.replace(/Math\.sin\((.*?)\)/g, "Math.sin(($1) * Math.PI / 180)")
                                     .replace(/Math\.cos\((.*?)\)/g, "Math.cos(($1) * Math.PI / 180)")
                                     .replace(/Math\.tan\((.*?)\)/g, "Math.tan(($1) * Math.PI / 180)");
            }

            pantalla.value = eval(expresion);
        }
    } catch (error) {
        pantalla.value = "Error";
    }
}

// Función para calcular el factorial
function factorial() {
    let num = parseInt(pantalla.value);
    if (isNaN(num) || num < 0) {
        pantalla.value = "Error";
        return;
    }
    let resultado = 1;
    for (let i = 2; i <= num; i++) {
        resultado *= i;
    }
    pantalla.value = resultado;
}

// Función para cambiar entre grados y radianes
function cambiarModo(modo) {
    modoGrados = modo === "grados"; // True si es grados, false si es radianes

    let btnGrados = document.getElementById("btnGrados");
    let btnRadianes = document.getElementById("btnRadianes");

    if (modoGrados) {
        btnGrados.classList.add("activo");
        btnRadianes.classList.remove("activo");
    } else {
        btnRadianes.classList.add("activo");
        btnGrados.classList.remove("activo");
    }
}

// Función para seleccionar una función trigonométrica
function insertarTrig(funcion) {
    funcionSeleccionada = funcion;
    angulo = ''; // Reiniciar el ángulo
    actualizarPantalla();
}

// Función para actualizar la pantalla
function actualizarPantalla() {
    if (funcionSeleccionada) {
        pantalla.value = `${funcionSeleccionada}(${angulo})`;
    } else {
        pantalla.value = angulo;
    }
}

// Función para crear una gráfica
function crearGrafica() {
    let ctx = document.getElementById("grafica").getContext("2d");

    new Chart(ctx, {
        type: "line", // Tipo de gráfico (línea)
        data: {
            labels: ["1", "2", "3", "4", "5"], // Valores en el eje X
            datasets: [{
                label: "Ejemplo",
                data: [2, 4, 6, 8, 10], // Valores en el eje Y
                borderColor: "blue",
                borderWidth: 2
            }]
        }
    });
}