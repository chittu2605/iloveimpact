const SELECT_ALL_CATEGORY = () => {
    return `SELECT * FROM tbl_category;`
}

const INSERT_CATEGORY = (categoryName) => {
    return `INSERT INTO tbl_category (tbl_category.category) VALUES ("${categoryName}");`
}
 
const SELECT_CATEGORY_BY_NAME = (categoryName) => {
    return `SELECT * FROM tbl_category WHERE tbl_category.category = "${categoryName}";`
}
 // console.log(SELECT_USER_BY_USERNAME(76114748, "prajapati"))
 
 module.exports.SELECT_ALL_CATEGORY = SELECT_ALL_CATEGORY;
 module.exports.INSERT_CATEGORY = INSERT_CATEGORY;
 module.exports.SELECT_CATEGORY_BY_NAME = SELECT_CATEGORY_BY_NAME;