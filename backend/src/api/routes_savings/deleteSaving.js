import { Router } from "express";
import deleteSaving from "../../functions/functions_savings/deleteSaving.js";

const router = Router();

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteSaving(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SAVING GOAL COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SAVING GOAL HAS BEEN DELETED",
                  data: result
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
