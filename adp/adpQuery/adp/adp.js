const SELECT_ADP_BY_ADP_ID = (adp_id_subset) => {
  return `SELECT tbl_user.adp_id FROM tbl_user WHERE tbl_user.adp_id LIKE '%${adp_id_subset}%' LIMIT 30`;
};

const SELECT_ADP_NAME_BY_ADP_ID = (adp_id) => {
  return `SELECT tbl_adp.adp_id, tbl_adp.firstname, tbl_adp.lastname, tbl_user_type.user_type, tbl_franchise.franchise_name, tbl_franchise.franchise_address, tbl_franchise.franchise_number FROM tbl_user
  INNER JOIN tbl_adp
  ON tbl_adp.adp_id = tbl_user.adp_id
  INNER JOIN tbl_user_type
  ON tbl_user_type.id = tbl_user.user_type_id
  LEFT JOIN tbl_franchise
  ON tbl_adp.adp_id = tbl_user.adp_id

WHERE tbl_adp.adp_id = "${adp_id}"`;
};



const ADD_ADP = (data, password) => {
  return `
  INSERT INTO tbl_adp
(
city,
sponsor_id,
sponsor_name,
co_sponsor_id,
co_sponsor_name,
password,
dob,
firstname,
lastname,
gender,
father_firstname,
father_lastname,
nominee_firstname,
nominee_lastname,
nominee_gender,
nominee_dob,
relation,
pan,
email,
mobile,
address_correspondence,
landmark,
district,
state,
postal_code,
id_proof,
proof_address,
bank_name,
account_no,
branch,
ifs_code,
account_type,
success,
verify,
mobile_verify,
new_joining,
flag)
VALUES
  (
  "" ,
  "${data.sponsor_id}" ,
  "${data.sponsor_name}" ,
  "${data.co_sponsor_id}" ,
  "${data.co_sponsor_name}" ,
  "${password}" ,
  "${data.dob}" ,
  "${data.firstname}" ,
  "${data.lastname}" ,
  "${data.gender}" ,
  "${data.father_firstname}" ,
  "${data.father_lastname}" ,
  "${data.nominee_firstname}" ,
  "${data.nominee_lastname}" ,
  "${data.nominee_gender}" ,
  "${data.nominee_dob}" ,
  "${data.relation}" ,
  "${data.pan}" ,
  "${data.email}" ,
  "${data.mobile}" ,
  "${data.address_correspondence}" ,
  "${data.landmark}" ,
  "${data.district}" ,
  "${data.state}" ,
  "${data.postal_code}" ,
  "${data.id_proof}" ,
  "${data.proof_address}" ,
  "${data.bank_name}" ,
  "${data.account_no}" ,
  "${data.branch}" ,
  "${data.ifs_code}" ,
  "${data.account_type}" ,
  "1",
  "0",
  "0",
  "0",
  "1");
  `
}

const GET_ADP_NAME_BY_ADP_ID = (adp_id) => {
  return `SELECT tbl_adp.firstname, tbl_adp.lastname FROM tbl_adp WHERE tbl_adp.adp_id = '${adp_id}'`;
};

const GET_PHONE_NUMBER_BY_ADP_ID = (adp_id) => {
  return `SELECT tbl_adp.mobile FROM tbl_adp WHERE tbl_adp.adp_id = '${adp_id}'`;
};

// const GET_ADP_BY_PHONE = (phoneNumber) => {
//   return `SELECT adp_id, firstname, lastname from tbl_adp
//   WHERE mobile LIKE "${phoneNumber}%"`;
// };
const GET_ADP_BY_PHONE = (phoneNumber) => {
  return `SELECT adp_id, firstname, lastname, sponsor_id, sponsor_name, mobile, pan from tbl_adp
  WHERE mobile LIKE "${phoneNumber}%"`;
};

const GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID = (adp_id) => {
  return `SELECT tbl_adp.sponsor_id, tbl_adp.co_sponsor_id FROM tbl_adp WHERE tbl_adp.adp_id = '${adp_id}'`;
};

const ADD_ADP_LINE = (sponsor_id, adp_id, name) => {
  return `INSERT INTO tbl_adp_line
  ( main_adp, adp_id, name)
  VALUES
  (
  "${sponsor_id}",
  "${adp_id}",
  "${name}"
  );
  `
}

const ADD_ADP_LINE_2 = (adp_id) => {
  return `Insert INTO tbl_adp_line
  ( 
  main_adp, adp_id, name
  ) 
  SELECT a.main_adp, b.adp_id, b.name FROM tbl_adp_line b
  left join tbl_adp_line a 
  on  b.main_adp = a.adp_id
  where b.adp_id = '${adp_id}'
  union 
  SELECT main_adp, adp_id, name 
  FROM tbl_adp_line where adp_id = '${adp_id}'
;`
}

const INSERT_ADP_UP_LINE = (main_adp, adp_id, name) => {
  return `INSERT INTO tbl_adp_up_line
  (
  main_adp,
  adp_id,
  name)
  VALUES
  (
  "${main_adp}",
  "${adp_id}",
  "${name}");`
}

const GET_CHILD_LINE = (sponsorID) => {
  return `SELECT * FROM tbl_adp_line
  WHERE main_adp = "${sponsorID}";`
}

const GET_FIRST_LINE_CHILD_PBV = (adpId) => {
  return `SELECT * FROM tbl_pbv
  Where sponsor_id = "${adpId}";`;
}

const CHECK_CHILD_LINE = (sponsorID, adpId) => {
  return `SELECT * FROM tbl_adp_line
  WHERE main_adp = "${sponsorID}"
  AND adp_id = "${adpId}";`
}

const GET_CHILD_ADP = (sponsorID) => {
  return `SELECT * FROM tbl_adp
  WHERE sponsor_id = "${sponsorID}";`
}

module.exports.SELECT_ADP_BY_ADP_ID = SELECT_ADP_BY_ADP_ID;
module.exports.SELECT_ADP_NAME_BY_ADP_ID = SELECT_ADP_NAME_BY_ADP_ID;
module.exports.ADD_ADP = ADD_ADP;
module.exports.GET_ADP_NAME_BY_ADP_ID = GET_ADP_NAME_BY_ADP_ID;
module.exports.GET_PHONE_NUMBER_BY_ADP_ID = GET_PHONE_NUMBER_BY_ADP_ID;
module.exports.GET_ADP_BY_PHONE = GET_ADP_BY_PHONE;
module.exports.GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID = GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID;
module.exports.ADD_ADP_LINE = ADD_ADP_LINE;
module.exports.GET_CHILD_LINE = GET_CHILD_LINE;
module.exports.GET_FIRST_LINE_CHILD_PBV = GET_FIRST_LINE_CHILD_PBV;
module.exports.CHECK_CHILD_LINE = CHECK_CHILD_LINE;
module.exports.GET_CHILD_ADP = GET_CHILD_ADP;
module.exports.INSERT_ADP_UP_LINE = INSERT_ADP_UP_LINE;
module.exports.ADD_ADP_LINE_2 = ADD_ADP_LINE_2;
