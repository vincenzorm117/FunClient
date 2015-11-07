var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');

// ### js -> combine
gulp.task('js', function() {
	return gulp.src(['./js/jquery-2.1.4.min.js','./js/jquery.magnific-popup.min.js','./js/highcharts.js','./js/angular.min.js','./js/controllers.js','./js/filters.js','./js/scripts.js'])
		.pipe(concat('scripts.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

// ### sass -> css -> autoprefix -> min -> combine
gulp.task('sass', function () {
	gulp.src('./sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		// .pipe(gulp.dest('./css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
        }))
		// .pipe(gulp.dest('./css/auto'))
		.pipe(minifyCss())
		// .pipe(gulp.dest('./css/min'))
		// .pipe(concat('all.css'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

// ### Watch
gulp.task('watch', function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	// gulp.watch([path.source + 'styles/**/*'], ['styles']);
	// gulp.watch([path.source + 'scripts/**/*'], ['jshint', 'scripts']);
	// gulp.watch([path.source + 'fonts/**/*'], ['fonts']);
	// gulp.watch([path.source + 'images/**/*'], ['images']);
	// gulp.watch(['bower.json', 'assets/manifest.json'], ['build']);

	gulp.watch('sass/**/*', ['sass']);
	gulp.watch('js/**/*', ['js']);
	gulp.watch('index.html').on('change', browserSync.reload);
	// to do:
	// local font
	// images
});

// ### default
gulp.task('default', function() {
	// deafult tasks
});