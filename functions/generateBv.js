const { GET_CO_SPONSOR_INCOME, GET_PBV_BY_ADP_ID, GET_ALL_CHILD } = require("./query");
const connection = require("../dbConnect");


const getPbv = async (adp_id) => {
  return new Promise(async (resolve, reject) => {
    let pbvTillDate = 0;
    let pbvCurrentMonth =  0;
    let a = await connection.query(GET_PBV_BY_ADP_ID(adp_id), async (error, pbv, fields) => {
      if (error) reject(console(error))
      pbvTillDate = pbv[0] && pbv ?  pbv[0].pbv : 0;
      pbvCurrentMonth = pbv[0] && pbv ?  pbv[0].current_month_pbv : 0;
      resolve({pbvTillDate, pbvCurrentMonth})
    })
    
  })
}

const getGbv = async (adp_id) => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_ALL_CHILD(adp_id), async (error, children, fields) => {
      let gbvCurrentMonth = 0;
      let gbvTillDate = 0;
      
      if (children.length == 0) {
        resolve({gbvTillDate, gbvCurrentMonth})
      }
      children && children.forEach((child, i) => {
        connection.query(GET_PBV_BY_ADP_ID(child.adp_id), async (error, pbv, fields) => {
          gbvTillDate = (pbv && pbv.length > 0 && i != 0) ? (pbv[0].current_month_pbv) : gbvTillDate;
          gbvCurrentMonth = (pbv && pbv.length > 0 && i != 0) ? (gbvCurrentMonth + pbv[0].current_month_pbv) : gbvCurrentMonth;
          // console.log(gbvTillDate, gbvCurrentMonth)
          if (i == (children.length - 1)) {
            resolve({gbvTillDate, gbvCurrentMonth})
          }
          
        })
      })
    })
  })
}

const getBv = async (adp_id) => {
  return new Promise(async (resolve, reject) => {
    getPbv(adp_id).then((pbv) => {
      getGbv(adp_id).then((gbv) => {
        let bvCurrentMonth = pbv.pbvCurrentMonth + gbv.gbvCurrentMonth;
        let bvTillDate = pbv.pbvTillDate + gbv.gbvTillDate;

        resolve({bvCurrentMonth, bvTillDate})
      })
    })
  })
}


const getAdp = async (adp_id) => {
  return new Promise(async (resolve, reject) => {
    connection.query(` select     adp_id,
      firstname,
      lastname,
      sponsor_id
      from       tbl_adp
      where      adp_id = "${adp_id}";`, async (error, adp, fields) => {
        resolve(adp)
    })
  })
}


const getChildren = async (adp_id) => {
  return new Promise(async (resolve, reject) => {
    let children = [];
      getAdp(adp_id).then((data) => {
        connection.query(` select  adp_id,
        sponsor_id
        from       tbl_adp
        where      sponsor_id = "${data[0].adp_id}";`, async (error, adp, fields) => {
          children.push(adp)
          if (adp && adp.length > 0) {
            adp.forEach((elm, i) => {
              getChildren(adp[0].adp_id).then((data) => {
                children.push(data)

                if (i === adp.length - 1)  {
                  resolve(adp)
                }
              })
            })
          }
          // resolve(adp)
      })
    })
  })
}

// getChildren(56203204).then((data) => {
//   console.log(data)
// })



// return connection.query(GET_CO_SPONSOR_INCOME(adp_id), async (error, coSponsorRoyalty, fields) => {
//   let coSponsorIncome =  (coSponsorRoyalty && coSponsorRoyalty.length > 0) ? (coSponsorRoyalty) : 0;
//   return connection.query(GET_PBV_BY_ADP_ID(adp_id), async (error, pbv, fields) => {
//     let pbvTillDate = pbv ? pbv.pbv : 0;
//     let pbvCurrentMonth = pbv ? pbv.current_month_pbv : 0;
//     return connection.query(GET_ALL_CHILD(adp_id), async (error, children, fields) => {
//       let gbvCurrentMonth = 0;
//       let gbvTillDate = 0;
//       // console.log(children)
//      await children && children.forEach(async (child, i) => {
//         // console.log(gbvTillDate)
//         await connection.query(GET_PBV_BY_ADP_ID(child), async (error, pbv, fields) => {
//           gbvTillDate = (pbv && pbv.length > 0 && i != 0) ? (gbvTillDate + 1) : gbvTillDate;
//           gbvCurrentMonth = (pbv && pbv.length > 0 && i != 0) ? (gbvCurrentMonth + pbv[0].current_month_pbv) : gbvCurrentMonth;
//           // console.log(gbvTillDate, gbvCurrentMonth)
          
//         })
//       })

      
//     })
//   })
// })

module.exports.getPbv = getPbv;
module.exports.getGbv = getGbv;
module.exports.getBv = getBv;