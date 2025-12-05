import { Router } from "express";
import getNomina from "./../../functions/functions_nomina/getNomina.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        // const user_id = req.params.user_id;
        const resultGet = await getNomina();

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE NOMINA HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(201).json({
                  mensaje: "✅ - THE NOMINA HAVE BEEN FOUNDED",
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
