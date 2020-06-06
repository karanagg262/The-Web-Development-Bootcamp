var express = require("express"),
    campground = require("../models/campgrounds"),
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

router.post("/", function(req, res){
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

router.get("/new", function(req, res) {
    res.render("campgrounds/new.ejs");
})

router.get("/:id", function(req, res) {
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

module.exports = router;