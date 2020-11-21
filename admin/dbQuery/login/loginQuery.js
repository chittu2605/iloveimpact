const SELECT_USER_BY_USERNAME = (adp_id) => {
   return `SELECT A.adp_id, A.password FROM tbl_user A
   
   WHERE A.adp_id = "${adp_id}";`
}

const INSERT_UPDATE_TOKEN_DATA = (user_id, mobile, email, token) => {
   return `INSERT INTO password_resets
      (password_resets.user_id, password_resets.mobile, password_resets.email, password_resets.token)
      VALUES
      ("${user_id}", "${mobile}", "${email}", "${token}")
      ON DUPLICATE KEY UPDATE
      token = VALUES(token);`
}


const GET_USER_PHONE_EMAIL = (phone, email) => {
   return `SELECT tbl_adp.adp_id, tbl_adp.mobile, tbl_adp.email
   FROM tbl_adp 
   WHERE tbl_adp.mobile='${phone}' 
   OR tbl_adp.email='${email}';`
}


const GET_USER_ID_TOKEN_RESET = (user_id, token) => {
   return `SELECT * FROM password_resets
   WHERE password_resets.user_id = "${user_id}"
   AND password_resets.token = "${token}";`
}


const UPDATE_PASSWORD = (user_id, password) => {
   return `
   UPDATE tbl_user
   SET tbl_user.password="${password}"
   WHERE tbl_user.uid=${user_id};`
}

// console.log(SELECT_USER_BY_USERNAME(76114748, "prajapati"))

module.exports.SELECT_USER_BY_USERNAME = SELECT_USER_BY_USERNAME;
module.exports.GET_USER_PHONE_EMAIL = GET_USER_PHONE_EMAIL;
module.exports.INSERT_UPDATE_TOKEN_DATA = INSERT_UPDATE_TOKEN_DATA;
module.exports.GET_USER_ID_TOKEN_RESET = GET_USER_ID_TOKEN_RESET;
module.exports.UPDATE_PASSWORD = UPDATE_PASSWORD;