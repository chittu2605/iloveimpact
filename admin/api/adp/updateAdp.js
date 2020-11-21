


module.exports = (app) => {
  const { UPDATE_ADP_PHONE_EMAIL, UPDATE_ADP_PASSWORD } = require("../../dbQuery/adp/adpQuery");
  const connection = require("../../../dbConnect");
  const bodyParser = require('body-parser');
  const { passwordEncrypt } = require("../../../utils/passwordEncrypt");
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.put("/update-adp", urlencodedParser, async (req, res) => {
      const adp_id = req.body.adpId;
      const phone = req.body.phone;
      const email = req.body.email;
      const password = req.body.password;
      if (!password) {
        connection.query(UPDATE_ADP_PHONE_EMAIL(adp_id, phone, email), async (error, results, fields) => {
          
          if (error) return res.sendStatus("401");
          return res.json({
              status: "success",
          });
          
        })
      }
      else {
        let hashedPassword = await passwordEncrypt(password);
        connection.query(UPDATE_ADP_PASSWORD(adp_id, hashedPassword), async (error, results, fields) => {
          
          if (error) return res.sendStatus("401");
          return res.json({
              status: "success",
          });
          
        })
      }


  })
  
} 

