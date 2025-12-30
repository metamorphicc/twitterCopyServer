import { Router } from "express";
import { model } from "../../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [row] = await model.query("SELECT * FROM posts")

    res.status(200).json({
      ok: true,
      row
    })
    console.log(row)
  } catch (err) {
    console.log(err)
  } 
})

router.post("/", async (req, res) => {
  try {
    const { text, id} = req.body;
    const [rer] = await model.query(
      "INSERT INTO posts (content, profile_id) VALUES (?, ?)",
      [text, id]
    );

    const res = rer.json()

    res.sendStatus(204).json(
      {
        ok: true,
        id,
        text,
      }
    );
  } catch (err) {
    console.log(err);
  }
});



export const postRouterPosts = router;
