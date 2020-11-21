const app = require("../server").app;
const getPbv = require("./getPbv")(app);
const coSponsorIncome = require("./coSponsorIncome")(app);
const retailProfit = require("./retailProfit")(app);
const { generatePzi } = require("./generatePzi");
const zone = require("./zone")(app);
const generateStatement = require("./generateStatement");