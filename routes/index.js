var index = function(app){
  app.get('/', function(req, res, next) {
    res.sendfile('views/index.html');
  });
}

module.exports = index;
