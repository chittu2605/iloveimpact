const GET_PBV_BY_ADP_ID = (adp_id) => {
  return `SELECT * FROM tbl_pbv
  WHERE adp_id = "${adp_id}";`
}

// const GET_ALL_CHILD = (adp_id) => {
//   return `with recursive cte (adp_id, firstname, lastname, sponsor_id) as (
//     select     adp_id,
//                firstname,
//                lastname,
//                sponsor_id
//     from       tbl_adp
//     where      adp_id = "${adp_id}"
//     union all
//     select     p.adp_id,
//                p.firstname,
//                p.lastname,
//                p.sponsor_id
//     from       tbl_adp p
//     inner join cte
//             on p.sponsor_id = cte.adp_id
//   )
//   select * from cte;`
// }

const GET_ALL_CHILD = (adp_id) => {
  return `  Select Distinct adp_id, firstname, lastname, sponsor_id from tbl_adp
  where adp_id IN (
  SELECT adp_id FROM tbl_adp_line
  WHERE main_adp = "${adp_id}");`
}

const INSERT_CO_SPONSOR_ROYALTY = (co_sponsor_id, client_id, client_pad, per, co_sponsor_income, date) => {
  return `INSERT INTO tbl_co_sponsor_royality
  (
  co_sponsor_id,
  client_id,
  client_pad,
  per,
  co_sponsor_income
  
  )
  VALUES
  (
  "${co_sponsor_id}",
  "${client_id}",
  "${client_pad}",
  "${per}",
  "${co_sponsor_income}");`
}

const SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "co_sponsor_royalty";`;
};

const SELECT_PZI_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "zone";`;
};

const GET_CO_SPONSOR_INCOME = (adp_id) => {
  return `SELECT sum(co_sponsor_income) as co_sponsor_income
  FROM tbl_co_sponsor_royality
  WHERE co_sponsor_id = "${adp_id}"
  AND MONTH(date) = MONTH(CURRENT_DATE())
  AND YEAR(date) = YEAR(CURRENT_DATE())
  GROUP BY co_sponsor_id;`
}

const GET_RETAIL_PROFIT = (adp_id) => {
  return `SELECT sum(retail_profit) as total_retail_profit
  FROM tbl_order
  WHERE adp_id = "${adp_id}"
  AND MONTH(order_date) = MONTH(CURRENT_DATE())
  AND YEAR(order_date) = YEAR(CURRENT_DATE())
  GROUP BY adp_id;`
}


const GENERATE_STATEMENT_BY_ADP_ID = (adp_id) => {
  return `INSERT INTO tbl_adp_statement
  (
  adp_id,
  adp_name,
  sponsor_id,
  pan_card,
  mobile,
  cycle_date,
  retail_profit,
  co_sponsor_royality,
  champion_club,
  leader_club,
  one_plus_one_club,
  super_income_club,
  meb_club,
  pull,
  total,
  pzi_income,
  net_commission,
  pull_fund,
  pool_fund,
  tds,
  tds_cut,
  commission_paid,
  final_paid
  )
  (
  SELECT 
  a.adp_id, 
  c.adp_name, 
  c.sponsor_id, 
  c.pan, 
  c.mobile, 
  CURRENT_TIMESTAMP AS cycle_date, 
  b.total_retail_profit, 
  d.co_sponsor_royalty, 
  0 as champion_club,
  0 as leader_club,
  0 as one_plus_one_club,
  0 as super_income_club,
  0 as meb_club,
  0 as pull,
  0 as total,
  0 as pzi_income,
  (b.total_retail_profit+d.co_sponsor_royalty) as net_commission,
  0 as pull_fund,
  0 as pool_fund,
  (SELECT value FROM tbl_planmanagement where plan_name = 'tds') as tds,
  (b.total_retail_profit+d.co_sponsor_royalty)*(((SELECT value FROM tbl_planmanagement where plan_name = 'tds'))/100) as tds_cut,
  ((b.total_retail_profit+d.co_sponsor_royalty))- ((b.total_retail_profit+d.co_sponsor_royalty)*(((SELECT value FROM tbl_planmanagement where plan_name = 'tds'))/100)) as commission_paid,
  (b.total_retail_profit+d.co_sponsor_royalty) as final_pay
  FROM tbl_adp a
  LEFT JOIN 
  (
  select adp_id, sum(retail_profit) as total_retail_profit from
  (
  SELECT adp_id, retail_profit
  FROM tbl_order
  where MONTH(order_date) = MONTH(CURRENT_DATE())
  AND YEAR(order_date) = YEAR(CURRENT_DATE())
  and adp_id = "${adp_id}"
  ) sa
  group by adp_id
  ) b
  ON a.adp_id = b.adp_id
  left join 
  (
  SELECT adp_id, sponsor_id, pan, mobile, concat(firstname, ' ' ,lastname) as adp_name FROM tbl_adp
  )c
  on a.adp_id = c.adp_id
  left join
  (
  select co_sponsor_id, sum(co_sponsor_income) as co_sponsor_royalty from
  (
  SELECT co_sponsor_id, co_sponsor_income as co_sponsor_income
  FROM tbl_co_sponsor_royality
  where MONTH(date) = MONTH(CURRENT_DATE())
  AND YEAR(date) = YEAR(CURRENT_DATE())
  AND co_sponsor_id = "${adp_id}"
  ) df
  group by co_sponsor_id
  )d
  on a.adp_id = d.co_sponsor_id
  where a.adp_id = "${adp_id}" 
  );
  `
}

