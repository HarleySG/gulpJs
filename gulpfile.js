const { parallel, watch: w, series } = require('gulp');
const g = require('gulp');

global.$ = {
    gulp: g,
    task: require('./gulp'),
    level: 'A2',
    module: 1,
    hasError: require('./gulp/notify'),
    sync: require('./gulp/server'),
};

global.$.paths = require('./gulp/paths');

function watchFiles(done) {
    const scss = $.paths['scss'];
    const pug = $.paths['pug'];
    const _js = $.paths['js'];

    w([`${scss['origin']}*.scss`, `${scss['origin']}**/*.scss`], series(css));
    w(`${pug['index']['origin']}*.pug`, series(html));
    w(`${pug['level']['origin']}*.pug`, series(html));
    w(`${_js['origin']}*.js`, series(js));
    done();
}
const html = $.task.html;
const js = $.task.js;
const css = $.task.css;
const server = $.sync.live;

const dev = series(html, css, js);
const watch = parallel(watchFiles);
const build = series(dev, parallel(server, watch));

exports.js = js;
exports.html = html;
exports.css = css;
exports.server = server;
exports.build = build;
exports.watch = watch;
exports.default = build;
