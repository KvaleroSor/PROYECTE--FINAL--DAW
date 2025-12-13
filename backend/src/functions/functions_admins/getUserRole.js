import User from "../../models/users.js";

const getUserAdmin = async () => {
    try {
        // const resultGet = await User.find({ role: "user" });

        const resultAgregate = await User.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "categories",
                },
            },
            {
                $addFields: {
                    totalCategorias: { $size: "$categorias" },
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    totalCategories: 1,
                },
            },
        ]);

        // return resultGet;
        console.log(resultAgregate);
        return resultAgregate;
    } catch (err) {
        console.log("❌ ERROR - THE USERS COULD NOT BE FOUND | BBDD");
    }
};

export default getUserAdmin;
