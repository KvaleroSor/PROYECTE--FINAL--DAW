import { Router } from "express";
import updateSpend from './../../functions/functions_spends/updateSpend.js';

const router = Router();

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const resultUpdate = await updateSpend(id, data);

        !resultUpdate
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE USER HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ EXITO - THE USER HAS BEEN UPDATED",
                  data_recibed: data,
                  data_updated: resultUpdate,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;