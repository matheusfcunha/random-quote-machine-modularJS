/* gulpfile.js */
var fs = require("fs");
var brwoserSync = require('browser-sync')

var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    babel        = require('gulp-babel');


    function findJavaScriptFiles() {    // Finds js files and move main.js to the last position (loading on right time)
        const dirContent = fs.readdirSync("src/js")
        let jsFiles = dirContent.filter( function( elm ) {return elm.match(/.*\.(j?js)/ig);});
        jsFiles = jsFiles.map( (x) => "src/js/" + x )
        if (jsFiles.length > 1) {
            jsFiles.map( (x) => {
                if (x === "src/js/main.js" && jsFiles.indexOf(x) != jsFiles.length - 1) {
                    const xIndex = jsFiles.indexOf(x)
                    const lastElement = jsFiles[jsFiles.length - 1]
                    jsFiles[jsFiles.length - 1] = x                       // swap elements
                    jsFiles[xIndex] = lastElement
                }
            } )
        }
        return jsFiles
    }

    // process stylesheets
    gulp.task('styles', function () {
        gulp.src('src/css/**/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']  // config object
        }))
        .pipe(gulp.dest('dist/css'));
  });

  // process scripts
    gulp.task('scripts', function () {
    let sourceJS = findJavaScriptFiles()  
    gulp.src(sourceJS)       // <-- note new array
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(babel({
        presets: ['es2015']  // babel config object
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/js'));
  });

  gulp.task('browser-sync', function() {
      brwoserSync.init(["*.html", "dist/css/*.css", "dist/js/*.js"], {
          server: {
              baseDir: "./"
          }
      })
  })

  // default task contains our watcher
    gulp.task('default', ['styles', 'scripts', 'browser-sync'], function() {
    // watch sass source files and convert on changes
    gulp.watch('src/css/**/*.scss', ['styles', 'browser-sync']);
    gulp.watch('src/js/**/*.js', ['scripts', 'browser-sync']);
  });
