import { Router } from "express";
import getHi from "./service.js";
import { model } from "../../db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const [rer] = await model.query(
      "INSERT INTO posts (text, author, isPrivate) VALUES (?,?, ?)",
      [text, "morph", 1]
    );
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

router.get(`/`, async (req, res) => {
  try {
    const [rows] = await model.query("SELECT * FROM posts WHERE author = 'morph' ");
    res.json(rows).status(200);
  } catch (e) {
    console.log(e);
  }
});

export const postRouterPosts = router;
