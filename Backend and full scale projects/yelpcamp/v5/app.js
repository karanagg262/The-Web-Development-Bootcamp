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
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelpcamp_v5', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
seeddb();

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
// campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "Image of Granite Hill"
//     }, function(err, campground){
//         if(err){
//             console.log("Couldn't add");
//         }
//         else
//         {
//             console.log(campground);
//         }
// });
var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];
       
app.get("/", function(req, res){
   res.render("landing") 
});

app.get("/campgrounds", function(req,res){
       campground.find({}, function(err, allcampgrounds){
           if(err)
           {
               console.log("error occured");
           }
           else
           {
               console.log("shown");
               res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
           }
       })
       //res.render("campgrounds", {campgrounds, campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    
    var newcamp = {name: name, image: image, description: description}
    campground.create(newcamp, function(err, newlycreated){
       if(err)
       {
           console.log("Wrong data")
       }
       else
       {
           res.redirect("/campgrounds");
       }
    });
    //campgrounds.push(newcamp);
    //res.send("You hit the butt");
    //res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new.ejs");
})

app.get("/campgrounds/:id", function(req, res) {
    campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log("Error");
        }
        else{
            console.log(foundcamp);
            res.render("campgrounds/show.ejs", {campground : foundcamp});
        }
    });
    
})

app.get("/campgrounds/:id/comments/new", isloggedin, function(req, res){
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Error");
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isloggedin, function(req, res){
   campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Error");
            res.redirect("/campgrounds")
        }
        else{
            comment.create(req.body.comment, function(err, comment) {
                if(err)
                {
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    }); 
});

//Authentication Routes
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
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

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local" ,{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Started");
});