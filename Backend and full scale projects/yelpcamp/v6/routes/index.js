var express = require("express"),
    user = require("../models/user"),
    passport = require("passport"),
    router = express.Router();

router.get("/", function(req, res){
   res.render("landing") 
});


//Authentication Routes
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res){
    var newuser = new user({username: req.body.username});
    user.register(newuser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      } 
    passport.authenticate("local")(req, res, function(){
        res.redirect("/campgrounds");
    });
  });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local" ,{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;