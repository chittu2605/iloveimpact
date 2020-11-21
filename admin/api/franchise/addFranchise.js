const { DELETE_FRANCHISE_PRODUCT } = require("../../dbQuery/products/deleteProduct");

module.exports = (app) => {
  const ADD_FRANCHISE = require("../../dbQuery/franchise/franchiseQuery")
    .ADD_FRANCHISE;
  const INSERT_PRODUCT_FRANCHISE = require("../../dbQuery/products/productQuery")
    .INSERT_PRODUCT_FRANCHISE;
    const ADD_PRODUCT_FRANCHISE_QUANTITY = require("../../dbQuery/products/productQuery")
    .ADD_PRODUCT_FRANCHISE_QUANTITY;
  const UPDATE_USER_TYPE_TO_FRANCHISE = require("../../dbQuery/adp/adpQuery")
    .UPDATE_USER_TYPE_TO_FRANCHISE;
  const { SELECT_ADP_NAME_BY_ADP_ID } = require("../../dbQuery/adp/adpQuery");
  const connection = require("../../../dbConnect");
  const bodyParser = require("body-parser");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  app.post("/add-franchise", urlencodedParser, async (req, res) => {
    const adp_id = req.body.adp_id;
    const franchiseName = req.body.franchiseName;
    const franchiseAddress = req.body.franchiseAddress;
    const franchisePhone = req.body.franchisePhone;
    const franchiseCity = req.body.city ? req.body.city : 0;
    const franchiseCategory = req.body.category;
    const productList = req.body.productList;
    const franchise_id = req.body.franchise_id;
    const editSampleFranchise = req.body.editFranchise;
    let isSample = req.body.isSample ? 1 : 0;
    isSample = editSampleFranchise ? 1 : isSample;
    if (franchise_id) {
      // if (editSampleFranchise) {
        connection.query( DELETE_FRANCHISE_PRODUCT(franchise_id), async (error, deleted, fields) => {

          productList &&
            productList.forEach((elm) => {
              connection.query(
                INSERT_PRODUCT_FRANCHISE(elm, franchise_id, franchiseCity, isSample),
                async (error, data, fields) => {
                  if (error) console.log(error);
                  // console.log(INSERT_PRODUCT_FRANCHISE(elm, adp_id))
                  if (error) return res.sendStatus("401");
                    if (error) return res.sendStatus("401");
                    elm.details && elm.details.forEach((item, i) => {
                      connection.query( ADD_PRODUCT_FRANCHISE_QUANTITY(data.insertId, item ), async (error, data, fields) => {
                        if (error) console.log(error);
                        if (error) return res.sendStatus("401");
                      })
                    })
                
    
                  
                  
                }
              );
            });
          })
      // } else {

          // productList &&
          //   productList.forEach((elm) => {
          //     connection.query(
          //       INSERT_PRODUCT_FRANCHISE(elm, franchise_id, franchiseCity, isSample),
          //       async (error, data, fields) => {
          //         if (error) console.log(error);
          //         // console.log(INSERT_PRODUCT_FRANCHISE(elm, adp_id))
          //         if (error) return res.sendStatus("401");
          //           if (error) return res.sendStatus("401");
          //           elm.details && elm.details.forEach((item, i) => {
          //             connection.query( ADD_PRODUCT_FRANCHISE_QUANTITY(data.insertId, item ), async (error, data, fields) => {
          //               if (error) console.log(error);
          //               if (error) return res.sendStatus("401");
          //             })
          //           })
                
    
                  
                  
          //       }
          //     );
          //   });
      // }
      
        return res.json({
          status: "success",
        });
    } else {
      connection.query(
        ADD_FRANCHISE(
          adp_id,
          franchiseName,
          franchiseAddress,
          franchisePhone,
          franchiseCity,
          franchiseCategory,
          isSample
        ),
        async (error, newFranchise, fields) => {
          if (error) console.log(error);
          if (error) return res.sendStatus("401");
          if (newFranchise.length === 0) return res.sendStatus("404");
          connection.query(
            UPDATE_USER_TYPE_TO_FRANCHISE(adp_id),
            async (error, results, fields) => {
              if (error) console.log(error);
              if (error) return res.sendStatus("401");
              if (results.length === 0) return res.sendStatus("404");

              productList &&
                productList.forEach((elm) => {
                  connection.query(
                    INSERT_PRODUCT_FRANCHISE(
                      elm,
                      newFranchise.insertId,
                      franchiseCity,
                      isSample
                    ),
                    async (error, data, fields) => {
                      if (error) console.log(error);
                      // console.log(INSERT_PRODUCT_FRANCHISE(elm, adp_id))
                      if (error) return res.sendStatus("401");

                      elm.details && elm.details.forEach((item, i) => {
                        connection.query( ADD_PRODUCT_FRANCHISE_QUANTITY(data.insertId, item ), async (error, data, fields) => {
                          if (error) console.log(error);
                          if (error) return res.sendStatus("401");
                        })
                      })
                    }
                  );
                });

              return res.json({
                status: "success",
              });
            }
          );
        }
      );
    }
  });
};
