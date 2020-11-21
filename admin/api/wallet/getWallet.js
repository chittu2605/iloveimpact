

module.exports = (app) => {
    const { GET_WALLET_BALANCE, GET_WALLET_DETAILS } = require("../../dbQuery/wallet/walletQuery");
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/get-wallet-balance", urlencodedParser, async (req, res) => {
        let adpId = req.query.adpId;
        connection.query(GET_WALLET_BALANCE(adpId), async (error, balance, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                balance
            });
            
        })

    })

    app.get("/get-wallet-trannsaction-details", urlencodedParser, async (req, res) => {
        let adpId = req.query.adpId;
        connection.query(GET_WALLET_DETAILS(adpId), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                results
            });
            
        })

    })



    
    
} 

