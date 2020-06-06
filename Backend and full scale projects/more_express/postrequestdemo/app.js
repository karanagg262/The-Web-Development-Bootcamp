var express = require("express");
var app = express();
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
var friends = ["A", "B", "C", "D", "E", "F"];
app.get("/", function(req, res){
   res.render("home") 
});
app.post("/getfriend", function(req, res){
   var newfriend =  req.body.newfriend;
   friends.push(newfriend);
   //res.send("Whoaa cool!");
   res.redirect("/friends");
});
app.get("/friends", function(req, res){
   res.render("friends", {friends : friends}); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
});