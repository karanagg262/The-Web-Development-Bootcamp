var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo', {useNewUrlParser: true, useUnifiedTopology: true});

var postschema = new mongoose.Schema({
    title: String,
    content: String
});
var post = mongoose.model("post", postschema);

var userschema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postschema]
});
var user = mongoose.model("user", userschema);


// var newuser = new user({
//     email: "Hermoine@hogwarts.edu",
//     name: "Hermoine Granger"
// });
// newuser.posts.push({
//     title: "How to bre polyjuice",
//     content: "Just kidding, Go to potions class to learn it"
// });

// newuser.save(function(err, user){
//     if(err){
//         console.log("eror");
//     }
//     else{
//         console.log(user);
//     }
// });

// var newpost = new post({
//   title: "reflections on apples",
//   content: "They are delicious"
// });

// newpost.save(function(err, post){
//   if(err){
//       console.log("Error")
//   } 
//   else{
//       console.log(post);
//   }
// });


user.findOne({
    name:"Hermoine Granger"}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            user.posts.push({
               title: "3 things i really hate",
               content: "Voldermort voldermort"
            });
            user.save(function(err, user){
                if(err){
                    console.log("error");
                }
                else{
                    console.log(user);
                }
            });
        }
});