import redis from '../redis/client.js'

export async function incrementViews(postId) {
  if (!postId) throw new Error('postId is required')
  const view = await redis.zincrby('posts:leaderboard', 1, `post:${postId}`)
  return Number(view)
}

export async function increaseScore(userId, actualScore) {
  if (!userId) throw new Error('userId is required')
  const increment = Number(actualScore) || 0
  const score = await redis.zincrby('user:leaderboard', increment, `user:${userId}`)
  return Number(score)
}

export async function topLeaderboard(limit = 10) {
  const raw = await redis.zrevrange('user:leaderboard', 0, limit - 1, 'WITHSCORES')
  const result = []
  for (let i = 0; i < raw.length; i += 2) {
    const member = raw[i]
    const score = Number(raw[i + 1])
    const parts = member.split(':')
    const userId = parts.length > 1 ? parts[1] : member
    result.push({ userId, score })
  }
  return result
}
