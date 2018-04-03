'use strict';

module.exports = {
    entry: './game/game.js',
    output: {
        filename: 'game-main.js',
        library: "game"
    },

    watch: true,
    devtool: "source-map",

};