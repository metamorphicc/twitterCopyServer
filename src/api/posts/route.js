import { Router } from "express";
import getHi from "./service.js";

const router = Router();

router.post("/", (req, res) => {
    const tweet = getHi();
    res.json(tweet)
})

export default router
