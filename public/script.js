//Datos de prueba

const videojuegos = [
    {
        id: 1,
        nombre: "Elden Ring",
        descripción: "Acción · RPG · PC / PS5 / Xbox",
        rate: 4.8,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png"
    },
    {
        id: 2,
        nombre: "God of War Ragnarok",
        descripción: "Acción · Aventura · PS5 / PS4",
        rate: 4.7,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png"
    },
    {
        id: 3,
        nombre: "Zelda TOTK",
        descripción: "Acción · Aventura · PC / PS5 / Xbox",
        rate: 4.9,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co48qj.png"
    },
    {
        id: 4,
        nombre: "Fortnite",
        descripción: "Acción · Aventura · PC / PS5 / Xbox",
        rate: 4.5,
        imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5d.png"
    },
]
const grid = document.querySelector('.grid');

//Función para crear las cards dinámicamente
function rederizarVideojuegos() {
    grid.innerHTML = ""; //Limpiar el grid antes de renderizar

    videojuegos.forEach((juego) => {
        //Creamos el html de cada card
        const card = document.createElement("article");
        card.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 flex flex-col";

        //Insertamos el contenido de la card
        card.innerHTML = `
        <img
            src="${juego.imagen}"
            alt="${juego.nombre}"
            class="h-40 w-full object-cover"
        />
        <div class="p-4">
            <h3 class="text-gray-900 text-lg font-medium mb-2">${juego.nombre}</h3>
            <p class="text-gray-700 text-base mb-4">${juego.descripción}</p>
            <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <span class="text-yellow-500 font-semibold">${juego.rate} ★</span>
            </div>
            <button
                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
                Ver más
            </button>
            </div>
        </div>
        `;
        //Agregamos la card al grid
        grid.appendChild(card);
    });
}

rederizarVideojuegos();