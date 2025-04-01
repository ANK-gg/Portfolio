let pantalla = document.getElementById("pantalla");
let modoGrados = true; // Inicia en grados
let funcionSeleccionada = null; // Almacena la función trigonométrica seleccionada

// Función para insertar valores en la pantalla
function insertar(valor) {
    const posicionCursor = pantalla.selectionStart; // Obtener la posición del cursor
    const textoActual = pantalla.value;

    if (funcionSeleccionada && textoActual.includes(funcionSeleccionada + "(")) {
        // Si hay una función seleccionada y está en la pantalla, insertar el valor dentro de los paréntesis
        const inicioFuncion = textoActual.lastIndexOf(funcionSeleccionada + "(");
        const finFuncion = textoActual.indexOf(")", inicioFuncion);

        if (posicionCursor >= inicioFuncion && posicionCursor <= finFuncion) {
            // Insertar dentro de los paréntesis
            pantalla.value =
                textoActual.slice(0, posicionCursor) +
                valor +
                textoActual.slice(posicionCursor);
        } else {
            // Insertar fuera de los paréntesis
            pantalla.value =
                textoActual.slice(0, posicionCursor) +
                valor +
                textoActual.slice(posicionCursor);
        }
    } else {
        // Si no hay función seleccionada, insertar el valor directamente
        pantalla.value =
            textoActual.slice(0, posicionCursor) +
            valor +
            textoActual.slice(posicionCursor);
    }

    // Mover el cursor después de la inserción
    pantalla.selectionStart = pantalla.selectionEnd = posicionCursor + valor.length;
    pantalla.focus(); // Mantener el foco en el campo de entrada
}

// Función para borrar la pantalla
function borrar() {
    pantalla.value = "";
    funcionSeleccionada = null;
    pantalla.focus(); // Mantener el foco en el campo de entrada
}

