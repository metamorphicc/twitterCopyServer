import { Router } from "express";
import { model } from "../../db.js";

const router = Router();

router.post(`/`, async (req, res) => {
  const { ids } = req.body;
  try {
    const [rows] = await model.query("SELECT * FROM posts WHERE profile_id = ? ", [ids]);
    console.log(rows)
    res.status(200).json({
      ok: true,
      ids,
      rows,
    });
  } catch (e) {
    console.log(e);
  }
});

export const getPostsRouter = router
