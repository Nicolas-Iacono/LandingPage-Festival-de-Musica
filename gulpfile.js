
// function tarea(callback) {
//     console.log("mi primer tarea");

// callback();
// }

// exports.tarea = tarea;
 //como mandar a llamar tareas en gulp con npx?
//  en la terminal escribir: npx gulp (nombre de la funcion):

//como mandar a llamar tareas en gulp con npm?
// desde la terminal npm run tarea(nombre de json)


//como compilar con sass?
const { src, dest, watch, parallel } = require("gulp"); //require: es una forma de extraer la funcionalidad de la dependecia de gulp en este caso.
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');// se encarga de perfeccionar el css para navegadores en los que no tiene soporte 
const cssnano = require('cssnano');//comprime el codigo css
const postcss = require('gulp-postcss');//va a hacer transformaciones por medio de cssnano y autoperfixer
const sourcemaps = require('gulp-sourcemaps');

//{}entre llaves elijo las funciones que quiero extraer.
//Src: funcion que sirve para identificar un archivo.
//dest: sirve para almacenar algo en una carpeta de estilo.

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
/////
//javascript
const terser = require('gulp-terser-js');
///
function css (done) {
   // 1) identificar el archivo de SASS
   // 2) compilarlo
   // 3) almacenarla en el disco duro 
     src('src/scss/**/*.scss')// (identifico al archivo)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) //(aplico sass para compilar)
    .pipe(postcss([autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")) // pipe que usa la funcion de dest para almacenar)
   
    done();//callback que avisa a gulp cuando llegamos al final de la ejecucion de la funcion
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe(dest('build/img'))

    done();
}

function versionWebp(done){
    
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img') )

    done();
}
function versionAvif(done){
    
    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest( 'build/img' ) )

    done();
}
function javascript(done){
    src('src/js/**/*.js')
        .pipe(terser() )
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
// mando a llamar la funcion de css
// y ejecuta todo lo de arriba.