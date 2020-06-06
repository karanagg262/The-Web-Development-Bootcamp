var express = require("express"),
    methodoverride = require("method-override"),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    expresssanitizer = require("express-sanitizer"),
    app = express();
    
mongoose.connect('mongodb://localhost:27017/restful_blog', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodoverride("_method"));
app.use(expresssanitizer())

var blogschema = (
    {
        title: String,
        image: String,
        body: String,
        created: {
            type: Date,
            default: Date.now
        }
    });
    
var blog = mongoose.model("blog", blogschema);

// blog.create({
//     title: "Dog",
//     image: "https://unsplash.com/photos/N04FIfHhv_k",
//     body: "Hello, This is a blog post"
// });

app.get("/blogs", function(req, res){
    blog.find({}, function(err, blogs){
       if(err){
           console.log("No Data");
       } 
       else{
           res.render("index", {blogs: blogs});
       }
    });
});

app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs", function(req, res){
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
   console.log(req.body);
   blog.create(req.body.blog, function(err, newblog){
       if(err){
           console.log("Error Occured")
           res.render("new");
       }
       else
       {
           res.redirect("/blogs");
       }
   }); 
});

app.get("/blogs/:id", function(req, res) {
   blog.findById(req.params.id, function(err, foundblog) {
       if(err){
           res.redirect("/blogs");
       }
       else{
           res.render("show", {blog: foundblog})
       }
   });
});

app.get("/blogs/:id/edit", function(req, res) {
   blog.findById(req.params.id, function(err, foundblog){
      if(err){
          res.redirect("/blogs");
      } 
      else{
          res.render("edit", {blog: foundblog})
      }
   }); 
});

app.put("/blogs/:id", function(req, res) {
        req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedblog) {
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});

app.delete("/blogs/:id", function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } 
       else{
           res.redirect("/blogs");
       }
    });
});
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started"); 
});