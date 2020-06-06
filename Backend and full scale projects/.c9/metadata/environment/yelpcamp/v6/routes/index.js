{"filter":false,"title":"index.js","tooltip":"/yelpcamp/v6/routes/index.js","undoManager":{"mark":23,"position":23,"stack":[[{"start":{"row":0,"column":0},"end":{"row":43,"column":1},"action":"insert","lines":["app.get(\"/\", function(req, res){","   res.render(\"landing\") ","});","","","//Authentication Routes","app.get(\"/register\", function(req, res) {","    res.render(\"register\");","});","","app.post(\"/register\", function(req, res){","    var newuser = new user({username: req.body.username});","    user.register(newuser, req.body.password, function(err, user){","      if(err){","          console.log(err);","          return res.render(\"register\");","      } ","    passport.authenticate(\"local\")(req, res, function(){","        res.redirect(\"/campgrounds\");","    });","  });","});","","app.get(\"/login\", function(req, res) {","    res.render(\"login\");","});","","app.post(\"/login\", passport.authenticate(\"local\" ,{","    successRedirect: \"/campgrounds\",","    failureRedirect: \"/login\"","}), function(req, res){","});","","app.get(\"/logout\", function(req, res) {","    req.logout();","    res.redirect(\"/campgrounds\");","});","","function isloggedin(req, res, next){","    if(req.isAuthenticated()){","        return next();","    }","    res.redirect(\"/login\");","}"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":30},"action":"insert","lines":["var express = require(\"express\");","var router = express.Router();"],"id":3}],[{"start":{"row":1,"column":30},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":3,"column":2},"end":{"row":3,"column":3},"action":"remove","lines":["p"],"id":5},{"start":{"row":3,"column":1},"end":{"row":3,"column":2},"action":"remove","lines":["p"]},{"start":{"row":3,"column":0},"end":{"row":3,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":3,"column":0},"end":{"row":3,"column":6},"action":"insert","lines":["router"],"id":6}],[{"start":{"row":9,"column":2},"end":{"row":9,"column":3},"action":"remove","lines":["p"],"id":7},{"start":{"row":9,"column":1},"end":{"row":9,"column":2},"action":"remove","lines":["p"]},{"start":{"row":9,"column":0},"end":{"row":9,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":9,"column":0},"end":{"row":9,"column":6},"action":"insert","lines":["router"],"id":8}],[{"start":{"row":13,"column":2},"end":{"row":13,"column":3},"action":"remove","lines":["p"],"id":9},{"start":{"row":13,"column":1},"end":{"row":13,"column":2},"action":"remove","lines":["p"]},{"start":{"row":13,"column":0},"end":{"row":13,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":13,"column":0},"end":{"row":13,"column":6},"action":"insert","lines":["router"],"id":10}],[{"start":{"row":26,"column":2},"end":{"row":26,"column":3},"action":"remove","lines":["p"],"id":11},{"start":{"row":26,"column":1},"end":{"row":26,"column":2},"action":"remove","lines":["p"]},{"start":{"row":26,"column":0},"end":{"row":26,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":26,"column":0},"end":{"row":26,"column":6},"action":"insert","lines":["router"],"id":12}],[{"start":{"row":30,"column":2},"end":{"row":30,"column":3},"action":"remove","lines":["p"],"id":13},{"start":{"row":30,"column":1},"end":{"row":30,"column":2},"action":"remove","lines":["p"]},{"start":{"row":30,"column":0},"end":{"row":30,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":30,"column":0},"end":{"row":30,"column":6},"action":"insert","lines":["router"],"id":14}],[{"start":{"row":36,"column":2},"end":{"row":36,"column":3},"action":"remove","lines":["p"],"id":17},{"start":{"row":36,"column":1},"end":{"row":36,"column":2},"action":"remove","lines":["p"]},{"start":{"row":36,"column":0},"end":{"row":36,"column":1},"action":"remove","lines":["a"]}],[{"start":{"row":36,"column":0},"end":{"row":36,"column":6},"action":"insert","lines":["router"],"id":18}],[{"start":{"row":46,"column":1},"end":{"row":47,"column":0},"action":"insert","lines":["",""],"id":19},{"start":{"row":47,"column":0},"end":{"row":48,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":48,"column":0},"end":{"row":48,"column":24},"action":"insert","lines":["module.exports = router;"],"id":20}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":30},"action":"remove","lines":["var express = require(\"express\");","var router = express.Router();"],"id":21},{"start":{"row":0,"column":0},"end":{"row":2,"column":30},"action":"insert","lines":["var express = require(\"express\"),","    campground = require(\"./models/campgrounds\"),","    router = express.Router();"]}],[{"start":{"row":1,"column":5},"end":{"row":1,"column":49},"action":"remove","lines":["ampground = require(\"./models/campgrounds\"),"],"id":22},{"start":{"row":1,"column":4},"end":{"row":1,"column":5},"action":"remove","lines":["c"]}],[{"start":{"row":1,"column":4},"end":{"row":1,"column":36},"action":"insert","lines":["user = require(\"./models/user\"),"],"id":23}],[{"start":{"row":1,"column":36},"end":{"row":2,"column":0},"action":"insert","lines":["",""],"id":24},{"start":{"row":2,"column":0},"end":{"row":2,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":2,"column":4},"end":{"row":2,"column":35},"action":"insert","lines":["passport = require(\"passport\"),"],"id":25}],[{"start":{"row":1,"column":21},"end":{"row":1,"column":22},"action":"insert","lines":["."],"id":26}]]},"ace":{"folds":[],"scrolltop":420,"scrollleft":0,"selection":{"start":{"row":43,"column":0},"end":{"row":48,"column":1},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1590866931498,"hash":"4eb7d8c6e7af66481c00b0e34dedacb6ae06c637"}