// Función para calcular el resultado
function calcular() {
    try {
        let expresion = pantalla.value;

        // Reemplazar sin, cos, tan por Math.sin, Math.cos, Math.tan
        expresion = expresion.replace(/sin\(/g, "Math.sin(")
                             .replace(/cos\(/g, "Math.cos(")
                             .replace(/tan\(/g, "Math.tan(");

        // Si está en modo grados, convertir los valores a radianes
        if (modoGrados) {
            expresion = expresion.replace(/Math\.sin\((.*?)\)/g, "Math.sin(($1) * Math.PI / 180)")
                                 .replace(/Math\.cos\((.*?)\)/g, "Math.cos(($1) * Math.PI / 180)")
                                 .replace(/Math\.tan\((.*?)\)/g, "Math.tan(($1) * Math.PI / 180)");
        }

        // Si la expresión contiene 'x', asignarle un valor (por defecto, x = 0)
        if (expresion.includes("x")) {
            expresion = expresion.replace(/x/g, "0"); // Puedes cambiar el valor de x según sea necesario
        }

        pantalla.value = eval(expresion); // Evalúa la expresión corregida
    } catch (error) {
        pantalla.value = "Error";
    }
    pantalla.focus();
}

// Función factorial :v
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
    pantalla.focus(); 
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
    pantalla.focus(); // Mantener el foco en el campo de entrada
}

// Función para seleccionar una función trigonométrica
function insertarTrig(funcion) {
    funcionSeleccionada = funcion;
    const posicionCursor = pantalla.selectionStart;

    // Insertar la función con paréntesis y colocar el cursor dentro
    pantalla.value =
        pantalla.value.slice(0, posicionCursor) +
        `${funcion}()` +
        pantalla.value.slice(posicionCursor);

    // Mover el cursor dentro de los paréntesis
    const nuevaPosicion = posicionCursor + funcion.length + 1;
    pantalla.selectionStart = pantalla.selectionEnd = nuevaPosicion;
    pantalla.focus(); // Mantener el foco en el campo de entrada
}

// Escuchar eventos de teclado
document.addEventListener("keydown", function (event) {
    const tecla = event.key;

    // Permitir números (0-9), operadores y teclas especiales
    if (/[0-9+\-*/.=]|Enter|Backspace|Delete|ArrowLeft|ArrowRight/.test(tecla)) {
        event.preventDefault(); // Evitar el comportamiento predeterminado

        switch (tecla) {
            case "Enter":
                calcular();
                break;
            case "Backspace":
            case "Delete":
                borrar();
                break;
            case "ArrowLeft":
                // Mover el cursor a la izquierda
                if (pantalla.selectionStart > 0) {
                    pantalla.selectionStart = pantalla.selectionEnd = pantalla.selectionStart - 1;
                }
                break;
            case "ArrowRight":
                // Mover el cursor a la derecha
                if (pantalla.selectionEnd < pantalla.value.length) {
                    pantalla.selectionStart = pantalla.selectionEnd = pantalla.selectionEnd + 1;
                }
                break;
            default:
                insertar(tecla);
        }
    }
});

// Enfocar el campo de entrada al cargar la página
window.onload = function () {
    pantalla.focus();
};
document.getElementById("pantalla").addEventListener("keydown", function (event) {
    const teclasPermitidas = /[0-9+\-*/()%!yx.=]|Backspace|Enter/;

    if (!teclasPermitidas.test(event.key)) {
        event.preventDefault(); // Bloquea la tecla si no está permitida
    }
});

let grafica = null; // Variable global para almacenar el gráfico

function crearGrafica() {
    const expresion = pantalla.value.trim();
    if (!expresion || !expresion.includes("x")) {
        alert("Ingresa una función con 'x'. Ejemplo: sin(x) + cos(2^x)");
        return;
    }

    // Destruir gráfica anterior si existe
    if (grafica) grafica.destroy();

    // Generar puntos (x, y) con un rango adecuado para esta función
    const puntos = [];
    const paso = 0.05; // Paso más fino para capturar oscilaciones rápidas
    for (let x = -2; x <= 2; x += paso) { // Rango ajustado para evitar caos en 2^x
        try {
            // Reemplazar 2^x por Math.pow(2, x) y sin/cos por Math.sin/Math.cos
            let expr = expresion
                .replace(/sin\(/g, "Math.sin(")
                .replace(/cos\(/g, "Math.cos(")
                .replace(/2\^x/g, "Math.pow(2, x)") // Asegurar que 2^x se interprete correctamente
                .replace(/x/g, x);

            // Convertir a radianes si está en modo grados
            if (modoGrados) {
                expr = expr
                    .replace(/Math\.sin\((.*?)\)/g, "Math.sin(($1)*Math.PI/180)")
                    .replace(/Math\.cos\((.*?)\)/g, "Math.cos(($1)*Math.PI/180)");
            }

            const y = eval(expr);
            puntos.push({ x, y });
        } catch (e) {
            console.error("Error al evaluar:", e);
            alert("Error en la expresión. Usa formato válido como: sin(x) + cos(2^x)");
            return;
        }
    }

    // Configuración del gráfico con ejes centrados y cuadrícula
    const ctx = document.getElementById('grafica').getContext('2d');
    grafica = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: `f(x) = ${expresion}`,
                data: puntos,
                borderColor: '#FF5733', // Color naranja para la curva
                backgroundColor: 'rgba(255, 87, 51, 0.1)',
                borderWidth: 2,
                tension: 0.1, // Suavizado para oscilaciones
                pointRadius: 0 // Ocultar puntos individuales
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'center',
                    grid: {
                        color: 'rgba(100, 100, 100, 0.5)', // Líneas más oscuras para ejes principales
                        lineWidth: 1,
                        drawOnChartArea: true,
                    },
                    ticks: {
                        stepSize: 1, // Espaciado entre números en el eje X
                        color: '#333',
                    },
                    min: -2,
                    max: 2
                },
                y: {
                    type: 'linear',
                    position: 'center',
                    grid: {
                        color: 'rgba(100, 100, 100, 0.5)',
                        lineWidth: 1,
                        drawOnChartArea: true,
                    },
                    ticks: {
                        stepSize: 1, // Espaciado entre números en el eje Y
                        color: '#333',
                    },
                    min: -2,
                    max: 2
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif'
                        }
                    }
                }
            }
        }
    });
}

