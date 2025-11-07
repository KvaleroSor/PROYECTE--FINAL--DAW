import User from './../../models/users.js';

const deleteUser = async (id) => {
    try{    
        const resultDelete = await User.findByIdAndDelete(id);
        
        return resultDelete;
    }catch(err){
        console.log("❌ ERROR - THE USER HAS NOT BEEN DELETED | BBDD");
        console.log(err);
        throw err;
    }
};

export default deleteUser;