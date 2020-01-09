
var gulp                 = require('gulp'),
     sass                   = require('gulp-sass'),
     browserSync   = require('browser-sync').create(),
     concat              = require('gulp-concat'),
     uglify                = require('gulp-uglifyjs'),
     rename            = require('gulp-rename'),
     del                    = require('del'),
     autoprefixer   = require('gulp-autoprefixer');


gulp.task('sass', function (done) {
	gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
		// .pipe(browserSync.reload({stream: true}))
	done();
});

gulp.task('scripts', function(done) {
	gulp.src([
		'app/libs/jquery/jquery-2.2.4.min.js',
		'app/libs/slick/slick.min.js',
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
	
	done();
});


gulp.task('watch', function (done) {
	browserSync.init({
		server: "app/"
	});

	gulp.watch("app/sass/**/*.sass", gulp.series('sass'));
	gulp.watch("app/*.html").on('change', () => {
		browserSync.reload();
		done();
	});
	gulp.watch("app/js/**/*.js").on('change', () => {
		browserSync.reload();
		done();
	});
	done();
});

gulp.task('default', gulp.series('sass', 'scripts', 'watch'));

