module.exports = (app) => {
    const getProducts = require("./getProducts")(app);
    const getUnitss = require("./getUnits")(app);
    const addProduct = require("./addProduct")(app);
    const getProductType = require("./getProductType")(app);
}

