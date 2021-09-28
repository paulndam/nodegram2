const express = require("express");
const app2 = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const app = require("./server/express");

dotenv.config({ path: "./.env" });

// if (process.env.NODE_ENV === "production") {
//   app2.use(express.static("client/build"));

//   app2.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App Running On Port ----> ${PORT} ☄️ 🏃🏼‍♂️ 🏃🏻 🤠  🚘`);
});

process.on("unhandledRejection", (error) => {
  console.log(`------ Unhandled Rejection 😤 😤 😤 Shutting Down ------`);
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

// Database Connection URL
mongoose
  // .connect(process.env.DATABASE_LOCAL)
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    //console.log(connect.connections);
    console.log(`Connection with DataBase successfull  🦾 🤠`);
  });
