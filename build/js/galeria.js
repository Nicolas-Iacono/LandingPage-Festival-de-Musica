function iniciarApp(){crearGaleria()}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let i=1;i<=12;i++){const n=document.createElement("picture");n.innerHTML=`\n                <source srcset="build/img/thumb/${i}.avif" tipe="image/avif">\n                <source srcset="build/img/thumb/${i}.webp" tipe="image/webp">\n                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"\n                alt="imagen-vocalista">\n             `,n.onclick=function(){mostrarImagen(i)},e.appendChild(n)}}function mostrarImagen(e){const i=document.createElement("picture");i.classList.add("imagen-grande"),i.innerHTML=`\n                <source srcset="build/img/grande/${e}.avif" tipe="image/avif">\n                <source srcset="build/img/grande/${e}.webp" tipe="image/webp">\n                <img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg"\n                alt="imagen-vocalista">\n             `;const n=document.createElement("DIV");n.appendChild(i),n.classList.add("overlay"),n.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()};const t=document.createElement("P");t.textContent="x",t.classList.add("btn-cerrar"),t.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()},n.appendChild(t);const a=document.querySelector("body");a.appendChild(n),a.classList.add("fijar-body")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));