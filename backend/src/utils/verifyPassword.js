import argon2 from "argon2";

const verifyPassword = async (hash, password) => {
    try {
        if (await argon2.verify(hash, password)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default verifyPassword;
