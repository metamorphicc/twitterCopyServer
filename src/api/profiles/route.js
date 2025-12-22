import { model } from "../../db.js";
import { Router } from "express";

export const routerGetProfiles = Router();

routerGetProfiles.post("/", async (req, res) => {
  const { email, password } = req.body;
  const [row] = await model.query(
    "SELECT * FROM profiles WHERE emails = ? AND passwords = ?",
    [email, password]
  );

  if (Array.isArray(row) && row.length != 0) {
    const user = row[0];
    res.status(200).json({
      ok: true,
      desc: "это первый иф",
      id: user.id,
      email: user.emails,
      password: user.passwords,
      user: row,
    });
  }

  if (row.length == 0) {
    const [rows] = await model.query(
      "INSERT INTO profiles (emails, passwords) VALUES (?, ?)",
      [email, password]
    );

    const insertedId = rows.id;

    const [rows2] = await model.query("SELECT * FROM profiles WHERE id = ?", [
      insertedId,
    ]);

    res.status(200).json({
      ok: true,
      desc: "это второй иф",
      id: rows2.id,
      email: rows2.emails,
      password: rows2.passwords,
    });
  }
});
