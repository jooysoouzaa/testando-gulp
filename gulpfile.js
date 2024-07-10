const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); //Comprimir SASS
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');//Comprimir javaScript
const obfuscate = require('gulp-obfuscate'); //deixar javaScript ilegivel
const imagemin = require('gulp-imagemin'); // Comprimir imagens

function comprimeImagens(){ //Comprimir imagens

    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeScripts(){//Comprimir javaScript
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())//O obfuscate faz o javascript fica ilegíveis 
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() { //Comprimir SASS
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeScripts));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}

//Basta executar no terminal "npm run gulp"
//Colocar a pasta build e node_modules dentro do arquivo .gitignore