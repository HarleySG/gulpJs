const { parallel } = require('gulp');

global.$ = {
    task: require('./gulp'),
    level: 'A2',
    module: 1,
};

const paths = {
    pug: {
        index: {
            origin: 'src/views/',
            destiny: './dist',
        },
        level: {
            origin: `src/views/${$.level}/**/**/`,
            destiny: `./dist/${$.level}`,
        },
    },
    scss: {
        origin: 'src/styles/',
        destiny: './dist',
    },
};

function html(done) {
    const folders = paths['pug'];
    Object.keys(folders).map((path) => {
        const pugPaths = folders[path];
        return $.task.pug(`${pugPaths['origin']}*.pug`, pugPaths['destiny']);
    });
    done();
}

function css(done) {
    const folders = paths['scss'];
    $.task.scss(`${folders['origin']}*.scss`, folders['destiny']);
    done();
}

exports.html = html;
exports.css = css;
exports.default = parallel(html, css);
