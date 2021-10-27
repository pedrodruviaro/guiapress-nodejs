const router = require("express").Router();
const slugify = require("slugify");
const Category = require("../models/Category");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", async (req, res) => {
    const { title } = req.body;

    if (title == undefined || title.trim() === "") {
        return res.redirect("/admin/categories/new");
    }

    try {
        await Category.create({
            title,
            slug: slugify(title),
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
