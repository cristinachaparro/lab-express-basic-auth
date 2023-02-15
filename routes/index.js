const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Authentication

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

module.exports = router;
