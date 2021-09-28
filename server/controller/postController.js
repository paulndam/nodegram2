const Post = require("../model/postModel");
const errorHandler = require("../errorController/errorHandler");
const formidable = require("formidable");
const fs = require("fs");

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: `Image couldn't be uploaded`,
      });
    }

    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    console.log("---Post in create method in Post Ctrl");
    console.log(post);

    try {
      let result = await post.save();
      console.log("---Post Result ---");
      console.log(result);
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const postByID = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate("postedBy", "_id name").exec();
    console.log("post id from a user");
    console.log(post);
    if (!post) {
      return res.status(400).json({
        error: `Post Not Found`,
      });
    }
    req.post = post;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: `Couldn't get the unique user post`,
    });
  }
};

//query the Post collection to find posts that have a matching reference in the postedBy field to the user specified in the userId param in the route.

const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.profile._id })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    console.log("-- Listing Post created by one user");
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log("--- error in listing post by a unique user ---", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//will query the Post collection in the database to get the matching posts.

//In the query to the Post collection, we find all the posts that have postedBy user references that match the current user's followings and the current user.

const listNewsFeed = async (req, res) => {
  let following = req.profile.following;
  console.log("---following in listNewsFeed method ---->", following);
  following.push(req.profile._id);

  try {
    let posts = await Post.find({ postedBy: { $in: req.profile.following } })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    console.log("---Post in news feed ---", posts);
    res.json(posts);
  } catch (err) {
    console.log("--- error in list news feed ---", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  let post = req.post;
  try {
    let deletePost = await post.remove();
    console.log("--- deleting post--");
    console.log(deletePost);
    res.json(deletePost);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

const like = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.body.userId } },
      { new: true }
    );

    console.log("--- Result liking a post --");
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const unlike = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const comment = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;

  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    console.log("--- Result commenting a post --");
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const uncomment = async (req, res) => {
  let comment = req.body.comment;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    console.log("--- Result un-commenting a post --");
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isPoster = async (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

  console.log("--- Poster from is Poster method backend--");
  console.log(isPoster);

  if (!isPoster) {
    return res.status(403).json({
      error: `User is not authorized`,
    });
  }
  next();
};

module.exports = {
  create,
  postByID,
  listNewsFeed,
  listByUser,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isPoster,
};
