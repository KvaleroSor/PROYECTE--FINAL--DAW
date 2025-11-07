import { Router } from "express";
import getUserById from "../../functions/functions_users/getUserById.js";

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;        
        const resultGetId = await getUserById(id);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - USUARIOS NO ENCONTRADOS | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - USUARIO ENCONTRADO CON EXITO",
                  data: resultGetId,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - NO SE HA CREADO EL USUARIO | SERVIDOR`,
            error: err.mensage,
        });
    }
});

export default router;
