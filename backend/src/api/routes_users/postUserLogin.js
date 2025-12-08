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
        const user = await postUserLogin(email);

        //Validem el usuari que tinguem nosaltres guardat en la BBDD, que ens haja tornat algo.
        if (!user) {
            console.log("❌ USER NOT FOUND");
            return res.status(401).json({
                mensaje: "ERROR - THE EMAIL HAS NOT BEEN FIND | SERVER",
            });
        }

        //Validem el password una vegada hem encontrat l´usuari
        const isValid = await verifyPassword(user.password_hash, password);
        console.log("✅ PASSWORD VALID:", isValid);

        //Creamos el token
        if (!process.env.JWT_SECRET) {
            console.log("❌ JWT_SECRET IS MISSING!");
            throw new Error("JWT_SECRET not configured");
        }
        
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } 
        );

        if (!isValid) {
            return res.status(401).json({
                mensaje: "ERROR - INCORRECT PASSWORD",
            });
        }

        const userObj = {
            user,
            token,
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
