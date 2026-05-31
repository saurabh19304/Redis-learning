import redis from '../redis/client.js'

export default async function  incrementViews(postId){

  
 const view = await redis.zincrby('posts:leaderboard', 1 , `post:${postId}`);

 return view
}


