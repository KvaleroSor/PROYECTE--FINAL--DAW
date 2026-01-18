import { Router } from "express";
import deleteSpendPercentage from "../../functions/functions_percentage_spends/deletePercentageSpend.js";
import auth from "../../middleware/auth.js";

const router = Router();

router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSpendPercentage(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE SPEND PERCENTAGE COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "❌ CONGRATS - THE SPEND PERCENTAGE HAS BEEN DELETED",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ ERROR - FROM SERVER",
        });
    }
});

export default router;