const GET_ALL_ADP_ID = () => {
  return `SELECT adp_id 
  FROM tbl_adp;`
}

const GET_ALL_ADP_PBV_BY_CO_SPONSOR = (co_sponsor_id) => {
  return `SELECT a.adp_id, sum(b.current_month_pbv) as totalPbv, a.co_sponsor_id FROM tbl_adp a
  INNER JOIN tbl_pbv b
  ON a.adp_id = b.adp_id
  WHERE co_sponsor_id = "${co_sponsor_id}"
  GROUP BY a.co_sponsor_id;`
}

const GET_CO_SPONSOR_PLAN_VALUE = () => {
  return `SELECT value FROM tbl_planmanagement
  WHERE plan_name = "co_sponsor_royalty";`
}


const GET_PLAN_ZONE = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "zone";`
}


const GET_CO_OR_SPONSORED_ADP_LIST = (adp_id) => {
  return `SELECT DISTINCT adp_id FROM tbl_adp
  WHERE sponsor_id = "${adp_id}";`
}

const GET_ADP_NAME_AND_SPONSOR_ID = (adp_id) => {
  return `SELECT adp_id, sponsor_id, firstname, lastname, pan, mobile  FROM tbl_adp
  WHERE adp_id = "${adp_id}";`
}

const GET_PLAN_TDS = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "tds";`
}



module.exports.GET_PBV_BY_ADP_ID = GET_PBV_BY_ADP_ID;
module.exports.GET_ALL_CHILD = GET_ALL_CHILD;
module.exports.INSERT_CO_SPONSOR_ROYALTY = INSERT_CO_SPONSOR_ROYALTY;
module.exports.SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT = SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT;
module.exports.GET_CO_SPONSOR_INCOME = GET_CO_SPONSOR_INCOME;
module.exports.GET_RETAIL_PROFIT = GET_RETAIL_PROFIT;
module.exports.SELECT_PZI_MANAGEMENT = SELECT_PZI_MANAGEMENT;
module.exports.GENERATE_STATEMENT_BY_ADP_ID = GENERATE_STATEMENT_BY_ADP_ID;
module.exports.GET_ALL_ADP_ID = GET_ALL_ADP_ID;
module.exports.GET_ALL_ADP_PBV_BY_CO_SPONSOR = GET_ALL_ADP_PBV_BY_CO_SPONSOR;
module.exports.GET_CO_SPONSOR_PLAN_VALUE = GET_CO_SPONSOR_PLAN_VALUE;
module.exports.GET_PLAN_ZONE = GET_PLAN_ZONE;
module.exports.GET_CO_OR_SPONSORED_ADP_LIST = GET_CO_OR_SPONSORED_ADP_LIST;
module.exports.GET_ADP_NAME_AND_SPONSOR_ID = GET_ADP_NAME_AND_SPONSOR_ID;
module.exports.GET_PLAN_TDS = GET_PLAN_TDS;


