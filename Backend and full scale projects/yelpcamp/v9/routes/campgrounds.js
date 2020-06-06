var express = require("express"),
    campground = require("../models/campgrounds"),
    middleware = require("../middleware"),
    router = express.Router();

router.get("/", function(req,res){
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

router.post("/", middleware.isloggedin, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = {name: name, price:price, image: image, description: description, author: author}
    
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

router.get("/new", middleware.isloggedin, function(req, res) {
    res.render("campgrounds/new.ejs");
})

router.get("/:id", function(req, res) {
    campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log("Error");
        }
        else{
            res.render("campgrounds/show.ejs", {campground : foundcamp});
        }
    });
    
});

router.get("/:id/edit",middleware.checkcampgroundowership, function(req, res) {
    campground.findById(req.params.id, function(err, foundcamp){
        res.render("campgrounds/edit.ejs", {campground: foundcamp});
    });
});

router.put("/:id", function(req, res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcamp){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkcampgroundowership, function(req, res) {
    campground.findByIdAndRemove(req.params.id, function(err) {
        if(err){
            res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
    });
});
 
module.exports = router;