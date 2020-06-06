 var campground = require("./models/campgrounds"),
    mongoose = require("mongoose"),
    comment = require("./models/comment");
    
var data = [
        {
            name: "Salmon Creek", 
            image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
            description: "sddn sdnj nnjdsn nfdsnf"
        },
        {
            name: "Granite Hill", 
            image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
            description: "ndsjk ndsj jdksnf nfdsjf fndskl"
        },
        {
            name: "Mountain Goat's Rest", 
            image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", 
            description: "mdsk dsk smdfk kdfsnf mkfdms"
        }
    ];
function seeddb(){
    campground.remove({}, function(err){
        if(err){
            console.log("Error Occured")
        }
        console.log("Removed campgrounds")
        data.forEach(function(seed){
            campground.create(seed, function(err, campground){
                if(err)
                {
                    console.log("error");
                }
                else{
                    console.log("added");
                    comment.create(
                        {
                            text: "this place is great",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log("error");
                            }
                            campground.comments.push(comment)
                            campground.save()
                            console.log("created new comment");
                        });
                }
            });
        });
    });
}
module.exports = seeddb;