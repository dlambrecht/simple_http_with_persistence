var finalhandler = require('finalhandler');
const http = require('http');
const Router = require('router');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = new Router({mergeParams: true});
router.use(bodyParser.text());
router.route('/notes/:name')
  .get(function(req, res) {
    fs.readFile(__dirname + '/../data/' + req.params.name, 'utf8', (err, data) => {
      if (err) {
        res.status = 500;
        res.write('ERROR: note \'' + req.params.name + '\' not found\n');
      } else {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({note: data}));
      }
      res.end();
    });
  })
  .post(function(req, res) {
    var data = req.body;
    fs.writeFile(__dirname + '/../data/' + req.params.name, data, (err) => {
      if (err) {
        res.status = 500;
        res.write('ERROR: unable to write file');
      } else {
        res.status = 200;
      }
      res.end();
    })
  });


var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
});
server.listen(3000, () => console.log('server up'));
