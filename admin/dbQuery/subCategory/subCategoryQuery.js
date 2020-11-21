const SELECT_ALL_SUB_CATEGORY = () => {
    return `SELECT * FROM tbl_sub_category;`
}

const SELECT_CATEGORY_BY_CATEGORY_ID = (categoryId) => {
    return `SELECT * FROM tbl_sub_category WHERE tbl_sub_category.category_id = "${categoryId}";`
}

const INSERT_SUB_CATEGORY = (subCategoryName, categoryId) => {
    return `INSERT INTO tbl_sub_category (tbl_sub_category.sub_category, tbl_sub_category.category_id) VALUES ("${subCategoryName}", ${categoryId});`
}
 

module.exports.SELECT_ALL_SUB_CATEGORY = SELECT_ALL_SUB_CATEGORY;
module.exports.SELECT_CATEGORY_BY_CATEGORY_ID = SELECT_CATEGORY_BY_CATEGORY_ID;
module.exports.INSERT_SUB_CATEGORY = INSERT_SUB_CATEGORY;