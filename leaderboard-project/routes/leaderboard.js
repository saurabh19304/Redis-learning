import { Router } from 'express'
import { increaseScore, topLeaderboard, incrementViews } from '../services/leaderboard.js';

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

  const attempts = await redis.incr(`user:${userId}:attempts`);
  const actualScore = attempts === 1 ? points : points/2;

  const score = await increaseScore(userId, actualScore);

  res.json({ 
      success: true,
      userId,
      attempts,
      score
  });

});


router.get('/leaderboard', async (req, res) => {

  const leaderboard = await topLeaderboard();
  res.json({ message: "here is the top 10 scores", leaderboard , score })
  
})

export default router;
