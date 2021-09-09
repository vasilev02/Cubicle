const { Router } = require("express");

const productController = require("./controllers/productController")
const aboutController = require("./controllers/aboutController")
const accessoryController = require("./controllers/accessoryController")

const router = Router();

router.use(productController);
router.use("/about", aboutController);
router.use("/accessories", accessoryController);

router.get("*", (req, res) => {
    res.render("404", {title: "Not found"});
});

module.exports = router;