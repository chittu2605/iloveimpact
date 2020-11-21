const SELECT_ALL_PRODUCT_TYPE = () => {
    return `SELECT * FROM tbl_product_type ORDER BY id DESC;`
}
module.exports.SELECT_ALL_PRODUCT_TYPE = SELECT_ALL_PRODUCT_TYPE;