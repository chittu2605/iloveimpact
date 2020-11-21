const SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "bv_calculations";`;
};

const SELECT_ALL_PLAN_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement;`;
};

const UPDATE_PLAN_BY_ID = (plan) => {
  return `UPDATE tbl_planmanagement
  SET
  value = "${plan.value}",
  min_value = "${plan.min_value}",
  max_value = "${plan.max_value}",
  value2 = "${plan.value2}",
  value3 = "${plan.value3}"
  WHERE id = "${plan.id}";`
}

module.exports.SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT = SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT;
module.exports.SELECT_ALL_PLAN_MANAGEMENT = SELECT_ALL_PLAN_MANAGEMENT;
module.exports.UPDATE_PLAN_BY_ID = UPDATE_PLAN_BY_ID;
