const router = require("express").Router();
const Category = require("../models/Category");
const Article = require("../models/Article");
const slugify = require("slugify");

// pagina de artigos
router.get("/admin/articles", async (req, res) => {
    try {
        // joim con sequelize => inclua os dados do tipo "category". Faz isso pelo relacionamento entre categorias
        const articles = await Article.findAll({
            include: [{ model: Category }],
        });

        return res.render("admin/articles/index", { articles });
    } catch (err) {
        throw Error(err);
    }
});

// renderizando pagina de criacao
router.get("/admin/articles/new", async (req, res) => {
    try {
        const categories = await Category.findAll();

        return res.render("admin/articles/new", { categories });
    } catch (err) {
        return res.redirect("/admin/articles/new");
    }
});

// inserindo uma categoria
router.post("/artcicles/save", async (req, res) => {
    const { title, body, category } = req.body;

    // categoryId => campo gerado ao fazer o relacionamento entre artigo e categoria (chave estrangeira)
    try {
        await Article.create({
            title,
            body,
            categoryId: category,
            slug: slugify(title),
        });

        return res.redirect("/admin/articles");
    } catch (error) {
        return res.redirect("/admin/articles");
    }
});

// Deletando um artigo
router.post("/articles/delete", async (req, res) => {
    const id = req.body.id;

    if (id == undefined || isNaN(id)) {
        return res.status(400).redirect("/admin/articles");
    }

    await Article.destroy({
        where: {
            id: id,
        },
    });

    return res.redirect("/admin/articles");
});

module.exports = router;
