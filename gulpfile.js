var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

gulp.task('vendors-js',function(){
	gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
				'./node_modules/angular-resource/angular-resource.min.js',
        './node_modules/angular-route/angular-route.min.js'
        ])
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest('src/'));
});

gulp.task('vendors-css',function(){
	gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
        ])
	.pipe(concat('vendors.css'))
	.pipe(gulp.dest('src/'));
});

gulp.task('app.js', function(){
        gulp.src([
								'./src/omdb/**/*.js',
                './src/movie-app/**/*.js',
        ])
        .pipe(concat('app.js'))
	.pipe(gulp.dest('src/'));
});

gulp.task('templates', function(){
        gulp.src('./templates/**/*.jade')
        .pipe(jade({
                pretty : true,
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('browserSync', function(){
        browserSync.init({
                server : {
                        baseDir : 'src'
                }
        });
});

gulp.task('default',['browserSync','templates', 'vendors-css', 'vendors-js', 'app.js'], function(){
        gulp.watch('./templates/**/*.jade',['templates']).on('change',browserSync.reload);;
        gulp.watch('./src/**/*.js',['app.js']).on('change',browserSync.reload);;
});
