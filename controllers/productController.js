const { Router } = require("express");
const productService = require("../services/productService");
const accessoryService = require("../services/accessoryService");

const router = Router();

router.get("/", (req, res) => {
  productService
    .getAll(req.query)
    .then((products) => {
      res.render("home", { title: "Browse", products });
    })
    .catch(() => res.status(500).end());
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
  productService
    .getProductAndAccessories(req.params.productId)
    .then((product) => {
      res.render("details", { title: "Product details", product });
    })
    .catch(() => res.status(500).end());
});

router.get("/details/:productId/attach", async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  let accessories = await accessoryService.getAll();

  res.render("attachAccessory", { title: "Attach", product, accessories });
});

router.post("/details/:productId/attach", async (req, res) => {
  productService.attachAccessory(req.params.productId, req.body.accessory)
  .then(() => res.redirect(`/details/${req.params.productId}`));
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
