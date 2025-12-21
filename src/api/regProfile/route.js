import { Router } from "express";
import { model } from "../../db";
const router = Router();

router.json()

router.post("/", async (req, res) => {
  const [username, email] = req.body;
  const [checkEmail] = await model.query(
    "SELECT * FROM profiles WHERE emails = ?",
    [email]
  );
  if (checkEmail.length == 0) return null;
  const [addEmail] = await model.query(
    "INSERT INTO profiles (username, emails) VALUES(?, ?)",
    [username, email]
  );

  res.redirect("/home") 
  return res.json({
    "response": true
  })
});
