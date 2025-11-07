import { Router } from "express";
import getUserById from './../../functions/functions_users/getUserById.js';

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;        
        const resultGetId = await getUserById(id);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE USER HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE USER HAS BEEN FOUND",
                  data: resultGetId,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
