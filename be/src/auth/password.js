const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

async function hash_password(text_password) {
    return await bcrypt.hash(text_password, SALT_ROUNDS);
}

async function verify_password(text_password, hash_password) {
    return await bcrypt.compare(String(text_password), String(hash_password));
}


module.exports = {
    hash_password, verify_password
}