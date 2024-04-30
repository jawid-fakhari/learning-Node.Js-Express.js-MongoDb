//*blog routes management in express (espress router)
const express = require("express");
//*Receiving and saving data*/
const Blog = require("../model/blog");
//*Blog Controller
const blgController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blgController.blog_index);
router.post("/", blgController.blog_create_post);
router.get("/create", blgController.blog_create_get);
router.get("/:id", blgController.blog_details);
router.delete("/:id", blgController.blog_delete);

module.exports = router;
