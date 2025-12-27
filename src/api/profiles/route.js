import { model } from "../../db.js";
import { Router } from "express";

export const routerGetProfiles = Router();

routerGetProfiles.post("/", async (req, res) => {
  const {id} = req.body
  const [row] = await model.query("SELECT tag, createdAt, following, followers FROM profiles WHERE id = ?", [id])
  const result = row[0]
  console.log(result)
  res.status(200).json({
    ok: true,
    result
  }
  )
});
