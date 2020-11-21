var sslRedirect = require('heroku-ssl-redirect');
// require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '.env_test') });
require('dotenv').config({ path: path.join(__dirname, '.env') });

// if (process.argv[process.argv.length - 1] == "dev") {
//   require('dotenv').config({ path: path.join(__dirname, '.env') });
//   console.log(process.argv[process.argv.length - 1])
// } else {
//   require('dotenv').config({ path: path.join(__dirname, '.env_test') });
// }

const port = process.env.PORT || 4000;
var cors = require('cors');
const authenticateToken = require("./utils/authenticateToken").authenticateToken;
var expressStaticGzip = require("express-static-gzip");
var compression = require('compression')


app.use(sslRedirect());
const bodyParser = require('body-parser');
const sizeSet  = bodyParser({limit: '500mb'})


app.use(compression())
app.use(cors(corsOptions))
app.use("/upload/", express.static("upload"))

// app.use(express.json())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use("/",express.static(path.resolve(__dirname, 'static/product')))
app.use("/admin", express.static(path.resolve(__dirname, 'static/dashboard')))
app.use("/adp", express.static(path.resolve(__dirname, 'static/adp')));
app.use("/adp/login", express.static(path.resolve(__dirname, 'static/adp')));
// app.use("/adp/*", expressStaticGzip(path.join(__dirname, 'static/adp')));
// app.use("/login", expressStaticGzip(path.join(__dirname, 'static/adp')));

// app.use(sizeSet)
  var whitelist = ['http://localhost:3000', 'http://localhost:3001', "https://impact-store-59a2a.web.app", "https://impact-adp.web.app"]
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }


app.use(authenticateToken);
// app.get('/', function(req, res) {
//     res.send('Hi');
// });

let a = "";


// admin panel
app.use('/admin/login', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/dashboard', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/view-adp', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/plan-management', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-city', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-category', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-sub-category', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/franchise', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-product', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-adp', express.static(path.resolve(__dirname, 'static/dashboard')))
app.use('/admin/add-wallet', express.static(path.resolve(__dirname, 'static/dashboard')))



// Stores
app.use('/stores/stores', express.static(path.resolve(__dirname, 'static/product')))


// Adp Dashboard
app.use('/adp/login/', express.static(path.resolve(__dirname, 'static/adp')))
app.use('/adp/dashboard', express.static(path.resolve(__dirname, 'static/adp')))
app.use('/adp/add-adp', express.static(path.resolve(__dirname, 'static/adp')))
app.use('/adp/wallet-statement', express.static(path.resolve(__dirname, 'static/adp')))
app.use('/adp/smart-mart-statement', express.static(path.resolve(__dirname, 'static/adp')))
app.use('/adp/re-purchase', express.static(path.resolve(__dirname, 'static/adp')))



app.listen(port, () => console.log(`Listening on port ${port}`))


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

// setTimeout(function () {
//   console.log('This will still run.');
// }, 500);



module.exports.app = app;