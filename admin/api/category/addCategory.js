
module.exports = (app) => {
    const INSERT_CATEGORY = require("../../dbQuery/category/categoryQuery").INSERT_CATEGORY;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/add-category", urlencodedParser, async (req, res) => {
        const categoryName = req.body.categoryName;
        connection.query(INSERT_CATEGORY(categoryName), async (error, results, fields) => {
            if (error && error.errno === 1062) return res.json({"error": "Category already exists"});
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
        })
    })
} 

