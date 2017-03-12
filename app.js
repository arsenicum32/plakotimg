var express = require('express');
var bodyParser = require('body-parser')
var walk = require('walk');
var fs = require('fs');
var app = express();
var Chance = require('chance');

var chance = new Chance();

app.use(bodyParser.urlencoded({ extended: false , limit: '200mb'}))
app.use(bodyParser.json({limit: '200mb'}))

app.get('/', function (req, res) {
  var files   = [];
  var walker  = walk.walk(__dirname+'/img', { followLinks: false });
  walker.on('file', function(root, stat, next) {
      files.push( '/' + stat.name);
      next();
  });
  walker.on('end', function() {
      res.sendFile( __dirname + '/img'+files[Math.floor(Math.random() * files.length )] );
  });
});


var gn = (st)=>{
  var al = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  var f = 0;
  for(var n in st){
    f+=al.indexOf(n);
  }
  return f;
}

app.get('/:id', function (req, res) {
  var files   = [];
  var walker  = walk.walk(__dirname+'/img', { followLinks: false });
  walker.on('file', function(root, stat, next) {
      files.push( '/' + stat.name);
      next();
  });
  walker.on('end', function() {
      res.sendFile( __dirname + '/img'+files[ gn(req.params.id) % files.length ] );
  });
});

app.get('/all', function (req, res) {
  var files   = [];
  var walker  = walk.walk(__dirname+'/img', { followLinks: false });
  walker.on('file', function(root, stat, next) {
      files.push( '/' + stat.name);
      next();
  });
  walker.on('end', function() {
      res.json( files );
  });
});


// app.get('/count', function (req, res) {
//   var text = fs.readFileSync(FilePath,'utf8')
//   var ar = JSON.parse(text);
//   res.json({length:ar.length});
// });

// app.post('/add', function (req, res) {
//   var text = fs.readFileSync(FilePath,'utf8')
//   var ar = JSON.parse(text)
//   ar.push(req.body)
//   fs.writeFileSync(FilePath, JSON.stringify(ar), 'utf8');
//   res.json('true')
// });

app.listen(9000, function () {
  console.log('Example app listening on port 3000!');
});
