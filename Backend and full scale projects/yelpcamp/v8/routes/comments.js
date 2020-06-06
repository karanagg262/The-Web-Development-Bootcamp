var express = require("express"),
    campground = require("../models/campgrounds"),
    comment = require("../models/comment"),
    middleware = require("../middleware"),
    router = express.Router({mergeParams: true});

router.get("/new", middleware.isloggedin, function(req, res){
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log("Error");
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", middleware.isloggedin, function(req, res){
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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    }); 
});

router.get("/:comment_id/edit", middleware.checkcampgroundowership, function(req, res){
    comment.findById(req.params.comment_id, function(err, foundcomment) {
        if(err){
            console.log("ERROR");
        }
        else{
            res.render("comments/edit", {campground_id: req.params.id, comment:foundcomment}); 
        }
    });
});

router.put("/:comment_id", middleware.checkcampgroundowership, function(req, res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatecomment) {
        if(err){
            res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    })
});

router.delete("/:comment_id", middleware.checkcampgroundowership, function(req, res) {
    campground.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){
            res.redirect("back");
        }
        res.redirect("/campgrounds/"+req.params.id);
    });
});


module.exports = router;