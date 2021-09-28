const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },

  email: {
    type: String,
    trim: true,
    unique: "Email already exists, sorry ",
    match: [/.+\@.+\..+/, "valid email required"],
    required: "Email is required",
  },

  hashed_password: {
    type: String,
    required: "Password is required",
  },
  about: {
    type: String,
    trim: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

// The password string provided by the user is not stored directly in the user document. Instead, it is handled as a virtual field.

// When the password value is received on user creation or update, it is encrypted into a new hashed value and set to the hashed_password field, along with the salt value in the salt field.

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// To add validation constraints on the actual password string selected by the end user

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", UserSchema);
