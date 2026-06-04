import { Router } from 'express'
import { increaseScore, topLeaderboard, incrementViews } from '../services/leaderboard.js';

import redis from '../redis/client.js';

const router = Router();

router.post('/post/:id/view', async (req, res) => {
  try {
    const postId = req.params.id
    if (!postId) return res.status(400).json({ success: false, error: 'post id required' })
    const views = await incrementViews(postId)
    return res.json({ success: true, postId, views })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

router.post('/leaderboard/score', async (req, res) => {
  try {
    const { userId, points } = req.body
    if (!userId) return res.status(400).json({ success: false, error: 'userId required' })
    const pts = Number(points)
    if (Number.isNaN(pts)) return res.status(400).json({ success: false, error: 'points must be a number' })

    const attempts = await redis.incr(`user:${userId}:attempts`)
    const actualScore = attempts === 1 ? pts : pts / 2

    const score = await increaseScore(userId, actualScore)

    return res.json({ success: true, userId, attempts, score })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

router.get('/leaderboard', async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10
    const leaderboard = await topLeaderboard(limit)
    return res.json({ success: true, leaderboard })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
})

export default router;
