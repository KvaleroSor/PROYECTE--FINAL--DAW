import argon2 from "argon2";

const hashingPassword = async (password) => {
    try {
        const hash = await argon2.hash(password, {
            type: argon2.argon2id, 
            memoryCost: 2 ** 16,
            timeCost: 3, 
            parallelism: 1, 
        });

        return hash;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default hashingPassword;
