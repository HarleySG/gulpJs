const paths = {
    pug: {
        index: {
            origin: 'src/views/',
            destiny: './dist',
        },
        level: {
            origin: `src/views/${$.level}/unit_1/module_1/activities/`,
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

module.exports = paths;
