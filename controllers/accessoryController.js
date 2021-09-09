const { Router } = require("express");
const accessoryService = require("../services/accessoryService");

const router = Router();

router.get("/attach", (req, res) => {
  res.render("attachAccessory", { title: "Attach" });
});

router.get("/create", (req, res) => {
  res.render("createAccessory", { title: "Create accessory" });
});

router.post("/create", validateAccessory, (req, res) => {
    accessoryService.create(req.body).then(() => res.redirect("/"));
});

function validateAccessory(req, res, next) {
  let isValid = true;

  if (req.body.name.trim().length < 3) {
    isValid = false;
  } else if (req.body.description.trim().length < 10) {
    isValid = false;
  }else if (req.body.imageUrl.trim().length < 10) {
    isValid = false;
  }

  if (isValid) {
    next();
  }
}

module.exports = router;
