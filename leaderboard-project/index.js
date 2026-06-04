import express from 'express'
import routes from './routes/leaderboard.js'
import path from 'path'

const app = express()

app.use(express.json())

// Serve API routes under /api
app.use('/api', routes)

// Serve static frontend from public/
app.use(express.static(path.resolve('public')))

// Fallback root (static middleware will serve public/index.html)
app.get('/', (req, res) => {
	res.sendFile(path.resolve('public', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})


