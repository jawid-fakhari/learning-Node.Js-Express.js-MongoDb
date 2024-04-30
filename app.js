const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
//*Receiving and saving data*/
const Blog = require("./model/blog");

// express app
const app = express();

//Register View Engin
app.set("view engine", "ejs");

//listen for requests
// con mongoDB + mongoose lo mettiamo nel mongoose.connect

//Connect to MongoDB
const dbURI =
  "mongodb+srv://jawidTest:jawidTest123@nodecourse.cfcb5sv.mongodb.net/node-course@?retryWrites=true&w=majority&appName=nodecourse";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
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

//* How to render data come from server
//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // how to sort data come from server
    .then((blogs) => {
      res.render("index", {
        title: "Blogs",
        blogs,
      });
    })
    .catch((err) => console.log(err));
});

//post method
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create",
  }); // con ejs
});

//creating a new page for each blog by their id
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog details" });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  }); //in ejs, possiamo acnhe concatenare status code
});
