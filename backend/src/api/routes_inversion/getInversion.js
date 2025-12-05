import { Router } from "express";
import getInversion from './../../functions/functions_inversion/getInversion.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        // const user_id = req.params.user_id;
        const resultGet = await getInversion();

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE INVERSION HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE INVERSION HAVE BEEN FOUNDED",
                  data: resultGet
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
