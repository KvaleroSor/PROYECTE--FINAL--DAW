import User from "../../models/users.js";

const getUserAdmin = async () => {
    try {
        const resultAgregate = await User.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "categories",
                },
            },
        ]);

        // return resultGet;
        console.log(resultAgregate);
        return resultAgregate;
    } catch (err) {
        console.log("❌ ERROR - THE USERS COULD NOT BE FOUND | BBDD");
        console.error(err);
    }
};

export default getUserAdmin;
