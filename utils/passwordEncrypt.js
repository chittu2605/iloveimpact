const bcrypt = require("bcrypt");
const passwordEncrypt = (password) => {
    return bcrypt.hash(password, 10);
}

const passwordDecrypt = (textPassword, hash) => {
    return bcrypt.compare(textPassword, hash)
}

module.exports.passwordEncrypt = passwordEncrypt;
module.exports.passwordDecrypt = passwordDecrypt;