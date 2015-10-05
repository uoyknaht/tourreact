// var gulp = require("gulp");
// var babel = require("gulp-babel");
// gulp.task("default", function () {
//   return gulp.src("**/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest("dist"));
// });
// gulp.task("watch", function(){
//     gulp.watch('**/*.js', ['default'])
// });

var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var jsx = require('gulp-jsx');
var browserSync = require('browser-sync').create();
var lint = require('gulp-eslint');


var config = {
    paths: {
        js: './public/src/**/*.js',
        images: './public/src/img/*',
        src: './public/src',
        dist: './public/build'
    }
};

// gulp.task("default", function () {
//   return gulp.src("public/src/**/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest("public/dist"));
// });
// gulp.task("watch", function(){
//     gulp.watch('public/src/**/*.js', ['default'])
// });



// gulp.task('modules', function() {
//     browserify({
//     entries: './public/src/app2.js',
//     debug: true
//     })
//     .transform(babelify)
//     .bundle()
//     .pipe(source('output.js'))
//     .pipe(gulp.dest('./public/dist'));
// });

/////

var vendors = [
  'react',
  //'bootstrap',
  'jquery',
  'materialize',
  'material-ui'
];

// gulp.task('vendors', function () {
//     var stream = browserify({
//             debug: false,
//             require: vendors
//         });

//     stream.bundle()
//           .pipe(source('vendors.js'))
//           .pipe(gulp.dest('build/js'));

//     return stream;
// });
 
gulp.task('buildVendors', function () {
  browserify({
    require: vendors,
   // extensions: ['.jsx'],
    debug: false
  })
  .bundle()
  .pipe(source('vendors.js'))
  .pipe(gulp.dest('./public/build'));
});

gulp.task('buildApp', function () {


    var stream = browserify({
        entries: ['./public/src/app.js'],
        transform: [babelify],
        // extensions: ['.jsx'],
        // fullPaths: false
        debug: true
    });

    vendors.forEach(function(vendor) {
        stream.external(vendor);
    });

    return stream.bundle()
                 .pipe(source('bundle.js'))
                 .pipe(gulp.dest(config.paths.dist));

});

gulp.task('browsersync', ['buildVendors','buildApp'], function () {
    browserSync({
        server: {
            baseDir: './public'
        },
        notify: false,
        browser: ["google chrome"]
    });
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
            .pipe(lint({config: 'eslint.config.json'}))
            .pipe(lint.format());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));

    gulp.src(config.paths.src + '/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});


gulp.task('watch', [/*'lint', */'buildApp'], function () {
  gulp.watch([config.paths.js], ['buildApp']);
});


// doesnt work somewhy:
// gulp.task('watch', [], function () {
//   gulp.watch(['./public/src/**/*.js'], ['buildApp', browserSync.reload]);
// });

// gulp.task('default',['browsersync','watch'], function() {});

