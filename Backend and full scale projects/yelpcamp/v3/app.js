var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    campground = require("./models/campgrounds"),
    seeddb = require("./seeds"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/yelpcamp_v3', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seeddb();


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
               res.render("index", {campgrounds: allcampgrounds});
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
    res.render("new.ejs");
})

app.get("/campgrounds/:id", function(req, res) {
    campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log("Error");
        }
        else{
            console.log(foundcamp);
            res.render("show.ejs", {campground : foundcamp});
        }
    });
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Started");
});