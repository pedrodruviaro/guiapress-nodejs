const router = require("express").Router();

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

module.exports = router;
