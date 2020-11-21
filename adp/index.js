const app = require("../server").app;
// const dbPasswordHash = require("./dbPasswordHash");
const loginForgotPassword = require("./api/login/login")(app);
const wallet = require("./api/wallet/wallet")(app);
const adp = require("./api/adp/index")(app);
const repurchase = require("./api/rePurchase/rePurchase")(app);
const planManagement = require("./api/planMangement/planManagement")(app);
const smartMart = require("./api/smartMart/smartMart")(app);


