//Datos de prueba
//Selecciones del DOM

const grid = document.querySelector("#grid-videojuegos .grid");
const estadoCarga = document.querySelector("#estado-carga");
const estadoError = document.querySelector("#estado-error");
const inputBusqueda = document.querySelector("[placeholder='Buscar videojuego...']");

//Local data de videojuegos si la API FALLA

const videojuegos = [
    {
        title: "Cyberpunk 2077",
        thumb: "https://www.freetogame.com/g/540/thumbnail.jpg",
        normalPrice: "_",
        salePrice: "_",
        savings:  null,
    },
    
    {
        title: "Fortnite",
        thumb: "https://www.freetogame.com/g/332/thumbnail.jpg",
        normalPrice: "_",
        salePrice: "_",
        savings:  null,
    }
];

function renderizarVideojuegos(datos = videojuegos) {
    grid.innerHTML = ""; //Limpiar el grid antes de renderizar
    datos.forEach((juego) => {
        //Obtenemos los datos de cada videojuego
        const titulo = juego.title || juego.external || "Juego";
        const thumb = juego.thumb || juego.thumbnail || "";
        // Precios y ahorro con "FALLBACK
        // Usamos "??" para valores nulos o indefinidos
        const normal = juego.normalPrice ?? "_";
        const oferta = juego.salePrice ?? juego.cheapest ?? "_";
        //Ahorro redondeado si existe o null
        const ahorro = juego.savings ? Math.round(juego.savings) : null;
        //Creamos el html de cada card
        const card = document.createElement("article");
        card.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 flex flex-col";

        //Insertamos el contenido de la card
        card.innerHTML = `
        <img
            src="${thumb}"
            alt="${titulo}"
            class="h-40 w-full object-cover"
        />
        <div class="p-4">
            <h3 class="text-gray-900 text-lg font-medium mb-2">${titulo}</h3>
            <p class="text-gray-700 mb-4">
                Precio: ${normal && normal !== "_" ? `<s>$${normal}</s>` : "_"}
                ${oferta && oferta !== "_" ? `<span class="text-green-600 font-semibold">$${oferta}</span>` : ""}
                ${ahorro ? `<span class="text-sm text-red-500 ml-2">(${ahorro}% OFF)</span>` : ""}
            </p>
            <button
                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
                Ver más
            </button>
        </div>
        `;
        //Agregamos la card al grid
        grid.appendChild(card);
    });
    estadoCarga.classList.add("hidden"); //Ocultar estado de carga
}

//Cargar y renderizar videojuegos al cargar la página
//async significa que la función maneja operaciones asíncronas
//asincronas significa que el codigo puede esperar por resultados de otras operaciones
//como llamadas APIs sin bloquear la ejecución del resto del código
async function cargarVideojuegosInicial() {

    estadoCarga.classList.remove("hidden"); //Mostrar estado de carga
    estadoError.classList.add("hidden"); //Ocultar estado de error
    try {
        const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20";
        const resp = await fetch(url); //Esperar la respuesta de la API
        if (!resp.ok) {
            throw new Error("Error al obtener los datos de la API");
        }
        const data = await resp.json(); //Esperar la conversión a JSON


        //Guardar los datos en una variable global para futuras búsquedas
        window.juegosCache = data
        renderizarVideojuegos(data);
    }
    catch (error) {
        console.error("Error al cargar los CheapShark:", error);
        estadoError.classList.remove("hidden");
        renderizarVideojuegos(videojuegos)
    }
}

//Llamar la función al cargar la página
cargarVideojuegosInicial();
