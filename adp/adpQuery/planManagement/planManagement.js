const SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "bv_calculations";`;
};

module.exports.SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT = SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT;
