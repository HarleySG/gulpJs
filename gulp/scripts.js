const { src, dest } = require('gulp');
const babel = require('gulp-babel');

module.exports = (origin, destiny) =>
    src(origin)
        .pipe(babel())
        .pipe(dest(destiny))
        .on('end', $.sync.reload);
