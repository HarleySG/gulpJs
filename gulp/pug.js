const { src, dest } = require('gulp');
const pug = require('gulp-pug');

function setPug(origin, destiny) {
    return src(origin)
        .pipe(pug({ pretty: true }))
        .pipe(dest(destiny));
}

module.exports = setPug;
