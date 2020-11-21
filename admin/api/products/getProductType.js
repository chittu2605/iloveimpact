
module.exports = (app) => {
    const SELECT_ALL_PRODUCT_TYPE = require("../../dbQuery/products/productTypeQuery").SELECT_ALL_PRODUCT_TYPE;
    
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/get-product-type", urlencodedParser, async (req, res) => {

        connection.query(SELECT_ALL_PRODUCT_TYPE(), async (error, results, fields) => {
            console.log(error)
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results,
                status: "success"
            });
            
        })
        

    })


 
    
} 

