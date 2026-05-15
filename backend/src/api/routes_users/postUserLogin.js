import { Router } from "express";
import postUserLogin from "./../../functions/functions_users/postUserLogin.js";
import verifyPassword from "../../utils/verifyPassword.js";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login de usuario
 *     description: Valida las credenciales y devuelve un token JWT para autenticar las siguientes peticiones
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Todo OK, devuelve los datos del usuario y el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *                 name:
 *                   type: string
 *                   example: Juan Pérez
 *                 role:
 *                   type: string
 *                   example: user
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Email o contraseña incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //Consultem en la BBDD que l´usuari "EXISTISCA".
        const user = await postUserLogin(email);

        //Validem el usuari que tinguem nosaltres guardat en la BBDD, que ens haja tornat algo.
        if (!user) {
            console.log("❌ USER NOT FOUND FOR EMAIL:", email);
            return res.status(401).json({
                mensaje: "ERROR - THE EMAIL HAS NOT BEEN FIND | SERVER",
            });
        }

        //Validem el password una vegada hem encontrat l´usuari
        const isValid = await verifyPassword(user.password_hash, password);

        //Creem el token
        if (!process.env.JWT_SECRET) {
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
            { expiresIn: "1d" },
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
            error: err.message,
        });
    }
});

export default router;
