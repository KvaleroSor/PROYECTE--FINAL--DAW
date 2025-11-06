import User from './../../models/users.js';
import hashingPassword from '../../utils/hashingPassword.js';

const postUser = async (newUser) => {
    try{
        const { name, email, password_hash } = newUser;
    
        const password_hashed = await hashingPassword(password_hash);

        console.log(newUser);
    
        const registeredUser = await User.create({
            name: name,
            email: email,
            password_hash: password_hashed
        });
    
        return registeredUser;
    }catch(err){
        console.error(err);
        throw err;
    }

};

export default postUser;