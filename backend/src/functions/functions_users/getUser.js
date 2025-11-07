import User from "./../../models/users.js";

const getUser = async () => {
    try {
        const resultGet = await User.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - THE USERS COULD NOT BE FOUND | BBDD");
    }
};

export default getUser;
