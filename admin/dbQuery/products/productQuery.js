const SELECT_ALL_ADMIN_PRODUCTS = () => {
    return `SELECT * FROM tbl_product
    INNER JOIN tbl_product_unit
    WHERE tbl_product.unit = tbl_product_unit.id;`
}

const SELECT_PRODUCTS_BY_CITY = (city_id) => {
    return `SELECT * FROM tbl_product_franchise A
    WHERE A.city = "${city_id}"
    AND A.is_sample = "0";`
}

const SELECT_ALL_UNIT_TYPE = (city) => {
    return `SELECT * FROM tbl_product_unit;`
}

const INSERT_PRODUCT_ADMIN = (data) => {
    return `INSERT INTO tbl_product  (
        tbl_product.product, tbl_product.product_code,  tbl_product.category_id, tbl_product.sub_category_id, tbl_product.imageUrl,  tbl_product.short_desc, tbl_product.desc,   tbl_product.product_type) VALUES (
        "${data.productName}",
        "${data.productCode}",
        "${data.categoryId}",
        "${data.subCategoryId}",
        "${data.image}",
        "${data.shortDesc}",
        "${data.desc}",
        "${data.productType}"
        );`
}

const SELECT_PRODUCT_BY_CITY_CATEGORY_SUB_CATEGORY = (city_id, category_id, subCategoryId) => {
    return `SELECT * FROM tbl_product_franchise
    WHERE tbl_product_franchise.city = "${city_id}"
    AND tbl_product_franchise.category_id = "${category_id}"
    AND tbl_product_franchise.sub_category_id = "${subCategoryId}"
    AND tbl_product_franchise.is_sample = "0";`
}

const SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY = (product_type, category_id, subCategoryId) => {
    return `SELECT * FROM tbl_product_franchise
    WHERE tbl_product_franchise.product_Type = "${product_type}"
    AND tbl_product_franchise.category_id = "${category_id}"
    AND tbl_product_franchise.sub_category_id = "${subCategoryId}"
    AND tbl_product_franchise.is_sample = "0";`
}


const INSERT_PRODUCT_FRANCHISE = (data, franchiseId, franchiseCity, isSample) => {
    return `INSERT INTO tbl_product_franchise  (
        tbl_product_franchise.product, tbl_product_franchise.product_code,  tbl_product_franchise.category_id, tbl_product_franchise.sub_category_id,     tbl_product_franchise.imageUrl,  tbl_product_franchise.short_desc, tbl_product_franchise.desc,  tbl_product_franchise.franchise_id, tbl_product_franchise.city, tbl_product_franchise.product_type, tbl_product_franchise.is_sample) VALUES (
        "${data.product}",
        "${data.product_code}",
        "${data.category_id}",
        "${data.sub_category_id}",
        "${data.imageUrl}",
        "${data.short_desc}",
        "${data.desc}",
        "${franchiseId}",
        "${franchiseCity}",
        "${data.product_type}",
        "${isSample}"
        );`
}


const SELECT_PRODUCT_BY_CITY_FRANCHISE_CATEGORY_SUB_CATEGORY = (city, category_id, subCategoryId, franchise_id) => {
    return `SELECT * FROM tbl_product_franchise
    WHERE tbl_product_franchise.city = "${city}"
    AND tbl_product_franchise.category_id = "${category_id}"
    AND tbl_product_franchise.sub_category_id = "${subCategoryId}"
    AND tbl_product_franchise.franchise_id = "${franchise_id}"
    AND tbl_product_franchise.is_sample = "0";`
}

const SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN = (product_type, category_id, subCategoryId) => {
    return `SELECT * FROM tbl_product
    WHERE tbl_product.product_Type = "${product_type}"
    AND tbl_product.category_id = "${category_id}"
    AND tbl_product.sub_category_id = "${subCategoryId}";`
}

const SELECT_PRODUCTS_ADMIN = () => {
    return `SELECT *  FROM tbl_product ;`
}





const SELECT_PRODUCTS_BY_FRANCHISE_ID = (franchise_id) => {
    return `SELECT * FROM tbl_product_franchise A
    WHERE A.franchise_id = "${franchise_id}";`
}


const ADD_PRODUCT_QUANTITY = (productId, productData) => {
    return `
    INSERT INTO tbl_product_quantity
    (
    product_id,
    quantity,
    unit_quantity,
    unit,
    price,
    discount,
    after_discount,
    retail_profit,
    actual_price,
    gst,
    bv,
    vdbc,
    vdbd,
    commision,
    vdba,
    free_code,
    free_code_to,
    free_code_from,
    max_purchase
    )
    VALUES
    (
    "${productId}",
    "${productData.quantity}",
    "${productData.unitQuantity}",
    "${productData.unit}",
    "${productData.price}",
    "${productData.discount}",
    "${productData.priceAfterDiscount}",
    "${productData.retailProfit}",
    "${productData.actualPrice}",
    "${productData.gst}",
    "${productData.bv}",
    "${productData.vdbc}",
    "${productData.vdbd}",
    "${productData.franchiseCommision}",
    "${productData.vdba}",
    "${productData.freeCode}",
    "${productData.freeCodeTo}",
    "${productData.freeCodeFrom}",
    "${productData.maxPurchase}"
    );
`
}


