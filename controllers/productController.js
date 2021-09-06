const { Router } = require("express");
const productService = require("../services/productService")

const router = Router();

router.get("/", (req, res) => {

  const products = productService.getAll();
  res.render("home", { title: "Home", products });

});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});
router.post("/create", (req, res) => {
  let data = req.body;

  productService.create(data);

  res.redirect("/");
});

router.get("/details/:productId", (req, res) => {
  res.render("details", { title: "Product details" });
});

module.exports = router;
