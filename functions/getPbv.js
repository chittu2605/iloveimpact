const connection = require("../dbConnect");
const { GET_CHILD_LINE, GET_FIRST_LINE_CHILD_PBV } = require("../adp/adpQuery/adp/adp");
const { GET_PBV_BY_ADP_ID, GET_ALL_CHILD } = require("./query");

getAdpPbv = (adpId) => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_PBV_BY_ADP_ID(adpId), async (error, results, fields) => {
      
      resolve(results)
    })
  })
}

getAdpGbv = (adpId) => {
  return new Promise(async (resolve, reject) => {
    
    let gbv = 0;
    let totalGbv = 0;

    connection.query(GET_CHILD_LINE(adpId), async (error, results, fields) => {
      console.log(GET_CHILD_LINE(adpId))

      if (results && results.length === 0) resolve({
        gbv,
        totalGbv  
      });
      let addedUserGbv = [];
      let addedUserGbvTillDate = [];
      // console.log(results)
      results && results.forEach((user, i) => {
        connection.query(GET_FIRST_LINE_CHILD_PBV(adpId), async (error, users, fields) => {
          // console.log(results)

          
          let sum = users.reduce((currentSum, user) => {
            if (!addedUserGbv.includes(user.adp_id)) {
              addedUserGbv.push(user.adp_id);
              return currentSum + user.current_month_pbv 
              
            } else {
              return currentSum
            }
             
          }, 0)

          let sumTilldate = users.reduce((currentSum, user) => {
            if (!addedUserGbvTillDate.includes(user.adp_id)) {
              addedUserGbvTillDate.push(user.adp_id);
              return currentSum + user.pbv 
            } else {
              return currentSum
            }
            
          }, 0)
        
          gbv = gbv + sum
          totalGbv = totalGbv + sumTilldate
          // console.log(gbv)
          
          if (i === results.length - 1) {
          // console.log(addedUserGbv)
            resolve({
              gbv,
              totalGbv  
            })
            
          }
          
        })
        
      })
    
      
    })
  })
}


const getAdpBv = (adpId) => {
  return new Promise((resolve, reject) => {
    getAdpPbv(adpId).then((pbvData) => {
      let pbv = pbvData && pbvData.length > 0 ? pbvData[0].current_month_pbv : 0;
      let pbvTillDate = pbvData && pbvData.length > 0 ? pbvData[0].pbv : 0;
      getAdpGbv(adpId).then((gbv) => {
        let bv = pbv + gbv.gbv;
        let bvTillDate = pbvTillDate + gbv.totalGbv;

        resolve({bv, bvTillDate})
      })
    })
  })
}


module.exports = (app) => {
  
  const connection = require("../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  

  app.get("/adp/pbv", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    
    getAdpPbv(adpId).then((results) => {
      res.json({
        status: "success",
        results
      });
    })

  })




  app.get("/adp/gbv", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getAdpGbv(adpId).then((result) => {
      res.json({
        ...result
      });
    })

  })

  app.get("/adp/bv", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getAdpBv(adpId).then((result) => {
      res.json({
        ...result
      });
    })

  })
}  


module.exports.getAdpPbv = getAdpPbv;
module.exports.getAdpGbv = getAdpGbv;
module.exports.getAdpBv = getAdpBv;





