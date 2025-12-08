import { Router } from "express";
import deleteCategory from "../../functions/functions_categories/deleteCategory.js";
import auth from './../../middleware/auth.js';

const router = Router();

router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteCategory(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE CATEGORY COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ CONGRATS - THE CATEGORY HAS BEEN DELETED",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ ERROR - INTERNAL ERROR | SERVER",
        });
    }
});

export default router;