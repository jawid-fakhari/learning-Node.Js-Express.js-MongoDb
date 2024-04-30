//*blog routes management in express (espress router)
const express = require("express");
//*Receiving and saving data*/
const Blog = require("../model/blog");

const router = express.Router();

//* How to render data come from server
//blog routes
//qui abbiamo cancellato /blogs e l'abbiamo aggiunto nel experss router dentro app.js per avere un codice più flessibile.
router.get("/", (req, res) => {
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
router.post("/", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create",
  }); // con ejs
});

//creating a new page for each blog by their id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog details" });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
