const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("user route from Harsh");
});

module.exports = router;
