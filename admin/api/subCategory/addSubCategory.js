
module.exports = (app) => {
    const INSERT_SUB_CATEGORY = require("../../dbQuery/subCategory/subCategoryQuery").INSERT_SUB_CATEGORY;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/add-sub-category", urlencodedParser, async (req, res) => {
        const subCategoryName = req.body.subCategoryName;
        const categoryId = req.body.categoryId;
        connection.query(INSERT_SUB_CATEGORY(subCategoryName, categoryId), async (error, results, fields) => {
            if (error && error.errno === 1062) return res.json({"error": "Sub-Category already exists"});
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
        })
    })
} 

