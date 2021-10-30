const express = require("express");
const dotenv = require("dotenv");
const connection = require("./database/database");

// controllers
const categoriesController = require("./controllers/CategoriesController");
const articlesController = require("./controllers/ArticlesController");

// models
const Article = require("./models/Article");
const Category = require("./models/Category");

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

// view engine
app.set("view engine", "ejs");

// static
app.use(express.static("public"));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connecting to mysql
connection
    .authenticate()
    .then(() => console.log("Connected to MYSQL"))
    .catch((err) => console.error(err));

// routes

// HOME PAGE
app.get("/", async (req, res) => {
    try {
        const articles = await Article.findAll({ order: [["id", "DESC"]] });

        res.render("index", { articles });
    } catch (err) {
        return res.redirect("index");
    }
});

// SHOW SINGLE ARTICLE
app.get("/:slug", async (req, res) => {
    const slug = req.params.slug;

    try {
        const article = await Article.findOne({
            where: { slug: slug },
        });

        if (!article) {
            return res.redirect("/");
        }

        res.render("article", { article });
    } catch (err) {
        return res.redirect("/");
    }
});

app.use(categoriesController);
app.use(articlesController);

// listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
