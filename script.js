const tarjetas = document.querySelectorAll(".tarjeta");
const modal = document.getElementById("modal");
const modalContenido = document.querySelector(".modal-contenido");
const modalCerrar = document.querySelector(".cerrar");
const fondo = document.createElement("div");
fondo.classList.add("fondo-borroso");
document.body.appendChild(fondo);

tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        const titulo = tarjeta.querySelector("h2").textContent;
        const descripcion = tarjeta.querySelector("p").textContent;
        const imagenSrc = tarjeta.querySelector("img")?.src || "ruta_por_defecto.jpg";
        const enlace = tarjeta.getAttribute("data-link"); // Se obtiene el enlace correcto

   
        modalContenido.innerHTML = "";

        const modalImagen = document.createElement("img");
        modalImagen.src = imagenSrc;

        const modalInfo = document.createElement("div");
        modalInfo.classList.add("modal-info");

        const modalTitulo = document.createElement("h2");
        modalTitulo.classList.add("modal-titulo");
        modalTitulo.textContent = titulo;

        const modalDescripcion = document.createElement("p");
        modalDescripcion.classList.add("modal-descripcion");
        modalDescripcion.textContent = descripcion;

  
        const modalBotones = document.createElement("div");
        modalBotones.classList.add("modal-botones");


        const btnProbar = document.createElement("a");
        btnProbar.textContent = "Probar";
        btnProbar.href = enlace || "#"; 
        btnProbar.classList.add("btn");

      
        const btnCerrar = document.createElement("button");
        btnCerrar.textContent = "Cerrar";
        btnCerrar.classList.add("btn-rojo");
        btnCerrar.addEventListener("click", cerrarModal);
        modalBotones.appendChild(btnProbar);
        modalBotones.appendChild(btnCerrar);

        modalInfo.appendChild(modalTitulo);
        modalInfo.appendChild(modalDescripcion);
        modalInfo.appendChild(modalBotones);

        modalContenido.appendChild(modalImagen);
        modalContenido.appendChild(modalInfo);

   
        modal.style.display = "flex";
        fondo.style.display = "block";
    });
});

function cerrarModal() {
    modal.style.display = "none";
    fondo.style.display = "none";
}

fondo.addEventListener("click", cerrarModal);
