const connection = require("./dbConnect");
const moment = require("moment")
connection.query('SELECT * from tbl_co_sponsor_royality', function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is: ', results);
    results.forEach(async element => {
      let date = moment(element.date, "DD/MM/YYYY hh:mm:ssa").format("YYYY-MM-DD hh:mm:ss");
        connection.query(`
        UPDATE tbl_co_sponsor_royality
        SET tbl_co_sponsor_royality.date="${date}"
        WHERE tbl_co_sponsor_royality.id=${element.id};`)
    });

    console.log("completed")

});


connection.query('SELECT * from tbl_co_sponsor_royality', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  results.forEach(async element => {
    let date = moment(element.date, "DD/MM/YYYY hh:mm:ssa").format("YYYY-MM-DD hh:mm:ss");
      connection.query(`
      UPDATE tbl_co_sponsor_royality
      SET tbl_co_sponsor_royality.date="${date}"
      WHERE tbl_co_sponsor_royality.id=${element.id};`)
  });

  console.log("completed")

});

connection.query('SELECT * from tbl_adp_statement', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  results.forEach(async element => {
    let date = moment(element.cycle_date, "DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
      connection.query(`
      UPDATE tbl_adp_statement
      SET tbl_adp_statement.cycle_date="${date}"
      WHERE tbl_adp_statement.id=${element.id};`)
  });

  console.log("completed")

});


connection.query('SELECT * from tbl_order', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  results.forEach(async element => {
    let date = moment(element.order_date, "DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD hh:mm:ss");
      connection.query(`
      UPDATE tbl_order
      SET tbl_order.order_date="${date}"
      WHERE tbl_order.oid=${element.oid};`)
  });

  console.log("completed")

});