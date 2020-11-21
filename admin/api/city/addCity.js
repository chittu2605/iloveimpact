
module.exports = (app) => {
    const INSERT_CITY = require("../../dbQuery/city/cityQuery").INSERT_CITY;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/add-city", urlencodedParser, async (req, res) => {
        const cityName = req.body.cityName;
        connection.query(INSERT_CITY(cityName), async (error, results, fields) => {
            console.log(error)
            if (error && error.errno === 1062) return res.json({"error": "City already exists"});
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
        })
    })
} 

