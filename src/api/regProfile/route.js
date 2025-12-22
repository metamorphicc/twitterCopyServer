import { Router } from "express";
import { model } from "../../db.js";
const routerReg = Router();

routerReg.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;

    const [checkEmail] = await model.query(
      "SELECT * FROM profiles WHERE emails = ?",
      [email]
    );

    if (Array.isArray(checkEmail) && checkEmail.length === 1) {
      return res.status(409).json({
        ok: false,
        error: "email already exists",
      });
    }

    const [addEmail] = await model.query(
      "INSERT INTO profiles (username, emails) VALUES(?, ?)",
      [username, email]
    );

    return res.status(200).json({
      ok: true,
      id: addEmail.insertId,
      username,
      email,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ ok: false, error: "internal error" });
  }
});

export default routerReg;
