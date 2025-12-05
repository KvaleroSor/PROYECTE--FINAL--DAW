import { Router } from "express";
import postNomina from "./../../functions/functions_nomina/postNomina.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const reqInversion = req.body;
        const { user_id, amount, payment_start_date } = req.body;

        //Controlar el "payment_start_date" hacer parse por si el usuario la escribe en algún formato raro.

        if (!user_id || !amount) {
            console.log(
                "❌ ERROR - SOME ELEMENT OF THE NEW NOMINA IS EMPTY | SERVER"
            );
            res.status(204).send();
        }

        const resultNewInversion = await postNomina(reqInversion);

        res.status(201).json({
            mensaje: "✅ - THE NOMINA HAS BEEN CREATED",
            data_recived: reqInversion,
            new_spend: resultNewInversion,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVIDOR`,

            error: err.mensage,
        });
    }
});

export default router;
