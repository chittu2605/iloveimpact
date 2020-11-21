
module.exports = (app) => {
    const passwordEncrypt = require("../../../utils/passwordEncrypt").passwordEncrypt;
    const passwordDecrypt = require("../../../utils/passwordEncrypt").passwordDecrypt;
    const SELECT_USER_BY_USERNAME = require("../../dbQuery/login/loginQuery").SELECT_USER_BY_USERNAME;
    const connection = require("../../../dbConnect");
    const jwt = require("jsonwebtoken");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.post("/admin/login", urlencodedParser, async (req, res) => {
        const password = req.body.password;
        const username = req.body.username;

        
        connection.query(SELECT_USER_BY_USERNAME(username), async (error, results, fields) => {
            console.log(error)
            console.log(results)
            if (error) return res.sendStatus("401");
            if (results.length === 0) return res.sendStatus("404");
            const hash = await passwordDecrypt(password, results[0].password).then ((result) => {
                if (!result) return res.sendStatus("401")
                let user = {
                    adp_id: results[0].adp_id,
                    user_type: results[0].user_type,
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME })
                res.cookie('jwt',accessToken);
                res.json({
                    authenticated: result,
                    userType: results[0].user_type,
                    firstName: results[0].firstname
                });
            })
            
        })

    })


    app.post("/validateToken", (req, res) => {
        // const token = req.headers.cookie && req.headers.cookie.split("=")[1];
        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        //     console.log(decoded) // bar
        //     // res.cookie('jwt',"");
        //     return res.json(decoded)
        //   });
        res.sendStatus("200")
    })

    app.post("/admin/logout", (req, res) => {
        res.cookie('jwt',"");
        return res.sendStatus(205)
    })
    
} 

