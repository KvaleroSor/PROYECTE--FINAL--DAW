import { Router } from "express";
import deleteUser from "../../functions/functions_users/deleteUser.js";

const router = Router();

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);

        !result
            ? res.status(404).json({
                  mensaje: "ERROR - NO SE HA PODIDO BORRAR LA PELÍCULA | SERVER",
              })
            : res.status(200).json({
                  mensaje: "EXITO - BORRADO CON EXITO",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "ERROR - ERROR DESDE EL SERVER",
        });
    }
});

export default router;
