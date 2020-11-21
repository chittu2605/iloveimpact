const GET_WALLET_BALANCE = (adp_id) => {
    return `SELECT balance FROM tbl_wallet
    WHERE tbl_wallet.adp_id = '${adp_id}';`;
};


const GET_WALLET_DETAILS = (adp_id) => {
    return `SELECT * FROM tbl_wallet_history
    WHERE adp_id = '${adp_id}';`
}

const ADD_WALLET_BALANCE = (adp_id, balance) => {
    return `UPDATE tbl_wallet
    SET balance = (tbl_wallet.balance+"${balance}")
    WHERE adp_id = "${adp_id}";`
}

const CREATE_WALLET = (adp_id, balance) => {
    return `INSERT INTO tbl_wallet  (adp_id, balance) VALUES ("${adp_id}", "${balance ? balance : 0}");`
  }

const INSERT_WALLET_STATEMENT = (adp_id, msg, credit, debit) => {
return `INSERT INTO tbl_wallet_history (adp_id, msg, credit, debit)
VALUES ('${adp_id}', '${msg}', '${credit}', '${debit}');`
}
  

module.exports.GET_WALLET_BALANCE = GET_WALLET_BALANCE;
module.exports.GET_WALLET_DETAILS = GET_WALLET_DETAILS;
module.exports.ADD_WALLET_BALANCE = ADD_WALLET_BALANCE;
module.exports.CREATE_WALLET = CREATE_WALLET;
module.exports.INSERT_WALLET_STATEMENT = INSERT_WALLET_STATEMENT;
