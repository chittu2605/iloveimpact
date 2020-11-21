

module.exports = (app) => {
    const CREATE_ORDER = require("../../dbQuery/products/buyProduct").CREATE_ORDER;

    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/create-order", urlencodedParser, async (req, res) => {
        const productList = req.body.products;
        const adp_id = req.body.adp_id;


        productList && productList.forEach(async element => {
            await connection.query(CREATE_ORDER(adp_id, element), async (error, newFranchise, fields) => {
                console.log(error)
                console.log(CREATE_ORDER(adp_id, element))
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");

            })
        });

        return res.json({
            status: "success",
        });
        
    })
} 

