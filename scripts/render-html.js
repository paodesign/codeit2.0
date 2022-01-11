'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const sh = require('shelljs');
const prettier = require('prettier');

module.exports = function renderHtml() {

    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/index.html');
    const destPath = sourcePath.replace(/src\//, 'dist/');

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }
    
    /*
    sh.cp('-R', sourcePath, destPath)
    
    const copyright = `/*!
    * Start Bootstrap - ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
    * Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
    * Licensed under ${packageJSON.license} (https://github.com/StartBootstrap/${packageJSON.name}/blob/master/LICENSE)
    *
    `
    */

    console.log({sourcePath}, {destPath})

    const fileData = fs.readFileSync(sourcePath, 'utf-8');

    const prettified = prettier.format(fileData, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });
    
    fs.writeFileSync(destPath, prettified);
};