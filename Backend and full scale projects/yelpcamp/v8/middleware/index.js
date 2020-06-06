var campground = require("../models/campgrounds");
var comment = require("../models/comment");
var middlewareobj = {};

middlewareobj.checkcampgroundowership = function(req, res, next) {
    if(req.isAuthenticated()){
        campground.findById(req.params.id, function(err, foundcamp){
            if(err){
                res.redirect("back")
            }
            else{
                if(foundcamp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}
middlewareobj.checkcommentownership = function(req, res, next) {
     if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, foundcomment){
            if(err){
                res.redirect("back")
            }
            else{
                if(foundcomment.author.id.equals(req.user._id)){
                   next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

middlewareobj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = middlewareobj;