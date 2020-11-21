
module.exports = (app) => {
    const passwordEncrypt = require("../../../utils/passwordEncrypt").passwordEncrypt;
    const passwordDecrypt = require("../../../utils/passwordEncrypt").passwordDecrypt;
    const INSERT_UPDATE_TOKEN_DATA = require("../../dbQuery/login/loginQuery").INSERT_UPDATE_TOKEN_DATA;
    const GET_USER_PHONE_EMAIL = require("../../dbQuery/login/loginQuery").GET_USER_PHONE_EMAIL;
    const GET_USER_ID_TOKEN_RESET = require("../../dbQuery/login/loginQuery").GET_USER_ID_TOKEN_RESET;
    const UPDATE_PASSWORD = require("../../dbQuery/login/loginQuery").UPDATE_PASSWORD;
    const sendSMS = require("../../../utils/sendSMS").sendSMS;
    const connection = require("../../../dbConnect");
    const jwt = require("jsonwebtoken");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/forgot", urlencodedParser, async (req, res) => {
        const email = req.body.email;
        const phone = req.body.phone;

        connection.query(GET_USER_PHONE_EMAIL(phone, email), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
            
            let token = getRandomInt(999999);
            let user = results[0];

            let message = `Hi, OTP for your account ${user.adp_id} is ${token}.`;
            sendSMS(user.mobile, message)
            connection.query(INSERT_UPDATE_TOKEN_DATA(user.adp_id, user.mobile, user.email, token), async (error, results, fields) => {
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                
                return res.sendStatus("200");
                
            })
        })
        
        

    })


    app.post("/reset-password", urlencodedParser, async (req, res) => {
        const otp = req.body.otp;
        const userId = req.body.userId;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        connection.query(GET_USER_ID_TOKEN_RESET(userId, otp), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
            
            let user = results[0];
            let hashedPassword = await passwordEncrypt(password);

            connection.query(UPDATE_PASSWORD(userId, hashedPassword), async (error, results, fields) => {
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                
                // let message = `Hi, Password of your account ${user.adp_id} is successfully changed.`;
                // sendSMS(user.mobile, message)
                return res.sendStatus("200");
                
            })

            
            
        })
        
        

    })


    
} 

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}