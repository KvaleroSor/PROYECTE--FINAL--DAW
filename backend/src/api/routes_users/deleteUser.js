import { Router } from "express";
import deleteUser from "../../functions/functions_users/deleteUser.js";

const router = Router();

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);

        !result
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE USER COULD NOT BE DELETED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "❌ CONGRATS - THE USER HAS BEEN DELETED",
              });
    } catch (err) {
        res.status(500).json({
            mensaje: "❌ ERROR - ERROR FROM SERVER",
        });
    }
});

export default router;
