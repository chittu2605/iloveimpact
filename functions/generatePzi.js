const { GET_PBV_BY_ADP_ID, GET_ALL_CHILD, SELECT_PZI_MANAGEMENT, GET_ALL_ADP_ID, GET_CO_SPONSOR_INCOME, GET_CO_OR_SPONSORED_ADP_LIST } = require("./query");
const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { getPbv, getGbv, getBv } = require ("./generateBv");
const { getAdpZone } = require("./zone");
const { getCoSponsorIncome } = require("./coSponsorIncome");
const { getAdpBv } = require("./getPbv");


const selectPziManagement = () => {
  return new Promise((resolve, reject) => {
    connection.query(SELECT_PZI_MANAGEMENT(), async (error, results, fields) => {
      if (error) return reject(error);
      return resolve(results); 
    })
    
  })
} 

const getCoOrSponsoredList = (adpId) => {
  return new Promise((resolve, reject) => {
    connection.query(GET_CO_OR_SPONSORED_ADP_LIST(adpId), async (error, sponsoredAdp, fields) => {
      console.log(GET_CO_OR_SPONSORED_ADP_LIST(adpId))
      resolve(sponsoredAdp)
    })
  })
}

const getPersonalPziIncome = (adpId) => {
  return new Promise((resolve, reject) => {
    getPbv(adpId).then((pbv) => {
      getAdpZone(adpId).then((adpZone) => {
        let income = pbv.pbvCurrentMonth * adpZone.value/100;
        resolve(income)
      })
    })
  })
}

const getGroupPziIncome = (adpId, parentZone) => {
  return new Promise((resolve, reject) => {
    getAdpBv(adpId).then((bv) => {
      // console.log(adpId, bv);
      getAdpZone(adpId).then((adpZone) => {
        
        
        let income = bv.bv * (parentZone - adpZone.value)/100;
        
        resolve(income)
      })
    })
  })
}

const generatePzi = (adpId) => {
  return new Promise((resolve, reject) => {
    getPersonalPziIncome(adpId).then((personalPziIncome) => {
      let income = personalPziIncome ? personalPziIncome : 0;
      getAdpZone(adpId).then((adpZone) => {
        getCoOrSponsoredList(adpId).then((results) => {
          if (results.length == 0) {resolve(income)}
          results && results.forEach((user, i) => {
            getGroupPziIncome(user.adp_id, adpZone.value).then((groupIncome) => {
              income = income + groupIncome;
                // console.log(personalPziIncome, groupIncome)
              if (results.length - 1 === i) {
                  resolve(income)
              }
            })
          })
        })
      })
      
    })
  })
  
}

// generatePzi(64871924).then((income) => {
//   console.log(income)
// })



// selectPziManagement.then((data) => {
//   let pziBreakPoints = data;
//   console.log(pziBreakPoints)
// })


// getPbv(231328)
// .then((data) => {
//   console.log(data)
// })
// getGbv(15).then((data) => {
//   console.log(data)
// })

// getBv(99960750).then((data) => {
//   console.log(data)
// })

module.exports.generatePzi = generatePzi;