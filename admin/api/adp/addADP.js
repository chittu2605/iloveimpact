const { ADD_ADP_LINE, ADD_ADP_LINE_2 } = require("../../dbQuery/adp/adpQuery");

module.exports = (app) => {
    const ADD_ADP = require("../../dbQuery/adp/adpQuery").ADD_ADP;
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/add-adp", urlencodedParser, async (req, res) => {
        const adp = req.body.data;
        connection.query(ADD_ADP(adp), async (error, results, fields) => {
            console.log(error)
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
            let adpId = results.insertId;
            let sponsorId = adp.sponsor_id;
            let name = `${adp.firstname} ${adp.lastname}`;
            connection.query(ADD_ADP_LINE(sponsorId, adpId, name), async (error, adp_line, fields) => {
                connection.query(ADD_ADP_LINE_2(adpId), async (error, adp_line2, fields) => {
                    return res.json({
                        status: "success",
                        adpId: results.insertId,
                    });
                })
                
            })
            
            
            
        })

    })
    
} 

