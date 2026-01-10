import { Router } from "express";
import getSavingById from './../../functions/functions_savings/getSavingById.js';

const router = Router();

router.get("/goal/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultGet = await getSavingById(id);

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SAVING GOAL HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SAVING GOAL HAS BEEN FOUND",
                  data: resultGet
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
