var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    campground = require("./models/campgrounds"),
    seeddb = require("./seeds"),
    comment = require("./models/comment"),
    passport = require("passport"),
    localstrategy = require("passport-local"),
    user = require("./models/user"),
    passportlocalmongoose =  require("passport-local-mongoose"),
    mongoose = require("mongoose"),
    campgroundroutes = require("./routes/campgrounds"),
    methodoverride = require("method-override"),
    commentroutes = require("./routes/comments"),
    indexroutes = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelpcamp_v7', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodoverride("_method"));
//seeddb();

//Passport confguration
app.use(require("express-session")({
   secret: "Rusty is worst dog",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});
app.use("/", indexroutes);
app.use("/campgrounds", campgroundroutes);
app.use("/campgrounds/:id/comments", commentroutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Started");
});