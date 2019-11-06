const { src, dest } = require('gulp');
const cached = require('gulp-cached');
const changed = require('gulp-changed');
const filter = require('gulp-filter');
const gulpif = require('gulp-if');
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');

function setPug(origin, destiny) {
    return (
        src(origin)
            .pipe(changed('dist', { extension: '.html' }))
            .pipe(gulpif(global.isWatching, cached('setPug')))
            // .pipe(
            //     pugInheritance({
            //         basedir: `${origin}`,
            //         skip: 'node_modules',
            //     })
            // )
            .pipe(
                filter(function(file) {
                    return !/\/_/.test(file.path) && !/^_/.test(file.relative);
                })
            )
            .pipe(
                pug({
                    pretty: true,
                }).on('error', $.hasError)
            )
            .pipe(dest(destiny))
    );
}

module.exports = setPug;
