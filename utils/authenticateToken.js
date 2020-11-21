const jwt = require("jsonwebtoken");
const adminOnlyApi = require("./adminOnlyApi").adminOnlyApi;
const authenticateToken = (req, res, next) => {
  if (allowedAPiWithoutLogin.includes(req.path)) {
    next();
  } else {
    const token = req.headers.cookie && req.headers.cookie.split("jwt=")[1];
    // console.log(token)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userCookie) => {
      if (err) return res.sendStatus(403);
      const user = { adp_id: userCookie.adp_id, userType: userCookie.user_type, authenticated: true, name: userCookie.name };
      if (user.adp_id !== "admin" && adminOnlyApi.includes(req.path)) {
        return res.sendStatus(403);
      } else {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });
        res.cookie("jwt", accessToken);
        req.user = user;
        // console.log(user.adp_id);
        next();
      }
      
    });
  }
};

const refreshToken = (req, res, next) => {};
 
const allowedAPiWithoutLogin = [
  "/list-city", 
  "/get-all-products", 
  "/get-category-with-sub-category", 
  "/forgot", 
  "/reset-password",
  "/list-units",
  "/add-product",
  "/get-all-products",
  "/admin/login",
  "/logout",
  "/get-franchise",
  "/list-category",
  "/list-sub-category",
  "/get-adp-name",
  "/adp/login",
  "/adp/validateToken",
  "/adp/logout",
  "/get-product-type",
  "/get-products-admin",
  "/list-adp",
  "/adp-name",
  "/sample-franchise",
  "/add-franchise",
  "/get-adp-by-phone",
]

module.exports.authenticateToken = authenticateToken;
