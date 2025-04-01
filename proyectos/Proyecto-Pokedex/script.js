const mostrador = document.getElementById("mostrador");
const busquedaInput = document.getElementById("busqueda");

async function obtenerPokemones() {
    try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const data = await respuesta.json();

        // Agregamos el ID manualmente y ordenamos
        const pokemones = data.results.map((pokemon, index) => ({
            ...pokemon,
            id: index + 1
        })).sort((a, b) => a.id - b.id);

        mostrador.innerHTML = ""; // Limpiar el mostrador

        pokemones.forEach(async (pokemon) => {
            const respuestaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            const datosPokemon = await respuestaPokemon.json();
            
            const div = document.createElement("div");
                div.classList.add("pokemon-card");
                    div.innerHTML = `
                    <img src="${datosPokemon.sprites.front_default}" alt="${datosPokemon.name}">
                    <div class="informacion">
                   <h2>#${pokemon.id} ${datosPokemon.name.toUpperCase()}</h2>
                       <p><strong>Tipo:</strong> ${datosPokemon.types.map(t => t.type.name).join(", ")}</p>
                       <p><strong>Peso:</strong> ${datosPokemon.weight / 10} kg</p>
                        <p><strong>Altura:</strong> ${datosPokemon.height / 10} m</p>
                 </div>
`;
mostrador.appendChild(div);

        });
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
    }
}


function buscarPokemon() {
    const filtro = busquedaInput.value.toLowerCase();
    const tarjetas = document.querySelectorAll(".pokemon-card");

    tarjetas.forEach((tarjeta) => {
        const nombre = tarjeta.querySelector("h2").textContent.toLowerCase();
        tarjeta.style.display = nombre.includes(filtro) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", obtenerPokemones);
busquedaInput.addEventListener("input", buscarPokemon);

document.getElementById("volver").addEventListener("click", function() {
    window.location.href = "../../index.html";
});

document.getElementById('menu-toggle').addEventListener('click', function() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
});

const tarjetas = document.querySelectorAll(".card");