import { Router } from "express";
import updateSaving from './../../functions/functions_savings/updateSaving.js';
import auth from './../../middleware/auth.js';

const router = Router();

router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const resultUpdate = await updateSaving(id, updateData);

        !resultUpdate
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SAVING GOAL COULD NOT BE UPDATED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SAVING GOAL HAS BEEN UPDATED",
                  data: resultUpdate
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.message,
        });
    }
});

export default router;
