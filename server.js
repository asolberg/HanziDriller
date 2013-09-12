var express = require('express'),
    path = require('path'),
    http = require('http'),
    hanzidrill = require('./routes/hanzidrills');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/hanzidrills', hanzidrill.findAll);
app.get('/hanzidrills/:id', hanzidrill.findById);
app.post('/hanzidrills', hanzidrill.addHanziDrill);
app.put('/hanzidrills/:id', hanzidrill.updateHanziDrill);
app.delete('/hanzidrills/:id', hanzidrill.deleteHanziDrill);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
