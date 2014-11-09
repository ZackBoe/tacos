var http  = require("http");
var url   = require("url");
var keen  = require("keen.io");
var swig  = require('swig');
var geoip = require('geoip-lite');
var send  = require('send');

// Track some Taco Stats with Keen.io
var tacoLog = keen.configure({
    projectId: "545f4515709a3903dab21f97",
    writeKey: process.env.KEEN_WRITE,
    readKey: "1a4694db231c3f86a236e1e66d85aef17709733ab7d2d55f4adc422f17a3db97e146cbab44e18ec8276b2032064de36459da9a37d4128fed6074361f9036cd78d6b51b258ef134daebbb14863850768ae6a925bbcc5d33b5c294067800e10c34a7acec9eb88b1511d55c9d8e56bad4a1"
});

// A fine selection of Taco Providers
var tacoOptions = ['http://tacobell.com',"http://chipotle.com", "http://deltaco.com", "http://mightytaco.com"]

var server = http.createServer(function(req, res)
 {
  // Is our Taco Fan looking for Tacos or some statistics? Both are pretty tasty.
  var tacoCuriosity = url.parse(req.url).pathname.indexOf("stats") > -1 ? true : false;

  // Select a Taco Provider for our Taco Craver
  var tacoChoice = tacoOptions[Math.floor(Math.random()*tacoOptions.length)];

  // How is our Taco fan accessing us?  
  var tacoBrowser = req.headers['user-agent'];
  // Are they craving Tacos in the middle of a game?
  var tacoSauceAllOverTheKeyboard = tacoBrowser.indexOf("Valve Steam GameOverlay") > -1 ? true : false;

  if (tacoCuriosity) tacoStats(req, res, tacoSauceAllOverTheKeyboard);
  else {
    res.writeHead(303, {'Location': tacoChoice});

    var tacoAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var tacoLocation = geoip.lookup(tacoAddress);

    tacoLog.addEvent("grabbedATaco", {
        "tacoChoice": tacoChoice,
        "tacoSauceAllOverTheKeyboard": tacoSauceAllOverTheKeyboard,
        tacoLocation: tacoLocation
      }, function(err, res) {
      if (err) {
        console.log('We got a Taco Craver! They grabbing a Taco at '+tacoChoice+', but there was a problem informing the Taco Log. :(');
      } else {
        console.log('We got a Taco Craver! They grabbing a Taco at '+tacoChoice+'! We let the Taco Log know.');
      }
    });
    
    res.end();
  }

});

function tacoStats(req, res, tacoSauceAllOverTheKeyboard){

   send(req, url.parse(req.url).pathname, {root: '.'})
  .pipe(res);
}

server.listen(process.env.PORT || 3000);
console.log("Awaiting Taco Cravers");