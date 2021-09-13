const { Router } = require("express");
const authService = require("../services/authService");
const { COOKIE_NAME } = require("../config/config");
const isAuthenticated = require("../middlewares/isAuthenticated")
const isGuest = require("../middlewares/isGuest")

const router = Router();

router.get("/login",isGuest, (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await authService.login(username, password);
    res.cookie(COOKIE_NAME, token);
    res.redirect("/");
  } catch (error) {
    res.render("login", { error });
  }
});

router.get("/register",isGuest, (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.render("register", { message: "Passwords do not match !" });
  }

  try {
    let user = await authService.register(username, password);
    res.redirect("/auth/login");
  } catch (error) {
    res.render("register", { title: "Register", error });
  }
});

router.get("/logout",isAuthenticated, (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect("/");
});

module.exports = router;
