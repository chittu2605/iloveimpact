const { GET_ADP_BY_PHONE, GET_CHILD_ADP } = require("../../adpQuery/adp/adp");

module.exports = (app) => {
  // const SELECT_ADP_BY_ADP_ID = require("../../dbQuery/adp/adpQuery").SELECT_ADP_BY_ADP_ID;
  // const SELECT_ADP_NAME_BY_ADP_ID = require("../../dbQuery/adp/adpQuery").SELECT_ADP_NAME_BY_ADP_ID;
  const GET_ADP_NAME_BY_ADP_ID = require("../../adpQuery/adp/adp").GET_ADP_NAME_BY_ADP_ID;
  const connection = require("../../../dbConnect");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  // app.get("/list-adp", urlencodedParser, async (req, res) => {
  //     const adp_subset = req.query.adp_subset;
  //     connection.query(SELECT_ADP_BY_ADP_ID(adp_subset), async (error, results, fields) => {
  //         if (error) return res.sendStatus("401");
  //         // if (results.length === 0) return res.sendStatus("404");
              
  //         return res.json({
  //             results
  //         });
          
  //     })

  // })

  // app.get("/adp-name", urlencodedParser, async (req, res) => {
  //     const adp_id = req.query.adp_id;
  //     connection.query(SELECT_ADP_NAME_BY_ADP_ID(adp_id), async (error, results, fields) => {
  //         if (error) return res.sendStatus("401");
  //         // if (results.length === 0) return res.sendStatus("404");
              
  //         return res.json({
  //             results
  //         });
          
  //     })

  // })

  app.get("/adp/get-adp-name", urlencodedParser, async (req, res) => {
      console.log(req.query)
      const adp_id = req.query.adp_id;
      connection.query(GET_ADP_NAME_BY_ADP_ID(adp_id), async (error, results, fields) => {
          console.log(error)
          if (error) return res.sendStatus("401");
          if (results.length === 0) return res.sendStatus("404");
              
          return res.json({
              result: `${results[0].firstname} ${results[0].lastname}`
          });
          
      })

  })

    app.get("/adp/get-adp-by-phone", urlencodedParser, async (req, res) => {
        console.log(req.query)
        const phone = req.query.phone;
        connection.query(GET_ADP_BY_PHONE(phone), async (error, results, fields) => {
            console.log(error)
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                result: results
            });
            
        })

    })


    app.get("/adp/check-line_adp", urlencodedParser, async (req, res) => {
        const sponsorId = req.user.adp_id;
        const adp_id = req.query.adp_id;
        connection.query(CHECK_CHILD_LINE(sponsorId, adp_id), async (error, results, fields) => {
            console.log(error)
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                result: results
            });
            
        })

    })



    app.get("/adp/get-front-line_adp", urlencodedParser, async (req, res) => {
        const sponsorId = req.query.sponsorId;
        connection.query(GET_CHILD_ADP(sponsorId), async (error, results, fields) => {
            console.log(error)
            if (error) return res.sendStatus("401");
            // if (results.length === 0) return res.sendStatus("404");
                
            return res.json({
                result: results
            });
            
        })

    })

  
} 

