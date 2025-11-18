import User from './../../models/users.js';

const postUserLogin = async(email) => {
    try{
        const userLoged = await User.findOne({ email });

        if(!userLoged) {
            return res.status(401).json({
                mensaje: "ERROR - EMAIL HAS NOT BEEN FIND"
            });
        }

        return userLoged;
    }catch(err){
        console.error(err);
        console.log("❌ ERROR - THE USER HAS NOT BEEN FIND | BBDD");
        throw err;
    }
};

export default postUserLogin;