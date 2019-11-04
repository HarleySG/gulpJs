const { src, dest } = require('gulp');
const scss = require('gulp-sass');

function setScss(origin, destiny) {
    return src(origin)
        .pipe(scss({ style: 'compressed' }))
        .pipe(dest(destiny));
}

module.exports = setScss;
