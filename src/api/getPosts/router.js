import { Router } from "express";
import { model } from "../../db.js";

const router = Router();

router.post(`/`, async (req, res) => {
  const { id } = req.body;
  try {
    const [rows] = await model.query("SELECT * FROM posts WHERE profile_id = ? ", [id]);

   

    res.status(200).json({
      ok: true,
      id,
      rows,
    });
  } catch (e) {
    console.log(e);
  }
});

export const getPostsRouter = router
