'use strict';

let express = require('express');
let app = express();

let path = require('path');

app.use('', express.static(path.join('sources')));


// app.get('/', function (req, res) {
//     res.render('login.html');
// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});