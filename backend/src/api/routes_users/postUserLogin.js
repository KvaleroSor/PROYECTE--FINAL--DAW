import { Router } from "express";
import postUserLogin from "./../../functions/functions_users/postUserLogin.js";
import verifyPassword from "../../utils/verifyPassword.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    try {
        console.log("🔐 LOGIN ATTEMPT:", req.body.email);
        console.log("🔑 JWT_SECRET EXISTS:", !!process.env.JWT_SECRET);

        const { email, password } = req.body;
        console.log("📧 EMAIL RECEIVED:", email);
        console.log("🔒 PASSWORD RECEIVED LENGTH:", password ? password.length : 0);
        
        const user = await postUserLogin(email);

        //Validem el usuari que tinguem nosaltres guardat en la BBDD, que ens haja tornat algo.
        if (!user) {
            console.log("❌ USER NOT FOUND FOR EMAIL:", email);
            return res.status(401).json({
                mensaje: "ERROR - THE EMAIL HAS NOT BEEN FIND | SERVER",
            });
        }

        console.log("👤 USER FOUND:", user.email);
        console.log("🔑 PASSWORD HASH IN DB EXISTS:", !!user.password_hash);
        console.log("🔑 PASSWORD HASH LENGTH:", user.password_hash ? user.password_hash.length : 0);

        //Validem el password una vegada hem encontrat l´usuari
        const isValid = await verifyPassword(user.password_hash, password);
        console.log("✅ PASSWORD VALID:", isValid);

        //Creem el token
        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET IS MISSING!");
            throw new Error("JWT_SECRET not configured");
        }

        if (!isValid) {
            return res.status(401).json({
                mensaje: "ERROR - INCORRECT PASSWORD",
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userObj = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token,
        };

        console.log("✅ LOGIN SUCCESS");
        res.json(userObj);
    } catch (err) {
        console.error("💥 LOGIN ERROR:", err.message);
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message, // Corregido: era err.mensage
        });
    }
});

export default router;
