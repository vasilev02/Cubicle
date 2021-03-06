const { Router } = require("express");

const productController = require("./controllers/productController");
const aboutController = require("./controllers/aboutController");
const accessoryController = require("./controllers/accessoryController");
const authController = require("./controllers/authController");

const isAuthenticated = require("./middlewares/isAuthenticated")
const isGuest = require("./middlewares/isGuest")

const router = Router();

router.use(productController);
router.use("/about", aboutController);
router.use("/accessories",isAuthenticated, accessoryController);
router.use("/auth", authController);

router.get("*", (req, res) => {
    res.render("404", {title: "Not found"});
});

module.exports = router;