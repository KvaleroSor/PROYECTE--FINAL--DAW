import { Router } from 'express';
import postCategory from '../../functions/functions_categories/postCategory.js';

const router = Router();

router.post("/", async (req, res) => {
    try {
        const reqCategory = req.body;
        const { name } = reqCategory;

        if(!name){
            console.log("❌ ERROR - SOME ELEMENT OF THE NEW CATEGORY IS EMPTY | SERVER");
            res.status(204).send();
        }

        const resultNewCategory = await postCategory(reqCategory);

        res.status(201).json({
            mensaje: "✅ - THE CATEGORY HAS BEEN CREATED",
            data_recived: reqCategory,
            new_user: resultNewCategory,
        });
    } catch (err) {
        res.status(500).json({
            mensaje: `❌ ERROR - THE CATEGORY HAS NOT BEEN CREATED | SERVIDOR`,
            error: err.mensage,
        });
    }
});

export default router;