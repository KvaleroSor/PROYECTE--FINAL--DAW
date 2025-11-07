import { Router } from "express";
import getSpendById from "../../functions/functions_spends/getSpendById.js";

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;        
        const resultGetId = await getSpendById(id);

        !resultGetId
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPEND HAS NOT BEEN FOUND | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE SPEND HAS BEEN FOUND",
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
