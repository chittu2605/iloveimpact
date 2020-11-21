

module.exports = (app) => {
    const SELECT_ALL_ADMIN_PRODUCTS = require("../../dbQuery/products/productQuery").SELECT_ALL_ADMIN_PRODUCTS;
    const SELECT_PRODUCTS_BY_CITY = require("../../dbQuery/products/productQuery").SELECT_PRODUCTS_BY_CITY;
    const SELECT_PRODUCT_BY_CITY_CATEGORY_SUB_CATEGORY = require("../../dbQuery/products/productQuery").SELECT_PRODUCT_BY_CITY_CATEGORY_SUB_CATEGORY;
    const SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY = require("../../dbQuery/products/productQuery").SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY;
    const SELECT_PRODUCT_BY_CITY_FRANCHISE_CATEGORY_SUB_CATEGORY = require("../../dbQuery/products/productQuery").SELECT_PRODUCT_BY_CITY_FRANCHISE_CATEGORY_SUB_CATEGORY;
    const SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN = require("../../dbQuery/products/productQuery").SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN;
    const { SELECT_PRODUCTS_ADMIN, SELECT_PRODUCTS_BY_FRANCHISE_ID, SELECT_PRODUCTS_QUANTITY, SELECT_FRANCHISE_PRODUCTS_QUANTITY, SELECT_FRANCHISE_PRODUCT } = require("../../dbQuery/products/productQuery");
    
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/get-all-products", urlencodedParser, async (req, res) => {
        const city = req.query.city;
        const categoryId = req.query.categoryId;
        const subCategoryId = req.query.subCategoryId;
        const productType = req.query.productType;
        const franchiseId = req.query.franchiseId;

        connection.query(SELECT_FRANCHISE_PRODUCT(productType, city, franchiseId, categoryId, subCategoryId), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
                
            if (results.length == 0) {
                return res.json({
                    results,
                    status: "success"
                });
            }

            results && results.forEach((elm, i) => {
                connection.query(SELECT_FRANCHISE_PRODUCTS_QUANTITY(elm.id), async (error, type, fields) => {
                    elm.details = type;

                    if (type && i == (results.length - 1)) {
                        setTimeout(() => {
                            return res.json({
                                results,
                                status: "success"
                            });
                        }, 100)
                        
                    }
                    
                })
            })
            
        })
        

    })


    app.get("/get-products-admin", urlencodedParser, async (req, res) => {
        const city = req.query.city;
        const categoryId = req.query.categoryId;
        const subCategoryId = req.query.subCategoryId;
        const productType = req.query.productType;

        if (productType && categoryId && subCategoryId) {
            connection.query(SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN(productType, categoryId, subCategoryId), async (error, results, fields) => {
                console.log(error)
                if (error) return res.sendStatus("401");
                
                if (results.length === 0) {
                    return res.json({
                        results,
                        status: "success"
                    });
                }
                
                results && results.forEach((elm, i) => {
                    connection.query(SELECT_PRODUCTS_QUANTITY(elm.id), async (error, type, fields) => {
                        elm.details = type;

                        if (type && i == (results.length - 1)) {
                            setTimeout(() => {
                                return res.json({
                                    results,
                                    status: "success"
                                });
                            }, 100)
                            
                        }
                    })
                })
                
            })
        } else {
            connection.query(SELECT_PRODUCTS_ADMIN(), async (error, results, fields) => {
                console.log(error)
                if (error) return res.sendStatus("401");
                
                

                results && results.forEach((elm, i) => {
                    connection.query(SELECT_PRODUCTS_QUANTITY(elm.id), async (error, type, fields) => {
                        elm.details = type;

                        if (type && i == (results.length - 1)) {
                            return res.json({
                                results,
                                status: "success"
                            });
                        }
                    })
                })

                if (results.length === 0) {
                    return res.json({
                        results,
                        status: "success"
                    });
                }
 
            })
        }
        
    })



    app.get("/get-products-by-franchise", urlencodedParser, async (req, res) => {
        const franchise_id = req.query.franchise_id;
        connection.query(SELECT_PRODUCTS_BY_FRANCHISE_ID(franchise_id), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
            // if (results.length == 0) {
            //     return res.json({
            //         results,
            //         status: "success"
            //     });
            // }
            results && results.forEach((elm, i) => {
                connection.query(SELECT_FRANCHISE_PRODUCTS_QUANTITY(elm.id), async (error, type, fields) => {
                    elm.details = type;

                    if (type && i == (results.length - 1)) {
                        setTimeout(() => {
                            return res.json({
                                results,
                                status: "success"
                            });
                        }, 200)
                        
                    }
                })
            })
            
        })
        
    })

} 
