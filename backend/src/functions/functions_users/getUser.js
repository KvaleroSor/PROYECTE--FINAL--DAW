import User from "./../../models/users.js";

const getUser = async () => {
    try {
        const resultGet = await User.find({});

        return resultGet;
    } catch (err) {
        console.log("❌ ERROR - NO SE HA PODIDO ENCONTRAR USUARIOS | BBDD");
    }
};

export default getUser;
