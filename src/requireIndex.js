﻿// setup requirejs
requirejs.config({
    baseUrl: FIRE.isApp ? "" : "./",
    paths: {
        // exporters
        'exporter-cocos2d': 'exporters/cocos2d/index',

        // 以下需手动添加到gulp里，打包时才会包含进去

        // RequireJS plugins
        'text': 'ext/requirejs-text.node.min',
        // others
        'libpng': "bin/libpngWrapper",
        'jszip': "ext/jszip/dist/jszip.min",
        'dust': "ext/dustjs-linkedin/dist/dust-full.min",
        'filesaver': "ext/FileSaver.min",
    },
});

// promise wrapper
var requireAsync = function () {
    var modules = Array.prototype.slice.call(arguments);
    var logTime = false;
    if (modules.length > 1 && typeof modules[modules.length - 1] === 'boolean') {
        logTime = modules[modules.length - 1];
        modules.pop();
    }
    var timerTag = 'load ' + modules;
    return new Promise(function (resolve, reject) {
        if (logTime) {
            console.time(timerTag);
        }
        //console.log('start ' + timerTag);
        requirejs(modules, 
                  logTime ?
                  function () {
                      console.timeEnd(timerTag);
                      resolve.apply(this, arguments);
                  }
                  : resolve,
                  function (error) {
                      console.error(error);
                      reject(error);
                  });
    });
};

// pre-load exporters
requireAsync(
    'exporter-cocos2d'
    //, true
).then(function () {
    console.log('exporter(s) loaded');
});

// pre-load modules
Promise.all([
    requireAsync('libpng', true),
    requireAsync('jszip', true),
    requireAsync('filesaver', true)
]);
