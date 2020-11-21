const { ADD_ADP_LINE, ADD_ADP_LINE_2 } = require("../../../admin/dbQuery/adp/adpQuery");
const { passwordEncrypt } = require("../../../utils/passwordEncrypt");



module.exports = (app) => {
  const ADD_ADP = require("../../adpQuery/adp/adp").ADD_ADP;
  const CREATE_ORDER = require("../../adpQuery/product/buyProduct").CREATE_ORDER;
  const { updatePvb } = require("../createBvRow");
  const connection = require("../../../dbConnect");
  const bodyParser = require('body-parser')
  const { debitWallet } = require("../wallet/debitWallet");
  const { sendSmsByAdpId } = require("../../../utils/sendSMS");
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.post("/adp/add-adp", urlencodedParser, async (req, res) => {
      const adpData = req.body.adpData;
      const products = req.body.products;
      const userAdpId = req.user.adp_id;
      const totalAmount = req.body.totalAmount;
      const calculatedBv = req.body.calculatedBv;
      let password = Math.random().toString().split(".")[1];
      let hashedPassword = await passwordEncrypt(password);
      connection.query(ADD_ADP(adpData, hashedPassword), async (error, results, fields) => {
          
          if (error) return res.sendStatus("401");
          // if (results.length === 0) return res.sendStatus("404");
          let adp_id = results.insertId;
          let sponsorId = adpData.sponsor_id;
          let name = `${adpData.firstname} ${adpData.lastname}`;
          connection.query(ADD_ADP_LINE(sponsorId, adp_id, name), async (error, adp_line, fields) => {
            connection.query(ADD_ADP_LINE_2(adpId), async (error, adp_line2, fields) => {
              
            })
          })
          let pvbdata = {
            adp_id: adp_id,
            sponsor_id: adpData.sponsor_id,
            pbv: calculatedBv,
          }
          
          products && products.forEach(async (element, i) => {
            connection.query(CREATE_ORDER(adp_id, element), async (error, newFranchise, fields) => {
                console.log(error)
                console.log(CREATE_ORDER(adp_id, element))
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                let balance = await debitWallet(userAdpId, totalAmount)
                let msg = `Namaste ${adpData.firstname} ji!

                Welcome to Mission Impact!
                
                To view your account you can login from the following link,
                
                www.iloveimpact.com/impact
                
                Please login with following credentials.
                
                ID - ${adp_id}
                Password - ${password}
                
                Wish you success!
                
                IMPACT TEAM`;
                sendSmsByAdpId(adp_id, msg)
                if (i === (products.length - 1)) {
                  updatePvb(pvbdata);
                  return res.json({
                    status: "success",
                    balance: balance
                });
                }

            })
        });
          
         
          
      })

  })
  
} 

