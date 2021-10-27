const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("./Category");

const Article = connection.define(
    "articles",
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { timestamps: true }
);

/* RELANTIONSHIPS */
//1-P-N
Category.hasMany(Article);
//1-P-1
Article.belongsTo(Category);

/* SYNC */
// só executar UMA vez
// Article.sync({ force: true });

module.exports = Article;

/* 
RELACTIONAMENTOS => definidos em apenas 1 model (neste caso, no artigo)
                 => usados para aumentar a performance da aplicação
*/
