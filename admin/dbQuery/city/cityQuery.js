const SELECT_ALL_CITY = () => {
    return `SELECT * FROM tbl_city;`
}

const INSERT_CITY = (cityName) => {
    return `INSERT INTO tbl_city (tbl_city.city) VALUES ("${cityName}");`
}
 
const SELECT_CITY_BY_NAME = (cityName) => {
    return `SELECT * FROM tbl_city WHERE tbl_city.city = "${cityName}";`
}
 // console.log(SELECT_USER_BY_USERNAME(76114748, "prajapati"))
 
 module.exports.SELECT_ALL_CITY = SELECT_ALL_CITY;
 module.exports.INSERT_CITY = INSERT_CITY;