const SELECT_PRODUCTS_QUANTITY = (productId) => {
    return `
        SELECT * FROM tbl_product_quantity
        WHERE tbl_product_quantity.product_id = ${productId};
    `
}

const ADD_PRODUCT_FRANCHISE_QUANTITY = (productId, productData) => {
    return `
    INSERT INTO tbl_product_franchise_quantity
    (
    product_id,
    quantity,
    unit_quantity,
    unit,
    price,
    discount,
    after_discount,
    retail_profit,
    actual_price,
    gst,
    bv,
    vdbc,
    vdbd,
    commision,
    vdba,
    free_code,
    free_code_to,
    free_code_from,
    max_purchase
    )
    VALUES
    (
    "${productId}",
    "${productData.quantity}",
    "${productData.unit_quantity}",
    "${productData.unit}",
    "${productData.price}",
    "${productData.discount}",
    "${productData.after_discount}",
    "${productData.retail_profit}",
    "${productData.actual_price}",
    "${productData.gst}",
    "${productData.bv}",
    "${productData.vdbc}",
    "${productData.vdbd}",
    "${productData.commision}",
    "${productData.vdba}",
    "${productData.free_code}",
    "${productData.free_code_to}",
    "${productData.free_code_from}",
    "${productData.max_purchase}"
    );
`
}


const SELECT_FRANCHISE_PRODUCTS_QUANTITY = (productId) => {
    return `
        SELECT * FROM tbl_product_franchise_quantity
        WHERE tbl_product_franchise_quantity.product_id = ${productId};
    `
}

const SELECT_FRANCHISE_PRODUCT = (productType, city, franchiseId, categoryId, subCategoryId) => {
    if (productType && city && franchiseId && categoryId && subCategoryId) {
        return `SELECT * FROM tbl_product_franchise
        WHERE product_type = "${productType}"
        AND city = "${city}"
        AND franchise_id = "${franchiseId}"
        AND category_id = "${categoryId}"
        AND sub_category_id = "${subCategoryId}"
        AND is_sample = "0";`
    } else if (productType && city && franchiseId && categoryId) {
        return `SELECT * FROM tbl_product_franchise
        WHERE product_type = "${productType}"
        AND city = "${city}"
        AND franchise_id = "${franchiseId}"
        AND categoryId = "${categoryId}"
        AND is_sample = "0";`
    } else if (productType && city && franchiseId) {
        return `SELECT * FROM tbl_product_franchise
        WHERE product_type = "${productType}"
        AND city = "${city}"
        AND franchise_id = "${franchiseId}"
        AND is_sample = "0";`
    } else if (productType && city) {
        return `SELECT * FROM tbl_product_franchise
        WHERE product_type = "${productType}"
        AND city = "${city}"
        AND is_sample = "0";`
    } else if (productType) {
        return `SELECT * FROM tbl_product_franchise
        WHERE product_type = "${productType}"
        AND is_sample = "0";`
    } else if (city) {
        return `SELECT * FROM tbl_product_franchise
        WHERE city = "${city}"
        AND is_sample = "0";`
    }
    
}


module.exports.SELECT_ALL_ADMIN_PRODUCTS = SELECT_ALL_ADMIN_PRODUCTS;
module.exports.SELECT_PRODUCTS_BY_CITY = SELECT_PRODUCTS_BY_CITY;
module.exports.SELECT_ALL_UNIT_TYPE = SELECT_ALL_UNIT_TYPE;
module.exports.INSERT_PRODUCT_ADMIN = INSERT_PRODUCT_ADMIN;
module.exports.SELECT_PRODUCT_BY_CITY_CATEGORY_SUB_CATEGORY = SELECT_PRODUCT_BY_CITY_CATEGORY_SUB_CATEGORY;
module.exports.INSERT_PRODUCT_FRANCHISE = INSERT_PRODUCT_FRANCHISE;
module.exports.SELECT_PRODUCT_BY_CITY_FRANCHISE_CATEGORY_SUB_CATEGORY = SELECT_PRODUCT_BY_CITY_FRANCHISE_CATEGORY_SUB_CATEGORY;
module.exports.SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY = SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY;
module.exports.SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN = SELECT_PRODUCT_BY_TYPE_CATEGORY_SUB_CATEGORY_ADMIN;
module.exports.SELECT_PRODUCTS_ADMIN = SELECT_PRODUCTS_ADMIN;
module.exports.SELECT_PRODUCTS_BY_FRANCHISE_ID = SELECT_PRODUCTS_BY_FRANCHISE_ID;
module.exports.ADD_PRODUCT_QUANTITY = ADD_PRODUCT_QUANTITY;
module.exports.SELECT_PRODUCTS_QUANTITY = SELECT_PRODUCTS_QUANTITY;
module.exports.ADD_PRODUCT_FRANCHISE_QUANTITY = ADD_PRODUCT_FRANCHISE_QUANTITY;
module.exports.SELECT_FRANCHISE_PRODUCTS_QUANTITY = SELECT_FRANCHISE_PRODUCTS_QUANTITY;
module.exports.SELECT_FRANCHISE_PRODUCT = SELECT_FRANCHISE_PRODUCT;
