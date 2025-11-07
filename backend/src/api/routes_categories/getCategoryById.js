import { Router } from "express";
import getCategoryById from '../../functions/functions_categories/getCategoryById.js';

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;        
        const resultGetId = await getCategoryById(id);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE CATEGORY HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE CATEGORY HAS BEEN FOUND",
                  data: resultGetId,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SEVER`,
            error: err.mensage,
        });
    }
});

export default router;