import { model } from "../../db.js";
import { Router } from "express";


const router = Router();

export default router.get('/', async (req, res) => {
    const sessionRes = await fetch('http://localhost:3000/api/auth/session', {
      headers: { cookie: req.headers.cookie }
    });
    const session = await sessionRes.json();
    
    if (!session?.user?.id) return res.status(401).json({ error: 'Unauthorized' });
    
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [session.user.id]);
    res.json(user[0]);
  });
  