const LOGIN_ADP1 = (adp_id) => {
  return `SELECT * FROM tbl_adp A
  WHERE A.adp_id = "${adp_id}";`
}

module.exports.LOGIN_ADP = LOGIN_ADP1;  