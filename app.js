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

app.use(morgan("tiny"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog",
    snippet: "My new Blog 1",
    body: "This is how making a Blog in expess, mongoDB",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("662ea8668af7d96cbbfd1d06")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/all-blog", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// routing methods in express:
app.get("/", (req, res) => {
  //res.send("Hello Wrold, this an app with express.js");
  //res.sendFile("./view/index.html", { root: __dirname }); // in express
  const blogs = [
    {
      title: "Come creare dinamicamente in ejs: ",
      snippet: "creando array dentro file app.js",
    },
    {
      title: "Poi usando object: ",
      snippet: "inseriamo i data",
    },
    {
      title: "Poi chimare in render:  ",
      snippet: "e passare i data dentro render mehotd col nome di array",
    },
  ];
  res.render("index", {
    title: "Home",
    blogs,
  }); //con ejs
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  }); // con ejs
});

app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create",
  }); // con ejs
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  }); //in ejs, possiamo acnhe concatenare status code
});
