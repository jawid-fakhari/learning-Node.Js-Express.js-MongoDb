const express = require("express");

// express app
const app = express();

//Register View Engin
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

//costum midleware
app.use((req, res) => {
  console.log("New Request was made:");
  console.log("Host:", req.hostname);
  console.log("Path:", req.path);
  console.log("Method:", req.method);
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
  // res.send("This is About page with express.js");
  // res.sendFile("./view/about.html", { root: __dirname }); // in express
  res.render("about", {
    title: "About",
  }); // con ejs
});

// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

app.get("/blogs/create", (req, res) => {
  // res.send("This is About page with express.js");
  // res.sendFile("./view/about.html", { root: __dirname }); // in express
  res.render("create", {
    title: "Create",
  }); // con ejs
});

//404 page
app.use((req, res) => {
  //   res.sendFile("./view/404.html", { root: __dirname }); // in express
  res.status(404).render("404", {
    title: "404",
  }); //in ejs, possiamo acnhe concatenare status code
});

//uso di template enjine in express per creare dynamic codes
// EJS è un View Engine, un npm lib che si installa poi va registrato(line 6)
