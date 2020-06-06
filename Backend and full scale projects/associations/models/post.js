var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});

var postschema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("post", postschema);