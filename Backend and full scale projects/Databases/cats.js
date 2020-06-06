var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', {useNewUrlParser: true, useUnifiedTopology: true});

var catSchema = ({
    name : String,
    age : Number,
    temperament: String
});

var cat = mongoose.model("cat", catSchema);
//Add a new car
// var george =new cat({
//     name: "Mrs. MorrisGeorge",
//     age: 7,
//     temperament : "Evil"
// });

// george.save(function(err, cat){
//     if(err)
//     {
//         console.log("Something went wrong!!");
//     }else{
//         console.log("Cat Saved");
//         console.log(cat);
//     }
// });
cat.create({
   name: "Snow White",
   age: 15,
   temperament: "bland"
}, function(err, cat){
    if(err)
    {
        console.log("NO cats");
    }
    else{
        console.log(cat);
    }
});
cat.find({}, function(err, cats){
    if(err){
        console.log("No cats");
    }else
    {
        console.log("List of cats:");
        console.log(cats);
    }
});