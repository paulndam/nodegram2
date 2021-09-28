const User = require("../model/userModel");
const _ = require("lodash");
const errorHandler = require("../errorController/errorHandler");
// lodash is a JavaScript library which provides utility functions for common programming tasks including manipulation of arrays and objects.
const formidable = require("formidable");
const fs = require("fs");
const { contentSecurityPolicy } = require("helmet");
const defaultProfileImg = "";

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.status(200).json({
      message: "Successfully signed up!",
    });
  });
};

// list all users
// const list = (req, res) => {
//   User.find((err, users) => {
//     if (err) {
//       return res.status(400).json({
//         error: errorHandler.getErrorMessage(err),
//       });
//     }
//     res.json(users);
//   }).select("name email about followers following updated created");
// };

const list = async (req, res) => {
  try {
    let users = await User.find().select(
      "name email about followers following updated created"
    );
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// get a user by their id
/*
Also when a single user is been retreived from the DB when want to send along a reference ID of the user, so that we can see his followers and those he/she follow.

We use the Mongoose populate method to specify that the user object returned from the query should contain the name and ID of the users referenced in the following and followers lists. This will give us the names and IDs of the user references in the followers and following lists when we fetch the user with the read API call.


*/
// const userByID = (req, res, next, id) => {
//   //   User.findById(id).exec((err, user) => {
//   //     if (err || !user) {
//   //       return res.status(400).json({
//   //         error: `User Not Found`,
//   //       });
//   //     }
//   //     req.profile = user;
//   //     next();
//   //   });

//   User.findById(id)
//     .populate("following", "_id name")
//     .populate("followers", "_id name")
//     .exec((err, user) => {
//       if (err || !user) {
//         return res.status(400).json({ error: `User Not Found 🙁 😢` });
//       }
//       req.profile = user;
//       next();
//     });
// };

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    console.log("---- User By ID From BackEnd ------");
    console.log(user);
    if (!user)
      return res.status("400").json({
        error: "User not found 😢 🙁 😟 😰",
      });
    req.profile = user;
    //res.json(user);
    next();
  } catch (err) {
    console.log("-----Error In UserByID----");
    console.log(err);
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

// The read function retrieves the user details from req.profile and removes sensitive information, such as the hashed_password and salt values, before sending the user object in the response to the requesting client.
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// The update function retrieves the user details from req.profile, then uses the lodash module to extend and merge the changes that came in the request body to update the user data.

/*

Formidable will allow us to read the multipart form data, giving access to the fields and the file, if any. If there is a file, formidable will store it temporarily in the filesystem. We will read it from the filesystem, using the fs module to retrieve the file type and data, and store it to the photo field in the user model. The formidable code will go in the update controller in user.controller.js as follows.

*/

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: `photo could not be uploaded` });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

// The remove function retrieves the user from req.profile and uses the remove() query to delete the user from the database. On successful deletion, the requesting client is returned the deleted user object in the response.

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deleteUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    deleteUser.hashed_password = undefined;
    deleteUser.salt = undefined;
    res.json(deleteUser);
  });
};

/*
look for the photo in the photo controller method and if found, send it in the response to the request at the photo route, otherwise we call next() to return the default photo.

*/

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultProfileImg);
};

/*
When a user follows or unfollows another user from the view, both users' records in the database will be updated in response to the follow or unfollow requests.

The addFollowing controller method in the user controller will update the 'following' array for the current user by pushing the followed user's reference into the array.
*/

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// const addFollowing = (req, res, next) => {
//   User.findByIdAndUpdate(
//     req.body.userId,
//     { $push: { following: req.body.followId } },
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: errorHandler.getErrorMessage(err),
//         });
//       }
//       next();
//     }
//   );
// };

//On successful update of the following array, the addFollower method is executed to add the current user's reference to the followed user's 'followers' array.

const addFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
For unfollowing, the implementation is similar. The removeFollowing and removeFollower controller methods update the respective 'following' and 'followers' arrays by removing the user references with $pull instead of $push.

*/

const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.unfollowId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// we will query the User collection in the database to find the users not in the current user's following list.

const findPeople = async (req, res) => {
  let following = req.profile.following;
  following.push(req.profile._id);
  try {
    let users = await User.find({ _id: { $nin: following } }).select("name");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const searchUsers = async (req, res) => {
  console.log("------query----");
  console.log(req.query);

  // User.find({ name: { $regex: `${searchUsers}`, $options: "$i" } })

  //   .select("-photo")
  //   .then((data) => {
  //     console.log("----Data in Search User Api ---");
  //     console.log(data);
  //     res.json({
  //       result: data.length,
  //       data,
  //     });
  //   });

  try {
    const searchUsers = req.query.name;

    let response = await User.find({
      name: { $regex: `${searchUsers}`, $options: "$i" },
    }).select("-photo");
    console.log("----Data Response in Search User Api ---");
    console.log(response);
    res.json(response);
  } catch (err) {
    console.log("---- error from catch in seachuser in api from backend", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*



*/

module.exports = {
  create,
  list,
  userByID,
  photo,
  defaultPhoto,
  read,
  update,
  remove,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  searchUsers,
};
//../../client/samplemern/src/assets/images/crazyfrog.png
