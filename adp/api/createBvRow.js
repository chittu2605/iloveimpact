
const connection = require("../../dbConnect");

const { GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID } = require("../adpQuery/adp/adp");
const { GET_PVB, CREATE_PBV_RECORD_FOR_ADP, UPDATE_PVB } = require("../adpQuery/bv/bv");



const updatePvb = (data) => {
  connection.query(GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID(data.adp_id), async (error, results, fields) => {
    console.log(GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID(data.adp_id))
    if (error) return 
    if (results && results.length > 0) {
      let obj = data;
      obj.sponsor_id = results[0].sponsor_id;
      connection.query(GET_PVB(data.adp_id), async (error, pvbList, fields) => {
        if (error) return res.sendStatus("401");
        if (pvbList && pvbList.length > 0) {
          connection.query(UPDATE_PVB(data), async (error, createdPvb, fields) => {
            console.log(UPDATE_PVB(data));
          })
        } else {
          connection.query(CREATE_PBV_RECORD_FOR_ADP(data), async (error, createdPvb, fields) => {
            console.log(CREATE_PBV_RECORD_FOR_ADP(data));
          })
        }
      })
    }
    
    
    
  })
}

module.exports.updatePvb = updatePvb;