const router = require("express").Router();
const slugify = require("slugify");
const Category = require("../models/Category");

// Renderizando pagina de adicao
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

// Inserindo uma categoria
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
        return res.redirect("/admin/categories");
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Renderizando pagina de listagem
router.get("/admin/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.render("admin/categories/index", { categories });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Deletando uma categoria
router.post("/categories/delete", async (req, res) => {
    const id = req.body.id;

    if (id == undefined || isNaN(id)) {
        return res.status(400).redirect("/admin/categories");
    }

    await Category.destroy({
        where: {
            id: id,
        },
    });

    return res.redirect("/admin/categories");
});

// editando uma categoria
router.get("/admin/categories/edit/:id", async (req, res) => {
    const id = req.params.id;

    // corrigindo pequeno comportamento do sequelize
    if (isNaN(id)) return res.redirect("/admin/categories");

    try {
        const category = await Category.findByPk(id);

        if (!category) return res.redirect("/admin/categories");

        return res.render("admin/categories/edit", { category });
    } catch (error) {
        return res.redirect("/admin/categories");
    }
});

//salvando categoria editada
router.post("/categories/update", async (req, res) => {
    const { id, title } = req.body;

    try {
        await Category.update(
            { title: title, slug: slugify(title) },
            {
                where: {
                    id: id,
                },
            }
        );

        res.redirect("/admin/categories");
    } catch (error) {
        res.redirect("/admin/categories");
    }
});

module.exports = router;
