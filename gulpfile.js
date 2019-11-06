const { parallel, watch: w, series } = require('gulp');
const g = require('gulp');
const notify = require('gulp-notify');

global.$ = {
    gulp: g,
    task: require('./gulp'),
    level: 'A2',
    module: 1,
    hasError: function(error) {
        var args = Array.prototype.slice.call(arguments);
        notify
            .onError({
                title: 'Compile Error',
                message: '<%= error.message %>',
            })
            .apply(this, args);

        this.emit('end');
    },
};

global.$.paths = {
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
    js: {
        origin: 'src/scripts/',
        destiny: './dist',
    },
};

function js(done) {
    const jsPaths = $.paths['js'];
    $.task.js(`${jsPaths['origin']}*.js`, jsPaths['destiny']);
    done();
}

function html(done) {
    const folders = $.paths['pug'];
    Object.keys(folders).map((path) => {
        const pugPaths = folders[path];
        return $.task.pug(`${pugPaths['origin']}*.pug`, pugPaths['destiny']);
    });
    done();
}

function css(done) {
    const folders = $.paths['scss'];
    $.task.scss(`${folders['origin']}*.scss`, folders['destiny']);
    done();
}

function watchFiles(done) {
    const scss = $.paths['scss'];
    const pug = $.paths['pug'];
    const _js = $.paths['js'];

    w([`${scss['origin']}*.scss`, `${scss['origin']}**/*.scss`], series(css));
    w(`${pug['index']['origin']}*.pug`, series(html)).on('change', (file) => {
        console.log('TCL: watchFiles -> index', '-> file', file);
    });
    w(`${pug['level']['origin']}*.pug`, series(html)).on('change', (file) => {
        console.log('TCL: watchFiles -> level', '-> file', file);
    });
    w(`${_js['origin']}*.js`, series(js));
    done();
}

const dev = series(html, css, js);
const watch = parallel(watchFiles);
const build = series(dev, parallel(watch));

exports.js = js;
exports.html = html;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
