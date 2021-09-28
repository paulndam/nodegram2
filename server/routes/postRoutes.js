const express = require("express");
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const userController = require("../controller/userController");

const router = express.Router();

router
  .route("/api/posts/new/:userId")
  .post(authController.requireSignin, postController.create);

router.route("/api/posts/photo/:postId").get(postController.photo);

router
  .route("/api/posts/by/:userId")
  .get(authController.requireSignin, postController.listByUser);

router
  .route("/api/posts/feed/:userId")
  .get(authController.requireSignin, postController.listNewsFeed);

router
  .route("/api/posts/like")
  .put(authController.requireSignin, postController.like);

router
  .route("/api/posts/unlike")
  .put(authController.requireSignin, postController.unlike);

router
  .route("/api/posts/comment")
  .put(authController.requireSignin, postController.comment);

router
  .route("/api/posts/uncomment")
  .put(authController.requireSignin, postController.uncomment);

router
  .route("/api/posts/:postId")
  .delete(
    authController.requireSignin,
    postController.isPoster,
    postController.remove
  );

//using the :userID param in this route to specify the currently signed-in user, and we will utilize the userByID controller method in the user.controller to fetch the user details and append them to the request object that is accessed in the listNewsFeed post controller method.

router.param("userId", userController.userByID);
router.param("postId", postController.postByID);

module.exports = router;
