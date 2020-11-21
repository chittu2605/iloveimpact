const app = require("../server").app;
const connection = require('../dbConnect');
// const dbPasswordHash = require("./dbPasswordHash");
const loginForgotPassword = require("./api/login")(app);
const city = require("./api/city")(app);
const category = require("./api/category")(app);
const subCategory = require("./api/subCategory")(app);
const adp = require("./api/adp")(app);
const products = require("./api/products")(app);
const franchise = require("./api/franchise")(app);
const order = require("./api/order")(app);
const wallet = require("./api/wallet")(app);

const getPlanManagement = require("./api/planMangement/getPlanManagement")(app);
const updatePlan = require("./api/planMangement/updatePlan")(app);
const generateStatement = require("./api/statement/generateStatement")(app);
