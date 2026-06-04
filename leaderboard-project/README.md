# Leaderboard Project

Simple Express + Redis leaderboard with a minimal frontend.

Run locally:

```bash
npm install
npm run dev
# open http://localhost:3000
```

Environment:
- `REDIS_URL` (optional) - e.g. redis://localhost:6379

API:
- `POST /api/leaderboard/score` { userId, points }
- `GET /api/leaderboard` -> top leaderboard
- `POST /api/post/:id/view` -> increment post views
