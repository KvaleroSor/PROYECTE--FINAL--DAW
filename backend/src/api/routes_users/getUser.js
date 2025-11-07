import { Router } from "express";
import getUser from '../../functions/functions_users/getUser.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const resultGet = await getUser();

        !resultGet
            ? res.status(404).json({
                  mensaje: "❌ ERROR - THE USERS HAVE NOT BEEN FOUNDED | SERVER",
              })
            : res.status(200).json({
                  mensaje: "✅ - THE USERS HAVE BEEN FOUNDED",
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
