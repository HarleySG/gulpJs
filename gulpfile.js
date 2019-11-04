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
};

function html(done) {
    const pugFiles = paths['pug'];
    Object.keys(pugFiles).map((path) => {
        const pugPaths = pugFiles[path];
        return $.task.pug(`${pugPaths['origin']}*.pug`, pugPaths['destiny']);
    });
    done();
}

exports.html = html;
exports.default = parallel(html);
