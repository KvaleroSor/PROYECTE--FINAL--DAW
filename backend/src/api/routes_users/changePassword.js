import { Router } from "express";
import User from "./../../models/users.js";
import auth from "./../../middleware/auth.js";
import verifyPassword from "../../utils/verifyPassword.js";
import hashingPassword from "../../utils/hashingPassword.js";

const router = Router();

// PUT /api/users/change-password - Cambia la contraseña del usuario autenticado
router.put("/", auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        // Validar que se reciban ambos campos
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                mensaje: "❌ ERROR - Se requieren la contraseña actual y la nueva contraseña",
            });
        }

        // Validar longitud mínima de la nueva contraseña
        if (newPassword.length < 8) {
            return res.status(400).json({
                mensaje: "❌ ERROR - La nueva contraseña debe tener al menos 8 caracteres",
            });
        }

        // Buscar el usuario
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                mensaje: "❌ ERROR - Usuario no encontrado",
            });
        }

        // Verificar que la contraseña actual sea correcta
        const isValidPassword = await verifyPassword(user.password_hash, currentPassword);
        if (!isValidPassword) {
            return res.status(401).json({
                mensaje: "❌ ERROR - La contraseña actual es incorrecta",
            });
        }

        // Hashear la nueva contraseña
        const newPasswordHashed = await hashingPassword(newPassword);

        // Actualizar la contraseña
        user.password_hash = newPasswordHashed;
        await user.save();

        console.log("✅ Contraseña actualizada para el usuario:", userId);

        res.status(200).json({
            mensaje: "✅ ÉXITO - Contraseña actualizada correctamente",
        });
    } catch (err) {
        console.error("❌ Error en changePassword:", err);
        res.status(500).json({
            mensaje: `❌ ERROR - Error interno del servidor`,
            error: err.message,
        });
    }
});

export default router;
