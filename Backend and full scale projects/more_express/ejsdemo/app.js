var express = require("express");
var app = express();

app.use(express.static("css")); //to call the css folder

app.set("view engine","ejs"); //it helps to write res.render("home") instead of res.render("home.ejs")

app.get("/", function(req, res){
    res.render("home")
});

app.get("/big/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingvar: thing})
});

app.get("/posts", function(req, res) {
   var posts = [
       {title: "book1", author:"author1"},
       {title: "book2", author:"author2"},
       {title: "book3", author:"author3"}
       ]; 
    res.render("posts", {posts : posts});
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App is listening");
});