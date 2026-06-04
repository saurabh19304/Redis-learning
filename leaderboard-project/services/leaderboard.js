import redis from '../redis/client.js'

export async function  incrementViews(postId){

  
 const view = await redis.zincrby('posts:leaderboard', 1 , `post:${postId}`);

 return view
}

export  async function increaseScore(userId, actualScore){

  const score = await  redis.zincrby('user:leaderboard', actualScore, `user:${userId}`);

  return score;
}

export async  function topLeaderboard(){

  const top = await redis.zrevrange('user:leaderboard', 0 , 9, "WITHSCORES");
  
  return top;
};
