const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const AppError = require("./utils/appError");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Body parsing middleware to handle the complexities of parsing streamable request objects, so we can simplify browser-server communication by exchanging JSON in the request body:
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Cookie parsing middleware to parse and set cookies in request objects
app.use(cookieParser());

// Compression middleware that will attempt to compress response bodies for all requests that traverse through the middleware
app.use(compress());

//A collection of middleware functions to help secure Express apps by setting various HTTP headers
app.use(helmet());

//Middleware to enable CORS (Cross-origin resource sharing
// app.use(cors());
app.use(cors({ credentials: true, origin: "https://nodegram-v2.netlify.app" }));

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// ---------- Routes ------

// ----User Routes---
app.use("/", userRoutes);

// --- Auth Routes ----
app.use("/", authRoutes);

//--- Post Routes ---.
app.use("/", postRoutes);

// app.get("/", (req, res) => {
//   res.send("Server All Up and Running ☄️ 🏃🏼‍♂️ 🏃🏻 🤠  🚘 ");
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });

// Routes handler
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

// get unauth Errors.
//express-jwt throws an error named UnauthorizedError when the token cannot be validated for some reason. We catch this error here to return a 401 status back to the requesting client.
app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ":" + err.message });
  }
});

module.exports = app;
