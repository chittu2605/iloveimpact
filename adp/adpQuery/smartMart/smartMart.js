const GET_SMART_MART_BALANCE = (adp_id) => {
  return `SELECT * FROM tbl_smart_mart_discount_balance A
  WHERE A.adp_id = "${adp_id}";`
}


const CREATE_SMART_MART_BALANCE = (adp_id) => {
  return `INSERT INTO tbl_smart_mart_discount_balance  (adp_id, balance) VALUES ("${adp_id}", "0");`
}

const DEBIT_FROM_SMART_MART_BALANCE = (adp_id, debitAmount) => {
  return `
  UPDATE tbl_smart_mart_discount_balance SET balance = (tbl_smart_mart_discount_balance.balance-${debitAmount}) WHERE tbl_smart_mart_discount_balance.adp_id = "${adp_id}";
  `
}

const CREDIT_SMART_MART_BALANCE = (adp_id, creditAmount) => {
  return `
  UPDATE tbl_smart_mart_discount_balance SET balance = (tbl_smart_mart_discount_balance.balance+${creditAmount}) WHERE tbl_smart_mart_discount_balance.adp_id = "${adp_id}";
  `
}


const INSERT_SMART_MART_BALANCE_STATEMENT = (adp_id, msg, credit, debit) => {
  return `INSERT INTO tbl_smart_mart_discount_history (adp_id, msg, credit, debit)
  VALUES ('${adp_id}', '${msg}', '${credit}', '${debit}');`
}

const GET_SMART_MART_BALANCE_STATEMENT = (adp_id) => {
  return `SELECT * FROM tbl_smart_mart_discount_history
  WHERE adp_id = "${adp_id}";`
}

module.exports.GET_SMART_MART_BALANCE = GET_SMART_MART_BALANCE; 
module.exports.CREATE_SMART_MART_BALANCE = CREATE_SMART_MART_BALANCE; 
module.exports.DEBIT_FROM_SMART_MART_BALANCE = DEBIT_FROM_SMART_MART_BALANCE; 
module.exports.INSERT_SMART_MART_BALANCE_STATEMENT = INSERT_SMART_MART_BALANCE_STATEMENT; 
module.exports.GET_SMART_MART_BALANCE_STATEMENT = GET_SMART_MART_BALANCE_STATEMENT; 
module.exports.CREDIT_SMART_MART_BALANCE = CREDIT_SMART_MART_BALANCE; 