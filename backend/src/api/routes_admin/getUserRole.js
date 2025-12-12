import { Router } from "express";
import getUserRole from "./../../functions/functions_admins/getUserRole.js";
import auth from "../../middleware/auth.js";
import authAdmin from "../../middleware/authAdmin.js";

const router = Router();

router.get("/", auth, authAdmin, async (req, res) => {
    try {
        const resultGet = await getUserRole();

        !resultGet
            ? res.status(404).json({
                  mensaje:
                      "❌ ERROR - THE USERS HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE USERS HAVE BEEN FOUNDED",
                  data: resultGet,
              });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - INTERNAL ERROR | SERVER`,
            error: err.mensage,
        });
    }
});

export default router;
