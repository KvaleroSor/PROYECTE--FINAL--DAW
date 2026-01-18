import { Router } from "express";
import deleteInversion from "../../functions/functions_inversion/deleteInversion.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteInversion(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE INVERSION COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "❌ CONGRATS - THE INVERSION HAS BEEN DELETED",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ ERROR - FROM SERVER",
        });
    }
});

export default router;
