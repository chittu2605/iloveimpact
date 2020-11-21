
module.exports = (app) => {
    const SELECT_ALL_SUB_CATEGORY = require("../../dbQuery/subCategory/subCategoryQuery").SELECT_ALL_SUB_CATEGORY;
    const SELECT_CATEGORY_BY_CATEGORY_ID = require("../../dbQuery/subCategory/subCategoryQuery").SELECT_CATEGORY_BY_CATEGORY_ID;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/list-sub-category", urlencodedParser, async (req, res) => {
        const categoryId = req.query.categoryId;
        if (categoryId) {
            connection.query(SELECT_CATEGORY_BY_CATEGORY_ID(categoryId), async (error, results, fields) => {
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                    
                return res.json({
                    results
                });
                
            })
        } else {
            connection.query(SELECT_ALL_SUB_CATEGORY(), async (error, results, fields) => {
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                    
                return res.json({
                    results
                });
                
            })
        }
        

    })
    


 
    
} 

