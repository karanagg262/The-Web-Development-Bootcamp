var express = require("express");
var app = express();

app.get("/", function(req, res){
    console.log("Someone made a request");
    res.send("Hi there! Welcome to my assignment");
});

app.get("/speak/:name", function(req, res){
    var animal = req.params.name;
    if(animal === "pig")
    {
        res.send("The "+animal+" says Oink");
    }
    else if(animal === "cow")
    {
        res.send("The "+animal+" says Mooo");
    }
    else if(animal === "dog")
    {
        res.send("The "+animal+" says Woof Woof");
    }
});
app.get("/repeat/:name/:id", function(req, res){
    var animal = req.params.name;
    var id = Number(req.params.id);
    if(animal === "hello")
    {
        if(id===3)
        {
            res.send("hello hello hello");
            console.log("Done")
        }
        else if(id==5)
        { 
            res.send("hello hello hello hello hello ");
        }
    }
    else if(animal === "blah" && id===2)
    {
        
        res.send("blah blah");
    }
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});