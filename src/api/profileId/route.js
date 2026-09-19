import { model } from "../../db.js";
import { Router } from "express";


const router = Router();

router.get('/', async (req, res) => {
  try {
    const sessionRes = await fetch('http://localhost:3000/api/auth/session', {
      headers: { cookie: req.headers.cookie }
    });
    const session = await sessionRes.json();
    
    if (!session?.user?.id) return res.status(401).json({ error: 'Unauthorized' });
    
    const [user] = await model.query('SELECT * FROM users WHERE id = ?', [session.user.id]);
    res.json(user[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal error' });
  }
});

export default router;
