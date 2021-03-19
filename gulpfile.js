"use strict";
 // импортируем те пакеты, которые понадобятся в сборке
const gulp = require("gulp"); 
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/"; // создаем путь, в который мы все будем компилировать
// задачи, которые будут помогать собирать наш проект
// первый таск - для того, чтобы отслеживать изменения , которые мы вносим в html файл
gulp.task("copy-html", () => {
    return gulp.src("./src/index.html") // берем его по этому адресу
                .pipe(gulp.dest(dist)) // помещаем его в папку dist
                .pipe(browsersync.stream()); // запускаем для перегрузки страницы
});
// таск по компиляции скриптов
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js") // берем главный файл, к которого все начинается
                .pipe(webpack({ // запускаем webpack
                    mode: 'development', // режим - разработки
                    output: {
                        filename: 'script.js' // куда мы будем складывать результат
                    },
                    watch: false,
                    devtool: "source-map",
                    module: { // модули webpack
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true, // консоль покажет, где была ошибка
                                    corejs: 3, // полифиллы - старый стандарт кода, чтобы заместить фичи старых браузеров
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist)) // берем полученный файл и отправляем его в папку dist
                .on("end", browsersync.reload); // при изменениях перезагружаем нашу страницу
});
// эта задача 
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*") // берем любые файлы в любых папках
                .pipe(gulp.dest(dist + "/assets")) // если что-то поменяется, мы помещаем все в dist
                .on("end", browsersync.reload); //  и перезагрузим старницу
});
// таск - внутри запускается отдельный сервер, который работает при помощи browser-sync и он серверит файлы из папки dist
gulp.task("watch", () => { 
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    // следим за изменениями отдельных файлов
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js")); // чтобы запускать до изменений в gulp

gulp.task("build-prod-js", () => { // эта задача делает более чистовой вариант
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build")); // запускаем по умолчанию две задачи - build чтобы все наши файлы скомпилились
// и отслеживание изменений