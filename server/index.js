'use strict';

let express = require('express');
let app = express();

let path = require('path');

app.use('', express.static(path.join('src')));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
