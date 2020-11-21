module.exports = (app) => {
    const loginApi = require("./login")(app);
    const forgotPasswordApi = require("./forgotPassword")(app);

}

