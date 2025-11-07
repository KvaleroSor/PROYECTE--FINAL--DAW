import User from './../../models/users.js';

const getUserById = async (id) => {
    try{
        const resultGetId = await User.findById(id);
        return resultGetId;
    }catch(err){
        console.log("❌ ERROR - THE USER COULD NOT BE FOUND");
        console.error(err);
        throw err;
    }
};

export default getUserById;