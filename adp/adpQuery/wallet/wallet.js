const GET_WALLET = (adp_id) => {
  return `SELECT * FROM tbl_wallet A
  WHERE A.adp_id = "${adp_id}";`
}


const CREATE_WALLET = (adp_id) => {
  return `INSERT INTO tbl_wallet  (adp_id, balance) VALUES ("${adp_id}", "0");`
}

const DEBIT_FROM_WALLET = (adp_id, debitAmount) => {
  return `
  UPDATE tbl_wallet SET balance = (tbl_wallet.balance-${debitAmount}) WHERE tbl_wallet.adp_id = "${adp_id}";
  `
}


const INSERT_WALLET_STATEMENT = (adp_id, msg, credit, debit) => {
  return `INSERT INTO tbl_wallet_history (adp_id, msg, credit, debit)
  VALUES ('${adp_id}', '${msg}', '${credit}', '${debit}');`
}

const GET_WALLET_STATEMENT = (adp_id) => {
  return `SELECT * FROM tbl_wallet_history
  WHERE adp_id = "${adp_id}";`
}

module.exports.GET_WALLET = GET_WALLET; 
module.exports.CREATE_WALLET = CREATE_WALLET; 
module.exports.DEBIT_FROM_WALLET = DEBIT_FROM_WALLET; 
module.exports.INSERT_WALLET_STATEMENT = INSERT_WALLET_STATEMENT; 
module.exports.GET_WALLET_STATEMENT = GET_WALLET_STATEMENT; 