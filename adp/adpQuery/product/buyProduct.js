const CREATE_ORDER = (adp_id, data) => {
    return `INSERT INTO tbl_order (
        invoice_no,
        product,
        product_code,
        adp_id,
        orignal_price,
        qty,
        price,
        discount,
        after_discount,
        retail_profit,
        actual_price,
        free_code,
        bv,
        payment,
        
        free,
        type,
        bv_weightage,
        pay,
        cycle,
        card)
        VALUES
        (
        '' ,
        '${data.product}' ,
        '${data.product_code}' ,
        '${adp_id}' ,
        '${data.price}' ,
        '${data.quantityAdded}' ,
        '${data.price}' ,
        '${data.discount}' ,
        '${data.after_discount}' ,
        '${data.retail_profit}' ,
        '${data.actual_price}' ,
        '${data.free_code}' ,
        '${data.bv}' ,
        '${data.actual_price}' ,
        '' ,
        'not done' ,
        '' ,
        '' ,
        0 ,
        0 );`
}


module.exports.CREATE_ORDER = CREATE_ORDER;