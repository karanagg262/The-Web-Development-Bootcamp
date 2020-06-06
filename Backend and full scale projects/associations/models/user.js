var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});

var userschema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});
module.exports = mongoose.model("user", userschema);