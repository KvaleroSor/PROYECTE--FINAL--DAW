import User from './../../models/users.js';
import hashingPassword from '../../utils/hashingPassword.js';

/**
 * @description La intenció es generar un token quan l´usuari 
 * inicie sessió correctament i aprofitar el token per
 * l´autenticació
 * 
 * @param {*} newUser 
 * @returns 
 */

const postUser = async (newUser) => {
    try{
        const { name, email, password_hash } = newUser;
        const password_hashed = await hashingPassword(password_hash);
    
        const registeredUser = await User.create({
            name: name,
            email: email,
            password_hash: password_hashed
        });
    
        return registeredUser;
    }catch(err){
        console.error(err);
        console.log("❌ ERROR - THE USER HAS NOT BEEN CREATED | BBDD");
        throw err;
    }
};

export default postUser;