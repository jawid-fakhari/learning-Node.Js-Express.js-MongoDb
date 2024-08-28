const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// express app
const app = express();

//Register View Engin
app.set("view engine", "ejs");

//listen for requests
// con mongoDB + mongoose lo mettiamo nel mongoose.connect

//Connect to MongoDB
const dbURI =
  // "mongodb+srv://jawidTest:jawidTest123@nodecourse.cfcb5sv.mongodb.net/node-course@?retryWrites=true&w=majority&appName=nodecourse";
  "mongodb+srv://netninja:test1234@nodetuts.hpih5.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=nodetuts";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));
//Middleware and Static File management
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// routing methods in express:
app.get("/", (req, res) => {
  // res.render("index", {
  //   title: "Home",
  //   blogs,
  // }); //con ejs
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  }); // con ejs
});

//*blog routes management in express (espress router) => blogRoutes.ejs
app.use("/blogs", blogRoutes); //è meglio usare radice qui
//404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  }); //in ejs, possiamo acnhe concatenare status code
});
