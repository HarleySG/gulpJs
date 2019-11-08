const { src, dest } = require('gulp');

module.exports = (origin, destiny) =>
    src(`${origin}/*`)
        .pipe(dest(destiny));