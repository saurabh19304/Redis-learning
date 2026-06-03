import { Router } from 'express'
import incrementViews from '../services/leaderboard.js'
import { increaseScore } from '../services/leaderboard.js';
import redis from '../redis/client.js';

const router = Router();

router.post('/post/:id/view', async (req, res) => {

  const postId = req.params.id;

  const views = await incrementViews(postId);

  res.json({ success: true,
      postId,
      views 

  });

});

router.post('/leaderboard/score', async (req, res) => {

  const { userId, points} = req.body;

  const attempts = await redis.incr(`user:${usertId}:attempts`);
  const actualScore = attempts === 1 ? points : points/2;

  const score = await increaseScore(userId, actualScore);

  res.json({ 
      success: true,
      userId,
      attempts,
      score
  });

});

export default router;
