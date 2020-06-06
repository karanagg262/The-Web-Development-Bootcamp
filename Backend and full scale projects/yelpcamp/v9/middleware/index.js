var campground = require("../models/campgrounds");
var comment = require("../models/comment");
var middlewareobj = {};

middlewareobj.checkcampgroundowership = function(req, res, next) {
    if(req.isAuthenticated()){
        campground.findById(req.params.id, function(err, foundcamp){
            if(err){
                req.flash("error", "Camground not found");
                res.redirect("back")
            }
            else{
                if(foundcamp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission");
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
                req.flash("error", "Camground not found");
                res.redirect("back")
            }
            else{
                if(foundcomment.author.id.equals(req.user._id)){
                   next();
                }
                else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logging In to continue");
        res.redirect("back");
    }
}

middlewareobj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
}
module.exports = middlewareobj;