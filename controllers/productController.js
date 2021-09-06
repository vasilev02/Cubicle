const { Router } = require("express");
const productService = require("../services/productService");

const router = Router();

router.get("/", (req, res) => {
  const products = productService.getAll(req.query);
  res.render("home", { title: "Home", products });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create" });
});

router.post("/create", validateProduct, (req, res) => {
  let data = req.body;
  productService.create(data);
  res.redirect("/");
});

router.get("/details/:productId", (req, res) => {
  const product = productService.getProductById(req.params.productId);
  res.render("details", { title: "Product details", product });
});

function validateProduct(req, res, next) {
  let isValid = true;

  if (req.body.name.trim().length < 3) {
    isValid = false;
  } else if (req.body.description.trim().length < 10) {
    isValid = false;
  }

  if (isValid) {
    next();
  }
}

module.exports = router;
