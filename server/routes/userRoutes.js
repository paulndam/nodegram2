const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);

router.route("/api/users/search-users").get(userController.searchUsers);

router
  .route("/api/users/photo/:userId")
  .get(userController.photo, userController.defaultPhoto);
router.route("/api/users/defaultphoto").get(userController.defaultPhoto);

router
  .route("/api/users/follow")
  .put(
    authController.requireSignin,
    userController.addFollowing,
    userController.addFollower
  );

router
  .route("/api/users/unfollow")
  .put(
    authController.requireSignin,
    userController.removeFollowing,
    userController.removeFollower
  );

router
  .route("/api/users/findpeople/:userId")
  .get(authController.requireSignin, userController.findPeople);

router
  .route("/api/users/:userId")
  .get(authController.requireSignin, userController.read)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.remove
  );

router.param("userId", userController.userByID);

module.exports = router;
