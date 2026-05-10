import { Router } from "express";
import User from "./../../models/users.js";
import auth from "./../../middleware/auth.js";

const router = Router();

// PUT /api/users/change-nickname - Cambia el nombre del usuario autenticado
router.put("/", auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { newName } = req.body;

        // Validar que se reciba el nuevo nombre
        if (!newName || newName.trim() === "") {
            return res.status(400).json({
                mensaje: "❌ ERROR - Se requiere un nuevo nombre",
            });
        }

        // Validar longitud del nombre
        if (newName.trim().length < 2) {
            return res.status(400).json({
                mensaje: "❌ ERROR - El nombre debe tener al menos 2 caracteres",
            });
        }

        if (newName.trim().length > 50) {
            return res.status(400).json({
                mensaje: "❌ ERROR - El nombre no puede exceder 50 caracteres",
            });
        }

        // Actualizar el nombre del usuario
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: newName.trim() },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                mensaje: "❌ ERROR - Usuario no encontrado",
            });
        }

        console.log("✅ Nombre actualizado para el usuario:", userId);

        res.status(200).json({
            mensaje: "✅ ÉXITO - Nombre actualizado correctamente",
            data: {
                name: updatedUser.name,
            },
        });
    } catch (err) {
        console.error("❌ Error en changeNickname:", err);
        res.status(500).json({
            mensaje: `❌ ERROR - Error interno del servidor`,
            error: err.message,
        });
    }
});

export default router;
