import { Router } from "express";
import updateUser from "./../../functions/functions_users/updateUser.js";

const router = Router();

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const resultUpdate = await updateUser(id, data);

        !resultUpdate
            ? res.status(404).json({
                  mensaje: "❌ ERROR - NO SE HA ENCONTRADO EL USUARIO | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ EXITO - SE HA ACTUALIZADO EL USUARIO",
                  data_recibed: data,
                  data_updated: resultUpdate,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - NO SE HA ACTUALIZADO EL USUARIO | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
