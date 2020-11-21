
const ADD_FRANCHISE = (adp_id, franchise_name, franchise_address, franchise_number, franchise_city, franchise_category, isSample) => {
    return `INSERT INTO tbl_franchise
    (tbl_franchise.adp_id, tbl_franchise.franchise_name, tbl_franchise.franchise_address, tbl_franchise.franchise_number, tbl_franchise.franchise_city, tbl_franchise.is_sample) VALUES (
    "${adp_id }",
    "${franchise_name}",
    "${franchise_address}",
    "${franchise_number}",
    "${franchise_city}",
    "${isSample}");`
}

const GET_FRANCHISE_BY_CITY = (city_id) => {
    return `
    SELECT * FROM tbl_franchise 
    WHERE franchise_city = "${city_id}"
    AND is_sample = '0';
    `
}

const GET_FRANCHISE_BY_ADP_ID = (adp_id) => {
    return `SELECT * FROM tbl_franchise
    WHERE adp_id = '${adp_id}'
    AND is_sample = '0';`
}

const SELECT_ALL_SAMPLE_FRANCHISE = () => {
    return `SELECT * FROM tbl_franchise
    WHERE is_sample = '1';`
}
 
 module.exports.ADD_FRANCHISE = ADD_FRANCHISE;
 module.exports.GET_FRANCHISE_BY_CITY = GET_FRANCHISE_BY_CITY;
 module.exports.GET_FRANCHISE_BY_ADP_ID = GET_FRANCHISE_BY_ADP_ID;
 module.exports.SELECT_ALL_SAMPLE_FRANCHISE = SELECT_ALL_SAMPLE_FRANCHISE;