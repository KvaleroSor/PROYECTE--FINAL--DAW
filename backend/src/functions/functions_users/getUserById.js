import User from './../../models/users.js';

const getUserById = async (id) => {
    try{
        const resultGetId = await User.findById(id);
        return resultGetId;
    }catch(err){
        console.log("❌ ERROR - NO SE HA PODIDO ENCONTRAR AL USUARIO");
        console.error(err);
        throw err;
    }
};

export default getUserById;