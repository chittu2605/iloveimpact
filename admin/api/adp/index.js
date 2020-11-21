module.exports = (app) => {
    const getADP = require("./getADP")(app);
    const addADP = require("./addADP")(app);
    const updateADP = require("./updateAdp")(app);
}

