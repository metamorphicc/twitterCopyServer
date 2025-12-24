import { model } from "../../db.js";
import { Router } from "express";

export const routerGetProfiles = Router();

routerGetProfiles.post("/", async (req, res) => {
  const {id} = req.body
  const [row] = await model.query("SELECT tag, createdAt FROM profiles WHERE id = ?", [id])
  console.log(row)
  const result = row[0]
  res.status(200).json({
    ok: true,
    result
  }
  )
});
