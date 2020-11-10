const bcrypt = require('bcryptjs');

const helper = {};

helper.encryptPassword = async (contrasena) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    return hash;
};
 
helper.macthPassword = async (contrasena, savecontrasena) => {
    try {
        return await bcrypt.compare(contrasena, savecontrasena);
    } catch (e) {
        console.log(e)
    }
};
module.exports = helper;