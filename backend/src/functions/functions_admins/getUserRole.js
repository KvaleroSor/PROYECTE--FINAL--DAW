import User from "../../models/users.js";

const getUserAdmin = async () => {
    try {
        const resultGet = await User.find({ role: "user" });        

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE USERS COULD NOT BE FOUND | BBDD");
    }
};

export default getUserAdmin;
