const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const dotenv = require("dotenv").config();

const signin = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: `User Not Found, Please Sign-Up`,
        });
      }

      if (!user.authenticate(req.body.password)) {
        return res.status(401).send({
          error: `Email and password doesn't match`,
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET
      );

      res.cookie("t", token, {
        expire: new Date() + 9999,
      });

      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    }
  );
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: `User signed out successfully`,
  });
};

// We can add requireSignin to any route that should be protected against unauthenticated access.
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

// For some of the protected routes such as update and delete, on top of checking for authentication we also want to make sure the requesting user is only updating or deleting their own user information. To achieve this, the hasAuthorization function defined in auth.controller.js checks if the authenticated user is the same as the user being updated or deleted before the corresponding CRUD controller function is allowed to proceed.
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(401).json({
      error: `Sorry Budd, You Ain't Authorized and Cleared To Do That 🤓`,
    });
  }

  next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization };
