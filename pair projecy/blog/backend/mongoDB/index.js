const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1/Post";
mongoose
  .connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("db mongo connected");
  })
  .catch((err) => console.log(err));
const db = mongoose.connection;
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  Like:Number,
  comment:Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const userSchema = new mongoose.Schema({
  userName:String,
  password:String,
})
const Blog = mongoose.model("Blog", blogSchema);
const User = mongoose.model("User", userSchema);
exports.getAllBlogs = () => {
  return Blog.find({});
};

exports.getBlogById = (id) => {
  return Blog.findById(id);
};

exports.createBlog = (title, content, author,like,comment) => {
  const blog = new Blog({
    title: title,
    content: content,
    author: author,
    Like:like,
    comment: comment
  });
  return blog.save();
};

exports.UpdateBlog = (id, update) => {
  return Blog.findByIdAndUpdate(id, update, { new: true });
};

exports.deleteBlog = (id) => {
  return Blog.findByIdAndDelete(id);
};
exports.createUser=(userName,password) => {
  const user = new User({
   userName:userName,
   password:password
  });
  return user.save();
};
exports.getuser=()=>{
  return User.find({});
}
exports.findUser=(userName)=>{
  return User.findOne({userName:userName});
  

}

//add a new comment to a post
exports.addComment = (id, comment) => {
  return Blog.findByIdAndUpdate(id, { $push: { comment: comment } }, { new: true });
  };