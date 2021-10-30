const router = require("express").Router();

router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new");
});

module.exports = router;
