import redis from '../redis/client.js'

export async function  incrementViews(postId){

  
 const view = await redis.zincrby('posts:leaderboard', 1 , `post:${postId}`);

 return view
}

export function increaseScore(userId, actualScore){

  const score = redis.zincrby('posts:leaderboard', actualScore, `posts:${userId}`);

  return score;
}
