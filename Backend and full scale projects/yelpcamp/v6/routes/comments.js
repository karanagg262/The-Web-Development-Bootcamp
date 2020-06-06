var express = require("express"),
    campground = require("../models/campgrounds"),
    comment = require("../models/comment"),
    router = express.Router({mergeParams: true});

router.get("/new", isloggedin, function(req, res){
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Error");
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", isloggedin, function(req, res){
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

function isloggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;