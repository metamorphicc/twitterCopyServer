import { model } from "../../db.js";
import { Router } from "express";

const router = Router();

export default router.get("/", async (req, res) => {
    try{
        const [row] = await model.query("SELECT * FROM profiles");
        res.json(row)
    } catch(err) {
        console.log(err);
    }
})