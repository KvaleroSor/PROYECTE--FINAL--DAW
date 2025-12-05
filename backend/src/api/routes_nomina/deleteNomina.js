import { Router } from "express";
import deleteNomina from '../../functions/functions_nomina/deleteNomina.js';

const router = Router();

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteNomina(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE NOMINA COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "❌ CONGRATS - THE NOMINA HAS BEEN DELETED",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ ERROR - FROM SERVER",
        });
    }
});

export default router;
