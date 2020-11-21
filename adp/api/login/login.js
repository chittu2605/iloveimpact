

module.exports = (app) => {
const { passwordDecrypt, passwordEncrypt } = require("../../../utils/passwordEncrypt");

  const { LOGIN_ADP } = require("../../adpQuery/Login/login");
//   const { LOGIN_ADP } = require("../../adpQuery/login/login");
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.post("/adp/login", urlencodedParser, async (req, res) => {
      const password = req.body.password;
      const adpId = req.body.adpId;
      
      connection.query(LOGIN_ADP(adpId), async (error, results, fields) => {
            console.log(LOGIN_ADP(adpId))
          if (error) return res.sendStatus("401");
          if (results.length === 0) return res.sendStatus("404");
          const hash = await passwordDecrypt(password, results[0].password).then ((result) => {
              if (!result) return res.sendStatus("401")
              let user = {
                  adp_id: results[0].adp_id,
                  user_type: results[0].user_type,
                  name: `${results[0].firstname} ${results[0].lastname}`,
              }
              const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME })
              res.cookie('jwt',accessToken);
              res.json({
                  authenticated: result,
                  userType: results[0].user_type,
                  name: `${results[0].firstname} ${results[0].lastname}`,
                  adpid: results[0].adp_id
              });
          })
          
      })

  })


  app.post("/adp/validateToken", (req, res) => {
      const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
          console.log(decoded) 
          
          // res.cookie('jwt',"");
          if (decoded) {
            return res.json({
                status: "success",
                adpId: decoded.adp_id,
                authenticated: true,
                name: decoded.name
            })
          } else {
              res.sendStatus("401")
          }
          
        });
    //   res.sendStatus("200")
  })

  app.post("/adp/logout", (req, res) => {
      res.cookie('jwt',"");
      return res.sendStatus(205)
  })
  
} 

