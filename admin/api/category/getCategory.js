
module.exports = (app) => {
    const SELECT_ALL_CATEGORY = require("../../dbQuery/category/categoryQuery").SELECT_ALL_CATEGORY;
    const SELECT_ALL_SUB_CATEGORY = require("../../dbQuery/subCategory/subCategoryQuery").SELECT_ALL_SUB_CATEGORY;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/list-category", urlencodedParser, async (req, res) => {
        
        connection.query(SELECT_ALL_CATEGORY(), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
            
        })

    })


    app.get("/get-category-with-sub-category", urlencodedParser, async (req, res) => {
        
        connection.query(SELECT_ALL_CATEGORY(), async (error, categories, fields) => {
            if (error) return res.sendStatus("401");
            if (categories.length === 0) return res.sendStatus("404");
             
            connection.query(SELECT_ALL_SUB_CATEGORY(), async (err, subCategories, subCategoryFields) => {
                if (err) return res.sendStatus("401");
                if (err && err.length === 0) return res.sendStatus("404");
                
                let arr = [];

                categories && categories.forEach(cat => {
                    let obj = {};
                    obj.label = cat.category;
                    obj.valuee = cat.id;
                    obj["options"] = [];
                    subCategories && subCategories.forEach((subCat) => {
                        if (cat.id == subCat.category_id) {
                            let subObj = {};
                            subObj.label = subCat.sub_category;
                            subObj.value = subCat.id;
                            subObj.categoryId = subCat.category_id;
                            obj["options"].push(subObj);
                        }
                    })
                    arr.push(obj)
                });

                return res.json({
                    result: arr
                });
            })

        })

    })
} 

