var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});
var post = require("./models/post.js");
var user = require("./models/user.js");;

// post.create({
//     title: "How to cook the best burger pt. 3",
//     content: "ajknsd sdjkdsf sdsdnfds fodsn"
// }, function(err, post) {
//     if(err){
//         console.log("Error");
//     }
//     user.findOne({email: "bob@gmail.com"}, function(err, founduser){
//         if(err)
//         {
//             console.log("error");
//         }
//         else{
//             founduser.posts.push(post);
//             founduser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

// user.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log("error");
//     }
//     else{
//         console.log(user);;
//     }
// });
// user.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// })















