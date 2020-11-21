DELETE_FRANCHISE_PRODUCT = (franchiseId) => {
  return `
    DELETE FROM tbl_product_franchise
    WHERE franchise_id = "${franchiseId}";
    `
}

module.exports.DELETE_FRANCHISE_PRODUCT = DELETE_FRANCHISE_PRODUCT;