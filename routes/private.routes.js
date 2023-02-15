const router = require("express").Router();
const User = require("../models/User.model");
const {isLoggedIn} = require("../middlewares/auth-middlewares")

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("profile.hbs")
})

router.get("/main", isLoggedIn, (req, res, next) => {
    res.render("main.hbs")
})

router.get("/private", isLoggedIn, (req, res, next) => {
    res.render("private.hbs")
})



module.exports = router;
