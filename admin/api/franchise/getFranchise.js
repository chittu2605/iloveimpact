

module.exports = (app) => {
    const GET_FRANCHISE_BY_CITY = require("../../dbQuery/franchise/franchiseQuery").GET_FRANCHISE_BY_CITY;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })
    const { GET_FRANCHISE_BY_ADP_ID, SELECT_ALL_SAMPLE_FRANCHISE } = require("../../dbQuery/franchise/franchiseQuery");


    app.get("/get-franchise", urlencodedParser, async (req, res) => {
        const city_id = req.query.city;
        const adp_id = req.query.adp_id;
        if (city_id) {
            connection.query(GET_FRANCHISE_BY_CITY(city_id), async (error, results, fields) => {
                console.log(error)
                if (error) return res.sendStatus("401");
                // if (results.length === 0) return res.sendStatus("404");
                return res.json({
                    results
                });
                
            })
        }
        if (adp_id) {
            connection.query(GET_FRANCHISE_BY_ADP_ID(adp_id), async (error, results, fields) => {
                console.log(error)
                if (error) return res.sendStatus("401");
                // if (results.length === 0) return res.sendStatus("404");
                return res.json({
                    results
                });
                
            })
        }
        
    })

    app.get("/sample-franchise", urlencodedParser, async (req, res) => {
        connection.query(SELECT_ALL_SAMPLE_FRANCHISE(), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
            return res.json({
                results
            });
            
        })
        
    })
} 
