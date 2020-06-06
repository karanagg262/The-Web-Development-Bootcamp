var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    passport = require("passport"),
    localstartegy = require("passport-local"),
    user = require("./models/user"),
    passportlocalmongoose =  require("passport-local-mongoose"),
    app = express();
    
mongoose.connect('mongodb://localhost:27017/authdemoapp', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(require("express-session")({
   secret: "Rusty is worst dog",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.urlencoded({extended: true}));

passport.use(new localstartegy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


//ROUTES

app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", isloggedin, function(req, res){
    res.render("secret");
})

//Auth routes

//SignUp Routes
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("/register");
      } 
    passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
    });
  });
});


//Login Routes
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local" ,{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Event Started");
})