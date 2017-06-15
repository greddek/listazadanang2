var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var zadania = require('./routes/zadania');

var app = express();
var port = 3000;
//

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//folder statyczny

app.use(express.static(path.join(__dirname, 'client')));

// Pareser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api', zadania);

//port

app.listen(port, function(){
  console.log('Dzialam na porcie'+port);
});
