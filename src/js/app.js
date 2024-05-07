document.addEventListener('DOMContentLoaded', function(){ // Esto solo espera que se descarge el HTML, pero no espera que se desacargue el CSS o imagenes
    iniciaApp(); // Llamando a al funcion iniciaApp()
});

function iniciaApp() { // Creando la función iniciaApp()
    navegacionFija(); // Llamando a la funcion navegacionFija()
    crearGaleria(); // Llamando a la funcion crearGaleria()
    scrollNav(); // Llamando a la funcion scrollNav()
}

function navegacionFija() {
    const barra = document.querySelector('.header'); // Esto es para selccionar la etiqueta "header" mediante la clase ".header" del HTML y se almacenra en la constante "barra"
    const sobreFestival = document.querySelector('.sobre-festival'); // Esto es para selccionar la etiqueta "section" mediante la clase ".sobre-festival" del HTML y se almacenra en la constante "sobre-festival"
    const body = document.querySelector('body'); // Esto es para selccionar la etiqueta "body" del HTML y se almacenra en la constante "body"

    window.addEventListener('scroll', function() { // Esto es para agregar un evento scroll a la ventana de la pagina(window)
        if( sobreFestival.getBoundingClientRect().top < 0 ) { // Esto es para ver si se paso una posision. "getBoundingClientRect()" obtiene la posición y dimensiones del elemento en relación a la ventana del navegador
            barra.classList.add('fijo'); // Esto es para crear("add") la clase "fijo" a la etiqueta "header" del HTML que almacena la constante "barra"
            body.classList.add('body-scroll') // Esto es para crear("add") la clase "body-scroll" a la etiqueta "body" del HTML que almacena la constante "body"
        } else {  
            barra.classList.remove('fijo'); // Esto es para eliminar("remove") la clase "fijo" a la etiqueta "header" del HTML
            body.classList.remove('body-scroll')  // Esto es para eliminar("remove") la clase "body-scroll" a la etiqueta "body" del HTML
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a'); // Esto es para selccionar la etiqueta "a" que esta dentro de la etiqueta "nav" del HTML y se almacenra en la constante enlaces

    enlaces.forEach( enlace => { // "enlaces.forEach "es para iterar en cada etiqueta "a" del HTML
        enlace.addEventListener('click', function(e) { // Agregando en cada uno de los enlaces iteracion (cada vez que se aga clic en un enlace)
            e.preventDefault(); // Esto es para prevenir el comportamiento por defecto(default) que lleva de golpe caundo se da clic en un enlace
            const seccionScroll = e.target.attributes.href.value; // Esto es para acceder al valor del "href" de la etiqueta "a"
            const seccion = document.querySelector(seccionScroll); // Esto va seleccianar la constante "seccionScroll"
            seccion.scrollIntoView({ behavior: 'smooth' }); // Esto es el efecto de como se va ir llendo cuando damos clic en un enlace de la pagina, es como deslizandose en vez del efecto por defecto de golpe
        }); 
    });
}

function crearGaleria() {
    // "document.querySelector" solo va retorna 0 o 1 elemento
    const galeria = document.querySelector('.galeria-imagenes'); // Esto va seleccianar la etiqueta "ul" que tiene la clase ".galeria-imagen" declarado en el HTML 

    for(let i = 1; i <= 12; i++) { // Este "for" va ser para iterar cada imagen y se muestre (el nombre de las imagenes son 1 2 3 ... 12)
        const imagen = document.createElement('PICTURE'); // Esto es para crear una etiqueta "picture" para el HTML desde JavaScript  
        // El "imagen.innerHTML" va ser para agregar el codigo <source... dentro de las etiqueta "PICTURE" en el HTML.
        imagen.innerHTML = `  
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria"></img>`;
        
        imagen.onclick = function() { // Esto funcion onclic va funcionar cada ves que se de clic a una imagen
            mostrarImagen(i); // Esto esta llamando a al funcion "mostrarImagen" y le pasa como parametro la variable "i"
        } 

        // "galeria.appendChild(imagen)" Significa que se agregara el elemento "imagen" que tiene la etiqueta "picture" dentro del elemento "galeria" que tiene la etiqueta "ul"
        galeria.appendChild(imagen); 
    }
}


function mostrarImagen(id) { // Esta funcion va ser para ver las grande cada ves que demos clic a una imagen de la galeria
    const imagen = document.createElement('PICTURE'); // Esto es para crear una etiqueta "PICTURE" para el HTML desde JavaScript  
    // El "imagen.innerHTML" va ser para agregar el codigo <source... dentro de las etiqueta "PICTURE" en el HTML.
    imagen.innerHTML = `  
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria"></img>`;

    // ********** Crea el Overlay con la imagen ********** 
    const overlay = document.createElement('DIV'); // Esto es para crear una etiqueta "DIV" para el HTML desde JavaScript y se almacenara en al constante "overlay"
    // "overlay.appendChild(imagen)" Significa que se agregara el elemento "imagen" que tiene la etiqueta "picture" dentro del elemento "overlay" que tiene la etiqueta "div"
    overlay.appendChild(imagen); 
    overlay.classList.add('overlay'); // Esto es para crear("add") la clase "overlay" a la etiqueta "DIV" del HTML creada desde JavaScript
    overlay.onclick = function() { // El evento "onclick" tentra la función de cerrar la imagen cuando se clic en cualquier zona de la pantalla cuando la imagen este abierta
        const body = document.querySelector('body') // Esto es para selccionar la etiqueta "body" del HTML y se almacenra en la constante body
        body.classList.remove('fijar-body'); // Esto es para eliminar("remove") la clase "fijar-body" a la etiqueta "body" del HTML creada desde JavaScript
        overlay.remove(); // Esto es para cerrar la imagen 
    }

    // ********** Boton para cerrar la imagen ********** 
    const cerrarFoto = document.createElement('P'); // Esto es para crear una etiqueta "P" para el HTML desde JavaScript y se almacenara en al constante "cerrarFoto"
    cerrarFoto.textContent = 'X'; // Esto es para gregar el contenido a la etiqueta "P" creada desde el HTML, que sera una letra "X" 
    cerrarFoto.classList.add('btn-cerrar') // Esto es para crear("add") la clase "btn-cerrar" a la etiqueta "P" del HTML creada desde JavaScript

    cerrarFoto.onclick = function() { // El evento "onclick" tentra la función de cerrar la imagen cuando se clic en el elemento "X"
        const body = document.querySelector('body') // Esto es para selccionar la etiqueta "body" del HTML y se almacenra en la constante body
        body.classList.remove('fijar-body'); // Esto es para eliminar("remove") la clase "fijar-body" a la etiqueta "body" del HTML creada desde JavaScript
        overlay.remove(); // Esto es para cerrar la imagen 
    }
    // "overlay.appendChild(overlay)" Significa que se agregara el elemento "cerrarFoto" que tiene la etiqueta "P" dentro del elemento "overlay" que tiene la etiqueta "DIV"
    overlay.appendChild(cerrarFoto);

    // ********** Añadiendo al HTML ********** 
    const body = document.querySelector('body') // Esto es para selccionar la etiqueta "body" del HTML y se almacenra en la constante body
    // "body.appendChild(overlay)" Significa que se agregara el elemento "overlay" que tiene la etiqueta "DIV" dentro del elemento "body" que tiene la etiqueta "body"
    body.appendChild(overlay); 
    body.classList.add('fijar-body'); // Esto es para crear("add") la clase "fijar-body" a la etiqueta "body" del HTML creada desde JavaScript
}