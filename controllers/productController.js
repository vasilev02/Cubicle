const { Router } = require("express");
const productService = require("../services/productService");
const accessoryService = require("../services/accessoryService");
const isAuthenticated = require("../middlewares/isAuthenticated")

const router = Router();

router.get("/",isAuthenticated, (req, res) => {
  productService
    .getAll(req.query)
    .then((products) => {
      res.render("home", { title: "Browse", products });
    })
    .catch(() => res.status(500).end());
});

router.get("/create",isAuthenticated, (req, res) => {
  res.render("create", { title: "Create" });
});

router.post("/create", validateProduct, (req, res) => {
  let data = req.body;
  productService.create(data);
  res.redirect("/");
});

router.get("/delete/:productId", async (req, res) => {
  const cube = await productService.getProductById(req.params.productId);
  res.render("delete", {cube});
});

router.get("/delete/:productId", async (req, res) => {
  const cube = await productService.getProductById(req.params.productId);
  res.render("delete", {cube});
});

router.post("/delete/:productId", (req, res) => {
  const id = req.params.productId;
  productService.deleteProduct(id);
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
  let accessories = await accessoryService.getAllNotIncluded(product.accessories);

  res.render("attachAccessory", { title: "Attach", product, accessories });
});

router.get("/details/:productId/unattach/:accessoryId", async (req, res) => {
  console.log("inside");
  let product = await productService.getProductById(req.params.productId);
  let accessories = await accessoryService.getProductById(req.params.accessoryId);

  res.render("attachAccessory", { title: "Attach", product, accessories });
});

router.post("/details/:productId/attach", async (req, res) => {
  productService.attachAccessory(req.params.productId, req.body.accessory)
  .then(() => res.redirect(`/details/${req.params.productId}`));
});

router.get("/details/:productId/edit", async (req, res) => {
  const cube = await productService.getProductById(req.params.productId);
  res.render("edit", {cube});
});

router.post('/details/:productId/edit', isAuthenticated, validateProduct, (req, res) => {
  productService.updateOne(req.params.productId, req.body)
      .then(response => {
          res.redirect(`/details/${req.params.productId}`);
      });
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
