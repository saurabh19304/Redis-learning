import { Router } from 'express'
import incrementViews from '../services/leaderboard.js'

const router = Router();

router.post('/post/:id/view', async (req, res) => {

  const postId = req.params.id;

  const views = await incrementViews(postId)


  res.json({ success: true, postId, views }) 

})

export default router
