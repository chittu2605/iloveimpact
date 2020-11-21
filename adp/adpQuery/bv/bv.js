const CREATE_PBV_RECORD_FOR_ADP = (data) => {
  return `
  INSERT INTO tbl_pbv (
    adp_id,
    sponsor_id,
    pbv,
    current_month_pbv
  )
  VALUES
  (
    "${data.adp_id}",
    "${data.sponsor_id}",
    "${data.pbv}",
    "${data.pbv}"
  );
`
}

const GET_PVB = (adp_id) => {
  return `SELECT * FROM tbl_pbv
  WHERE adp_id = "${adp_id}";`
}

const UPDATE_PVB = (data) => {
  return `UPDATE tbl_pbv SET pbv = (tbl_pbv.pbv+${data.pbv}), current_month_pbv = (tbl_pbv.current_month_pbv+${data.pbv}), sponsor_id = "${data.sponsor_id}" WHERE tbl_pbv.adp_id = "${data.adp_id}";`
}

module.exports.CREATE_PBV_RECORD_FOR_ADP = CREATE_PBV_RECORD_FOR_ADP;
module.exports.GET_PVB = GET_PVB;
module.exports.UPDATE_PVB = UPDATE_PVB;