

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}

function crearGaleria() {
   const galeria = document.querySelector('.galeria-imagenes');

   for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" tipe="image/avif">
                <source srcset="build/img/thumb/${i}.webp" tipe="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
                alt="imagen-vocalista">
             `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

         galeria.appendChild(imagen);    

   }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.classList.add('imagen-grande');
        imagen.innerHTML = `
                <source srcset="build/img/grande/${id}.avif" tipe="image/avif">
                <source srcset="build/img/grande/${id}.webp" tipe="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg"
                alt="imagen-vocalista">
             `;
                //CREA EL OVERLAY CON LA IMAGEN
                const overlay = document.createElement('DIV');
                overlay.appendChild(imagen);
                overlay.classList.add('overlay');
                
                overlay.onclick = function(){
                    const body = document.querySelector('body');  //cierra imagen                                                          //con tocar cualquier
                    body.classList.remove('fijar-body');
                    overlay.remove()                              //parte de la pantalla.   
                }
               
   
                //BOTON PARA CERRAR EL MODAL
                const cerrarModal = document.createElement('P');
                cerrarModal.textContent = 'x';
                cerrarModal.classList.add('btn-cerrar');
                cerrarModal.onclick = function(){
                    const body = document.querySelector('body');
                    body.classList.remove('fijar-body');
                    overlay.remove();
                }
                overlay.appendChild(cerrarModal);
    
                // AÑADIRLO AL HTML
                 const body = document.querySelector('body');
                 body.appendChild(overlay);
                 body.classList.add('fijar-body');
}
