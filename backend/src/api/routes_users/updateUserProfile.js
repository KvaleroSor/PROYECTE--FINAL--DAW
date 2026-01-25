import { Router } from "express";
import updateUser from "./../../functions/functions_users/updateUser.js";
import auth from "./../../middleware/auth.js";

const router = Router();

// PUT /api/users/profile - Actualiza el usuario autenticado (sin necesidad de pasar id en URL)
router.put("/", auth, async (req, res) => {
    try {
        // Obtener el userId del token (middleware auth)
        const userId = req.user.userId;
        const data = req.body;

        console.log("🔄 Actualizando perfil del usuario:", userId);
        console.log("📦 Datos recibidos:", data);

        const resultUpdate = await updateUser(userId, data);

        !resultUpdate
            ? res.status(404).json({
                  mensaje: "❌ ERROR - EL USUARIO NO HA SIDO ENCONTRADO | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ ÉXITO - EL USUARIO HA SIDO ACTUALIZADO",
                  data_recibed: data,
                  data_updated: resultUpdate,
              });
    } catch (err) {
        console.error("❌ Error en updateUserProfile:", err);
        res.status(500).json({
            mensaje: `❌ ERROR - ERROR INTERNO | SERVER`,
            error: err.message,
        });
    }
});

export default router;
