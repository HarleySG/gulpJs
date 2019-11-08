const pug = require('./pug');
const scss = require('./scss');
const scripts = require('./scripts');
const folders = require('./folders');
const _copy = require('./copy');

function html(done) {
    const folders = $.paths['pug'];
    Object.keys(folders).map((path) => {
        const pugPaths = folders[path];
        console.log('TCL: html -> pugPaths', pugPaths);
        return pug(`${pugPaths['origin']}*.pug`);
    });
    done();
}

function js(done) {
    const jsPaths = $.paths['js'];
    scripts(`${jsPaths['origin']}*.js`, jsPaths['destiny']);
    done();
}

function css(done) {
    const folders = $.paths['scss'];
    scss(`${folders['origin']}*.scss`, folders['destiny']);
    done();
}
function copy(done) {
    _copy(`src/**/**/*`, `${$.paths.js.destiny}`);
    done();
}

module.exports = { html, css, js, folders, copy };
