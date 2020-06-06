var  mongoose = require("mongoose");
//Schema Setup
 var campgroundSchema = new mongoose.Schema({
     name: String,
     image: String,
     description: String,
     comments: [
      {
       type: mongoose.Schema.Types.ObjectId,
       ref: "comment"
      }
     ]
});
module.exports = mongoose.model("campground", campgroundSchema);