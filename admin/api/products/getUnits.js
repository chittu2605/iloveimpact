
module.exports = (app) => {
    const SELECT_ALL_UNIT_TYPE = require("../../dbQuery/products/productQuery").SELECT_ALL_UNIT_TYPE;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/list-units", urlencodedParser, async (req, res) => {
        
        connection.query(SELECT_ALL_UNIT_TYPE(), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
            
        })

    })


 
    
} 

