const pug = require('./pug');
const scss = require('./scss');
const scripts = require('./scripts');
const folders = require('./folders');

function html(done) {
    const folders = $.paths['pug'];
    Object.keys(folders).map((path) => {
        const pugPaths = folders[path];
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

module.exports = { html, css, js, folders };
