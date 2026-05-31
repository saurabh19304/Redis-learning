import express from 'express'
import routes from './routes/leaderboard.js'

const app  = express();

app.use(express.json());

app.use('/api', routes)

app.get('/', (req, res) => {
    res.json({ message: "server is running on 3000"})
}
)

app.listen(3000, () => {
	console.log('Server is running on port http://localhost:3000')
})


