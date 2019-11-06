const browser = require('browser-sync').create();
function live() {
    browser.init({
        server: `./dist`,
    });
}
function reload() {
    browser.reload();
}
module.exports = { browser, live, reload };
