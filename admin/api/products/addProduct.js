

module.exports = (app) => {
    const { ADD_PRODUCT_QUANTITY, INSERT_PRODUCT_ADMIN } = require("../../dbQuery/products/productQuery");
    const connection = require("../../../dbConnect");
    const bodyParser = require('body-parser');
    const shortid = require('shortid');
    const urlencodedParser = bodyParser.urlencoded({ extended: false});

    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./upload/")
        },
        filename: (req, file, cb) => {
            cb(null,  `${shortid.generate()}-${file.originalname.replace(/\s/g,'')}`)
        }
    })

    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            cb(null, true)
        } else {
            cb(null, false)
        }

    }

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    })


    app.post("/add-product", upload.single("image"), urlencodedParser, async (req, res) => {
        let productName = req.body.product;
        let productType = req.body.product_type;
        let desc = req.body.desc;
        let shortDesc = req.body.short_desc;
        let categoryId = req.body.category_id;
        let subCategoryId = req.body.sub_category_id;
        let productQuantityType = JSON.parse(req.body.productQuantityType);
        // let productCode = `${productName.split(" ").map((elm) => {return `${elm[0]}`}).join("")}`;
        let productCode = "";

        let image = req.file ? req.file.path.replace(/\\/g, "/").replace(/\s/g,'') : "";

        let productObj = {
            productName,
            productCode,
            categoryId,
            subCategoryId,
            image,
            shortDesc,
            desc,
            productType
        }
        connection.query(INSERT_PRODUCT_ADMIN(productObj), async (error, results, fields) => {
            console.log(error);

            if (error) return res.sendStatus("401");
            productQuantityType && productQuantityType.forEach((elm, i) => {
                connection.query(ADD_PRODUCT_QUANTITY(results.insertId, elm), async (error, results, fields) => {
                    console.log(error);
                    if (error) return res.sendStatus("401");
                    if (i == (productQuantityType.length - 1)) {
                        return res.json({
                            status: "success"
                        });
                    }
                })
            })
            
            
            
        })

    })


 
    
} 
